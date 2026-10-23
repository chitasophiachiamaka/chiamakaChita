from __future__ import annotations

import os
from collections import Counter
from typing import Any

import psycopg
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from psycopg.rows import dict_row

app = FastAPI(
    title="Classroom Results Explorer API",
    description="Read-only API serving synthetic learner results for a portfolio demo.",
    version="1.0.0",
)

allowed_origins = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


def get_connection() -> psycopg.Connection[Any]:
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise HTTPException(status_code=503, detail="Results service is not configured.")
    try:
        return psycopg.connect(database_url, row_factory=dict_row, connect_timeout=5)
    except psycopg.Error as exc:
        raise HTTPException(status_code=503, detail="Results service is temporarily unavailable.") from exc


def build_filters(
    class_name: str | None, term: str | None, search: str | None
) -> tuple[str, list[str]]:
    clauses: list[str] = []
    values: list[str] = []
    if class_name:
        clauses.append("s.class_name = %s")
        values.append(class_name)
    if term:
        clauses.append("r.term = %s")
        values.append(term)
    if search:
        clauses.append("(s.display_name ILIKE %s OR r.subject ILIKE %s)")
        search_value = f"%{search}%"
        values.extend([search_value, search_value])
    return (" WHERE " + " AND ".join(clauses) if clauses else "", values)


def get_filtered_results(
    class_name: str | None, term: str | None, search: str | None, limit: int
) -> list[dict[str, Any]]:
    filters, values = build_filters(class_name, term, search)
    sql = """
        SELECT r.id, s.display_name, s.class_name, r.subject, r.score, r.term
        FROM results AS r
        JOIN students AS s ON s.id = r.student_id
    """ + filters + " ORDER BY s.class_name, s.display_name, r.subject LIMIT %s"
    try:
        with get_connection() as connection, connection.cursor() as cursor:
            cursor.execute(sql, [*values, limit])
            rows = cursor.fetchall()
    except HTTPException:
        raise
    except psycopg.Error as exc:
        raise HTTPException(status_code=503, detail="Results service is temporarily unavailable.") from exc
    return [dict(row) for row in rows]


def grade_for_score(score: int) -> str:
    if score >= 70:
        return "A"
    if score >= 60:
        return "B"
    if score >= 50:
        return "C"
    if score >= 45:
        return "D"
    return "E"


def common_filters(
    class_name: str | None,
    term: str | None,
    search: str | None,
) -> tuple[str | None, str | None, str | None]:
    return class_name, term, search


@app.get("/api/health")
def health() -> dict[str, str]:
    try:
        with get_connection() as connection, connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            cursor.fetchone()
    except HTTPException:
        raise
    except psycopg.Error as exc:
        raise HTTPException(status_code=503, detail="Database health check failed.") from exc
    return {"status": "ok", "data": "synthetic"}


@app.get("/api/results")
def list_results(
    class_name: str | None = Query(default=None, min_length=2, max_length=8),
    term: str | None = Query(default=None, max_length=20),
    search: str | None = Query(default=None, max_length=60),
    limit: int = Query(default=100, ge=1, le=250),
) -> dict[str, Any]:
    rows = get_filtered_results(*common_filters(class_name, term, search), limit)
    return {"results": rows, "count": len(rows), "data": "synthetic"}


@app.get("/api/results/summary")
def summarize_results(
    class_name: str | None = Query(default=None, min_length=2, max_length=8),
    term: str | None = Query(default=None, max_length=20),
    search: str | None = Query(default=None, max_length=60),
) -> dict[str, Any]:
    rows = get_filtered_results(*common_filters(class_name, term, search), 250)
    learner_count = len({row["display_name"] for row in rows})
    average = round(sum(row["score"] for row in rows) / len(rows), 1) if rows else 0
    distribution = Counter(grade_for_score(row["score"]) for row in rows)
    return {
        "learner_count": learner_count,
        "result_count": len(rows),
        "average_score": average,
        "grade_distribution": {grade: distribution.get(grade, 0) for grade in "ABCDE"},
        "data": "synthetic",
    }

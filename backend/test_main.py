from fastapi.testclient import TestClient

import main

client = TestClient(main.app)


def test_list_results_passes_valid_filters(monkeypatch):
    seen = {}

    def fake_results(class_name, term, search, limit):
        seen.update(class_name=class_name, term=term, search=search, limit=limit)
        return [{"id": 1, "display_name": "Demo Learner 01", "class_name": "SS1", "subject": "Computer Studies", "score": 84, "term": "First term"}]

    monkeypatch.setattr(main, "get_filtered_results", fake_results)
    response = client.get("/api/results", params={"class_name": "SS1", "term": "First term", "search": "Computer"})
    assert response.status_code == 200
    assert response.json()["count"] == 1
    assert seen == {"class_name": "SS1", "term": "First term", "search": "Computer", "limit": 100}


def test_summary_uses_synthetic_scores(monkeypatch):
    rows = [
        {"display_name": "Demo Learner 01", "score": 84},
        {"display_name": "Demo Learner 01", "score": 67},
        {"display_name": "Demo Learner 02", "score": 44},
    ]
    monkeypatch.setattr(main, "get_filtered_results", lambda *_args: rows)
    response = client.get("/api/results/summary")
    assert response.status_code == 200
    assert response.json()["learner_count"] == 2
    assert response.json()["average_score"] == 65
    assert response.json()["grade_distribution"] == {"A": 1, "B": 1, "C": 0, "D": 0, "E": 1}


def test_score_grade_boundaries():
    assert main.grade_for_score(70) == "A"
    assert main.grade_for_score(60) == "B"
    assert main.grade_for_score(50) == "C"
    assert main.grade_for_score(45) == "D"
    assert main.grade_for_score(44) == "E"


def test_invalid_filters_are_rejected_before_database_access():
    response = client.get("/api/results", params={"class_name": "x", "limit": 251})
    assert response.status_code == 422


def test_results_requires_configured_database(monkeypatch):
    monkeypatch.delenv("DATABASE_URL", raising=False)
    response = client.get("/api/results")
    assert response.status_code == 503
    assert response.json()["detail"] == "Results service is not configured."


def test_database_connection_failure_returns_service_unavailable(monkeypatch):
    import psycopg

    monkeypatch.setenv("DATABASE_URL", "postgresql://demo:demo@localhost:5432/demo")

    def fail_connect(*_args, **_kwargs):
        raise psycopg.OperationalError("database unavailable")

    monkeypatch.setattr(main.psycopg, "connect", fail_connect)
    response = client.get("/api/results")
    assert response.status_code == 503
    assert response.json()["detail"] == "Results service is temporarily unavailable."


def test_api_does_not_expose_write_routes():
    response = client.post("/api/results", json={"score": 99})
    assert response.status_code == 405

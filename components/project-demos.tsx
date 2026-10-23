"use client";

import { FormEvent, useEffect, useState } from "react";

type Task = { id: string; text: string; done: boolean };
type Transaction = { id: string; title: string; category: string; type: "income" | "expense"; amount: number };

function useStoredState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem(key);
        if (stored) setValue(JSON.parse(stored) as T);
      } catch {
        try { localStorage.removeItem(key); } catch { /* Storage can be disabled by the browser. */ }
      } finally {
        setReady(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [key]);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* The demo still works for this session. */ }
  }, [key, ready, value]);
  return [value, setValue] as const;
}

const starterTasks: Task[] = [{ id: "sample-1", text: "Plan a small feature", done: false }, { id: "sample-2", text: "Review what I learned", done: true }];

export function TaskflowDemo() {
  const [tasks, setTasks] = useStoredState<Task[]>("chita-taskflow-v1", starterTasks);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "done">("all");
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  function addTask(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const clean = text.trim(); if (!clean) return; setTasks((current) => [...current, { id: crypto.randomUUID(), text: clean, done: false }]); setText(""); }
  const shown = tasks.filter((task) => filter === "all" || (filter === "done" ? task.done : !task.done));
  return <section className="demo-panel" aria-label="Taskflow interactive demo"><div className="demo-header"><div><h2>My task board</h2><p className="demo-help">Example tasks are saved only in this browser.</p></div><span className="prototype-label">Portfolio prototype</span></div>
    <form className="demo-form" onSubmit={addTask}><input aria-label="New task" value={text} onChange={(event) => setText(event.target.value)} placeholder="What would you like to do?" maxLength={100} /><button type="submit">Add task <span aria-hidden="true">＋</span></button></form>
    <div className="task-filters" aria-label="Filter tasks">{(["all", "open", "done"] as const).map((item) => <button className={filter === item ? "filter-button active" : "filter-button"} key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item}>{item === "all" ? "All" : item === "open" ? "To do" : "Done"}</button>)}</div>
    {shown.length ? <ul className="task-list">{shown.map((task) => <li className={`task-row${task.done ? " done" : ""}`} key={task.id}>{editId === task.id ? <form className="edit-task-form" onSubmit={(event) => { event.preventDefault(); const clean = editText.trim(); if (clean) setTasks((current) => current.map((item) => item.id === task.id ? { ...item, text: clean } : item)); setEditId(null); }}><input aria-label="Edit task" value={editText} onChange={(event) => setEditText(event.target.value)} autoFocus /><button className="small-button" type="submit">Save</button><button className="quiet-button" type="button" onClick={() => setEditId(null)}>Cancel</button></form> : <><label><input type="checkbox" checked={task.done} onChange={() => setTasks((current) => current.map((item) => item.id === task.id ? { ...item, done: !item.done } : item))} /><span className="task-text">{task.text}</span></label><div className="row-actions"><button type="button" onClick={() => { setEditId(task.id); setEditText(task.text); }}>Edit</button><button type="button" onClick={() => setTasks((current) => current.filter((item) => item.id !== task.id))}>Remove</button></div></>}</li>)}</ul> : <p className="empty-state">Nothing here yet. Add a task to get started.</p>}
    <p className="storage-note">{tasks.filter((task) => !task.done).length} open · {tasks.filter((task) => task.done).length} completed · saved on this device</p>
  </section>;
}

const starterTransactions: Transaction[] = [
  { id: "sample-income", title: "Sample income", category: "Income", type: "income", amount: 120000 },
  { id: "sample-data", title: "Sample data plan", category: "Utilities", type: "expense", amount: 8000 },
  { id: "sample-food", title: "Sample groceries", category: "Food", type: "expense", amount: 12500 },
];

export function LedgerDemo() {
  const [transactions, setTransactions] = useStoredState<Transaction[]>("chita-ledger-v1", starterTransactions);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<Transaction["type"]>("expense");
  const [category, setCategory] = useState("Food");
  function addTransaction(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const value = Number(amount); if (!title.trim() || !Number.isFinite(value) || value <= 0) return; setTransactions((current) => [{ id: crypto.randomUUID(), title: title.trim(), category, type, amount: value }, ...current]); setTitle(""); setAmount(""); }
  const income = transactions.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0);
  const spending = transactions.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0);
  const money = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });
  return <section className="demo-panel" aria-label="Everyday Ledger interactive demo"><div className="demo-header"><div><h2>Monthly overview</h2><p className="demo-help">Fictional sample amounts · stored only in this browser.</p></div><span className="prototype-label">Portfolio prototype</span></div>
    <div className="ledger-summary"><div className="summary-box"><span>Income</span><strong>{money.format(income)}</strong></div><div className="summary-box expense"><span>Spending</span><strong>{money.format(spending)}</strong></div><div className="summary-box"><span>Balance</span><strong>{money.format(income - spending)}</strong></div></div>
    <form className="demo-form ledger-form" onSubmit={addTransaction}><input aria-label="Transaction name" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Transaction name" maxLength={70} required /><input aria-label="Amount in naira" type="number" min="1" step="1" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Amount (₦)" required /><select aria-label="Transaction type" value={type} onChange={(event) => setType(event.target.value as Transaction["type"])}><option value="expense">Expense</option><option value="income">Income</option></select><select aria-label="Category" value={category} onChange={(event) => setCategory(event.target.value)}><option>Food</option><option>Transport</option><option>Utilities</option><option>Education</option><option>Income</option><option>Other</option></select><button type="submit">Add entry</button></form>
    <ul className="transaction-list">{transactions.map((item) => <li className="transaction-row" key={item.id}><div><span className="transaction-name">{item.title}</span><span className="transaction-category">{item.category}</span></div><span className={`transaction-amount ${item.type}`}>{item.type === "income" ? "+" : "−"}{money.format(item.amount)}</span><button className="icon-button" type="button" aria-label={`Remove ${item.title}`} onClick={() => setTransactions((current) => current.filter((row) => row.id !== item.id))}>×</button></li>)}</ul>
  </section>;
}

type Student = { id: string; display_name: string; class_name: string; subject: string; score: number; term: string };
type Summary = { learner_count: number; average_score: number; grade_distribution: Record<string, number> };
const apiBase = (
  process.env.NEXT_PUBLIC_RESULTS_API_URL ??
  (process.env.NODE_ENV === "development" ? "http://localhost:8000" : "")
).replace(/\/$/, "");

export function ResultsExplorerDemo() {
  const [students, setStudents] = useState<Student[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [className, setClassName] = useState("All classes");
  const [term, setTerm] = useState("All terms");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    async function load() { setLoading(true); setError("");
      try {
        const params = new URLSearchParams(); if (className !== "All classes") params.set("class_name", className); if (term !== "All terms") params.set("term", term); if (query.trim()) params.set("search", query.trim());
        const [recordsResponse, summaryResponse] = await Promise.all([fetch(`${apiBase}/api/results?${params}`, { signal: controller.signal }), fetch(`${apiBase}/api/results/summary?${params}`, { signal: controller.signal })]);
        if (!recordsResponse.ok || !summaryResponse.ok) throw new Error("The results service is not available. Start the FastAPI service and try again.");
        const records = await recordsResponse.json() as { results: Student[] };
        const stats = await summaryResponse.json() as Summary;
        setStudents(records.results); setSummary(stats);
      } catch (cause) { if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "Unable to load example results."); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }
    void load(); return () => controller.abort();
  }, [className, term, query]);
  return <section className="demo-panel" aria-label="Classroom Results Explorer interactive demo"><div className="demo-header"><div><h2>Class results</h2><p className="demo-help">Synthetic learner records · read-only API demo.</p></div><span className="prototype-label">Portfolio prototype</span></div>
    <div className="results-toolbar"><label className="sr-only" htmlFor="class-filter">Filter by class</label><select id="class-filter" value={className} onChange={(event) => setClassName(event.target.value)}><option>All classes</option><option>SS1</option><option>SS2</option><option>SS3</option></select><label className="sr-only" htmlFor="term-filter">Filter by term</label><select id="term-filter" value={term} onChange={(event) => setTerm(event.target.value)}><option>All terms</option><option>First term</option><option>Second term</option><option>Third term</option></select><label className="sr-only" htmlFor="learner-search">Search records</label><input id="learner-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search demo records" /></div>
    {error ? <div className="api-message" role="alert">{error}</div> : loading ? <p className="empty-state" role="status">Loading synthetic records…</p> : <>
      <div className="results-summary"><div className="summary-box"><span>Learners</span><strong>{summary?.learner_count ?? 0}</strong></div><div className="summary-box"><span>Average score</span><strong>{summary?.average_score ?? 0}%</strong></div><div className="summary-box"><span>Grade A</span><strong>{summary?.grade_distribution?.A ?? 0}</strong></div></div>
      {students.length ? <div className="results-table-wrap"><table className="results-table"><thead><tr><th>Learner</th><th>Class</th><th>Subject</th><th>Term</th><th>Score</th><th>Grade</th></tr></thead><tbody>{students.map((student) => <tr key={student.id}><td>{student.display_name}</td><td>{student.class_name}</td><td>{student.subject}</td><td>{student.term}</td><td>{student.score}%</td><td><span className="grade-pill">{student.score >= 70 ? "A" : student.score >= 60 ? "B" : student.score >= 50 ? "C" : student.score >= 45 ? "D" : "E"}</span></td></tr>)}</tbody></table></div> : <p className="empty-state">No synthetic records match those filters.</p>}
    </>}
  </section>;
}

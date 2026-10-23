const localBackendUrl = "http://localhost:8000";

export async function forwardResultsRequest(request: Request, backendPath: string) {
  const backendBase =
    process.env.BACKEND_URL ??
    (process.env.NODE_ENV === "development" ? localBackendUrl : undefined);

  if (!backendBase) {
    return Response.json(
      { detail: "The results backend is not configured." },
      { status: 503 },
    );
  }

  const incomingUrl = new URL(request.url);
  const backendUrl = new URL(`/api/${backendPath}${incomingUrl.search}`, backendBase);
  return fetch(backendUrl, {
    headers: { accept: "application/json" },
    cache: "no-store",
  });
}

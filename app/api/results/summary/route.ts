import { forwardResultsRequest } from "@/lib/results-api";

export function GET(request: Request) {
  return forwardResultsRequest(request, "results/summary");
}

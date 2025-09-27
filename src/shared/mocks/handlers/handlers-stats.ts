import { http, HttpResponse } from "msw";

import { statsResponse } from "../responses";

import type { StatsResponse } from "../responses";

export const handlersStats = [
  http.post<never, never, StatsResponse>("\\upload", () => {
    return HttpResponse.json(statsResponse);
  }),
];

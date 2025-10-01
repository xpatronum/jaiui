import { http, HttpResponse } from "msw";

import { statsResponseSlow, statsResponseQuick } from "../responses";

import type { StatsResponseSlow, StatsResponseQuick } from "../responses";

export const handlersStats = [
  http.post<never, never, StatsResponseQuick>("/upload", () => {
    return HttpResponse.json(statsResponseQuick);
  }),

  http.post<never, { uuid: string }, StatsResponseSlow>("/render", () => {
    return HttpResponse.json(statsResponseSlow);
  }),
];

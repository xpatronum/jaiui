import { http, HttpResponse } from "msw";

import { sentiments } from "../responses";

import type { SentimentsResponse } from "../responses";

export const handlersSentiments = [
  http.post<never, { uuid: string }, SentimentsResponse>("/ts_render", () => {
    return HttpResponse.json(sentiments);
  }),
];

import { http, HttpResponse } from "msw";

import { sentiments } from "../responses";

import type { SentimentsResponse } from "../responses";

export const handlersSentiments = [
  http.post<
    never,
    { uuid: string; start_date: number; end_date: number },
    SentimentsResponse
  >("/ts_render", async () => {
    return HttpResponse.json(sentiments);
  }),
];

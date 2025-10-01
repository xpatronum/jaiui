import { setupWorker } from "msw/browser";

import {
  handlersReports,
  handlersSentiments,
  handlersStats,
  handlersUser,
} from "./handlers";

export const worker = setupWorker(
  ...handlersUser,
  ...handlersReports,
  ...handlersStats,
  ...handlersSentiments,
);

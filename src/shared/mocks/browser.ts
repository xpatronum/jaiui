import { setupWorker } from "msw/browser";

import {
  handlersReports,
  handlersStats,
  handlersTS,
  handlersUser,
} from "./handlers";

export const worker = setupWorker(
  ...handlersUser,
  ...handlersTS,
  ...handlersReports,
  ...handlersStats,
);

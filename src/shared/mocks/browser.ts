import { setupWorker } from "msw/browser";

import { handlersReports, handlersStats, handlersUser } from "./handlers";

export const worker = setupWorker(
  ...handlersUser,
  ...handlersReports,
  ...handlersStats,
);

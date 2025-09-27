import { setupWorker } from "msw/browser";

import { handlersReports, handlersTS, handlersUser } from "./handlers";

export const worker = setupWorker(
  ...handlersUser,
  ...handlersTS,
  ...handlersReports,
);

import { setupWorker } from "msw/browser";

import { handlersTS, handlersUser } from "./handlers";

export const worker = setupWorker(...handlersUser, ...handlersTS);

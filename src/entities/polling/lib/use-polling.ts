import { useEffect } from "react";

import { usePollingStore } from "../model";

const EVENT_SOURCE_URL = "";

export const usePolling = () => {
  const { isPolling, setIsPolling, setProgress } = usePollingStore(
    (state) => state,
  );

  useEffect(() => {
    if (!isPolling) {
      return;
    }

    try {
      if (EVENT_SOURCE_URL === "") {
        throw new Error("Use polling in development mode");
      }

      const eventSource = new EventSource(EVENT_SOURCE_URL);

      eventSource.addEventListener("is_done", (event) => {
        const progress = event.data as number;

        setProgress(progress);

        if (progress === 100) {
          eventSource.close();

          setIsPolling(false);
        }
      });
    } catch {
      let progress = 0;

      const interval = setInterval(() => {
        setProgress(++progress);

        if (progress === 100) {
          clearInterval(interval);

          setIsPolling(false);
        }
      }, 100);
    }
  }, [isPolling, setIsPolling, setProgress]);
};

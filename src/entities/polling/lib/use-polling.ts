import { useEffect } from "react";

import { usePollingStore } from "../model";
import { useStatsStore } from "@/entities/stats";

const EVENT_SOURCE_URL = "http://localhost:2288/is_done";

export const usePolling = () => {
  const { isPolling, setIsPolling, setProgress } = usePollingStore(
    (state) => state,
  );
  const { uuid } = useStatsStore((state) => state);

  useEffect(() => {
    if (!isPolling) {
      return;
    }

    try {
      // @ts-expect-error
      if (EVENT_SOURCE_URL === "") {
        throw new Error("Use polling in development mode");
      }

      const eventSource = new EventSource(`${EVENT_SOURCE_URL}?uuid=${uuid}`);

      eventSource.onmessage = (event) => {
        const progress = parseInt(event.data as string, 10);

        setProgress(progress);

        if (progress === 100) {
          eventSource.close();

          setIsPolling(false);
        }
      };
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

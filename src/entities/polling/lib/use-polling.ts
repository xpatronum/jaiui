import { useEffect } from "react";

import { usePollingStore } from "../model";
import { useStatsStore } from "@/entities/stats";

const EVENT_SOURCE_RELATIVE_PATH = "/is_done";

export const usePolling = () => {
  const { isPolling, setIsPolling, setProgress } = usePollingStore(
    (state) => state,
  );
  const { uuid } = useStatsStore((state) => state);

  useEffect(() => {
    if (!isPolling) {
      return;
    }

    if (import.meta.env.PROD) {
      const eventSource = new EventSource(
        `${import.meta.env.VITE_BASE_URL}${EVENT_SOURCE_RELATIVE_PATH}?uuid=${uuid}`,
      );

      eventSource.onmessage = (event) => {
        const progress = parseInt(event.data as string);

        setProgress(progress);

        if (progress === 100) {
          eventSource.close();

          setIsPolling(false);
        }
      };
    } else {
      let progress = 0;

      const interval = setInterval(() => {
        setProgress(++progress);

        if (progress === 100) {
          clearInterval(interval);

          setIsPolling(false);
        }
      }, 100);
    }
  }, [isPolling, setIsPolling, setProgress, uuid]);
};

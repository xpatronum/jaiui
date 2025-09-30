import { Progress } from "radix-ui";

import { usePolling, usePollingStore } from "@/entities/polling";

const PollingProgress = () => {
  usePolling();

  const { progress } = usePollingStore((state) => state);

  if (progress === 1) {
    return;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span className="text-base-content">Обработка файла...</span>
      <Progress.Root
        className="bg-base-200 relative h-6 w-72 overflow-hidden rounded-full"
        style={{
          // Fix overflow clipping in Safari
          // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
          transform: "translateZ(0)",
        }}
        value={progress}
      >
        <Progress.Indicator
          className="bg-base-content size-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
    </div>
  );
};

export { PollingProgress };

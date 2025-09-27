import { useStatsStore } from "../model";

function WordCloud() {
  const { wcloud_figure } = useStatsStore((state) => state);

  return (
    <div className="text-base-content bg-base-200 flex h-[480px] w-[480px] flex-col items-center justify-center rounded-xl">
      {wcloud_figure.words.slice(0, 15).map((word) => (
        <div key={word.text}>{word.text}</div>
      ))}
    </div>
  );
}

export { WordCloud };

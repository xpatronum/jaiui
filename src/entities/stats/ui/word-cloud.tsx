import * as d3 from "d3";
import cloud from "d3-cloud";
import { useEffect, useRef } from "react";

import { useStatsStore } from "../model";

function WordCloud() {
  const { wcloud_figure: words } = useStatsStore((state) => state);

  const width = 720;
  const height = 480;

  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (element === null) {
      return;
    }

    d3.select(element).selectAll("*").remove();

    const layout = cloud()
      .size([width, height])
      .words(
        words.map((word) => ({
          text: word.text,
          size: word.freq * 10,
          color: word.color,
        })),
      )
      .fontSize((d) => d.size! * 10)
      .padding(8)
      .rotate(() => (Math.random() > 0.75 ? 90 : 0))
      .on("end", () => {
        const svg = d3
          .select(element)
          .attr("viewBox", `0 0 ${width} ${height}`)
          .append("g")
          .attr("transform", `translate(${width / 2},${height / 2})`);

        svg
          .selectAll("text")
          .data(layout.words())
          .enter()
          .append("text")
          .style("font-family", "sans-serif")
          .style("font-size", (word) => `${word.size}px`)
          .attr("fill", (word) => (word as unknown as { color: string }).color)
          .attr("text-anchor", "middle")
          .attr(
            "transform",
            (word) => `translate(${word.x},${word.y}) rotate(${word.rotate})`,
          )
          .text((word) => word.text!);
      });

    layout.start();
  }, [words]);

  if (words.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <span className="text-base-content text-2xl font-semibold">
        Облако слов отзывов
      </span>
      <svg
        ref={ref}
        className="bg-base-200 cursor-default rounded-xl"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </div>
  );
}

export { WordCloud };

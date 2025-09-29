import * as d3 from "d3";
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

    const svg = d3
      .select(element)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    svg
      .selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .style("font-family", "sans-serif")
      .style("font-size", (word) => `${word.fontSize}px`)
      .style("fill", (word) => word.color)
      .attr("text-anchor", "end")
      .attr(
        "transform",
        (word) => `translate(${word.x},${word.y}) rotate(${word.rotate})`,
      )
      .text((word) => word.text);
  }, [words]);

  if (words.length === 0) {
    return null;
  }

  return (
    <svg
      ref={ref}
      className="bg-base-200 cursor-default rounded-xl"
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
}

export { WordCloud };

import axios from "axios";
import { useState } from "react";
import Plot from "react-plotly.js";

import { Layout } from "@/shared/ui";

const toLocaleDateString = (timeStamp: number): string => {
  return new Date(timeStamp * 1000).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Page = () => {
  const [data, setData] = useState<
    Array<{
      name: string;
      positive: { x: number[]; y: number[] };
      neutral: { x: number[]; y: number[] };
      negative: { x: number[]; y: number[] };
    }>
  >([]);

  const onSubmit = () => {
    axios.post("/ts_render_semantics", {}).then((response) => {
      setData(response.data.data);
    });
  };

  return (
    <Layout>
      <section className="flex w-full flex-col items-center gap-8 p-8">
        <h1 className="text-primary-content text-5xl">Статистика</h1>
        {data.map((item) => (
          <Plot
            key={item.name}
            data={[
              {
                name: "Негативные",
                marker: { color: "fb2c36" },
                x: item.positive.x.map(toLocaleDateString),
                y: item.positive.y,
                type: "bar",
              },
              {
                name: "Нейтральные",
                marker: { color: "ffdf20" },
                x: item.positive.x.map(toLocaleDateString),
                y: item.positive.y,
                type: "bar",
              },
              {
                name: "Положительные",
                marker: { color: "00c950" },
                x: item.positive.x.map(toLocaleDateString),
                y: item.positive.y,
                type: "bar",
              },
            ]}
            layout={{
              width: 640,
              height: 480,
              plot_bgcolor: "#00000000",
              paper_bgcolor: "#00000000",
              font: {
                color: "#fafafa",
              },
              xaxis: {
                color: "#fafafa",
                linecolor: "#fafafa",
              },
              yaxis: {
                color: "#fafafa",
                linecolor: "#fafafa",
              },
              barmode: "stack",
              showlegend: false,
              title: { text: item.name },
            }}
            config={{ staticPlot: true, displayModeBar: false }}
          />
        ))}

        <form className="text-base-content bg-base-100 w-full p-4 text-center">
          <p className="text-xl">Выбрать время</p>
          <button
            type="button"
            className="bg-base-100 text-primary-content hover:bg-base-200 focus-visible:outline-primary-content inline-flex h-12 items-center justify-center rounded p-4 text-3xl focus-visible:outline-2"
            onClick={onSubmit}
          >
            Применить
          </button>
        </form>
      </section>
    </Layout>
  );
};

export { Page };

import { http, HttpResponse } from "msw";

export const handlersTS = [
  http.post<
    never,
    {
      start_date: number;
      end_date: number;
      uuid: string;
      topics: string[];
      sentiments: string[];
    },
    {
      data: Array<{
        name: string;
        positive: { x: number[]; y: number[] };
        negative: { x: number[]; y: number[] };
        neutral: { x: number[]; y: number[] };
      }>;
    }
  >("\\ts_render_semantics", () => {
    const xInit = 1735689600;
    const xStep = 3600 * 24 * 10;
    const xSize = Math.floor(Math.random() * 10) + 1;

    const x: number[] = new Array(xSize);
    for (let i = 0; i < xSize; i++) {
      x[i] = xInit + i * xStep;
    }

    const topics = ["Ипотека", "Кредит"];

    return HttpResponse.json({
      data: topics.map((name) => {
        const positive = x.map(() => Math.random() / 3);
        const neutral = x.map(() => Math.random() / 3);
        const negative = x.map(
          (_, index) => 1.0 - positive[index] - neutral[index],
        );

        return {
          name,
          positive: { x, y: positive },
          negative: { x, y: negative },
          neutral: { x, y: neutral },
        };
      }),
    });
  }),
];

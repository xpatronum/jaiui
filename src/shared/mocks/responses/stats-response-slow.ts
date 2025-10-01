import { statsFigure } from "./stats-figure";

import type { BlackBoxFigure } from "@/shared/types";

export interface StatsResponseSlow {
  uuid: string;
  topics: Array<string>;
  dates: Array<number>;
  min_date: number;
  max_date: number;
  nums: Array<{
    num_positives: number;
    num_negatives: number;
    num_neutral: number;
  }>;
  samples: Array<{
    samples_negatives: string[];
    samples_neutral: string[];
    samples_positives: string[];
  }>;
  figure: BlackBoxFigure;
}

export const statsResponseSlow: StatsResponseSlow = {
  uuid: "f4b8c8e3-6f3e-4e2b-8f7b-5d6e2c9a1b2c",
  topics: ["кредит", "ипотека", "ОСАГО"],
  dates: [1721489880, 1721480000, 1721489880],
  min_date: 1721480000,
  max_date: 1721489880,
  nums: [
    {
      num_positives: 100,
      num_negatives: 10,
      num_neutral: 10,
    },
    {
      num_positives: 0,
      num_negatives: 1,
      num_neutral: 0,
    },
    {
      num_positives: 10,
      num_negatives: 0,
      num_neutral: 100,
    },
  ],
  samples: [
    {
      samples_negatives: [
        "Ужасный опыт закрытия кредита!",
        "Ужасный опыт открытия кредита!",
      ],
      samples_neutral: [],
      samples_positives: ["Прекрасный опыт закрытия кредита!"],
    },
    {
      samples_negatives: ["Ужасный опыт закрытия ипотеки!"],
      samples_neutral: ["Обычный опыт закрытия ипотеки."],
      samples_positives: ["Прекрасный опыт закрытия ипотеки!"],
    },
    {
      samples_negatives: [],
      samples_neutral: [],
      samples_positives: [],
    },
  ],
  figure: statsFigure,
};

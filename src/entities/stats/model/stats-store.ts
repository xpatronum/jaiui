import { create } from "zustand";

import type { BlackBoxFigure, CloudWord } from "@/shared/types";

export interface StatsState {
  uuid: string;
  num_records: number;
  wcloud_figure: Array<CloudWord>;
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

interface StatsActions {
  set: (newState: StatsState) => void;
  update: (partialState: Partial<StatsState>) => void;
}

type StatsStore = StatsState & StatsActions;

const initialState: StatsState = {
  uuid: "",
  num_records: 0,
  wcloud_figure: [],
  topics: [],
  dates: [],
  min_date: 0,
  max_date: 0,
  nums: [],
  samples: [],
  figure: {
    data: [],
    layout: {},
  },
};

export const useStatsStore = create<StatsStore>()((set) => ({
  ...initialState,

  set: (newState: StatsState): void =>
    set(() => ({
      ...newState,
    })),

  update: (partialState: Partial<StatsState>): void =>
    set((state) => ({
      ...state,
      ...partialState,
    })),
}));

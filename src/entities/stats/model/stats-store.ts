import { create } from "zustand";

import type { CloudWord } from "@/shared/types";

export interface StatsState {
  uuid: string;
  num_records: number;
  wcloud_figure: Array<CloudWord>;
  topics: string[];
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

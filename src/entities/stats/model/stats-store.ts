import { create } from "zustand";

interface Word {
  text: string;
  freq: number;
  fontSize: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
}

interface StatsState {
  uuid: string;
  num_records: number;
  wcloud_figure: Array<Word>;
  topics: string[];
  sentiments: string[];
}

interface StatsActions {
  set: (newState: StatsState) => void;
}

type StatsStore = StatsState & StatsActions;

const initialState: StatsState = {
  uuid: "",
  num_records: 0,
  wcloud_figure: [],
  topics: [],
  sentiments: [],
};

export const useStatsStore = create<StatsStore>()((set) => ({
  ...initialState,

  set: (newState: StatsState): void =>
    set(() => ({
      ...newState,
    })),
}));

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

interface WordCloud {
  width: number;
  height: number;
  words: Array<Word>;
}

interface StatsState {
  uuid: string;
  num_records: number;
  wcloud_figure: WordCloud;
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
  wcloud_figure: {
    width: 0,
    height: 0,
    words: [],
  },
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

import { create } from "zustand";

interface PollingState {
  isPolling: boolean;
  progress: number;
}

interface PollingActions {
  setIsPolling: (newIsPolling: boolean) => void;
  setProgress: (newProgress: number) => void;
}

type PollingStore = PollingState & PollingActions;

const initialState: PollingState = {
  isPolling: false,
  progress: 0,
};

export const usePollingStore = create<PollingStore>()((set) => ({
  ...initialState,

  setIsPolling: (newIsPolling: boolean): void =>
    set((state) => ({
      ...state,
      isPolling: newIsPolling,
    })),

  setProgress: (newProgress: number): void =>
    set((state) => ({
      ...state,
      progress: newProgress,
    })),
}));

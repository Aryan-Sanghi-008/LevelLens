import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CompensationRecord } from "@/types";

interface SubmissionStore {
  submissions: CompensationRecord[];
  addSubmission: (record: CompensationRecord) => void;
  clearSubmissions: () => void;
}

export const useSubmissionStore = create<SubmissionStore>()(
  persist(
    (set) => ({
      submissions: [],
      addSubmission: (record) =>
        set((state) => ({
          submissions: [record, ...state.submissions],
        })),
      clearSubmissions: () => set({ submissions: [] }),
    }),
    {
      name: "levellens-submissions",
    }
  )
);

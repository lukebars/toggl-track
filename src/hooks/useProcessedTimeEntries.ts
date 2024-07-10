import { useMemo } from "react";

import { useTimeEntries, useRunningTimeEntry } from "@/hooks";

export function useProcessedTimeEntries() {
  const { timeEntries, isLoadingTimeEntries } = useTimeEntries();
  const { runningTimeEntry, isLoadingRunningTimeEntry } = useRunningTimeEntry();

  const isLoading = isLoadingTimeEntries || isLoadingRunningTimeEntry;

  const timeEntriesWithUniqueProjectAndDescription = useMemo(() => {
    return timeEntries.reduce<typeof timeEntries>((acc, timeEntry) => {
      if (
        (timeEntry.description == runningTimeEntry?.description &&
          timeEntry.project_id == runningTimeEntry?.project_id) ||
        acc.find((t) => t.description === timeEntry.description && t.project_id === timeEntry.project_id)
      )
        return acc;
      return [...acc, timeEntry];
    }, []);
  }, [timeEntries, runningTimeEntry]);

  const runningTimeWithUniqueProjectAndDescription = timeEntries.find(
    (entry) => entry.description === runningTimeEntry?.description && entry.project_id === runningTimeEntry.project_id,
  );

  return {
    timeEntries,
    runningTimeEntry: runningTimeWithUniqueProjectAndDescription,
    isLoading,
    timeEntriesWithUniqueProjectAndDescription,
  };
}

import { MenuBarExtra, Icon, launchCommand, LaunchType, getPreferenceValues } from "@raycast/api";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import { formatSeconds } from "@/helpers/formatSeconds";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { useProcessedTimeEntries } from "@/hooks/useProcessedTimeEntries";
import { useTimeEntryActions } from "@/hooks/useTimeEntryActions";
import { useTotalDurationToday } from "@/hooks/useTotalDurationToday";

dayjs.extend(duration);

export default function Command() {
  const { timeEntries, runningTimeEntry, isLoading, timeEntriesWithUniqueProjectAndDescription } =
    useProcessedTimeEntries();

  const totalDurationToday = useTotalDurationToday(timeEntries, runningTimeEntry);
  const { resumeTimeEntry, stopRunningTimeEntry } = useTimeEntryActions();
  const currentTime = useCurrentTime();
  const runningEntry = runningTimeEntry;
  const currentDuration = runningEntry
    ? dayjs.duration(dayjs(currentTime).diff(runningEntry.start), "milliseconds").format("HH:mm:ss")
    : "";

  const preferences = getPreferenceValues<Preferences.MenuBar>();

  let menuBarTitle = "";

  if (runningEntry) {
    const menuBarElements = [];
    if (preferences.showTitleInMenuBar) {
      menuBarElements.push(runningEntry.description);
    }

    if (preferences.showTimeInMenuBar) {
      menuBarElements.push(currentDuration);
    }

    if (preferences.showProjectInMenuBar) {
      menuBarElements.push(runningEntry.project_name);
    }

    if (preferences.showClientInMenuBar) {
      menuBarElements.push(runningEntry.client_name);
    }

    menuBarTitle = menuBarElements.join(" | ");
  }

  return (
    <MenuBarExtra
      icon={{ source: Icon.Circle, tintColor: runningEntry?.project_color }}
      isLoading={isLoading}
      title={menuBarTitle}
      tooltip={
        runningEntry
          ? currentDuration +
            " | " +
            (runningEntry.project_name ? runningEntry.project_name + " | " : "") +
            (runningEntry.client_name ?? "")
          : "No time entries"
      }
    >
      {runningEntry && (
        <MenuBarExtra.Section title="Running time entry">
          <MenuBarExtra.Item
            icon={{ source: Icon.Circle, tintColor: runningEntry?.project_color }}
            onAction={async () => {
              await stopRunningTimeEntry(runningEntry);
            }}
            title={runningEntry.description || ""}
            subtitle={
              currentDuration +
              " | " +
              (runningEntry.project_name ? runningEntry.project_name + " | " : "") +
              (runningEntry.client_name ?? "")
            }
          />
        </MenuBarExtra.Section>
      )}

      <MenuBarExtra.Section title="Actions">
        <MenuBarExtra.Item
          title="Start/Stop Time Entry"
          icon={"command-icon.png"}
          onAction={async () =>
            await launchCommand({
              name: "index",
              type: LaunchType.UserInitiated,
            })
          }
        />
      </MenuBarExtra.Section>

      <MenuBarExtra.Section title="Recent time entries">
        {timeEntriesWithUniqueProjectAndDescription.map((timeEntry) => (
          <MenuBarExtra.Item
            key={timeEntry.id}
            title={timeEntry.description || "No description"}
            subtitle={(timeEntry.client_name ? timeEntry.client_name + " | " : "") + (timeEntry.project_name ?? "")}
            icon={{ source: Icon.Circle, tintColor: timeEntry.project_color }}
            onAction={async () => {
              await resumeTimeEntry(timeEntry);
            }}
          />
        ))}
      </MenuBarExtra.Section>

      <MenuBarExtra.Section title="Today">
        <MenuBarExtra.Item
          title={isLoading ? "Loading" : formatSeconds(totalDurationToday)}
          icon={{ source: Icon.Clock }}
        />
      </MenuBarExtra.Section>
    </MenuBarExtra>
  );
}

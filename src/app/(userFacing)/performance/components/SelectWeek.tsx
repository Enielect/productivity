"use client";

import type { GroupType } from "@/components/TasKGroupCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

// Helper function to get the start and end dates of a week
function getWeekDateRange(weekNumber: number, year: number) {
  const firstDayOfYear = new Date(year, 0, 1);
  const daysOffset = (weekNumber - 1) * 7;
  const startDate = new Date(
    firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset),
  );
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
  };

  const startDateString = startDate.toLocaleDateString("en-US", options);
  const endDateString = endDate.toLocaleDateString("en-US", options);

  return `${startDateString} - ${endDateString}`;
}

export default function SelectScrollable({
  weeksDict,
}: {
  weeksDict: Record<string, GroupType[]>;
}) {
  const activeWeeksKeys = Object.keys(weeksDict);
  const router = useRouter();

  function onWeekSelect(weekKey: string) {
    router.push(`/performance/${weekKey}`);
  }

  return (
    <Select onValueChange={onWeekSelect}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a week" />
      </SelectTrigger>
      <SelectContent className="max-h-[15rem] overflow-y-auto">
        <SelectGroup>
          <SelectLabel>Weeks</SelectLabel>
          {activeWeeksKeys.map((weekKey) => {
            const [weekNumber, year] = weekKey.split("-").map(Number);
            const weekRangeString = getWeekDateRange(weekNumber!, year!);
            return (
              <SelectItem key={weekKey} value={weekKey}>
                {weekRangeString}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

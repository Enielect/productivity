//Track the percentage of tasks completed per day

import { completedTasksPerDay } from "@/server/db/queries/select";

//is there a way we can track our best performances in a week and compare every other week against that and only update it when the recored id broken.

//filter groups tasks by day created
export function getWeekNumber(date: Date | string | number) {
  // Ensure date is a Date object
  const dateObject = date instanceof Date ? date : new Date(date);

  // Check if the date is valid
  if (isNaN(dateObject.getTime())) {
    throw new Error("Invalid date provided");
  }

  const oneJan = new Date(dateObject.getFullYear(), 0, 1);
  const numberOfDays = Math.ceil(
    (dateObject.getTime() - oneJan.getTime()) / 86400000,
  );

  return Math.ceil(numberOfDays / 7);
}

export function formatAreaChartData(
  currentWeek: Record<string, number>,
  bestWeek: Record<string, number> = {},
  lastWeek: Record<string, number> = {},
) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  if (Object.keys(bestWeek).length > 0) {
    const chartData = days.map((day) => ({
      day,
      currentWeek: currentWeek[day] ?? 0,
      bestWeek: bestWeek[day] ?? 0,
    }));
    return chartData;
  }

  if (Object.keys(lastWeek).length > 0) {
    const chartData = days.map((day) => ({
      day,
      currentWeek: currentWeek[day] ?? 0,
      lastWeek: lastWeek[day] ?? 0,
    }));
    return chartData;
  }
}

export function taskDataPerDay(taskObject: Record<string, number>) {
  const days = Object.keys(taskObject);

  const chartData = days.map((day) => ({
    date: day,
    completedTasks: taskObject[day],
  }));

  return chartData;
}

export function tasksCompletedThisWeekVsLastWeek(
  thisWeek: number,
  lastWeek: number,
) {
  return [{ thisWeek, lastWeek }];
}

export function tasksCompletedThisWeekVsBestWeek(
  thisWeek: number,
  bestWeek: number,
) {
  return [
    { week: "thisWeek", completed: thisWeek, fill: "var(--color-thisWeek)" },
    { week: "bestWeek", completed: bestWeek, fill: "var(--color-bestWeek)" },
  ];
}

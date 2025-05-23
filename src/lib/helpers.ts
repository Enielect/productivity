//Track the percentage of tasks completed per day

//is there a way we can track our best performances in a week and compare every other week against that and only update it when the recored id broken.

//filter groups tasks by day created
export function getWeekNumber(date: Date | string | number): number {
  // Ensure date is a Date object
  const dateObject = date instanceof Date ? date : new Date(date);

  // Check if the date is valid
  if (isNaN(dateObject.getTime())) {
    throw new Error("Invalid date provided");
  }

  // Create a copy of the date object for calculations
  const tempDate = new Date(dateObject.getTime());

  // Adjust to the nearest Thursday (ISO week rule)
  tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));

  // Calculate the start of the year
  const startOfYear = new Date(tempDate.getFullYear(), 0, 1);

  // Calculate the number of days between the start of the year and tempDate
  const dayOfYear =
    Math.floor((tempDate.getTime() - startOfYear.getTime()) / 86400000) + 1;

  // Calculate the ISO week number
  return Math.ceil(dayOfYear / 7);
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
  console.log(chartData, "ChartData");

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

export function getPreviousWeek(weekString: string): string {
  const [weekNumber, year] = weekString.split("-").map(Number);

  let previousWeekNumber = weekNumber! - 1;
  let previousYear = year;

  if (previousWeekNumber < 1) {
    previousYear! -= 1;
    const lastDayOfPreviousYear = new Date(previousYear!, 11, 31);
    const lastWeekNumber = getWeekNumber(lastDayOfPreviousYear);
    previousWeekNumber = lastWeekNumber;
  }

  return `${previousWeekNumber}-${previousYear}`;
}

export function generateUniqueColors(numColors: number) {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    // Distribute the colors evenly on the hue range (0 - 360)
    const hue = Math.round((360 * i) / numColors);
    // Convert hue to RGB
    const color = `hsl(${hue}, 100%, 50%)`;
    colors.push(color);
  }
  return colors;
}

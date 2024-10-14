//Track the percentage of tasks completed per day

//is there a way we can track our best performances in a week and compare every other week against that and only update it when the recored id broken.

//filter groups tasks by day created
export function getWeekNumber(date: Date) {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.ceil(
      (date.getTime() - oneJan.getTime()) / 86400000,
    );
    const result = Math.ceil((numberOfDays + 1) / 7);
    return result;
  }

export function formatAreaChartData(
    currentWeek: Record<string, number>,
    bestWeek: Record<string, number> = {},
    lastWeek: Record<string, number> = {},
  ) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
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
  
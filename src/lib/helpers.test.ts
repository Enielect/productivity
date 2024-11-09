import { expect, describe, it } from "vitest";
import {
  formatAreaChartData,
  generateUniqueColors,
  getPreviousWeek,
  getWeekNumber,
  taskDataPerDay,
  tasksCompletedThisWeekVsBestWeek,
  tasksCompletedThisWeekVsLastWeek,
} from "./helpers";

//getWeekNumber

describe("getWeekNumber", () => {
  it("should return the correct week number for a given date", () => {
    expect(getWeekNumber(new Date("2024-10-31T11:40:23.690Z"))).toBe(44);
    expect(getWeekNumber(new Date("2020-12-29T11:40:23.690Z"))).toBe(53);
    expect(getWeekNumber("2024-11-04T18:52:00.344Z")).toBe(45);
  });
});

describe("formatAreaChartData", () => {
  const currentWeek = {
    Monday: 1,
    Tuesday: 5,
    Wednesday: 0,
    Thursday: 3,
    Friday: 8,
    Saturday: 0,
    Sunday: 0,
  };

  const bestWeek = {
    Monday: 1,
    Tuesday: 3,
    Wednesday: 0,
    Thursday: 6,
    Friday: 1,
    Saturday: 4,
    Sunday: 2,
  };
  const returnData = [
    { day: "Monday", currentWeek: 1, bestWeek: 1 },
    { day: "Tuesday", currentWeek: 5, bestWeek: 3 },
    { day: "Wednesday", currentWeek: 0, bestWeek: 0 },
    { day: "Thursday", currentWeek: 3, bestWeek: 6 },
    { day: "Friday", currentWeek: 8, bestWeek: 1 },
    { day: "Saturday", currentWeek: 0, bestWeek: 4 },
    { day: "Sunday", currentWeek: 0, bestWeek: 2 },
  ];
  it("should return the correct chart data", () => {
    expect(formatAreaChartData(currentWeek, bestWeek)).toStrictEqual(
      returnData,
    );
  });
});

describe("taskDataPerDay", () => {
  //completed tasks:
  const completedTasks = {
    "2024-10-31": 5,
    "2024-11-01": 3,
    "2024-11-02": 2,
    "2024-11-03": 5,
  };

  it("should return an object of the day, specifying the tasks completed that day", () => {
    expect(taskDataPerDay(completedTasks)).toStrictEqual([
      {
        date: "2024-10-31",
        completedTasks: 5,
      },
      {
        date: "2024-11-01",
        completedTasks: 3,
      },
      {
        date: "2024-11-02",
        completedTasks: 2,
      },
      {
        date: "2024-11-03",
        completedTasks: 5,
      },
    ]);
  });
});

describe("taskCompletedThisWeekVsLastWeek", () => {
  it("should return an array containing the  object of both last week and the best week, which should include the number of completed tasks and the fill color for the graph representation ", () => {
    expect(tasksCompletedThisWeekVsLastWeek(2, 3)).toStrictEqual([
      { thisWeek: 2, lastWeek: 3 },
    ]);
  });
});

describe("taskCompletedThisWeekVsBestWeek", () => {
  it("should return an array containing the  object of both current week and the best week, which should include the number of completed tasks and the fill color for the graph representation ", () => {
    expect(tasksCompletedThisWeekVsBestWeek(4, 5)).toStrictEqual([
      { week: "thisWeek", completed: 4, fill: "var(--color-thisWeek)" },
      { week: "bestWeek", completed: 5, fill: "var(--color-bestWeek)" },
    ]);
  });
});

describe("getPreviousWeek", () => {
  it("should get hte week-Year string for the previous week", () => {
    expect(getPreviousWeek("11-24")).toBe("10-24");
  });
});

describe("generateUniqueColors", () => {
  it("an array of hsl colors depending on the input number of colors specified", () => {
    expect(generateUniqueColors(4)).toStrictEqual([
      "hsl(0, 100%, 50%)",
      "hsl(90, 100%, 50%)",
      "hsl(180, 100%, 50%)",
      "hsl(270, 100%, 50%)",
    ]);
  });
});

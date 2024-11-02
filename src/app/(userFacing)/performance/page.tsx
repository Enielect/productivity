import React from "react";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  formatAreaChartData,
  getWeekNumber,
  taskDataPerDay,
  tasksCompletedThisWeekVsBestWeek,
  tasksCompletedThisWeekVsLastWeek,
} from "@/lib/helpers";
import {
  completedTasksPerDay,
  getBestPerformingWeek,
  getCompletedTasksInWeek,
  statForCurrWeek,
} from "@/server/db/queries/select";
import PerformanceChartData from "./components/PerformanceChartData";

const PerformancePage = async () => {
  const session = await auth();

  if (!session?.user) redirect("/login");
  const today = new Date();
  const currentWeekString = `${getWeekNumber(today)}-${today.getFullYear()}`;
  const lastWeekDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7,
  );
  const lastWeekString = `${getWeekNumber(lastWeekDate)}-${lastWeekDate.getFullYear()}`;
  const lastWeek = await getCompletedTasksInWeek(lastWeekString);
  const currentWeek = await getCompletedTasksInWeek(currentWeekString);
  const weekOfBestPerformance = await getBestPerformingWeek();
  const bestWeek = await getCompletedTasksInWeek(weekOfBestPerformance);
  const tasksToDay = await completedTasksPerDay();
  const statForLastWeek = await statForCurrWeek(lastWeekString);
  const statForThisWeek = await statForCurrWeek(currentWeekString);
  const statForBestWeek = await statForCurrWeek(weekOfBestPerformance);

  const [
    lastWeekData,
    thisWeekData,
    bestWeekData,
    tasksToDayData,
    statForLastWeekData,
    statForThisWeekData,
    statForBestWeekData,
  ] = await Promise.all([
    lastWeek,
    currentWeek,
    bestWeek,
    tasksToDay,
    statForLastWeek,
    statForThisWeek,
    statForBestWeek,
  ]);
  const chartData = formatAreaChartData(thisWeekData, undefined, lastWeekData);

  const currentWeekVsBestChart = formatAreaChartData(
    thisWeekData,
    bestWeekData,
  );
  console.log(currentWeekVsBestChart, "currentWeekVsBestChart");

  const tasksPerDayChart = taskDataPerDay(tasksToDayData);

  const thisWeekVsLastWeekChart = tasksCompletedThisWeekVsLastWeek(
    statForThisWeekData.totalTasksCompleted ?? 0,
    statForLastWeekData.totalTasksCompleted ?? 0,
  );

  const thisWeekEfficiency =
    statForThisWeekData.totalTasksCompleted /
    statForThisWeekData.totalTasksCreated;

  const thisWeekVsBestWeekChart = tasksCompletedThisWeekVsBestWeek(
    statForThisWeekData.totalTasksCompleted ?? 0,
    statForBestWeekData.totalTasksCompleted ?? 0,
  );

  console.log(chartData, "chartData");
  return (
    <PerformanceChartData
      chartData={chartData}
      currentWeekVsBestChart={currentWeekVsBestChart}
      tasksPerDayChart={tasksPerDayChart}
      thisWeekVsLastWeekChart={thisWeekVsLastWeekChart}
      thisWeekVsBestWeekChart={thisWeekVsBestWeekChart}
      thisWeekEfficiency={thisWeekEfficiency}
    />
  );
};

export default PerformancePage;

import React from "react";

import { getPerformanceData, getWeekNumber } from "@/lib/helpers";

import PerformanceChartData from "./components/PerformanceChartData";
import { getAuthenticatedUserId } from "@/server/db/queries/insert";

const PerformancePage = async () => {
  await getAuthenticatedUserId();
  const today = new Date();
  const currentWeekString = `${getWeekNumber(today)}-${today.getFullYear()}`;
  const lastWeekDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7,
  );
  const lastWeekString = `${getWeekNumber(lastWeekDate)}-${lastWeekDate.getFullYear()}`;

  const {
    chartData,
    currentWeekVsBestChart,
    tasksPerDayChart,
    thisWeekVsLastWeekChart,
    thisWeekEfficiency,
    thisWeekVsBestWeekChart,
  } = await getPerformanceData(currentWeekString, lastWeekString);
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

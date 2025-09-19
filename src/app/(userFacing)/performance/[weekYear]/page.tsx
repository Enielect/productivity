import React from "react";

import { getPerformanceData, getPreviousWeek } from "@/lib/helpers";

import PerformanceChartData from "../components/PerformanceChartData";
import { getAuthenticatedUserId } from "@/server/db/queries/insert";

const WeekPerformancePage = async ({
  params,
}: {
  params: { weekYear: string };
}) => {
  await getAuthenticatedUserId();
  const lastWeekString = getPreviousWeek(params.weekYear);

  const {
    chartData,
    currentWeekVsBestChart,
    tasksPerDayChart,
    thisWeekVsLastWeekChart,
    thisWeekEfficiency,
    thisWeekVsBestWeekChart,
  } = await getPerformanceData(params.weekYear, lastWeekString);
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

export default WeekPerformancePage;

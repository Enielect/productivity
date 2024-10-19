import React from "react";
import AreaChartWrapper from "./components/AreaChart";
import RadialchartWrapper from "./components/RadialChart";
import LongLineChart from "./components/LongLineChart";
import { ScrollArea } from "@/components/ui/scroll-area";
import RadialCompareWrapper from "./components/RadialCompare";
import MultipleLineChart from "./components/MultipleLineChart";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SelectScrollable from "./components/SelectWeek";
import MultipleRadialChart from "./components/MultipleRadialChart";
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
  getWeekGroupTasks,
  statForCurrWeek,
} from "@/server/db/queries/select";
import RadialCompareChart from "./components/RadialCompareChart";

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
  const statForLastWeek = await statForCurrWeek(
    `${getWeekNumber(lastWeekDate)}-${today.getFullYear()}`,
  );
  const statForThisWeek = await statForCurrWeek(
    `${getWeekNumber(today)}-${today.getFullYear()}`,
  );
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
    <div className="mt-[49px] px-3 md:mt-0">
      <div className="flex w-screen items-center justify-between border-b pr-5 md:w-full">
        <h2 className="py-3 text-lg font-semibold">
          Performance Characterization
        </h2>
        <SelectScrollable />
      </div>
      <ScrollArea className="h-[calc(100dvh-5rem)] w-screen pb-[60px] pr-6 pt-2 md:w-full md:pb-9">
        <div className="space-y-3 md:grid md:grid-cols-[30%_30%_auto] md:gap-4 md:space-y-0">
          {/* comparting this week's completed task with last week */}
          <div className="grid gap-4 md:col-span-full md:grid-cols-2">
            {/* percentage of tasks completed per day */}
            <div>
              <MultipleLineChart chartData={chartData!} />
            </div>
            {/* comparting this week's completed task with our best week(in terms of completed tasks) */}
            <div>
              <AreaChartWrapper chartData={currentWeekVsBestChart!} />
            </div>
          </div>
          {/* comparing the number of tasks planned each day for the past 3 months */}
          <div className="col-span-full">
            <LongLineChart chartData={tasksPerDayChart} />
          </div>
          {/**you've planned 20 more tasks this weeek than last week */}
          <div>
            <RadialCompareChart chartData={thisWeekVsLastWeekChart} />
          </div>

          {/**progress with completing set tasks for the current week(efficiency) */}
          <div>
            <RadialchartWrapper
              chartData={[
                { label: "Efficiency", efficiency: thisWeekEfficiency },
              ]}
            />
          </div>
          {/** you've planned 20 more taks this week than your best ever tally*/}
          {/* <div>
            <RadialCompareWrapper />
          </div> */}
          <div>
            <MultipleRadialChart chartData={thisWeekVsBestWeekChart} />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PerformancePage;

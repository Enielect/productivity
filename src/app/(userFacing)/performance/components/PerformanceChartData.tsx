import React from "react";

import AreaChartWrapper from "./AreaChart";
import RadialchartWrapper from "./RadialChart";
import LongLineChart from "./LongLineChart";
import MultipleRadialChart from "./MultipleRadialChart";
import MultipleLineChart from "./MultipleLineChart";
import RadialCompareChart from "./RadialCompareChart";
import { ScrollArea } from "@/components/ui/scroll-area";

const PerformanceChartData = ({
  chartData,
  currentWeekVsBestChart,
  tasksPerDayChart,
  thisWeekVsLastWeekChart,
  thisWeekEfficiency,
  thisWeekVsBestWeekChart,
}: {
  chartData:
    | {
        day: string;
        currentWeek: number;
        bestWeek: number;
      }[]
    | {
        day: string;
        currentWeek: number;
        lastWeek: number;
      }[]
    | undefined;

  currentWeekVsBestChart:
    | {
        day: string;
        currentWeek: number;
        bestWeek: number;
      }[]
    | {
        day: string;
        currentWeek: number;
        lastWeek: number;
      }[]
    | undefined;
  tasksPerDayChart: {
    date: string;
    completedTasks: number | undefined;
  }[];
  thisWeekVsLastWeekChart: {
    thisWeek: number;
    lastWeek: number;
  }[];
  thisWeekVsBestWeekChart: {
    week: string;
    completed: number;
    fill: string;
  }[];
  thisWeekEfficiency: number;
}) => {
  return (
    <ScrollArea className="h-[calc(100dvh-5rem)] w-screen pb-[60px] pr-6 pt-2 md:w-full md:pb-9">
      <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 xl:grid-cols-[30%_30%_auto]">
        {/* comparting this week's completed task with last week */}
        <div className="grid gap-4 md:col-span-full md:grid-cols-1 min-[1100px]:grid-cols-2">
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
  );
};

export default PerformanceChartData;

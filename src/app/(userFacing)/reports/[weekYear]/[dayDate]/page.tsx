import {
  completedTasksInDay,
  getDayGroupTasks,
  getWeekGroupTasks,
} from "@/server/db/queries/select";
import React from "react";
import TaskGroupWrapper from "./components/TaskGroupWrapper";

type Params = {
  params: { weekYear: string; dayDate: string };
};

const DayPage = async ({ params }: Params) => {
  const weekTasks = await getWeekGroupTasks(params.weekYear);
  const formatParams = params.dayDate.split("-").join("/");
  const dayTasks = await getDayGroupTasks(weekTasks!, formatParams);
  const {
    gridGradientChart,
    pieChart,
    radialChartEfficiency,
    comparePlannedVsExecuted,
    completedLongLineChart,
  } = await completedTasksInDay(formatParams);
  // console.log(gridGradientChart, "gridGradientChart");
  // console.log(pieChart, "pieChart");
  // console.log(radialChartEfficiency, "radialChartEfficiency");
  // console.log(comparePlannedVsExecuted, "comparePlannedVsExecuted");
  // console.log(completedLongLineChart, "completedLongLineChart");
  return (
    <div>
      <TaskGroupWrapper
        chartData={{
          gridGradientChart,
          pieChart,
          radialChartEfficiency,
          comparePlannedVsExecuted,
          completedLongLineChart,
        }}
        dayTasks={dayTasks!}
      />
    </div>
  );
};

export default DayPage;

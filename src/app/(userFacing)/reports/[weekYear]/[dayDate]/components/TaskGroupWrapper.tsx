"use client";

import TaskInfo from "@/app/(userFacing)/dashboard/components/TaskInfo";
import DayLongLineChart from "@/app/(userFacing)/performance/components/DayLongLineChart";
import { GridRadialChart } from "@/app/(userFacing)/performance/components/GridRadialChart";
import LongLineChart from "@/app/(userFacing)/performance/components/LongLineChart";
import PieChartGraph from "@/app/(userFacing)/performance/components/PieChart";
import RadialchartWrapper from "@/app/(userFacing)/performance/components/RadialChart";
import RadialCompareWrapper from "@/app/(userFacing)/performance/components/RadialCompare";
import TasKGroupCard, { type GroupType } from "@/components/TasKGroupCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { SelectTask } from "@/server/db/schema";
import { Check, ChevronsDown, Columns2, NotepadText, X } from "lucide-react";
import { notFound } from "next/navigation";
import React, { useState } from "react";

const TaskGroupWrapper = ({
  dayTasks,
  chartData,
}: {
  dayTasks: GroupType[];
  chartData: {
    totalTasksCreatedPerTaskGroup: {
      taskGroup: string;
      tasksLength: number;
      fill: string;
    }[];
    pieChart: {
      taskGroup: string;
      efficiency: number;
      fill: string;
    }[];
    radialChartEfficiency: {
      label: string;
      efficiency: number;
    }[];
    comparePlannedVsExecuted: {
      tasksPlanned: number;
      tasksCompleted: number;
    }[];
    completedLongLineChart: {
      time: Date;
      completedTask: string;
    }[];
  };
}) => {
  const {
    totalTasksCreatedPerTaskGroup,
    pieChart,
    radialChartEfficiency,
    comparePlannedVsExecuted,
    completedLongLineChart,
  } = chartData;

  const [currentTaskGroup, setCurrentTaskGroup] = useState<
    GroupType | undefined
  >(!!dayTasks && dayTasks[0]);
  const [selectedTab, setSelectedTab] = useState<"tasks" | "analytics">(
    "tasks",
  );
  const [currentTask, setCurrentTask] = useState("");

  if (!currentTaskGroup) return notFound();

  const currentSelectedTask = currentTaskGroup.tasks?.find(
    (task) => task.name === currentTask,
  );
  return (
    <div className="relative w-screen">
      <Carousel className="mx-3 mt-3 w-full pr-5 md:w-[calc(100dvw-470px)]">
        <CarouselContent className="-ml-2 md:-ml-4">
          {dayTasks?.map((task) => (
            <CarouselItem
              className="basis-full pl-3 sm:basis-1/2 md:basis-full min-[900px]:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              key={task.id}
            >
              <TasKGroupCard
                // key={task.id}
                title={task.name}
                currentGroup={task}
                setCurrentTaskGroup={
                  setCurrentTaskGroup as React.Dispatch<
                    React.SetStateAction<GroupType>
                  >
                }
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="mt-6 px-3">
        <div className="flex items-center gap-4 py-5">
          <NotepadText className="h-7 w-7 stroke-blue-600" />
          <span className="text-2xl font-semibold">
            {currentTaskGroup.name}
          </span>
        </div>
        <div className="flex border-b pb-2">
          <button
            onClick={() => setSelectedTab("tasks")}
            className={`w-[4rem] rounded-bl-md rounded-tl-md border px-3 py-2 ${selectedTab === "tasks" && "border-blue-800 text-blue-600"}`}
          >
            Tasks
          </button>
          <button
            onClick={() => setSelectedTab("analytics")}
            className={`border px-3 ${selectedTab === "analytics" && "border-blue-800 text-blue-600"}`}
          >
            Analytics
          </button>
        </div>
        <div>
          {selectedTab === "tasks" && (
            <div className="flex w-full gap-3">
              <div
                data-open={String(currentTask.length > 0)}
                className="mt-5 min-h-[16rem] w-full space-y-3 overflow-auto pr-3 transition-all min-[1200px]:data-[open=true]:w-1/2"
              >
                {currentTaskGroup.tasks.map((task) => (
                  <TaskList
                    key={task.id}
                    setCurrentTask={setCurrentTask}
                    task={task}
                    current={currentTask}
                  />
                ))}
              </div>
              {currentTask.length > 0 && (
                <div className="hidden w-full min-[1200px]:block min-[1200px]:w-1/2">
                  <TaskInfo currentSelectedTask={currentSelectedTask} />
                </div>
              )}
            </div>
          )}
          {selectedTab === "analytics" && (
            <div className="mt-5">
              <ScrollArea className="h-[calc(100dvh-250px)] pb-[5rem] pr-4">
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
                  {/* <div className="sm:flex sm:gap-3"> */}
                  <div>
                    <RadialchartWrapper chartData={radialChartEfficiency} />
                  </div>
                  {/**pie chart for distribution ot taksksgroups tasks creted for the day */}
                  <div>
                    <PieChartGraph chartData={pieChart} />
                  </div>
                  {/* </div> */}
                  {/**compare completed tasks to created tasks */}
                  {/* <div className="sm:flex sm:gap-3"> */}
                  <div>
                    <RadialCompareWrapper
                      chartData={comparePlannedVsExecuted}
                    />
                  </div>
                  {/**pie chart for distribution ot takskgroups percentage tasks completed per day for the day */}
                  <div>
                    <GridRadialChart
                      chartData={totalTasksCreatedPerTaskGroup}
                    />
                  </div>
                  {/* </div> */}
                  <div className="col-span-full">
                    <DayLongLineChart chartData={completedLongLineChart} />
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

type TaskListProp = {
  task: SelectTask;
  current: string;
  setCurrentTask: React.Dispatch<React.SetStateAction<string>>;
};

function TaskList({ task, setCurrentTask, current }: TaskListProp) {
  return (
    <div
      className={`max-md:animate-grid max-md:grid ${current === task.name ? "max-md:grid-rows-[auto,1fr]" : "max-md:grid-rows-1"}`}
    >
      <div className="flex items-center justify-between gap-4 rounded-md bg-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          {task.isChecked ? (
            <Check className="h-6 w-6 text-green-500" />
          ) : (
            <X className="h-6 w-6 text-red-500" />
          )}
          <label htmlFor={task.name} className="font-semibold">
            {task.name}
          </label>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => {
              setCurrentTask((c: string) => {
                if (c === task.name) return "";
                return task.name;
              });
            }}
          >
            {current === task.name ? (
              <X />
            ) : (
              <>
                <Columns2 className="hidden min-[1200px]:inline-block" />
                <ChevronsDown className="inline-block min-[1200px]:hidden" />
              </>
            )}
          </button>
        </div>
      </div>

      {current === task.name && (
        <div className="h-[12rem] md:hidden">
          <TaskInfo currentSelectedTask={task} />
        </div>
      )}
    </div>
  );
}

export default TaskGroupWrapper;

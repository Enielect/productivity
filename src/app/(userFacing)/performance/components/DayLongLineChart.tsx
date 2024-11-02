"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export const description = "An interactive line chart";

const chartConfig = {
  completed: {
    label: "Tasks Completed",
  },
  // completedTask: {
  //   label: "No. of completed Tasks",
  //   color: "hsl(var(--chart-1))",
  // },
  numberOfCompleted: {
    label: "Number of Completed Tasks",
    color: "hsl(var(--chart-2))",
  },
  // mobile: {
  //   label: "Mobile",
  //   color: "hsl(var(--chart-2))",
  // },
} satisfies ChartConfig;

export default function DayLongLineChart({
  chartData,
}: {
  chartData: {
    time: Date;
    completedTask: string;
  }[];
}) {
  // Initialize an array with 24 elements, one for each hour of the day
  const dayChartData = Array.from({ length: 24 }, (_, hour) => ({
    time: new Date(new Date().setHours(hour, 0, 0, 0)), // set the hour, and minutes, seconds, and milliseconds to 0
    completedTask: "none",
    numberOfCompleted: 0,
  }));

  chartData.forEach((data) => {
    // Get the hour when the task was completed
    const hour = new Date(data.time).getHours();

    // Update the data for this hour
    dayChartData[hour] = {
      time: new Date(new Date(data.time).setMinutes(0, 0, 0)), // set minutes, seconds, and milliseconds to 0
      completedTask: data.completedTask,
      numberOfCompleted: 1, // assuming each task in completedUserTasks represents one completed task
    };
  });
  console.log(dayChartData, "dayChartData");

  // const [activeChart, setActiveChart] =
  //   React.useState<keyof typeof chartConfig>("desktop")

  // const total = React.useMemo(
  //   () => ({
  //     desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
  //     mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
  //   }),
  //   []
  // )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Number of completed tasks per hour</CardTitle>
          <CardDescription>
            As each hour passes, track how many tasks are completed per hour
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={dayChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value: Date) => {
                return new Date(value).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-auto"
                  nameKey="completed"
                  // labelKey="completed"
                  labelFormatter={(
                    _,
                    payload: Payload<ValueType, NameType>[],
                  ) => {
                    return payload[0]!.payload.completedTask as string;
                  }}
                />
              }
            />
            <Line
              dataKey="numberOfCompleted"
              type="monotone"
              stroke={`var(--color-numberOfCompleted)`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

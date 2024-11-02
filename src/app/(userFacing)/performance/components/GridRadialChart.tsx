"use client";

import { PolarGrid, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export const description = "A radial chart with a grid";

type DynamicChartConfig = Record<string, { label: string; color: string }>;

type ChartData = {
  taskGroup: string;
  tasksLength: number;
  fill: string;
};

export function GridRadialChart({ chartData }: { chartData: ChartData[] }) {
  const chartConfig: DynamicChartConfig = {
    numberOfTasksPlanned: {
      label: "Tasks Length",
      color: "hsl(var(--foreground))",
    },
    ...Object.fromEntries(
      chartData.map((item) => [
        item.taskGroup.toLowerCase(),
        { label: item.taskGroup, color: item.fill },
      ]),
    ),
  };
  //   chartData.forEach((group) => {
  //     chartConfig[group.taskGroup.toLowerCase() as keyof typeof chartConfig] = {
  //       label: group.taskGroup,
  //       color: group.fill,
  //     };
  //   });

  console.log(chartConfig, "chartConfig");

  console.log(chartData, "this is chartData");
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Number of Tasks Planned-TaskGroup</CardTitle>
        <CardDescription>
          how many tasks planned for each taskGroups?
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart data={chartData} innerRadius={50} outerRadius={100}>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  // hideLabel
                  // labelKey="taskGroup"
                  nameKey="numberOfTasksPlanned"
                  labelFormatter={(
                    _,
                    payload: Payload<ValueType, NameType>[],
                  ) => {
                    return payload[0]!.payload.taskGroup as string;
                  }}
                />
              }
            />
            <PolarGrid gridType="circle" />
            <RadialBar dataKey="tasksLength" />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-center text-sm">
        <div className="leading-none text-muted-foreground">
          The destribution of the number of tasks created for each taskGroup in
          the current day
        </div>
      </CardFooter>
    </Card>
  );
}

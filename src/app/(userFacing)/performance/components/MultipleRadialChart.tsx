"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { LabelList, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radial chart with a label";

const chartConfig = {
  completed: {
    label: "Completed",
  },
  thisWeek: {
    label: "This Week",
    color: "hsl(var(--chart-1))",
  },
  bestWeek: {
    label: "Best Week",
    color: "hsl(var(--chart-2))",
  },
  // firefox: {
  //   label: "Firefox",
  //   color: "hsl(var(--chart-3))",
  // },
  // edge: {
  //   label: "Edge",
  //   color: "hsl(var(--chart-4))",
  // },
  // other: {
  //   label: "Other",
  //   color: "hsl(var(--chart-5))",
  // },
} satisfies ChartConfig;

export default function MultipleRadialChart({
  chartData,
}: {
  chartData: {
    week: string;
    completed: number;
    fill: string;
  }[];
}) {
  const totalCompleted = chartData[0]!.completed + chartData[1]!.completed;
  const howMuchMoreTaskCompletedThisWeek =
    chartData[0]!.completed - chartData[1]!.completed;
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Completed Tasks (This Week vs Best Ever Week)</CardTitle>
        <CardDescription>all days of the week combined</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="week" />}
            />
            <RadialBar dataKey="completed" background>
              <LabelList
                position="insideStart"
                dataKey="week"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-center text-sm">
        {howMuchMoreTaskCompletedThisWeek >= 0 ? (
          <div className="flex items-center gap-2 font-medium leading-none">
            You have completd {howMuchMoreTaskCompletedThisWeek} more Task this
            week <TrendingUp className="h-4 w-4" />
          </div>
        ) : (
          <div className="flex items-center gap-2 font-medium leading-none">
            You have completd {howMuchMoreTaskCompletedThisWeek * -1} less Task
            this week <TrendingDown className="h-4 w-4" />
          </div>
        )}
        <div className="leading-none text-muted-foreground">
          showing how much more tasks you complete this week than best week
        </div>
      </CardFooter>
    </Card>
  );
}

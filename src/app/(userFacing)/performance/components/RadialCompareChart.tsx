"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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

export const description = "A radial chart with stacked sections";

// const chartData = [{ month: "january", thisWeek: 1260, lastWeek: 570 }]

const chartConfig = {
  thisWeek: {
    label: "This Week",
    color: "hsl(var(--chart-1))",
  },
  lastWeek: {
    label: "Last Week",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function RadialCompareChart({
  chartData,
}: {
  chartData: { thisWeek: number; lastWeek: number }[];
}) {
  const totalCompleted = chartData[0]!.thisWeek + chartData[0]!.lastWeek;
  const howMuchMoreTaskCompletedThisWeek =
    chartData[0]!.thisWeek - chartData[0]!.lastWeek;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Completed Tasks(Last Week vs This Week)</CardTitle>
        <CardDescription>the whole week combined</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalCompleted.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="thisWeek"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-thisWeek)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="lastWeek"
              fill="var(--color-lastWeek)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
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
          showing how much more tasks you complete this week than previous week
        </div>
      </CardFooter>
    </Card>
  );
}

"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

export const description = "An area chart with axes";

type ChartDataType =
  | { day: string; currentWeek: number; lastWeek: number }
  | { day: string; currentWeek: number; bestWeek: number };

const chartConfig = {
  currentWeek: {
    label: "currentWeek",
    color: "hsl(var(--chart-1))",
  },
  bestWeek: {
    label: "bestWeek",
    color: "hsl(var(--chart-2))",
  },
  lastWeek: {
    label: "bestWeek",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function AreaChartWrapper({
  chartData,
}: {
  chartData: ChartDataType[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>This week vs Best week</CardTitle>
        <CardDescription>Monday - Sunday</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="add-percentage" />}
            />
            <Area
              dataKey="currentWeek"
              type="natural"
              fill="var(--color-currentWeek)"
              fillOpacity={0.4}
              stroke="var(--color-currentWeek)"
              stackId="a"
            />
            <Area
              dataKey="bestWeek"
              type="natural"
              fill="var(--color-bestWeek)"
              fillOpacity={0.4}
              stroke="var(--color-bestWeek)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-center">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Try to beat Best week&apos; achievements!!
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing week&apos;s progress(task completed) in the past 7 days
              against our best week
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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

export const description = "A multiple line chart";

type ChartDataType = {
  day: string;
  currentWeek: number;
  lastWeek: number;
  bestWeek: number;
};
// | { day: string; currentWeek: number; bestWeek: number };
// type ChartDataTye = Record<string, number>;

const chartConfig = {
  currentWeek: {
    label: "currentWeek",
    color: "hsl(var(--chart-1))",
  },
  lastWeek: {
    label: "lastWeek",
    color: "hsl(var(--chart-2))",
  },
  bestWeek: {
    label: "bestWeek",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type MultipleLineChartProps = {
  chartData: ChartDataType[];
};

export default function MultipleLineChart({
  chartData,
}: MultipleLineChartProps) {
  if (chartData.length === 0) {
    return null;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>This Week vs Last Week</CardTitle>
        <CardDescription>Monday - Sunday</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="add-percentage" />}
            />
            <Line
              dataKey="currentWeek"
              type="monotone"
              stroke="var(--color-currentWeek)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="lastWeek"
              type="monotone"
              stroke={`${Object.keys(chartData[0]).includes("lastWeek") ? "var(--color-lastWeek)" : "var(--color-bestWeek)"}`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-center">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Try to beat Last week&apos; achievements!!
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing week&apos;s progress(task completed) in the past 7 days
              against last week
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

"use client";

import { TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

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
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a custom label";

type ChartDataItem = {
  taskGroup: string;
  efficiency: number;
  fill: string;
};

type DynamicChartConfig = Record<string, { label: string; color: string }>;

export default function PieChartGraph({
  chartData,
}: {
  chartData: ChartDataItem[];
}) {
  // Dynamically create the chart config
  const chartConfig: DynamicChartConfig = {
    efficiency: {
      label: "Efficiency",
      color: "hsl(var(--foreground))",
    },
    ...Object.fromEntries(
      chartData.map((item) => [
        item.taskGroup.toLowerCase(),
        { label: item.taskGroup, color: item.fill },
      ]),
    ),
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart with Legend</CardTitle>
        <CardDescription>Task Efficiency Distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="efficiency" />}
            />
            <Pie
              data={chartData}
              dataKey="efficiency"
              nameKey="taskGroup"
              cx="50%"
              cy="50%"
              outerRadius={80}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={({ payload }) => (
                <ul className="flex flex-wrap justify-center gap-4 text-sm">
                  {payload?.map((entry, index) => (
                    <li
                      key={`item-${index}`}
                      className="flex items-center gap-2"
                    >
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span>{entry.value}</span>
                    </li>
                  ))}
                </ul>
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing task efficiency distribution for the current period
        </div>
      </CardFooter>
    </Card>
  );
}

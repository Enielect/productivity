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
import {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

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
  const totalEfficiency = chartData.reduce(
    (acc, curr) => acc + curr.efficiency,
    0,
  );
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
        <CardTitle>
          Pie Chart for efficiency on each taskGroup for the day
        </CardTitle>
        <CardDescription>TaskGroups Efficiency Distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="add-percentage"
                  labelFormatter={(
                    _,
                    payload: Payload<ValueType, NameType>[],
                  ) => {
                    return payload[0]!.payload.taskGroup as string;
                  }}
                  nameKey="efficiency"
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="efficiency"
              // nameKey="taskGroup"
              cx="50%"
              cy="50%"
              outerRadius={80}
            ></Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-center text-sm">
        {totalEfficiency > 0 ? (
          <div className="leading-none text-muted-foreground">
            Showing task efficiency distribution for the current period
          </div>
        ) : (
          <div>
            No task in any of the taskGroup was completed, you can do better
            champ!!!
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

import {
  Pie,
  PieChart,
  Tooltip,
  type TooltipIndex,
} from "recharts";

import { RechartsDevtools } from "@recharts/devtools";

interface Props {
  firstValue: number;
  secondValue: number;
  firstName?: string;
  secondName?: string;
  firstColor?: string;
  secondColor?: string;
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}

export default function TwoLevelPieChart({
  firstValue,
  secondValue,
  firstName = "First",
  secondName = "Second",
  firstColor = "#FF82BA",
  secondColor = "#8979FF",
  isAnimationActive = true,
  defaultIndex,
}: Props) {
  const data = [
    {
      name: firstName,
      value: firstValue,
      fill: firstColor,
    },
    {
      name: secondName,
      value: secondValue,
      fill: secondColor,
    },
  ];

  return (
   <PieChart
  width={260}
  height={260}
  margin={{
    top: 20,
    right: 30,
    bottom: 20,
    left: 30,
  }}
>
  <Pie
    data={data}
    dataKey="value"
    cx="50%"
    cy="50%"
    outerRadius={70}
    label
    isAnimationActive={isAnimationActive}
  />

  <Tooltip
    defaultIndex={defaultIndex}
    formatter={(value) =>
      Number(value).toFixed(2)
    }
  />

  <RechartsDevtools />
</PieChart>
  );
}
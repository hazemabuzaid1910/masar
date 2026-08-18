import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

interface Series {
  dataKey: string;
  name: string;
  fill: string;
}

interface AreaChartExampleProps {
  data: Record<string, any>[];
  xAxisKey: string;
  series: Series[];
  isAnimationActive?: boolean;
}

const AreaChartExample = ({
  data,
  xAxisKey,
  series,
  isAnimationActive = true,
}: AreaChartExampleProps) => {
  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart
          data={data}
          barGap={4}
          barCategoryGap="25%"
          margin={{
            top: 5,
            right: 10,
            left: -10,
            bottom: 0,
          }}
        >
          <CartesianGrid
            vertical={false}
            horizontal
            stroke="#f1f1f1"
            strokeWidth={0.6}
          />

          <XAxis
            dataKey={xAxisKey}
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 10,
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 10,
            }}
            width={35}
            tickCount={5}
          />

          <Tooltip
            contentStyle={{
              fontSize: "12px",
              borderRadius: "8px",
            }}
          />

          {series.map((item) => (
            <Bar
              key={item.dataKey}
              dataKey={item.dataKey}
              name={item.name}
              fill={item.fill}
              radius={[4, 4, 0, 0]}
              barSize={12}
              maxBarSize={16}
              isAnimationActive={
                isAnimationActive
              }
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartExample;
/* eslint-disable react/prop-types */
import {PieChart, Pie, Cell, ResponsiveContainer} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface stats {
  id: Number,
  url_id: Number,
  city : String,
  device : String,
  country : String,
}

export default function DeviceStats({stats = []}: {stats: stats[]}) {
  const deviceCount = stats.reduce((acc, item) => {
    // @ts-ignore
    if (!acc[item.device]) {
      // @ts-ignore
      acc[item.device] = 0;
    }
    // @ts-ignore
    acc[item.device]++;
    return acc;
  }, {});
  
  const result = Object.keys(deviceCount).map((device) => ({
    device,
    // @ts-ignore
    count: deviceCount[device],
  }));
console.log(result)
  return (
    <div style={{width: "100%", height: 300}}>
      <ResponsiveContainer>
        <PieChart width={700} height={400}>
          <Pie
            data={result}
            labelLine={false}
            label={({device, percent}) =>
              `${device}: ${(percent * 100).toFixed(0)}%`
            }
            dataKey="count"
          >
            {result.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
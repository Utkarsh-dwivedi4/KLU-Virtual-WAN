import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { time: "09:00", traffic: 120 },
  { time: "09:05", traffic: 180 },
  { time: "09:10", traffic: 160 },
  { time: "09:15", traffic: 240 },
  { time: "09:20", traffic: 210 },
  { time: "09:25", traffic: 260 },
];

export default function TrafficAnalytics() {
  return (
    <div className="bg-[#102544] rounded-2xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Network Traffic Analytics
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid stroke="#335b94" />
          <XAxis dataKey="time" stroke="#8bbcff" />
          <YAxis stroke="#8bbcff" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="traffic"
            stroke="#00e5ff"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
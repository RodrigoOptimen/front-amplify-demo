"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { name: string; total: number }[];
}

const COLORS = ["#3b82f6", "#f59e0b", "#06b6d4", "#10b981", "#ef4444", "#8b5cf6"];

export const FlightsByStatusChart = ({ data }: Props) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Vuelos por status
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="name"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            formatter={(value) => [value, "Vuelos"]}
          />

          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "12px", color: "#6b7280" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

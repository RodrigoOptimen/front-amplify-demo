"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { GanttRow, useFlightGantt } from "../hooks/useFlightGantt";

const STATUS_COLORS: Record<string, string> = {
  SCHEDULED: "#3b82f6",
  BOARDING: "#f59e0b",
  DEPARTED: "#06b6d4",
  ARRIVED: "#10b981",
  CANCELLED: "#ef4444",
  DELAYED: "#8b5cf6",
};

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: GanttRow }[];
}) => {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-3 text-xs min-w-52.5 space-y-1">
      <p className="font-semibold text-gray-800 text-sm">{row.flightNumber}</p>
      <p className="text-gray-500">{row.airline}</p>
      <div className="border-t border-gray-100 pt-2 mt-1 space-y-1">
        <p>
          <span className="text-gray-400">Salida:</span>{" "}
          <span className="text-gray-700">{row.scheduledAt}</span>
        </p>
        <p>
          <span className="text-gray-400">Puerta:</span>{" "}
          <span className="text-gray-700">{row.gate}</span>
        </p>
        <p>
          <span className="text-gray-400">Duración est.:</span>{" "}
          <span className="text-gray-700">{row.duration}h</span>
        </p>
        <p>
          <span className="text-gray-400">Status:</span>{" "}
          <span
            className="font-medium"
            style={{ color: STATUS_COLORS[row.status] ?? "#6b7280" }}
          >
            {row.statusLabel}
          </span>
        </p>
      </div>
    </div>
  );
};

export const FlightGanttChart = () => {
  const { rows, loading, error, rangeStartMs } = useFlightGantt();

  if (loading)
    return <p className="text-sm text-gray-400 py-8 text-center">Cargando cronograma...</p>;
  if (error)
    return <p className="text-sm text-red-500 py-8 text-center">{error}</p>;
  if (rows.length === 0)
    return <p className="text-sm text-gray-400 py-8 text-center">Sin vuelos programados</p>;

  const maxDomain = Math.ceil(
    Math.max(...rows.map((r) => r.offset + r.duration))
  );

  const multiDay = maxDomain > 24;

  const tickFormatter = (offsetHours: number) => {
    const date = new Date(rangeStartMs + offsetHours * 3_600_000);
    if (multiDay) {
      return date.toLocaleString("es-MX", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const chartHeight = Math.max(420, rows.length * 44);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">
          Cronograma de vuelos
        </h3>
        <div className="flex gap-3 flex-wrap justify-end">
          {Object.entries(STATUS_COLORS).map(([status, color]) => (
            <span key={status} className="flex items-center gap-1 text-xs text-gray-500">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              {status}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: 520 }}>
        <div style={{ height: chartHeight }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={rows}
              layout="vertical"
              margin={{ top: 4, right: 24, left: 0, bottom: 20 }}
              barSize={18}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                horizontal={false}
              />

              <XAxis
                type="number"
                domain={[0, maxDomain]}
                tickFormatter={tickFormatter}
                tickCount={9}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                type="category"
                dataKey="label"
                width={185}
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "#f9fafb" }}
              />

              <Bar dataKey="offset" stackId="gantt" fill="transparent" />

              <Bar dataKey="duration" stackId="gantt" radius={[4, 4, 4, 4]}>
                {rows.map((row, index) => (
                  <Cell
                    key={index}
                    fill={STATUS_COLORS[row.status] ?? "#6b7280"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

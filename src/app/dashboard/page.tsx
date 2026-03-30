"use client";

import Link from "next/link";
import {
  FlightGanttChart,
  FlightsByAirlineChart,
  FlightsByStatusChart,
  StatCard,
  useDashboardStats,
} from "@/src/features/flights";

export default function DashboardPage() {
  const { byAirline, byStatus, totalFlights, totalAirports, activeToday } = useDashboardStats();

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-10">
        <StatCard label="Total vuelos" value={totalFlights} />
        <StatCard label="Aeropuertos" value={totalAirports} />
        <StatCard label="Vuelos hoy" value={activeToday} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <Link
          href="/dashboard/airports"
          className="bg-white rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="font-medium text-gray-900 text-sm">Aeropuertos</p>
          <p className="text-xs text-gray-400 mt-0.5">Ver y gestionar</p>
        </Link>
        <Link
          href="/dashboard/flights"
          className="bg-white rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="font-medium text-gray-900 text-sm">Vuelos</p>
          <p className="text-xs text-gray-400 mt-0.5">Ver y gestionar</p>
        </Link>
      </div>

      <section>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Overview
        </h2>
        <div className="bg-white rounded-xl px-5 py-10 text-center text-gray-300 shadow-sm">
          <FlightsByAirlineChart data={ byAirline } />
        </div>
        <div className="bg-white rounded-xl px-5 mt-10 py-10 text-center text-gray-300 shadow-sm">
          <FlightsByStatusChart data={ byStatus } />
        </div>
        <div className="bg-white rounded-xl px-5 mt-10 py-10 text-center text-gray-300 shadow-sm">
          <FlightGanttChart />
        </div>
      </section>
    </div>
  );
}

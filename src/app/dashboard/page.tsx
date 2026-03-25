import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      {/* Nav cards */}
      <div className="grid grid-cols-2 gap-4 mb-10 max-w-md">
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

      {/* Gráficas — próximamente */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Overview
        </h2>
        <div className="bg-white rounded-xl px-5 py-10 text-center text-gray-300 shadow-sm">
          <p className="text-sm">Gráficas próximamente</p>
        </div>
      </section>
    </div>
  );
}

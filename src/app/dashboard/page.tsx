"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { Airport, AirportForm, AirportList } from "@/src/features/airports";

export default function DashboardPage() {
  const { signOut } = useAuthenticator();
  const [userData, setUserData] = useState({ email: "", name: "" });
  const [showForm, setShowForm] = useState(false);
  const [selectedAirport, setSelectedAirport ] = useState<Airport>();

  const router = useRouter();

  useEffect(() => {
    fetchUserAttributes()
      .then((attr) =>
        setUserData({ email: attr.email ?? "", name: attr.given_name ?? "" }),
      )
      .catch(console.error);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Vuelos</h1>
          <p className="text-gray-500 text-sm mt-1">
            Bienvenido, <span className="font-medium text-gray-700">{userData.name || userData.email}</span>
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <button
            className="flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            onClick={() => setShowForm(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Nuevo aeropuerto
          </button>
          <button
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-xl transition-colors"
            onClick={handleSignOut}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <section>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Aeropuertos</h2>
        <AirportList
          showForm={() => setShowForm(true)}
          setSelectedAirport={setSelectedAirport}
        />
      </section>

      {showForm && (
        <AirportForm
          onClose={() => {
            setShowForm(false);
            setSelectedAirport(undefined);
          }}
          selectedAirport={selectedAirport}
        />
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { AirportForm, AirportList } from "@/src/features/airports";

export default function DashboardPage() {
  const { signOut } = useAuthenticator();
  const [userData, setUserData] = useState({ email: "", name: "" });
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetchUserAttributes()
      .then((attr) =>
        setUserData({ email: attr.email ?? "", name: attr.given_name ?? "" })
      )
      .catch(console.error);
  }, []);

  const handleCreated = () => {
    setShowForm(false);
    setRefreshKey((prev) => prev + 1);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Vuelos</h1>
          <p className="text-gray-800 text-sm mt-1">
            Bienvenido, {userData.name || userData.email}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <button
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            onClick={() => setShowForm(true)}
          >
            + Crear aeropuerto
          </button>
          <button
            className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            onClick={handleSignOut}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <section>
        <h2 className="text-lg font-semibold mb-4">Aeropuertos</h2>
        <AirportList refreshKey={refreshKey} />
      </section>

      {showForm && (
        <AirportForm
          onClose={() => setShowForm(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
}
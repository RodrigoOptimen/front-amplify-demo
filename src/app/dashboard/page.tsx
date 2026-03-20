"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchUserAttributes } from "aws-amplify/auth";

import { AirportList } from "@/src/features/airports";

export default function DashboardPage() {
  const { signOut } = useAuthenticator();
  const [userData, setUserData] = useState({ email: "", name: "" });
  const router = useRouter();

  useEffect(() => {
    fetchUserAttributes()
      .then((attr) =>
        setUserData({ email: attr.email ?? "", name: attr.given_name ?? "" }),
      )
      .catch((e) => console.log(e));
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold">Gestion Vuelos</h1>
          <p className="text-gray-800 text-sm mt-1">
            Bienvenido! {userData.name || userData.email}
          </p>
          <button
            className="bg-red-600 text-white hover:bg-red-700 px-2 py-2 mt-6 rounded-lg text-sm font-medium transition-colors"
            onClick={handleSignOut}
          >
            Cerrar Sesion
          </button>
        </div>
      </header>

      <section>
        <h2 className="text-lg text-semibold mb-4">Aeropuertos</h2>
        <AirportList />
      </section>
    </div>
  );
}

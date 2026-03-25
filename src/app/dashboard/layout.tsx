"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchUserAttributes } from "aws-amplify/auth";

const NAV_LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/airports", label: "Aeropuertos" },
  { href: "/dashboard/flights", label: "Vuelos" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuthenticator();
  const [userData, setUserData] = useState({ email: "", name: "" });
  const router = useRouter();
  const pathname = usePathname();

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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Gestión de Vuelos</h1>
            <p className="text-gray-500 text-xs mt-0.5">
              Bienvenido,{" "}
              <span className="font-medium text-gray-700">
                {userData.name || userData.email}
              </span>
            </p>
          </div>
          <button
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
            onClick={handleSignOut}
          >
            Cerrar sesión
          </button>
        </div>

        <nav className="flex gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="p-8">{children}</main>
    </div>
  );
}

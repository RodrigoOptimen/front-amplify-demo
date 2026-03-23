"use client";

import { useEffect, useState } from "react";

import type { Airport } from "../actions/airports";
import { AirportListItem } from "./AirportListItem";
import { client } from "@/src/lib";

export const AirportList = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subscription = client.models.Airport.observeQuery().subscribe({
      next: ({items}) => {
        setAirports([...items]);
        setLoading(false);
      },
      error: (err) => {
        setError(err.message);
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <p className=" text-gray-400"> Cargando... </p>;
  if (error) return <p className="text-red-400"> Error: {error} </p>;
  if (!airports.length)
    return <p className="text-gray-500">No hay nigun aeropuerto registrado</p>;

  return (
    <ul className="space-y-2">
      {airports.map((airport) => (
        <AirportListItem key={airport.id} airport={airport} />
      ))}
    </ul>
  );
};

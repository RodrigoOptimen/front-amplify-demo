"use client";

import { useEffect, useState } from "react";

import { type Airport, listAirports } from "../actions/airports";
import { AiportListItem } from "./AiportListItem";

export const AirportList = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listAirports()
      .then(setAirports)
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className=" text-gray-400"> Cargando... </p>;
  if (error) return <p className="text-red-400"> Error: {error} </p>;
  if (!airports.length)
    return <p className="text-gray-500">No hay nigun aeropuerto registrado</p>;

  return (
    <ul className="space-y-2">
      {airports.map((airport) => (
        <AiportListItem key={airport.id} airport={airport} />
      ))}
    </ul>
  );
};

"use client";

import { useEffect, useState } from "react";

import { client } from "@/src/lib";
import { type DeleteAirport, type Airport, deleteAirport } from "../actions/airports";
import { AirportListItem } from "./AirportListItem";

interface Props{
  showForm: () => void;
  setSelectedAirport: ( airport: Airport ) => void;
};


export const AirportList = ({ showForm, setSelectedAirport }: Props) => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subscription = client.models.Airport.observeQuery().subscribe({
      next: ({ items }) => {
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


  const handleDeleteAirport = async( id: DeleteAirport  ) => {
    await deleteAirport( id );
  };

  const handleUpdateAirport = ( airport: Airport ) => {
    setSelectedAirport( airport );
    showForm();
  };

  if (loading) return (
    <p className="text-sm text-gray-400 py-6 text-center">Cargando aeropuertos...</p>
  );
  if (error) return (
    <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">Error: {error}</p>
  );
  if (!airports.length) return (
    <div className="text-center py-12 text-gray-400">
      <p className="text-4xl mb-3">✈️</p>
      <p className="text-sm">No hay ningún aeropuerto registrado aún</p>
    </div>
  );
  
  return (
    <ul className="space-y-2">
      {airports.map((airport) => (
        <AirportListItem
          key={airport.id}
          airport={airport}
          deleteAirport={ () => handleDeleteAirport({ id: airport.id })}
          updateAirport={ () => handleUpdateAirport(airport) }
        />
      ))}
    </ul>
  );
};

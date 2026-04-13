"use client";

import { useState } from "react";
import {
  AirportForm,
  AirportListItem,
  deleteAirport,
  useAirports,
  type Airport,
  type idDeleteAirport,
} from "@/src/features/airports";
import { EntityList, SectionHeader } from "@/src/components";
import { useUserRole } from "@/src/hooks";

export default function AirportsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState<Airport>();
  const { airports, loading, error } = useAirports();
  const { role } = useUserRole();
  const isAdmin = role === "admin";

  const handleUpdateAirport = (airport: Airport) => {
    setSelectedAirport(airport);
    setShowForm(true);
  };

  const handleDeleteAirport = async (id: idDeleteAirport) => {
    await deleteAirport(id);
  };

  return (
    <>
      <SectionHeader
        title={"Aeropuertos"}
        buttonLabel={"Nuevo aeropuerto"}
        isAdmin={isAdmin}
        onClick={() => setShowForm(true)}
      />

      <EntityList
        items={airports}
        loading={loading}
        error={error}
        emptyMessage={"No hay ningún aeropuerto registrado aún"}
        renderItem={(airport) => (
          <AirportListItem
            airport={airport}
            isAdmin={isAdmin}
            deleteAirport={() => handleDeleteAirport({ id: airport.id })}
            updateAirport={() => handleUpdateAirport(airport)}
          />
        )}
      />

      {showForm && (
        <AirportForm
          onClose={() => {
            setShowForm(false);
            setSelectedAirport(undefined);
          }}
          selectedAirport={selectedAirport}
        />
      )}
    </>
  );
}

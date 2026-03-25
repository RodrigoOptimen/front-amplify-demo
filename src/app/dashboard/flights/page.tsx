"use client";

import { useState } from "react";
import { EntityList, SectionHeader } from "@/src/components";
import { idDeleteAirport } from "@/src/features/airports";
import {
  deleteFlight,
  Flight,
  FlightForm,
  FlightListItem,
  useFlights,
} from "@/src/features/flights";

export default function FlightsPage() {
  const { flights, error, loading } = useFlights();
  const [showForm, setShowForm] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight>();

  const handleUpdateFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setShowForm(true);
  };

  const handleDeleteFlight = async (id: idDeleteAirport) => {
    await deleteFlight(id);
  };

  return (
    <>
      <SectionHeader
        title={"VUELOS"}
        buttonLabel={"Nuevo vuelo"}
        onClick={() => setShowForm(true)}
      />

      <EntityList
        items={flights}
        loading={loading}
        error={error}
        emptyMessage={"No hay ningún vuelo encontrado"}
        renderItem={(flight) => (
          <FlightListItem
            flight={flight}
            onUpdate={() => handleUpdateFlight(flight)}
            onDelete={() => handleDeleteFlight({ id: flight.id })}
          />
        )}
      />

      {showForm && (
        <FlightForm
          selectedFlight={ selectedFlight }
          onClose={()=>{
            setShowForm(false);
            setSelectedFlight(undefined);
          }}
        />
      )}
    </>
  );
}

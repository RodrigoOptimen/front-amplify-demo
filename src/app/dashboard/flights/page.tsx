"use client";

import { useMemo, useState } from "react";
import { EntityList, SectionHeader } from "@/src/components";
import {
  type Airport,
  idDeleteAirport,
  useAirports,
} from "@/src/features/airports";
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
  const { airports } = useAirports();

  const airportsMap: Map<string, Airport> = useMemo(() => {
    return new Map(airports.map( a => [a.id, a]));
  }, [airports]);

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
            airportsMap={airportsMap}
            onUpdate={() => handleUpdateFlight(flight)}
            onDelete={() => handleDeleteFlight({ id: flight.id })}
          />
        )}
      />

      {showForm && (
        <FlightForm
          selectedFlight={selectedFlight}
          airports={airports}
          onClose={() => {
            setShowForm(false);
            setSelectedFlight(undefined);
          }}
        />
      )}
    </>
  );
}

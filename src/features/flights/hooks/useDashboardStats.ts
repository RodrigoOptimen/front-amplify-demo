import { Flight, FLIGHT_STATUS_LABELS } from "../actions";
import { useFlights } from "./useFlights";

export const useDashboardStats = () => {
  const { flights, error, loading } = useFlights();


  const byAirline = flights.reduce((acc, flight) => {
    const key = flight.airline;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);


  const byStatus = flights.reduce((acc, flight) => {
    if(!flight.status) return acc;
    const key = flight.status;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);


  return {
    loading,
    error,
    byAirline: Object.entries(byAirline).map(([name, total]) => ({name, total})),
    byStatus:  Object.entries(byStatus).map(([status, total]) => ({
      name: FLIGHT_STATUS_LABELS[status as NonNullable<Flight["status"]>] ?? status,
      total,
    })),
  };
};

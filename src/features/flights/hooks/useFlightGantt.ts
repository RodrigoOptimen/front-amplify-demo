import { Flight, FLIGHT_STATUS_LABELS } from "../actions";
import { useFlights } from "./useFlights";

const FLIGHT_DURATION_HOURS = 2;

export type GanttRow = {
  label: string;
  offset: number;
  duration: number;
  status: string;
  statusLabel: string;
  airline: string;
  gate: string;
  scheduledAt: string;
  flightNumber: string;
};

export const useFlightGantt = () => {
  const { flights, loading, error } = useFlights();

  const withDate = flights.filter((f) => !!f.scheduledAt);
  const sorted = [...withDate].sort(
    (a, b) =>
      new Date(a.scheduledAt!).getTime() - new Date(b.scheduledAt!).getTime()
  );

  const rangeStartMs =
    sorted.length > 0
      ? new Date(sorted[0].scheduledAt!).getTime()
      : 0;

  const rows: GanttRow[] = sorted.map((flight) => {
    const startMs = new Date(flight.scheduledAt!).getTime();
    const offset = (startMs - rangeStartMs) / (1000 * 60 * 60);
    const status = (flight.status ?? "SCHEDULED") as NonNullable<Flight["status"]>;

    return {
      label: `${flight.flightNumber} · ${flight.airline}`,
      offset,
      duration: FLIGHT_DURATION_HOURS,
      status,
      statusLabel: FLIGHT_STATUS_LABELS[status] ?? status,
      airline: flight.airline,
      gate: flight.gate ?? "—",
      scheduledAt: new Date(flight.scheduledAt!).toLocaleString("es-MX", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
      flightNumber: flight.flightNumber,
    };
  });

  return { rows, loading, error, rangeStartMs };
};

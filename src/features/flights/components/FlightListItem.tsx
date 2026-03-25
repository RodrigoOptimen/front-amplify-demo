import { type Flight } from "../actions/flights";

interface Props {
  flight: Flight;
  onUpdate: () => void;
  onDelete: () => void;
}

const STATUS_STYLES: Record<NonNullable<Flight["status"]>, string> = {
  SCHEDULED: "bg-gray-100 text-gray-600",
  BOARDING: "bg-amber-100 text-amber-700",
  DEPARTED: "bg-blue-100 text-blue-700",
  ARRIVED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-600",
  DELAYED: "bg-orange-100 text-orange-700",
};

const STATUS_LABELS: Record<NonNullable<Flight["status"]>, string> = {
  SCHEDULED: "Programado",
  BOARDING: "Abordando",
  DEPARTED: "En vuelo",
  ARRIVED: "Aterrizado",
  CANCELLED: "Cancelado",
  DELAYED: "Retrasado",
};

export const FlightListItem = ({ flight, onUpdate, onDelete }: Props) => {
  const statusStyle = flight.status
    ? STATUS_STYLES[flight.status]
    : "bg-gray-100 text-gray-500";
  const statusLabel = flight.status
    ? STATUS_LABELS[flight.status]
    : "Sin estado";

  const formattedDate = new Date(flight.scheduledAt).toLocaleString("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="flex items-center justify-between bg-white px-5 py-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm font-bold text-white bg-blue-500 px-2.5 py-1 rounded-lg tracking-widest">
          {flight.flightNumber}
        </span>
        <div>
          <p className="font-medium text-gray-900 text-sm">{flight.airline}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {formattedDate}
            {flight.gate && (
              <span className="ml-2">· Puerta {flight.gate}</span>
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyle}`}
        >
          {statusLabel}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onUpdate}
            title="Editar"
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            {/* pencil icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onDelete}
            title="Eliminar"
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            {/* trash icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

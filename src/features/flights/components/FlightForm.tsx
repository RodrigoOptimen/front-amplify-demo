"use client";

import { type Airport } from "@/src/features/airports";
import { type Flight } from "../actions";
import { useFlightForm } from "../hooks";

interface Props {
  selectedFlight?: Flight;
  airports: Airport[];
  onClose: () => void;
}

const STATUS_OPTIONS = [
  { value: "SCHEDULED", label: "Programado" },
  { value: "BOARDING",  label: "Abordando"  },
  { value: "DEPARTED",  label: "En vuelo"   },
  { value: "ARRIVED",   label: "Aterrizado" },
  { value: "CANCELLED", label: "Cancelado"  },
  { value: "DELAYED",   label: "Retrasado"  },
];

const inputClass =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition";

const labelClass =
  "block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5";

export const FlightForm = ({ selectedFlight, airports, onClose }: Props) => {
  const { loading, error, formState, onInputChange, handleSubmit } =
    useFlightForm(onClose, selectedFlight);


  const scheduledAtValue = formState.scheduledAt
    ? formState.scheduledAt.slice(0, 16)
    : "";

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 w-full max-w-lg mx-4 rounded-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              {selectedFlight ? "Actualizar vuelo" : "Nuevo vuelo"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Completa los datos del vuelo
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg w-7 h-7 flex items-center justify-center text-sm transition-colors"
          >
            ✕
          </button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Número de vuelo</label>
              <input
                name="flightNumber"
                value={formState.flightNumber}
                onChange={onInputChange}
                placeholder="Ej. AM123"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Aerolínea</label>
              <input
                name="airline"
                value={formState.airline}
                onChange={onInputChange}
                placeholder="Ej. Aeroméxico"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Fecha y hora programada</label>
            <input
              type="datetime-local"
              name="scheduledAt"
              value={scheduledAtValue}
              onChange={onInputChange}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Puerta <span className="normal-case text-gray-400 font-normal">(opcional)</span></label>
              <input
                name="gate"
                value={formState.gate ?? ""}
                onChange={onInputChange}
                placeholder="Ej. B4"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Estado</label>
              <select
                name="status"
                value={formState.status ?? "SCHEDULED"}
                onChange={onInputChange}
                className={inputClass}
              >
                {STATUS_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Aeropuerto de origen</label>
            <select
              name="originAirportId"
              value={formState.originAirportId}
              onChange={onInputChange}
              className={inputClass}
            >
              <option value="">Selecciona un aeropuerto</option>
              {airports.map((airport) => (
                <option key={airport.id} value={airport.id}>
                  {airport.iataCode} — {airport.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Aeropuerto de destino</label>
            <select
              name="destinationAirportId"
              value={formState.destinationAirportId}
              onChange={onInputChange}
              className={inputClass}
            >
              <option value="">Selecciona un aeropuerto</option>
              {airports.map((airport) => (
                <option key={airport.id} value={airport.id}>
                  {airport.iataCode} — {airport.name}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 disabled:opacity-40 transition-colors"
            >
              {loading ? "Guardando..." : "Guardar vuelo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

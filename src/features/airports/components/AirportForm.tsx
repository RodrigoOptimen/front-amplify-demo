"use client";

import { useState } from "react";
import { useForm } from "@/src/hooks";
import { createAirport, type AirportInput } from "../actions/airports";

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

const inputClass =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition";

const labelClass =
  "block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5";

const INITIAL_FORM: AirportInput = {
  iataCode: "",
  name: "",
  city: "",
  country: "",
};

const FORM_FIELDS: { name: keyof AirportInput; label: string; placeholder: string }[] = [
  { name: "iataCode", label: "Código IATA", placeholder: "Ej. MEX" },
  { name: "name", label: "Nombre del aeropuerto", placeholder: "Ej. Aeropuerto Internacional Benito Juárez" },
  { name: "city", label: "Ciudad", placeholder: "Ej. Ciudad de México" },
  { name: "country", label: "País", placeholder: "Ej. México" },
];

export const AirportForm = ({ onClose, onCreated }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { onInputChange, onResetForm, formState } = useForm<AirportInput>(INITIAL_FORM);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const isEmpty = Object.values(formState).some((v) => !v.trim());
    if (isEmpty) {
      setError("Todos los campos son requeridos");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createAirport(formState);
      onResetForm();
      onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 w-full max-w-md mx-4 rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Nuevo aeropuerto</h2>
            <p className="text-sm text-gray-500 mt-1">Completa los datos del aeropuerto</p>
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
          {FORM_FIELDS.map(({ name, label, placeholder }) => (
            <div key={name}>
              <label className={labelClass}>{label}</label>
              <input
                name={name}
                value={formState[name]} 
                onChange={onInputChange}
                placeholder={placeholder}
                className={inputClass}
              />
            </div>
          ))}

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
              {loading ? "Guardando..." : "Guardar aeropuerto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
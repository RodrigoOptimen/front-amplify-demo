import { useEffect, useState } from "react";
import { useForm } from "@/src/hooks";
import { createFlight, CreateFlight, Flight, updateFlight } from "../actions";

const INITIAL_FORM: CreateFlight = {
  originAirportId: "",
  destinationAirportId: "",
  flightNumber: "",
  airline: "",
  scheduledAt: "",
};

const requiredFields: (keyof CreateFlight)[] = [
    "flightNumber", "airline", "scheduledAt", "originAirportId", "destinationAirportId"
  ];

export const useFlightForm = (onClose: () => void, selectedFlight?: Flight) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { onInputChange, onResetForm, formState, setFormState } =
    useForm<CreateFlight>(INITIAL_FORM);

  useEffect(() => {
    if (selectedFlight) {
      setFormState(selectedFlight);
    }
  }, [selectedFlight, setFormState]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (selectedFlight) {
      await handleUpdateFlight();
    } else {
      await handleCreateFlight();
    }

    setLoading(false);
  };

  const handleCreateFlight = async () => {
    const isEmpty = requiredFields.some((key) => !formState[key]?.trim());
    if (isEmpty) {
      setError("Todos los campos son requeridos");
      return;
    }

    try {
      await createFlight({
        ...formState,
        scheduledAt: new Date(formState.scheduledAt).toISOString(),
      });
      onResetForm();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar");
    }
  };

  const handleUpdateFlight = async () => {
    if (!selectedFlight) return;

    try {
      const updateData = {
        id: selectedFlight?.id,
        ...formState,
        scheduledAt: new Date(formState.scheduledAt).toISOString()
      };

      await updateFlight(updateData);
      onResetForm();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  return {
    loading,
    error,
    formState,
    onInputChange,
    handleSubmit
  };
};

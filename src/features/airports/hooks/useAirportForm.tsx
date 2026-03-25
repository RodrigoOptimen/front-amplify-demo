import { useEffect, useState } from "react";
import { useForm } from "@/src/hooks";
import {
  createAirport,
  updateAirport,
  type Airport,
  type AirportInput,
  type UpdateAirport,
} from "../actions/airports";

const INITIAL_FORM: AirportInput = {
  iataCode: "",
  name: "",
  city: "",
  country: "",
};

export const useAirportForm = ( onClose: () => void, selectedAirport?: Airport ) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { onInputChange, onResetForm, formState, setFormState } =
    useForm<AirportInput>(INITIAL_FORM);

  useEffect(() => {
    if (selectedAirport) {
      setFormState(selectedAirport);
    }
  }, [selectedAirport, setFormState]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (selectedAirport) {
      await handleUpdate();
    } else {
      await handleCreate();
    }

    setLoading(false);
  };

  const handleCreate = async () => {
    const isEmpty = Object.values(formState).some((v) => !v.trim());
    if (isEmpty) {
      setError("Todos los campos son requeridos");
      return;
    };

    try {
      await createAirport(formState);
      onResetForm();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    };
  };

  const handleUpdate = async () => {
    if (!selectedAirport) return;

    try {
      const updateData: UpdateAirport = {
        id: selectedAirport.id,
        ...formState,
      };

      await updateAirport(updateData);

      onResetForm();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar");
    };
  };

  return {
    loading,
    error,
    formState,
    onInputChange,
    handleSubmit
  };
};

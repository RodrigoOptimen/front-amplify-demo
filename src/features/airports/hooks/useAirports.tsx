import { useEffect, useState } from "react";
import { client } from "@/src/lib";
import { Airport } from "../actions";

export const useAirports = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subscription = client.models.Airport.observeQuery().subscribe({
      next: ({ items }) => {
        setAirports([...items]);
        setLoading(false);
      },
      error: (err) => {
        setError(err.message);
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    airports,
    loading,
    error,
  };
};

import { useEffect, useState } from "react";
import { client } from "@/src/lib";
import { Flight } from "../actions";

export const useFlights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subscription = client.models.Flight.observeQuery().subscribe({
      next: ({ items }) => {
        setFlights([...items]);
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
    flights,
    error,
    loading,
  };
};

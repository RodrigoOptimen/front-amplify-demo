import { fetchAuthSession } from "aws-amplify/auth";
import type { Flight } from "./flights";

const TICKETS_URL = process.env.NEXT_PUBLIC_TICKETS_URL!;

export const generateTicket = async (flight: Flight) => {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();

  const { id } = flight;
  const body = JSON.stringify({ flightId: id });

  try {
    const response = await fetch(TICKETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

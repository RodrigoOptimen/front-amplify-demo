import { Schema } from "@/amplify/data/resource";
import { client } from "@/src/lib/amplify-client";

export type Flight = Schema["Flight"]["type"];
export type CreateFlight = Schema["Flight"]["createType"];
export type UpdateFlight = Schema["Flight"]["updateType"];
export type idDeleteFlight = Schema["Flight"]["deleteType"];

export const FLIGHT_STATUS_LABELS: Record<NonNullable<Flight["status"]>, string> = {
  SCHEDULED: "Programado",
  BOARDING: "Abordando",
  DEPARTED: "En vuelo",
  ARRIVED: "Aterrizado",
  CANCELLED: "Cancelado",
  DELAYED: "Retrasado",
};

export const listFlights = async (): Promise<Flight[]> => {
  const { data, errors } = await client.models.Flight.list();
  if (errors) throw new Error(errors[0].message);
  if (!data) throw new Error("No hay vuelos");

  return data;
};

export const createFlight = async (flight: CreateFlight): Promise<Flight> => {
  const { data, errors } = await client.models.Flight.create(flight);
  if (errors) throw new Error(errors[0].message);
  if (!data) throw new Error("Error al crear el vuelo");

  return data;
};

export const updateFlight = async (flight: UpdateFlight): Promise<Flight> => {
  const { data, errors } = await client.models.Flight.update(flight);

  if (errors) throw new Error(errors[0].message);
  if (!data) throw new Error("Error al actualizar el vuelo");

  return data;
};

export const deleteFlight = async(id: idDeleteFlight) => {
  await client.models.Flight.delete(id);
};
import { Schema } from "@/amplify/data/resource";
import { client } from "@/src/lib/amplify-client";

export type Airport = Schema["Airport"]["type"];
export type AirportInput = Schema["Airport"]["createType"];
export type UpdateAirport = Schema["Airport"]["updateType"];
export type idDeleteAirport = Schema["Airport"]["deleteType"];

export const listAirports = async (): Promise<Airport[]> => {
  const { data, errors } = await client.models.Airport.list();
  if (errors) throw new Error(errors[0].message);
  if (!data) throw new Error("No se recibieron aeropuertos");
                              
  return data;
};

export const getOneAiport = async( AirportId: string ) => {
  const { data, errors } = await client.models.Airport.get({ id: AirportId })
  if (errors) throw new Error(errors[0].message);
  if (!data) throw new Error("No hay un Aeropuerto con ese Id");

  return data;
};

export const createAirport = async (
  airport: AirportInput,
): Promise<Airport> => {
  const { data, errors } = await client.models.Airport.create(airport);
  if (errors) throw new Error(errors[0].message);
  if (!data) throw new Error("No se recibió respuesta al crear el aeropuerto");

  return data;
};

export const updateAirport = async (
  airport: UpdateAirport,
): Promise<Airport> => {
  const { data, errors } = await client.models.Airport.update(airport);
  if (errors) throw new Error(errors[0].message);
  if (!data) throw new Error("Error en la actualización del Aeropuerto");

  return data;
};

export const deleteAirport = async (id: idDeleteAirport) => {
  await client.models.Airport.delete(id);
};

import { Schema } from "@/amplify/data/resource";
import { client } from "@/src/lib/amplify-client";

export type Airport = Schema["Airport"]["type"];

export const listAirports = async (): Promise<Airport[]> => {
  const { data, errors } = await client.models.Airport.list();
  if (errors) throw new Error(errors[0].message);
  return data;
};

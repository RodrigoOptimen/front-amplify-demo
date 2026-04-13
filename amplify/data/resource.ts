import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Airport: a
    .model({
      iataCode: a.string().required(),
      name: a.string().required(),
      city: a.string().required(),
      country: a.string().required(),

      originFlights: a.hasMany("Flight", "originAirportId"),
      destinationFlights: a.hasMany("Flight", "destinationAirportId"),
    })
    .authorization((allow) => [
      allow.publicApiKey(),
      allow.group("admin").to(["create", "read", "update", "delete"]),
      allow.group("agent").to(["read"]),
    ]),

  Flight: a
    .model({
      flightNumber: a.string().required(),
      airline: a.string().required(),
      scheduledAt: a.datetime().required(),
      gate: a.string(),

      originAirportId: a.id().required(),
      destinationAirportId: a.id().required(),

      originAirport: a.belongsTo("Airport", "originAirportId"),
      destinationAirport: a.belongsTo("Airport", "destinationAirportId"),

      status: a.enum([
        "SCHEDULED",
        "BOARDING",
        "DEPARTED",
        "ARRIVED",
        "CANCELLED",
        "DELAYED",
      ]),
    })
    .authorization((allow) => [
      allow.publicApiKey(),
      allow.group("admin").to(["create", "read", "update", "delete"]),
      allow.group("agent").to(["read"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: { expiresInDays: 365 },
  },
});

import type { Airport } from "../actions/airports";

interface Props{
  airport: Airport
};

export const AiportListItem = ({ airport }: Props ) => {
  return (
    <li key={airport.id} className="bg-white rouded-lg px-4 rounded py-3">
      <span className="font-mono text-blue-400 mr-3">{airport.iataCode}</span>
      <span className="font-medium">{airport.name}</span>
      <span className="text-gray">{airport.city}</span>
    </li>
  );
};

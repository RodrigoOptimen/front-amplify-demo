interface Props {
  label: string;
  value: number;
}

export const StatCard = ({ label, value }: Props) => (
  <div className="bg-white rounded-xl px-5 py-4 shadow-sm">
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    <p className="text-xs text-gray-400 mt-0.5">{label}</p>
  </div>
);

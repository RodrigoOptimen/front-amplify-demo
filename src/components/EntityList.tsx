import { ReactNode } from "react";

interface Props<T extends { id: string }> {
  items: T[];
  loading: boolean;
  error: string | null;
  emptyMessage: string;
  renderItem: (item: T) => ReactNode;
}

export const EntityList = <T extends { id: string }>({
  items,
  loading,
  error,
  emptyMessage,
  renderItem,
}: Props<T>) => {
  if (loading)
    return (
      <p className="text-sm text-gray-400 py-6 text-center">Cargando...</p>
    );

  if (error)
    return (
      <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">
        Error: {error}
      </p>
    );

  if (!items.length)
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

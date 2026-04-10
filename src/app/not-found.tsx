import Link from "next/link";

export default function NotFoun() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>Pagina no encontrada</h1>
      <span className="font-medium text-8xl">404</span>
      <Link className="text-blue-500 underline underline-offset-4 hover:text-blue-700 mt-7" href={"/dashboard"}>Volver al Dashboard</Link>
    </div>
  );
}
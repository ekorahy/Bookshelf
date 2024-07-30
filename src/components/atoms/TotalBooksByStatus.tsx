import { TotalBooksByStatusProps } from "../../types";

export default function TotalBooksByStatus({
  total,
  status,
}: TotalBooksByStatusProps) {
  const getBgColor = () => {
    switch (status) {
      case "not read":
        return "bg-red-400";
      case "currently reading":
        return "bg-yellow-400";
      case "read":
        return "bg-green-400";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <section className="relative overflow-hidden rounded-md p-4 shadow">
      <div className="relative z-20 h-full pb-20">
        <h2 className="mb-2 font-semibold">{status}</h2>
        <p className="absolute bottom-0 text-7xl font-light">{total}</p>
      </div>
      <div
        className={`absolute -right-20 -top-20 h-40 w-40 rounded-full ${getBgColor()}`}
      ></div>
    </section>
  );
}

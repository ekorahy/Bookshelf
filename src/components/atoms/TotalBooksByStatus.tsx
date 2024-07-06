import { TotalBooks } from "../../types";

export default function TotalBooksByStatus({ total, status }: TotalBooks) {
  return (
    <section className="rounded-md p-4 shadow">
      <div>
        <h2>{status}</h2>
        <span>{total}</span>
      </div>
    </section>
  );
}

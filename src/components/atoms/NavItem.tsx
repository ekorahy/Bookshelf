import { NavLink } from "react-router-dom";
import { Navigation } from "../../types";

export default function NavItem({ name, path, icon }: Navigation) {
  return (
    <NavLink
      className="flex items-center gap-2 rounded-md px-6 py-3 font-bold hover:bg-slate-100"
      to={path}
    >
      <span className="text-xl">{icon}</span>
      {name}
    </NavLink>
  );
}

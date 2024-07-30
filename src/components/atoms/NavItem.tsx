import { NavLink, useLocation } from "react-router-dom";
import { NavItemProps } from "../../types";
import { useState } from "react";

export default function NavItem({ name, path, icon }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === path;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavLink
      className={`flex items-center gap-2 rounded-md px-4 py-3 hover:bg-slate-100 ${isActive ? "font-bold" : ""}`}
      to={path}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`text-lg ${isHovered ? "text-xl" : ""}`}>{icon}</span>
      {name}
    </NavLink>
  );
}

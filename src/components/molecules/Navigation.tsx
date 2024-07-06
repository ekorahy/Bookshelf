import { useState } from "react";
import NavList from "./NavList";
import { RiMenuLine } from "react-icons/ri";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative mx-auto flex max-w-7xl justify-between p-4">
      <img src="/logo.png" className="w-12" alt="logo image" />
      <button
        className="rounded-md p-2 text-3xl hover:bg-slate-100"
        onClick={toggleMenu}
      >
        <RiMenuLine />
      </button>
      {isMenuOpen && (
        <div className="absolute right-7 top-16 bg-white p-2 shadow">
          <NavList />
        </div>
      )}
    </nav>
  );
}

import { useState } from "react";
import { SearchBarProps } from "../../types";
import { CiSearch } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";

export default function SearchBar({ onSearch, onClear }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onClear();
  };

  return (
    <form className="flex items-center space-x-3" onSubmit={handleSearch}>
      <input
        className="w-full rounded-md p-2 shadow outline-none"
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={handleInputChange}
        required
      />
      <button
        className="rounded-md bg-slate-400 px-4 py-3 text-white hover:bg-slate-500"
        type="submit"
      >
        <CiSearch />
      </button>
      <button
        className="rounded-md bg-white px-4 py-3 text-red-400 shadow hover:text-red-500"
        type="button"
        onClick={handleClearSearch}
      >
        <GrPowerReset />
      </button>
    </form>
  );
}

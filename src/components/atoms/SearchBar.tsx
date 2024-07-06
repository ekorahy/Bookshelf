import { useState } from "react";
import { SearchBarProps } from "../../types";

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
    <form className="flex items-center space-x-4" onSubmit={handleSearch}>
      <input
        className="w-full rounded-md border p-2"
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={handleInputChange}
        required
      />
      <button
        className="rounded-md bg-blue-500 px-4 py-2 text-white"
        type="submit"
      >
        Search
      </button>
      <button
        className="rounded-md bg-gray-500 px-4 py-2 text-white"
        type="button"
        onClick={handleClearSearch}
      >
        Clear
      </button>
    </form>
  );
}

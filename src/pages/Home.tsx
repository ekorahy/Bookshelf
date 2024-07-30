import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BookInput from "../components/molecules/BookInput";
import { getBooks, saveBooks } from "../data/local/books";
import { Book } from "../types";
import TotalBooksByStatus from "../components/atoms/TotalBooksByStatus";
import SearchBar from "../components/atoms/SearchBar";
import BookList from "../components/molecules/BookList";
import { MdAdd } from "react-icons/md";
import { MdClose } from "react-icons/md";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setBooks(getBooks());
  }, [books]);

  const handleSaveBook = (book: Book) => {
    saveBooks(book);
    setBooks(getBooks());
    setIsFormVisible(false);
  };

  const filteredBooks = () => {
    switch (filter) {
      case "not read":
        return books.filter((book) => book.status === "not read");
      case "currently reading":
        return books.filter((book) => book.status === "currently reading");
      case "read":
        return books.filter((book) => book.status === "read");
      default:
        return books;
    }
  };

  const handleSearch = (query: string) => {
    setSearchParams({ q: query });
  };

  const handleClearSearch = () => {
    setSearchParams({});
  };

  const filteredBooksBySearch = () => {
    const query = searchParams.get("q")?.toLowerCase();
    if (!query) return filteredBooks();

    return filteredBooks().filter(
      (book) =>
        book.title.toLowerCase().includes(query!) ||
        book.author.toLowerCase().includes(query!) ||
        book.category.toLowerCase().includes(query!) ||
        book.description.toLowerCase().includes(query!),
    );
  };

  return (
    <div>
      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <TotalBooksByStatus total={books.length} status="all" />
        <TotalBooksByStatus
          total={
            filteredBooks().filter((book) => book.status === "not read").length
          }
          status="not read"
        />
        <TotalBooksByStatus
          total={
            filteredBooks().filter(
              (book) => book.status === "currently reading",
            ).length
          }
          status="currently reading"
        />
        <TotalBooksByStatus
          total={
            filteredBooks().filter((book) => book.status === "read").length
          }
          status="read"
        />
      </section>
      <section className="my-4">
        <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
      </section>
      <section className="my-4">
        <div className="flex items-center justify-between">
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            className="rounded-md p-2 shadow outline-none"
          >
            <option value="all">All</option>
            <option value="not read">Not Read</option>
            <option value="currently reading">Currently Reading</option>
            <option value="read">Read</option>
          </select>
          <button
            className="hidden font-bold underline hover:text-slate-500 sm:block"
            onClick={() => setIsFormVisible(true)}
          >
            Add new book
          </button>
        </div>
      </section>
      <section className="my-4">
        <BookList books={filteredBooksBySearch()} />
      </section>
      {isFormVisible && (
        <section>
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" />
          <div className="fixed left-1/2 top-1/2 z-50 h-full w-full -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-md bg-white p-4 shadow sm:w-4/5 md:h-3/4 md:p-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Form add new book</h2>
                <p>Add new books and grow your digital library.</p>
              </div>
              <button
                className="p-2 text-2xl text-red-400 hover:text-red-500"
                onClick={() => setIsFormVisible(false)}
              >
                <MdClose />
              </button>
            </div>
            <BookInput onSave={handleSaveBook} />
          </div>
        </section>
      )}
      <button
        onClick={() => setIsFormVisible(true)}
        className="fixed bottom-8 right-4 z-30 rounded-full bg-slate-400 p-2 text-3xl text-white hover:bg-slate-500 sm:hidden"
      >
        <MdAdd />
      </button>
    </div>
  );
}

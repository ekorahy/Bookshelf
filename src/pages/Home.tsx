import { useState, useEffect } from "react";
import BookInput from "../components/molecules/BookInput";
import { getBooks, saveBooks } from "../data/local/books";
import { Book } from "../types";
import TotalBooksByStatus from "../components/atoms/TotalBooksByStatus";
import SearchBar from "../components/atoms/SearchBar";
import BookList from "../components/molecules/BookList";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [isFormVisible, setIsFormVisible] = useState(false);

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

  return (
    <div>
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
      <section>
        <SearchBar />
      </section>
      <section>
        <div className="flex items-center justify-between">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="not read">Not Read</option>
            <option value="currently reading">Currently Reading</option>
            <option value="read">Read</option>
          </select>
          <button onClick={() => setIsFormVisible(true)}>Add new book</button>
        </div>
        <BookList books={filteredBooks()} />
      </section>
      {isFormVisible && (
        <div>
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" />
          <section className="fixed left-1/2 top-1/2 z-50 h-3/4 w-full -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded border border-gray-300 bg-white p-4 shadow-md sm:w-4/5">
            <div className="mb-4 flex items-center justify-between">
              <h2>Form add new book</h2>
              <button onClick={() => setIsFormVisible(false)}>x</button>
            </div>
            <BookInput onSave={handleSaveBook} />
          </section>
        </div>
      )}
    </div>
  );
}

import { Link, useParams } from "react-router-dom";
import { getBookById } from "../data/local/books";
import { Book, ReadingStatus } from "../types";
import { MdArrowBack } from "react-icons/md";

export default function BookDetail() {
  const { id = "" } = useParams<{ id: string }>();
  const bookId = parseInt(id, 10);

  if (isNaN(bookId)) {
    return <p className="text-red-400">Invalid book ID</p>;
  }

  const book: Book | undefined = getBookById(bookId);

  if (!book) {
    return <p className="text-red-400">Book not found</p>;
  }

  const getStatusColor = (status: ReadingStatus) => {
    switch (status) {
      case "not read":
        return "text-red-500";
      case "currently reading":
        return "text-yellow-500";
      case "read":
        return "text-green-500";
      default:
        return "";
    }
  };

  const value = "border border-gray-200 px-4 py-2";
  const title = `${value} font-bold`;

  return (
    <section>
      <Link to="/" className="flex items-center gap-2 hover:text-slate-500">
        <MdArrowBack /> Detail {book.title}
      </Link>
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="w-full">
          <img
            src={book.cover_image}
            className="mx-auto w-80 rounded-md lg:w-full lg:object-cover"
            alt={book.title}
          />
        </div>
        <table className="mx-autotable-auto border-collapse border border-gray-200">
          <tbody>
            <tr>
              <td className={title}>Title</td>
              <td className={value}>{book.title}</td>
            </tr>
            <tr>
              <td className={title}>Author</td>
              <td className={value}>{book.author}</td>
            </tr>
            <tr>
              <td className={title}>ISBN</td>
              <td className={value}>{book.ISBN}</td>
            </tr>
            <tr>
              <td className={title}>Category</td>
              <td className={value}>{book.category}</td>
            </tr>
            <tr>
              <td className={title}>Description</td>
              <td className={value}>{book.description}</td>
            </tr>
            <tr>
              <td className={title}>Publication Date</td>
              <td className={value}>{book.publication_date}</td>
            </tr>
            <tr>
              <td className={title}>Publisher</td>
              <td className={value}>{book.publisher}</td>
            </tr>
            <tr>
              <td className={title}>Language</td>
              <td className={value}>{book.language}</td>
            </tr>
            <tr>
              <td className={title}>Page Count</td>
              <td className={value}>{book.page_count}</td>
            </tr>
            <tr>
              <td className={title}>Status</td>
              <td className={`${value} ${getStatusColor(book.status)}`}>
                {book.status}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

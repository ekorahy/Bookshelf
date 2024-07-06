import { Link, useParams } from "react-router-dom";
import { getBookById } from "../data/local/books";
import { Book, ReadingStatus } from "../types";
import { MdArrowBack } from "react-icons/md";

export default function DetailBook() {
  const { id = "" } = useParams<{ id: string }>();
  const bookId = parseInt(id, 10);

  if (isNaN(bookId)) {
    return <div>Invalid book ID</div>;
  }

  const book: Book | undefined = getBookById(bookId);

  if (!book) {
    return <div>Book not found</div>;
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
              <td className="border border-gray-200 px-4 py-2 font-bold">
                Title
              </td>
              <td className="border border-gray-200 px-4 py-2">{book.title}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2 font-bold">
                Author
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {book.author}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2 font-bold">
                ISBN
              </td>
              <td className="border border-gray-200 px-4 py-2">{book.ISBN}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2 font-bold">
                Category
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {book.category}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2 font-bold">
                Description
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {book.description}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2 font-bold">
                Publication Date
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {book.publication_date}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2 font-bold">
                Publisher
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {book.publisher}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2 font-bold">
                Language
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {book.language}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2 font-bold">
                Page Count
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {book.page_count}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2 font-bold">
                Status
              </td>
              <td
                className={`border border-gray-200 px-4 py-2 ${getStatusColor(book.status)}`}
              >
                {book.status}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

import { BookListProps } from "../../types";
import BookItem from "../atoms/BookItem";

export default function BookList({ books }: BookListProps) {
  return (
    <div>
      {books.length === 0 ? (
        <p>Empty Data</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {books.map((book, index) => (
            <BookItem
              key={index}
              coverImage={book.cover_image}
              status={book.status}
              title={book.title}
              author={book.author}
              category={book.category}
              description={book.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}
import { BookListProps } from "../../types";
import BookItem from "../atoms/BookItem";

export default function BookList({ books }: BookListProps) {
  return (
    <div>
      {books.length === 0 ? (
        <p>Empty Data</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8 xl:grid-cols-3">
          {books.map((book, index) => (
            <BookItem
              key={index}
              id={book.id}
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

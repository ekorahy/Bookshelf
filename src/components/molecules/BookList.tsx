import { BookListProps } from "../../types";
import BookItem from "../atoms/BookItem";

export default function BookList({ books }: BookListProps) {
  return (
    <div>
      {books.length === 0 ? (
        <p className="mt-20 text-center text-red-400">Empty Data</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {books.map(
            ({
              id,
              cover_image,
              status,
              title,
              author,
              category,
              description,
            }) => (
              <BookItem
                key={id}
                id={id}
                coverImage={cover_image}
                status={status}
                title={title}
                author={author}
                category={category}
                description={description}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}

import React from "react";
import { BookListProps } from "../../types";
import BookItem from "../atoms/BookItem";

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div>
      {books.length === 0 ? (
        <p>Empty Data</p>
      ) : (
        <ul>
          {books.map((book, index) => (
            <BookItem key={index} book={book} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;

import React from "react";
import { BookItemProps } from "../../types";

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <li>
      <strong>{book.title}</strong> by {book.author} - {book.status}
    </li>
  );
};

export default BookItem;

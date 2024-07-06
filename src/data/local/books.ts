import { Book } from "../../types";

export const saveBooks = (book: Book): void => {
  const books = getBooks();

  const isBookExists = books.some((storedBook) => storedBook.title === book.title)

  if (isBookExists) {
    alert(`Book with title ${book.title} already exists!`)
    return;
  }

  books.push(book)
  localStorage.setItem('books', JSON.stringify(books))

}

export const getBooks = (): Book[] => {
  const booksStr = localStorage.getItem('books');
  return booksStr ? JSON.parse(booksStr) : [];
}

export const getBookById = (id: number): Book | undefined => {
  const books = getBooks();
  return books.find((book) => book.id === id);
}
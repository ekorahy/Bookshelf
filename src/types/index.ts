import React from "react";

export type ReadingStatus = "not read" | "currently reading" | "read";
export type StatusBooks = "all" | "not read" | "currently reading" | "read";

export interface BookInputProps {
  onSave: (formData: Book) => void;
}

export interface Book {
  id: number;
  cover_image: string;
  title: string;
  author: string;
  ISBN: string;
  category: string;
  description: string;
  publication_date: string;
  publisher: string;
  language: string;
  page_count: number;
  status: ReadingStatus;
}

export const initialFormData: Book = {
  id: 0,
  cover_image: '',
  title: '',
  author: '',
  ISBN: '',
  category: '',
  description: '',
  publication_date: '',
  publisher: '',
  language: '',
  page_count: 0,
  status: "not read",
};

export interface Navigation {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export interface TotalBooks {
  total: number,
  status: StatusBooks
}

export interface BookListProps {
  books: Book[];
}

export interface BookItemProps {
  id: number;
  coverImage: string;
  status: StatusBooks;
  title: string;
  author: string;
  category: string;
  description: string;
}
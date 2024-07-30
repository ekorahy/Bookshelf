import React from "react";

declare type ReadingStatus = "not read" | "currently reading" | "read";
declare type StatusBooks = "all" | "not read" | "currently reading" | "read";

declare interface BookInputProps {
  onSave: (formData: Book) => void;
}

declare interface Book {
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

declare interface NavItemProps {
  name: string;
  path: string;
  icon: React.ReactNode;
}

declare interface TotalBooksByStatusProps {
  total: number,
  status: StatusBooks
}

declare interface BookListProps {
  books: Book[];
}

declare interface BookItemProps {
  id: number;
  coverImage: string;
  status: StatusBooks;
  title: string;
  author: string;
  category: string;
  description: string;
}

declare interface SearchBarProps {
  onSearch: (q: string) => void;
  onClear: () => void;
}
export interface Book {
  id: string;
  title: string;
  author: string;
  publicationYear: number;
  isbn: string;
  totalCopies: number;
  availableCopies: number;
  retailPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

import { createClient } from "@/utils/supabase/server";
import camelcaseKeys from "camelcase-keys";

export interface BookDTO {
  id: number;
  title: string;
  author?: string;
  publication_year?: number;
  description?: string;
  personal_notes?: string;
  rating?: number;
}

export interface Book {
  id: number;
  title: string;
  author?: string;
  publicationYear?: number;
  description?: string;
  personalNotes?: string;
  rating?: number;
}

function convertBookDTOToBook(bookDTO: BookDTO): Book {
  return {
    id: bookDTO.id,
    title: bookDTO.title,
    author: bookDTO.author,
    publicationYear: bookDTO.publication_year,
    description: bookDTO.description,
    personalNotes: bookDTO.personal_notes,
    rating: bookDTO.rating,
  };
}

function convertBookToBookDTO(book: Book): BookDTO {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    publication_year: book.publicationYear,
    description: book.description,
    personal_notes: book.personalNotes,
    rating: book.rating,
  };
}

async function getBooks(): Promise<Book[] | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("books").select().returns<BookDTO[]>();

  return data ? data.map((bookDTO) => convertBookDTOToBook(bookDTO)) : null;
}

export { getBooks };

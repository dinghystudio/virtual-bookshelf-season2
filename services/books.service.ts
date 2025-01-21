import { getUser } from "@/services/auth.service";
import { createClient } from "@/utils/supabase/server";

export interface GetBookDTO {
  id: number;
  title: string;
  author?: string;
  publication_year?: number;
  description?: string;
  personal_notes?: string;
  rating?: number;
}

export type CreateBookDTO = Omit<GetBookDTO, "id">;

export interface Book {
  id: number;
  title: string;
  author?: string;
  publicationYear?: number;
  description?: string;
  personalNotes?: string;
  rating?: number;
}

function convertGetBookDTOToBook(bookDTO: GetBookDTO): Book {
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

function convertBookToGetBookDTO(book: Partial<Book>): Partial<GetBookDTO> {
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

function convertBookToCreateBookDTO(book: Omit<Book, "id">): CreateBookDTO {
  return {
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
  const user = await getUser();
  const { data } = await supabase
    .from("books")
    .select()
    .eq("created_by", user?.id)
    .returns<GetBookDTO[]>();

  return data ? data.map((bookDTO) => convertGetBookDTOToBook(bookDTO)) : null;
}

export async function getBookById(id: number): Promise<Book | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("books")
    .select()
    .eq("id", id)
    .returns<GetBookDTO[]>();

  return data ? convertGetBookDTOToBook(data[0]) : null;
}

async function createBook(book: Omit<Book, "id">): Promise<number | null> {
  const supabase = await createClient();
  const bookDTO = convertBookToCreateBookDTO(book);
  const { data } = await supabase
    .from("books")
    .insert(bookDTO)
    .returns<GetBookDTO>();

  return data?.id || null;
}

export { getBooks, createBook };

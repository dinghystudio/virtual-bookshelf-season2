"use server";

import * as booksService from "@/services/books.service";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  author: z.string().optional(),
  publicationYear: z.string().optional(),
  description: z.string().optional(),
  personalNotes: z.string().optional(),
  rating: z.string().optional(),
});

const updateFormSchema = z.object({
  id: z.string(),
  rating: z.string(),
});

const deleteFormSchema = z.object({
  id: z.string(),
});

export async function createBookAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const book = formSchema.parse(data);
  const id = await booksService.createBook({
    ...book,
    rating: book.rating ? parseInt(book.rating) : undefined,
    publicationYear: book.publicationYear
      ? parseInt(book.publicationYear)
      : undefined,
  });
  if (id) {
    redirect(`/books/${id}`);
  }
}

export async function updateBookAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const book = formSchema.parse(data);
  if (!book.id) {
    throw new Error("Book ID is required");
  }

  const error = await booksService.updateBook({
    ...book,
    id: parseInt(book.id),
    rating: book.rating ? parseInt(book.rating) : undefined,
    publicationYear: book.publicationYear
      ? parseInt(book.publicationYear)
      : undefined,
  });
  if (!error) {
    redirect(`/books/${book.id}`);
  }
}

export async function updateBookRatingAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const { id: bookId, rating } = updateFormSchema.parse(data);
  console.log(bookId, rating);

  await booksService.updateBookRating(parseInt(bookId), parseInt(rating));
}

export async function deleteBookAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const { id } = deleteFormSchema.parse(data);
  const error = await booksService.deleteBook(parseInt(id));
  if (!error) {
    redirect("/books");
  }
}

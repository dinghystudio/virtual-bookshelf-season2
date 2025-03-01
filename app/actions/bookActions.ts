"use server";

import * as booksService from "@/services/books.service";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  title: z.string(),
  author: z.string().optional(),
  publicationYear: z.string().optional(),
  description: z.string().optional(),
  personalNotes: z.string().optional(),
  rating: z.string().optional(),
});

export async function createBookAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const book = formSchema.parse(data);
  console.log(book);
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

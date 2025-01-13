"use server";

import * as booksService from "@/services/books.service";
import { z } from "zod";

const formSchema = z.object({
  title: z.string(),
  author: z.string().optional(),
  publicationYear: z.string().optional(),
  description: z.string().optional(),
  personalNotes: z.string().optional(),
  rating: z.string().optional(),
});

async function createBookAction(formData: FormData) {
  const book = formSchema.parse(formData);
  await booksService.createBook(book);
}

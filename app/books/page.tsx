import { BookDisplay } from "@/components/books/Book";
import * as booksService from "@/services/books.service";

export default async function ProtectedPage() {
  // @TODO: Extract this into a sub-layout
  // Build supabase service functions ✅
  // Check out supabase cli to get types from schema ✅
  // Save the user inside a book row in the database
  // Show only the logged in user's books

  const books = await booksService.getBooks();

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      {books?.map((book) => <BookDisplay key={book.id} book={book} />)}
    </div>
  );
}

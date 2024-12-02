import { BookDisplay } from "@/components/books/Book";
import * as authService from "@/services/auth.service";
import * as booksService from "@/services/books.service";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  // @TODO: Extract this into a sub-layout
  // Build supabase service functions ✅
  // Check out supabase cli to get types from schema ✅
  // Save the user inside a book row in the database
  // Show only the logged in user's books

  const user = await authService.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const books = await booksService.getBooks();

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      {books?.map((book) => <BookDisplay key={book.id} book={book} />)}
    </div>
  );
}

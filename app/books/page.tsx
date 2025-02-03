import { BookDisplay } from "@/components/books/Book";
import { Button } from "@/components/ui/button";
import * as booksService from "@/services/books.service";
import Link from "next/link";

export default async function ProtectedPage() {
  const books = await booksService.getBooks();

  return (
    <div className="grid gap-5">
      <nav className="flex justify-end">
        <Button asChild>
          <Link href="/books/create">Add a new book</Link>
        </Button>
      </nav>
      <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
        {books?.map((book) => <BookDisplay key={book.id} book={book} />)}
      </ul>
    </div>
  );
}

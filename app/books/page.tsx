import { BookDisplay } from "@/components/books/Book";
import * as booksService from "@/services/books.service";
import Link from "next/link";

export default async function ProtectedPage() {
  const books = await booksService.getBooks();

  return (
    <div className="grid gap-12">
      <nav>
        <Link href="/books/create">Add a new book</Link>
      </nav>
      {books?.map((book) => <BookDisplay key={book.id} book={book} />)}
    </div>
  );
}

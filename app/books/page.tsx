import { BookDisplay } from "@/components/books/Book";
import * as booksService from "@/services/books.service";

export default async function ProtectedPage() {
  const books = await booksService.getBooks();

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      {books?.map((book) => <BookDisplay key={book.id} book={book} />)}
    </div>
  );
}

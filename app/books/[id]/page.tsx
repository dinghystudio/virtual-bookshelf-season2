import { deleteBookAction } from "@/app/actions/bookActions";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import * as booksService from "@/services/books.service";
import { ArrowLeft, Edit3Icon, Trash2Icon } from "lucide-react";
import Link from "next/link";

export default async function BookDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  if (!id) {
    return <h1>No book id was provided</h1>;
  }

  const book = await booksService.getBookById(parseInt(id));

  if (!book) {
    return <h1>Book not found</h1>;
  }

  const { title, author, publicationYear, description, personalNotes, rating } =
    book;

  return (
    <div className="grid gap-6 max-w-prose mx-auto">
      <a href="/books" className="flex gap-1 items-center hover:underline">
        <ArrowLeft />
        <span>Back to overview</span>
      </a>
      <article className="grid gap-6 p-5 bg-white rounded-md shadow-md">
        <div className="flex gap-4 justify-between">
          <h1 className="text-2xl font-bold">{title}</h1>
          <ul className="flex gap-2 items-center">
            <li>
              <Button asChild variant="outline" size="sm" className="gap-1">
                <Link href={`/books/${id}/edit`}>
                  <Edit3Icon size="1.2em" /> Edit
                </Link>
              </Button>
            </li>
            <li>
              {/* Add a little confirmation modal here before deleting */}
              <form action={deleteBookAction}>
                <input type="hidden" name="id" value={id} />
                <Button
                  type="submit"
                  className="gap-1"
                  variant="outline"
                  size="sm"
                >
                  <Trash2Icon size="1.2em" /> Delete
                </Button>
              </form>
            </li>
          </ul>
        </div>

        <header className="grid gap-2">
          <p>
            {author && <span>{author}</span>}
            {publicationYear && <time>, {publicationYear}</time>}
          </p>

          <StarRating bookId={book.id} filledStars={rating || 0} standalone />
        </header>

        {description && (
          <section>
            <h2 className="text-lg mb-2 font-semibold">Description</h2>
            <p className="leading-relaxed">{description}</p>
          </section>
        )}

        {personalNotes && (
          <section>
            <h2 className="text-lg mb-2 font-semibold">Notes</h2>
            <p className="leading-relaxed">{personalNotes}</p>
          </section>
        )}
      </article>
    </div>
  );
}

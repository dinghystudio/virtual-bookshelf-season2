import StarRating from "@/components/StarRating";
import * as booksService from "@/services/books.service";
import { ArrowLeft } from "lucide-react";

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
        <h1 className="text-2xl font-bold">{title}</h1>
        <header className="grid gap-2">
          <p>
            {author && <span>{author}</span>}
            {publicationYear && <time>, {publicationYear}</time>}
          </p>
          {rating && <StarRating filledStars={rating} />}
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

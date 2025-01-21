import StarRating from "@/components/StarRating";
import { Book } from "@/services/books.service";
import Link from "next/link";

export function BookDisplay({ book }: { book: Book }) {
  const {
    id,
    title,
    author,
    publicationYear,
    description,
    personalNotes,
    rating,
  } = book;

  return (
    <li className="grid gap-2 content-start">
      <header className="flex gap-2 items-center justify-between">
        <Link href={`/books/${id}`} className="font-bold text-xl">
          {title}
        </Link>
      </header>
      <p className="italic">
        {author && <span>{author}</span>}
        {publicationYear && <time>, {publicationYear}</time>}
      </p>
      {description && <p className="line-clamp-1">{description}</p>}
      <article className="grid gap-1">
        {personalNotes && (
          <>
            <h2 className="text-xs font-bold uppercase text-slate-500 mt-4">
              Notes:
            </h2>
            <p className="line-clamp-1">{personalNotes}</p>
          </>
        )}
        {rating && <StarRating filledStars={rating} />}
      </article>
    </li>
  );
}

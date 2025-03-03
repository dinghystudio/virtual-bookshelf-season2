import StarRating from "@/components/StarRating";
import { Book } from "@/services/books.service";
import Link from "next/link";

export function BookDisplay({ book }: { book: Book }) {
  const { id, title, author, publicationYear, description, rating } = book;

  return (
    <li className="grid bg-white gap-2 content-start py-3 px-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 rounded-lg">
      <header className="flex gap-2 items-center justify-between">
        <Link
          href={`/books/${id}`}
          className="font-semibold text-xl hover:underline"
        >
          {title}
        </Link>
      </header>
      <p className="italic">
        {author && <span>{author}</span>}
        {publicationYear && <time>, {publicationYear}</time>}
      </p>
      {description && <p className="line-clamp-1">{description}</p>}
      <StarRating bookId={id} filledStars={rating || 0} standalone />
    </li>
  );
}

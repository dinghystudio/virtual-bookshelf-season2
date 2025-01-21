import * as booksService from "@/services/books.service";

export default async function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  if (!id) {
    return <h1>No book id was provided</h1>;
  }

  const book = await booksService.getBookById(parseInt(id));
  console.log(book);

  if (!book) {
    return <h1>Book not found</h1>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <h2>{id}</h2>
    </div>
  );
}

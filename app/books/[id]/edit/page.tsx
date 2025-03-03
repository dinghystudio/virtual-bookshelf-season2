import { updateBookAction } from "@/app/actions/bookActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import * as booksService from "@/services/books.service";

export default async function EditBookPage({
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
    <div>
      <form action={updateBookAction} className="grid gap-2">
        <input type="hidden" name="id" value={id} />
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            placeholder="Hitchhiker's Guide to the Galaxy"
            id="title"
            name="title"
            defaultValue={title}
          />
        </div>
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            type="text"
            placeholder=""
            id="author"
            name="author"
            defaultValue={author}
          />
        </div>
        <div>
          <Label htmlFor="publication-year">Publication Year</Label>
          <Input
            type="number"
            placeholder="1984"
            id="publication-year"
            name="publicationYear"
            defaultValue={publicationYear}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            placeholder="This book is about …"
            id="description"
            name="description"
            defaultValue={description}
          />
        </div>
        <div>
          <Label htmlFor="personal-notes">Personal Notes</Label>
          <Textarea
            placeholder="My thoughts about this book … "
            id="personal-notes"
            name="personalNotes"
            defaultValue={personalNotes}
          />
        </div>
        <Button type="submit">Save Book</Button>
      </form>
    </div>
  );
}

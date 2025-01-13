import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateBookPage() {
  return (
    <div>
      <form action="">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            placeholder="Hitchhiker's Guide to the Galaxy"
            id="title"
            name="title"
          />
        </div>
        <div>
          <Label htmlFor="author">Author</Label>
          <Input type="text" placeholder="" id="author" name="author" />
        </div>
        <div>
          <Label htmlFor="publication-year">Publication Year</Label>
          <Input
            type="number"
            placeholder="1984"
            id="publication-year"
            name="publication-year"
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            placeholder="This book is about …"
            id="description"
            name="description"
          />
        </div>
        <div>
          <Label htmlFor="personal-notes">Personal Notes</Label>
          <Textarea
            placeholder="My thoughts about this book … "
            id="personal-notes"
            name="personal-notes"
          />
        </div>
      </form>
    </div>
  );
}

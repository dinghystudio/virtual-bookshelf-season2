import { Book } from "@/components/books/Book";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  // @TODO: Extract this into a sub-layout
  // Build supabase service functions
  // Check out supabase cli to get types from schema
  // Save the user inside a book row in the database
  // Show only the logged in user's books
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: books } = await supabase.from("books").select();

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      {books?.map((book) => <Book book={book} />)}
    </div>
  );
}

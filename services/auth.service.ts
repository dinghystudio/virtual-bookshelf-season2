import { createClient } from "@/utils/supabase/server";

async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export { getUser };

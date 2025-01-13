import * as authService from "@/services/auth.service";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await authService.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return <>{children}</>;
}

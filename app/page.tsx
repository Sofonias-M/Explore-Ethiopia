import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";
import HomeClient from "@/components/home-client";

export default async function HomePage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <HomeClient
      user={{
        name: session.user.name,
        image: session.user.image,
        email: session.user.email,
      }}
    />
  );
}

import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";
import HomeClient from "@/components/home-client";

async function HomeContent() {
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

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}

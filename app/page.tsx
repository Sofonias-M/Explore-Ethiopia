import { Suspense } from "react";
import { getSession } from "@/lib/get-session";
import HomeClient from "@/components/home-client";

async function HomeContent() {
  const session = await getSession();

  return (
    <HomeClient
      user={
        session
          ? {
              name: session.user.name,
              image: session.user.image,
              email: session.user.email,
            }
          : null
      }
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

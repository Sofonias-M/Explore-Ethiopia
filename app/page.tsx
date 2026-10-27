import { Suspense } from "react";
import { getSession } from "@/lib/get-session";
import HomeClient from "@/components/home-client";
import { userGetDestinations } from "./data/user/user-get-destinations";

async function HomeContent() {
  const session = await getSession();
  const destinations = await userGetDestinations();

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
      destinations={destinations}
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

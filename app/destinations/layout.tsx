import { Suspense } from "react";
import { getSession } from "@/lib/get-session";
import DestinationsNavbar from "@/components/destinations-navbar";

interface DestinationsLayoutProps {
  children: React.ReactNode;
}

async function NavbarWithSession() {
  const session = await getSession();

  return (
    <DestinationsNavbar
      user={
        session
          ? {
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
            }
          : null
      }
    />
  );
}

export default function DestinationsLayout({
  children,
}: DestinationsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Suspense fallback={<DestinationsNavbar user={null} />}>
        <NavbarWithSession />
      </Suspense>
      <main className="flex-1">{children}</main>
    </div>
  );
}


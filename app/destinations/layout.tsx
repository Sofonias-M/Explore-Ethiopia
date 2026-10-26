import { getSession } from "@/lib/get-session";
import DestinationsNavbar from "@/components/destinations-navbar";

interface DestinationsLayoutProps {
  children: React.ReactNode;
}

export default async function DestinationsLayout({
  children,
}: DestinationsLayoutProps) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
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
      <main className="flex-1">{children}</main>
    </div>
  );
}

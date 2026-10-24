import { notFound } from "next/navigation";
import { destinations } from "@/lib/destinations";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import DestinationDetailView from "@/components/destinations/DestinationDetailView";

type DestinationDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DestinationDetailsPage({
  params,
}: DestinationDetailsPageProps) {
  const { id } = await params;

  const destination = destinations.find(
    (item) => item.slug === id || item.id === id
  );

  if (!destination) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900 flex flex-col justify-between">
      <SiteNavbar />
      <main className="flex-1">
        <DestinationDetailView destination={destination} />
      </main>
      <SiteFooter />
    </div>
  );
}

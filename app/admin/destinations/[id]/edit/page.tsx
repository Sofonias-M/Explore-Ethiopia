import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import EditDestinationForm from "./edit-destination-form";

type EditDestinationPageProps = {
params: Promise<{ id: string }>;
};

type DestinationContentProps = {
params: Promise<{ id: string }>;
};

async function DestinationContent({ params }: DestinationContentProps) {
// Keep request-specific authentication inside the Suspense boundary.
await requireAdmin();

const { id } = await params;

const destination = await prisma.destination.findUnique({
where: { id },
});

if (!destination) {
notFound();
}

return ( <section className="mx-auto max-w-4xl"> <Link
     href="/admin/destinations"
     className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-gray-900"
   > <ArrowLeft size={16} />
Back to destinations </Link>

  <div>
    <p className="text-sm font-medium text-emerald-700">
      Administration
    </p>

    <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
      Edit destination
    </h1>

    <p className="mt-2 text-gray-600">
      Update the information visitors see about {destination.name}.
    </p>
  </div>

  <EditDestinationForm
    destination={{
      id: destination.id,
      name: destination.name,
      slug: destination.slug,
      region: destination.region,
      description: destination.description,
      imageUrl: destination.imageUrl ?? "",
      estimatedCost: destination.estimatedCost?.toString() ?? "",
      bestTimeToVisit: destination.bestTimeToVisit ?? "",
      isPublished: destination.isPublished,
    }}
  />
</section>

);
}

function EditDestinationLoading() {
return ( <div
   className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-8"
   role="status"
   aria-live="polite"
 > <p className="text-sm text-gray-600">Loading destination...</p> </div>
);
}

export default function EditDestinationPage({
params,
}: EditDestinationPageProps) {
return (
<Suspense fallback={<EditDestinationLoading />}> <DestinationContent params={params} /> </Suspense>
);
}

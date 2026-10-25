import { adminGetDestination } from "@/app/data/admin/admin-get-destination";
import { EditDestinationForm } from "./EditDestinationForm";
// import { EditDestinationForm } from "./EditDestinationForm";

type Params = Promise<{ id: string }>;

export default async function EditRoute({ params }: { params: Params }) {
  const { id } = await params;
  const data = await adminGetDestination(id);

  return <EditDestinationForm data={data} />;
}

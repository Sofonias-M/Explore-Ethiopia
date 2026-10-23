"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/db";
import { destinationSchema } from "@/lib/validations/destination";
import { getSession } from "@/lib/get-session";

export type DestinationActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};
export type CreateDestinationState = DestinationActionState;
export type UpdateDestinationState = DestinationActionState;

async function isAdminAuthorized(): Promise<boolean> {
const session = await getSession();

if (!session?.user?.email) {
return false;
}

const adminEmails = (process.env.ADMIN_EMAILS ?? "")
.split(",")
.map((email) => email.trim().toLowerCase())
.filter(Boolean);

return adminEmails.includes(session.user.email.trim().toLowerCase());
}

function parseDestinationForm(formData: FormData) {
return destinationSchema.safeParse({
name: formData.get("name"),
slug: formData.get("slug"),
region: formData.get("region"),
description: formData.get("description"),
imageUrl: formData.get("imageUrl"),
estimatedCost: formData.get("estimatedCost"),
bestTimeToVisit: formData.get("bestTimeToVisit"),
isPublished: formData.get("isPublished") === "true",
});
}

function validationErrors(
error: { flatten: () => { fieldErrors: Record<string, string[] | undefined> } },
): Record<string, string[]> {
return Object.fromEntries(
Object.entries(error.flatten().fieldErrors).filter(
(entry): entry is [string, string[]] => Array.isArray(entry[1]),
),
);
}

function destinationData(
values: ReturnType<typeof destinationSchema.parse>,
) {
return {
name: values.name,
slug: values.slug,
region: values.region,
description: values.description,
imageUrl: values.imageUrl || null,
estimatedCost:
values.estimatedCost === "" || values.estimatedCost === undefined
? null
: new Prisma.Decimal(values.estimatedCost),
bestTimeToVisit: values.bestTimeToVisit || null,
isPublished: values.isPublished,
};
}

export async function createDestination(
_previousState: CreateDestinationState,
formData: FormData,
): Promise<CreateDestinationState> {
let authorized = false;

try {
authorized = await isAdminAuthorized();
} catch (error) {
console.error("Failed to verify destination creation permissions:", error);
return {
success: false,
message: "Unable to verify permissions. Please try again.",
};
}

if (!authorized) {
return {
success: false,
message: "You are not authorized to create destinations.",
};
}

const parsed = parseDestinationForm(formData);

if (!parsed.success) {
return {
success: false,
message: "Please correct the highlighted fields.",
errors: validationErrors(parsed.error),
};
}

try {
await prisma.destination.create({
data: destinationData(parsed.data),
});

revalidatePath("/admin/destinations");
revalidatePath("/destinations");

return {
  success: true,
  message: "Destination created successfully.",
};

} catch (error) {
if (
error instanceof Prisma.PrismaClientKnownRequestError &&
error.code === "P2002"
) {
return {
success: false,
message: "A destination with this slug already exists.",
errors: {
slug: ["This slug is already in use. Choose another one."],
},
};
}

console.error("Failed to create destination:", error);

return {
  success: false,
  message: "Unable to create the destination. Please try again.",
};

}
}

export async function updateDestination(
destinationId: string,
_previousState: UpdateDestinationState,
formData: FormData,
): Promise<UpdateDestinationState> {
let authorized = false;

try {
authorized = await isAdminAuthorized();
} catch (error) {
console.error("Failed to verify destination update permissions:", error);
return {
success: false,
message: "Unable to verify permissions. Please try again.",
};
}

if (!authorized) {
return {
success: false,
message: "You are not authorized to update destinations.",
};
}

if (
typeof destinationId !== "string" ||
destinationId.trim().length === 0 ||
destinationId.length > 128
) {
return {
success: false,
message: "Invalid destination ID.",
};
}

const parsed = parseDestinationForm(formData);

if (!parsed.success) {
return {
success: false,
message: "Please correct the highlighted fields.",
errors: validationErrors(parsed.error),
};
}

try {
const existingDestination = await prisma.destination.findUnique({
where: { id: destinationId },
select: { id: true },
});

if (!existingDestination) {
  return {
    success: false,
    message: "Destination not found. It may have been deleted.",
  };
}

await prisma.destination.update({
  where: { id: destinationId },
  data: destinationData(parsed.data),
});

revalidatePath("/admin/destinations");
revalidatePath(`/admin/destinations/${destinationId}/edit`);
revalidatePath("/destinations");

return {
  success: true,
  message: "Destination updated successfully.",
};

} catch (error) {
if (
error instanceof Prisma.PrismaClientKnownRequestError &&
error.code === "P2002"
) {
return {
success: false,
message: "A destination with this slug already exists.",
errors: {
slug: ["This slug is already in use. Choose another one."],
},
};
}

if (
  error instanceof Prisma.PrismaClientKnownRequestError &&
  error.code === "P2025"
) {
  return {
    success: false,
    message: "Destination not found. It may have been deleted.",
  };
}

console.error("Failed to update destination:", error);

return {
  success: false,
  message: "Unable to update the destination. Please try again.",
};
}
}
export async function deleteDestination(
destinationId: string,
): Promise<DestinationActionState> {
let authorized = false;

try {
authorized = await isAdminAuthorized();
} catch (error) {
console.error("Failed to verify destination deletion permissions:", error);

return {
  success: false,
  message: "Unable to verify permissions. Please try again.",
};
}

if (!authorized) {
return {
success: false,
message: "You are not authorized to delete destinations.",
};
}

if (
typeof destinationId !== "string" ||
destinationId.trim().length === 0 ||
destinationId.length > 128
) {
return {
success: false,
message: "Invalid destination ID.",
};
}

try {
const destination = await prisma.destination.findUnique({
where: { id: destinationId },
select: {
id: true,
name: true,
_count: {
select: {
tripDestinations: true,
},
},
},
});

if (!destination) {
  return {
    success: false,
    message: "Destination not found. It may already have been deleted.",
  };
}

if (destination._count.tripDestinations > 0) {
  return {
    success: false,
    message:
      "This destination is used in one or more trips and cannot be deleted. Unpublish it instead if you want to hide it from public discovery.",
  };
}

await prisma.destination.delete({
  where: { id: destinationId },
});

revalidatePath("/admin/destinations");
revalidatePath("/destinations");

return {
  success: true,
  message: `${destination.name} was deleted successfully.`,
};


} catch (error) {
if (
error instanceof Prisma.PrismaClientKnownRequestError &&
error.code === "P2003"
) {
return {
success: false,
message:
"This destination is referenced by a trip and cannot be deleted. Unpublish it instead.",
};
}


if (
  error instanceof Prisma.PrismaClientKnownRequestError &&
  error.code === "P2025"
) {
  return {
    success: false,
    message: "Destination not found. It may already have been deleted.",
  };
}

console.error("Failed to delete destination:", error);

return {
  success: false,
  message: "Unable to delete the destination. Please try again.",
};
}
}

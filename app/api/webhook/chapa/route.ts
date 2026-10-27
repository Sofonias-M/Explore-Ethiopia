// export async function POST() {}

import { prisma } from "@/lib/db";
// import { env } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("Received GET request at Chapa webhook endpoint");
  // 1️⃣ Extract trx_ref from query params
  const url = new URL(request.url);
  const trxRef = url.searchParams.get("trx_ref");

  if (!trxRef) {
    return NextResponse.json({ error: "Missing trx_ref" }, { status: 400 });
  }

  try {
    // 2️⃣ Call Chapa verify API (SERVER → SERVER)
    const verifyResponse = await fetch(
      `https://api.chapa.co/v1/transaction/verify/${trxRef}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    const data = await verifyResponse.json();

    // 3️⃣ Print result (for debugging)
    console.log("Chapa verify response:", data);

    if (data.data.status == "success") {
      const locationId = data.data.meta?.locationId;
      const userId = data.data.meta?.userId;

      if (!locationId) {
        throw new Error("Destination not found...");
      }

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new Error("User not found...");
      }

      await prisma.booking.update({
        where: {
          id: data.data.meta?.bookingId as string,
        },
        data: {
          userId: user.id,
          locationId: locationId,
          amount: data.data.amount as number,
          status: "Active",
        },
      });
    }
    // 4️⃣ Return minimal safe response
    return NextResponse.json(
      {
        verified: true,
        chapaStatus: data?.data?.status,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error verifying Chapa transaction:", error);

    return NextResponse.json(
      { error: "Failed to verify transaction" },
      { status: 500 },
    );
  }
}

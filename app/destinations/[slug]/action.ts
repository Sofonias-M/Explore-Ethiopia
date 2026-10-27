"use server";

import { prisma } from "@/lib/db";
import { APIResponse } from "@/lib/types";
import { redirect } from "next/navigation";
import axios from "axios";
// import { env } from "@/lib/env";
import { requireUser } from "@/app/data/admin/require-user";

// import { requireUser } from "@/app/data/user/require-user";

export async function bookDestination(
  locationId: string,
): Promise<APIResponse | never> {
  const user = await requireUser();

  let checkoutURL: string;
  try {
    const destination = await prisma.location.findUnique({
      where: {
        id: locationId,
      },
      select: {
        id: true,
        title: true,
        price: true,
        slug: true,
      },
    });

    if (!destination) {
      return {
        status: "error",
        message: "Destination not found",
      };
    }

    const result = await prisma.$transaction(async (tx) => {
      const exisitingBooking = await tx.booking.findUnique({
        where: {
          userId_locationId: {
            userId: user.id,
            locationId: locationId,
          },
        },
        select: {
          status: true,
          id: true,
        },
      });

      if (exisitingBooking?.status === "Active") {
        redirect(`/destination`);
      }

      let booking;

      if (exisitingBooking) {
        booking = await tx.booking.update({
          where: {
            id: exisitingBooking.id,
          },
          data: {
            amount: destination.price,
            status: "Pending",
            updatedAt: new Date(),
          },
        });
      } else {
        booking = await tx.booking.create({
          data: {
            userId: user.id,
            locationId: destination.id,
            amount: destination.price,
            status: "Pending",
          },
        });
      }

      // Generate tx_ref from enrollment ID
      const txRef = `${booking.id}-${Date.now()}`;

      // Prepare customization

      const chapaData = {
        amount: destination.price.toString(),
        currency: "ETB",
        email: user.email,
        first_name: user.name?.trim().substr(0, 50) || "User",
        last_name: ".",
        tx_ref: txRef,
        callback_url: `${process.env.NGROK_URL}/api/webhook/chapa`,
        return_url: `${process.env.BETTER_AUTH_URL}/payment/success`,
        customization: {
          title: "Tour Payment",
          description: `Payment for ${destination.title[0]}`.substr(0, 100),
        },
        meta: {
          userId: user.id,
          locationId: destination.id,
          bookingId: booking.id,
        },
      };

      console.log("Sending to Chapa:", JSON.stringify(chapaData, null, 2));

      const response = await axios.post(
        "https://api.chapa.co/v1/transaction/initialize",
        chapaData,
        {
          headers: {
            Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        },
      );

      if (response.data?.data?.checkout_url) {
        return {
          booking: booking,
          checkoutUrl: response.data.data.checkout_url,
        };
      } else {
        throw new Error("No checkout URL received from Chapa");
      }
    });

    checkoutURL = result.checkoutUrl as string;
  } catch (error: unknown) {
    console.error("Error in booking:", error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Chapa API error response:", error.response.data);

        return {
          status: "error",
          message: `Payment processing failed: ${
            error.response.data?.message || "Unknown error"
          }`,
        };
      }
    }

    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    return {
      status: "error",
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }

  redirect(checkoutURL);
}

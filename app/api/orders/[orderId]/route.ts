import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params: { orderId } }: { params: { orderId: string } }
) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!orderId) {
      return new NextResponse("orderId is required", { status: 400 });
    }

    await prismadb.orders.updateMany({
      where: {
        id: orderId,
        userId,
      },
      data: {
        type: "CANCELLED",
      },
    });

    const orders = await prismadb.orders.findMany({
      where: {
        userId,
        type: "PROCESSING",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Inter Error", { status: 500 });
  }
}

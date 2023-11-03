import prismadb from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { userId, products } = body;

  if (!userId || !products)
    return new NextResponse("Something is missing", { status: 400 });

  try {
    for (let product of products) {
      await prismadb.orders.create({
        data: {
          name: product.name,
          price: product.price,
          url: product?.images[0]?.url,
          type: "PROCESSING",
          userId,
        },
      });
    }

    return NextResponse.json("Successful");
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Inter Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const userId = params.get("id");

  if (!userId) return new NextResponse("Something is missing", { status: 400 });

  try {
    const orders = await prismadb.orders.findMany({
      where: {
        userId,
        type: "PROCESSING",
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Inter Error", { status: 500 });
  }
}

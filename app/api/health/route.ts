import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const productCount = await prisma.product.count();
    const categoryCount = await prisma.category.count();
    return NextResponse.json({
      status: "ok",
      db: "connected",
      products: productCount,
      categories: categoryCount,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", db: "disconnected", error: String(error) },
      { status: 500 }
    );
  }
}

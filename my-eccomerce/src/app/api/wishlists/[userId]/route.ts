import { NextResponse } from "next/server";

import { myResponse } from "../../users/route";
import { deleteWishlists, getProductsWishlist } from "@/db/models/wishlists";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Fetch the products in the user's wishlist
    const userId = params.userId;

    if (!userId) throw new Error("userId requiured");

    const wishlistProducts = await getProductsWishlist(userId);

    return NextResponse.json<myResponse<unknown>>({
      statusCode: 200,
      message: "success read wishlits",
      data: wishlistProducts,
    });
  } catch (error: any) {
    console.error("Failed to retrieve wishlist products:", error);
    return NextResponse.json<myResponse<unknown>>(
      {
        statusCode: 500,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Fetch the products in the user's wishlist
    const userId = params.userId;

    if (!userId) throw new Error("userId requiured");

    const deletedProducts = await deleteWishlists(userId);

    return NextResponse.json<myResponse<unknown>>({
      statusCode: 200,
      message: "success delete wishlits",
    });
  } catch (error) {
    console.error("Failed to delete wishlist products:", error);
    return NextResponse.json<myResponse<unknown>>(
      {
        statusCode: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}

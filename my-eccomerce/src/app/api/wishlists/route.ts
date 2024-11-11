import { addWishlist } from "@/db/models/wishlists";
import { NextResponse } from "next/server";
import { z } from "zod";
import { myResponse } from "../users/route";

const wishlistInputSchema = z.object({
  userId: z.string().min(1, "userId is required"),
  productId: z.string().min(1, "productId is required"),
});

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    const parsedData = wishlistInputSchema.safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const { userId, productId } = parsedData.data;
    const wishlist = await addWishlist({ userId, productId });

    return NextResponse.json<myResponse<unknown>>(
      {
        statusCode: 201,
        message: "success add wishlits",
        data: wishlist,
      },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    console.error(err);
    if (err instanceof z.ZodError) {
      // err.issues ini semua buat nampilin error karna structur eror zod berbeda
      const errPath = err.issues[0].path[0];
      const errMessage = err.issues[0].message;
      return NextResponse.json<myResponse<never>>(
        {
          statusCode: 400,
          error: `${errPath} - ${errMessage}`,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json<myResponse<never>>(
      {
        statusCode: 500,
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
};

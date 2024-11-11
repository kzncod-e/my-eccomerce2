import { getProductBySlug } from "@/db/models/products";
import { NextRequest } from "next/server";
//params disini berada pada parameter ke dua karena yang pertamada adalah request yang bertujuan untuk menerima seluruh reques dari user
export const GET = async (
  request: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const Product = await getProductBySlug(params.slug);

  return Response.json(
    {
      statusCode: 200,
      message: "fetchProduct success",
      data: Product,
    },
    {
      status: 200,
    }
  );
};

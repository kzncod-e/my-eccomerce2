import { NextRequest } from "next/server";
import { getProducts } from "@/db/models/products";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search");

  const pages = searchParams.get("pages");
  const limit = searchParams.get("limit");
  const Products = await getProducts(Number(pages), Number(limit), search);

  return Response.json(
    {
      statusCode: 200,
      message: "fetchProducts success",
      data: Products,
    },
    {
      status: 200,
    }
  );
};

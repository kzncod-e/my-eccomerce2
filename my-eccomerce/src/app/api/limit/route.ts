import { getProductsLimit } from "@/db/models/products";
export type MyResponse = {
  statusCode: number;
  message?: string;
  data?: string[];
  error?: string;
};

export const GET = async () => {
  const products = await getProductsLimit();

  return Response.json(
    {
      statusCode: 200,
      message: "Pong from GET /api/users !",
      data: products,
    },
    {
      status: 200,
    }
  );
};

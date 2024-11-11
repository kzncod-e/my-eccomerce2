import { Db, ObjectId } from "mongodb";
import { getDb } from "../config";

export type Product = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

export const getProductsLimit = async (): Promise<Product[]> => {
  const db: Db = await getDb();

  const products = (await db
    .collection("Products")
    .find()
    .limit(5)
    .toArray()) as Product[];

  return products;
};
export const getProducts = async (
  pages = 1,
  limit = 5,
  search: string | null
): Promise<Product[]> => {
  const db: Db = await getDb();
  const query = search ? { name: { $regex: search, $options: "i" } } : {};

  const products = (await db
    .collection("Products")
    .find(query)
    .limit(limit)
    .skip((pages - 1) * limit) //(pages-1) *(10)

    .toArray()) as Product[];

  return products;
};

export const getProductBySlug = async (slug: string) => {
  const db: Db = await getDb(); // explicitly typed as Db
  console.log(slug);

  const product = (await db
    .collection("Products")
    .findOne({ slug: slug })) as Product;

  return product;
};

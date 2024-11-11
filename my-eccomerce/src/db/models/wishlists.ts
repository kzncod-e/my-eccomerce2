import { ObjectId } from "mongodb";
import { getDb } from "../config";
import { Product } from "./products";

export type wishlist = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: string;
  updatedAt: string;
};
export type Mywishlist = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: string;
  updatedAt: string;
  products: Product[];
};

export type wishlistInput = Omit<wishlist, "_id">;

export const getWishlist = async () => {
  return (await getDb()).collection("Wishlists");
};

export const addWishlist = async (wishlist: {
  userId: string;
  productId: string;
}) => {
  const currentDate = new Date().toISOString();

  const wishlistDocument = {
    userId: new ObjectId(wishlist.userId),
    productId: new ObjectId(wishlist.productId),
    createdAt: currentDate,
    updatedAt: currentDate,
  };

  const result = await (await getWishlist()).insertOne(wishlistDocument);
  return result;
};

export const getProductsWishlist = async (userId: string) => {
  const wishlist = await getWishlist();

  const result = await wishlist
    .aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "Products",
          localField: "productId",
          foreignField: "_id",
          as: "products",
        },
      },
    ])
    .toArray();

  return result;
};

export const deleteWishlists = async (userId: string) => {
  const Wishlists = await getWishlist();
  const result = await Wishlists.deleteOne({ userId: new ObjectId(userId) });
  return result;
};

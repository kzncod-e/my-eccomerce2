import Header from "@/app/components/Header";
import { cookies } from "next/headers";
import formatToIDR from "@/helpers/format";
import { Product } from "@/db/models/products";
import AddWishlistButton from "@/app/components/addToWishlistsButton";
import { verifyTokenJose } from "@/helpers/jwt";
export const readPayload = async () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  if (!token) {
    return;
  }
  const tokenData = await verifyTokenJose<{ id: string; email: string }>(
    token?.value
  );
  return tokenData.payload.id;
};
export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const fetchProduct = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.slug}`,
      {
        cache: "no-store",
      }
    );
    const responseJson: { statusCode: number; message: string; data: Product } =
      await response.json();
    if (!response.ok) {
      throw new Error("Waduh Error ...");
    }

    const product = responseJson.data;
    return product;
  };

  const userId: string | undefined = await readPayload();
  const product = await fetchProduct();

  return (
    <>
      <Header />
      {product && (
        <div
          key={product._id.toString()}
          className="container  h-screen  min-w-full items-center justify-center  grid grid-cols-2 mx-7 gap-6">
          <div className="">
            <img src={product.thumbnail} alt="product" className="w-full" />
            <div className="grid grid-cols-5  gap-4 mt-4">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="product2"
                  className="w-full py-1 cursor-pointer border-2 border-slate-400"
                />
              ))}
            </div>
          </div>
          <div className="">
            <h2 className="text-3xl font-medium uppercase mb-2"></h2>
            <div className="flex items-center mb-4">
              <div className="flex gap-1 text-sm text-yellow-400">
                <span>
                  <i className="fa-solid fa-star" />
                </span>
                <span>
                  <i className="fa-solid fa-star" />
                </span>
                <span>
                  <i className="fa-solid fa-star" />
                </span>
                <span>
                  <i className="fa-solid fa-star" />
                </span>
                <span>
                  <i className="fa-solid fa-star" />
                </span>
              </div>
              <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-800 font-semibold space-x-2">
                <span>Availability: </span>
                <span className="text-green-600">In Stock</span>
              </p>
              <p className="space-x-2">
                <span className="text-gray-800 font-semibold">Brand: </span>
                <span className="text-gray-600">Apex</span>
              </p>
              <p className="space-x-2">
                <span className="text-gray-800 font-semibold">tags: </span>
                {product?.tags.map((tag, index) => (
                  <span key={index} className="text-gray-600">
                    #{tag}
                  </span>
                ))}
              </p>
              <p className="space-x-2">
                <span className="text-gray-800 font-semibold">SKU: </span>
                <span className="text-gray-600">BE45VGRT</span>
              </p>
            </div>
            <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
              <p className="text-xl text-primary font-semibold">
                {formatToIDR(product.price)}
              </p>
              <p className="text-base text-gray-400 line-through">$55.00</p>
            </div>
            <p className="mt-4 text-gray-600">{product.excerpt}</p>
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Color
              </h3>
              <div className="flex items-center gap-2">
                <div className="color-selector">
                  <input
                    type="radio"
                    name="color"
                    id="red"
                    className="hidden"
                  />
                  <label
                    htmlFor="red"
                    className="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                    style={{ backgroundColor: "#fc3d57" }}
                  />
                </div>
                <div className="color-selector">
                  <input
                    type="radio"
                    name="color"
                    id="black"
                    className="hidden"
                  />
                  <label
                    htmlFor="black"
                    className="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                    style={{ backgroundColor: "#000" }}
                  />
                </div>
                <div className="color-selector">
                  <input
                    type="radio"
                    name="color"
                    id="white"
                    className="hidden"
                  />
                  <label
                    htmlFor="white"
                    className="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                    style={{ backgroundColor: "#fff" }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
              <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                  -
                </div>
                <div className="h-8 w-8 text-base flex items-center justify-center">
                  4
                </div>
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                  +
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
              <AddWishlistButton
                productId={product._id.toString()}
                userId={userId}
              />
            </div>
            <div className="mt-4">
              <h1 className="text-gray-800 text-3xl font-semibold space-x-2">
                <span>Details </span>
              </h1>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

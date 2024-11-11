import { Product } from "@/db/models/products";
import Card from "./components/Card";
import Header from "./components/Header";
import Link from "next/link";

const fetchProduct = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/limit`,
    {
      cache: "no-store",
    }
  );
  const responseJson: { statusCode: number; message: string; data: Product[] } =
    await response.json();
  if (!response.ok) {
    throw new Error("Waduh Error ...");
  }

  const product = responseJson.data;
  return product;
};
export default async function Home() {
  const products = await fetchProduct();

  return (
    <>
      <div className="bg-slate-300">
        <div className="bg-[#010506]  py-6 shadow-slate-600 shadow-2xl text-white">
          <Header />
          <div className="container   shadow-cyan/500/50 min-w-full shadow-2xl">
            <main>
              <section className="flex justify-between items-center">
                <div className="w-1/2 px-6">
                  <h1 className="text-5xl font-bold mb-6">Pro anywhere</h1>
                  <p className="text-gray-400 mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse dicta dignissimos es eius enim laudantium modi
                    odit quidem.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="px-6 py-3 rounded-md hover:bg-white hover:text-gray-900 transition duration-300">
                      Read more
                    </a>
                    <a
                      href="#"
                      className="px-6 py-3 bg-primary rounded-md hover:bg-base-100 transition duration-300">
                      Add to cart
                    </a>
                  </div>
                </div>
                <div className="w-1/2">
                  <img
                    src="https://dawid-next-ecommerce.s3.amazonaws.com/1679151719649.png"
                    alt="Laptop displaying Earth from space"
                    className="w-full object-cover h-auto"
                  />
                </div>
              </section>
            </main>
          </div>
        </div>
        <section className="flex justify-center flex-col p-8" id="cards">
          <div className="grid grid-rows-2 gap-8">
            <h1 className="font-['Roboto'] text-4xl ">New Arrival</h1>
            <Link href="/products">
              <h1 className="font-['Roboto'] text-2xl underline">
                See all Products
              </h1>
            </Link>
          </div>
          <div className="flex gap-3 flex-wrap ">
            <Card products={products} />
          </div>
        </section>
      </div>
    </>
  );
}

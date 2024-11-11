import Header from "../../components/Header";
import { cookies } from "next/headers";
import Card from "@/app/components/WislhlitsCards";
import { Mywishlist } from "@/db/models/wishlists";
export default async function Products({ params }: { params: { id: string } }) {
  // Function to call API and add product to wishlist
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists/${params.id}`,
        {
          headers: {
            Cookie: cookies().toString(),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  const products = await fetchProducts();

  return (
    <>
      <Header />
      <div className="grid gap-4 mx-10">
        <h1 className="text-3xl py-14 ">My wislists</h1>
        <div className="flex flex-wrap gap-8">
          {products?.data.map((el: Mywishlist, index: number) => (
            <Card key={index} products={el.products} />
          ))}
        </div>
      </div>
    </>
  );
}

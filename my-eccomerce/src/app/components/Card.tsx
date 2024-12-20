import { Product } from "@/db/models/products";
import formatToIDR from "@/helpers/format";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Card({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((item) => (
        <div
          key={item._id.toString()}
          className="card group transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-indigo-500 hover:-translate-x-3 transition-all duration-300 bg-base-100 my-2 w-72 shadow-xl">
          <figure className="relative">
            <img
              className=""
              src="https://png.pngtree.com/png-clipart/20230330/original/pngtree-apple-laptop-transparent-background-png-image_9012259.png"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>{formatToIDR(item.price)}</p>
            <div className="card-actions justify-start">
              <Button>
                <Link href={`../products/${item.slug}`}>Detail</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

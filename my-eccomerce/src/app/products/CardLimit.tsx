"use client";
import { Product } from "@/db/models/products";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import Link from "next/link";
import formatToIDR from "@/helpers/format";

import { Button } from "@/components/ui/button";
export default function CardLimit({ search }: { search: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [pages, setPages] = useState(1);
  const fetchProducts = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?pages=1&limit=10&search=${search}`
    );

    const data = await response.json();
    setProducts(data.data);
  };

  const fetchMoreProducts = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?pages=${
        pages + 1
      }&limit=10&search=${search}`
    );
    const data = await response.json();

    setProducts((prevProducts) => [...prevProducts, ...data.data]);
    setPages(pages + 1);
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);
  return (
    <>
      <section
        className="flex  bg-base-300 flex-col justify-center p-8"
        id="cards">
        <h1 className="font-['Roboto'] text-4xl">Products List</h1>
        <div className=" flex pt-10 w-full">
          <InfiniteScroll
            className=" flex gap-7 flex-wrap"
            dataLength={products.length} //This is important field to render the next data
            next={fetchMoreProducts}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }>
            {products.map((item) => (
              <div
                key={item._id.toString()}
                className="card group transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-indigo-500 hover:-translate-x-3 transition-all duration-300 bg-base-100 my-2 w-80 shadow-xl">
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
          </InfiniteScroll>
        </div>
      </section>
    </>
  );
}

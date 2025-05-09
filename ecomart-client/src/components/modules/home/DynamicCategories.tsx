"use client";

import SectionTitle from "@/components/ui/core/SectionTitle";
import { getAllProducts } from "@/services/ProductsService";
import { IProduct } from "@/types/product.type";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const DynamicCategories = () => {
  const [uniqueCategories, setUniqueCategories] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      const categoryMap = new Map<string, IProduct>();

      products.forEach((product: IProduct) => {
        if (!categoryMap.has(product.category)) {
          categoryMap.set(product.category, product);
        }
      });

      setUniqueCategories(Array.from(categoryMap.values()));
    };

    fetchProducts();
  }, []);

  return (
    <>
      <SectionTitle
        title="Dynamic Categories"
        subtitle="Discover our top categories with hand-picked products"
      />
      <Marquee speed={60} pauseOnHover>
        <div className="flex gap-6">
          {uniqueCategories.map((cat, i) => (
            <div
              key={i}
              className="min-w-[200px] overflow-hidden transition bg-white"
            >
              <div className="relative h-36 w-full">
                <Image
                  src={cat.images?.[0] || "/fallback.jpg"}
                  alt={cat.category}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-primary">
                  {cat.category}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </Marquee>
    </>
  );
};

export default DynamicCategories;

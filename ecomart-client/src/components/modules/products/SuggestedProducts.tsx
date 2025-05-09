"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { IProduct } from "@/types/product.type";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionTitle from "@/components/ui/core/SectionTitle";

type SuggestedProductsProps = {
  products: IProduct[];
};

const SuggestedProducts = ({ products }: SuggestedProductsProps) => {
  return (
    <div className="">
      <SectionTitle subtitle="You may also like" title="Suggested Products" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(
          ({
            _id,
            name,
            images,
            price,
            category,
            rating = 0,
            totalReviews = 0,
          }) => (
            <div
              key={_id}
              className="property-card group overflow-hidden transition duration-300 relative rounded-lg"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={
                    images?.[0] ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Hover Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition bg-black/40">
                  <div className="grid grid-cols-1 w-full gap-3 px-4">
                    <Link href={`/products/${_id}`}>
                      <Button className="w-full text-white">
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/products/${_id}`}>
                      <Button className="w-full" variant="secondary">
                        Add to Cart
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center text-sm mb-2">
                  <Badge
                    variant="outline"
                    className="text-xs px-2 py-0.5 text-white bg-primary"
                  >
                    {category}
                  </Badge>
                </div>

                <h3 className="font-medium text-lg line-clamp-1">{name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-1 text-sm text-yellow-500 mt-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.round(rating) ? "#FACC15" : "none"}
                      stroke="#FACC15"
                    />
                  ))}
                  <span className="ml-2 text-muted-foreground">
                    ({totalReviews})
                  </span>
                </div>

                {/* Price */}
                <div className="text-xl font-bold text-primary">${price}</div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SuggestedProducts;

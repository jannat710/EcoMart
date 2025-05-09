"use client";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product.type";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import ProductSkeleton from "./ProductSkeleton";

const ProductCard = ({
  _id,
  name,
  images,
  price,
  category,
  rating = 0,
  totalReviews = 0,
}: IProduct) => {
  const isLoading = !name || !price;

  if (isLoading) {
    return <ProductSkeleton />;
  }

  return (
    <div className="property-card group overflow-hidden transition duration-300 relative">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={
            images?.[0] ||
            "https://media.istockphoto.com/id/1300331505/vector/living-room-interior-comfortable-sofa-bookcase-chair-and-house-plants-vector-flat-style.jpg?s=612x612&w=0&k=20&c=KbIpj1QZ7FXfma9ELib4My6URwkuPU05gN20IRDG__c="
          }
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />

        {/* Hover Buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition bg-black/40">
          {/* Buttons */}
          <div className="grid grid-cols-1 w-full gap-4 px-4">
            <Link href={`/products/${_id}`}>
              <Button className="w-full text-white">View Details</Button>
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
            className="text-xs px-2 py-0.5  text-white bg-primary"
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
          <span className="ml-2 text-muted-foreground">({totalReviews})</span>
        </div>

        {/* Price */}
        <div className="text-xl font-bold text-primary">${price}</div>
      </div>
    </div>
  );
};

export default ProductCard;

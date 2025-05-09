"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";

import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product.type";
import { getAllProducts } from "@/services/ProductsService";
import ProductCard from "../products/ProductCard";
import ProductSkeleton from "../products/ProductSkeleton";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "@/components/ui/core/SectionTitle";

const FeaturesProducts = () => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getAllProducts();
        setAllProducts(allProducts);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section>
      <SectionTitle
        title="Browse Our Products"
        subtitle="Find the best deals across all categories"
      />
      <div className="relative">
        <div className="absolute -top-10 right-0 flex gap-2 z-10">
          <Button
            className="text-primary"
            variant="outline"
            size="sm"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="text-primary"
            size="sm"
            onClick={scrollNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-4 px-1">
            {loading &&
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] flex-shrink-0"
                >
                  <ProductSkeleton />
                </div>
              ))}

            {!loading &&
              allProducts.map((product) => (
                <div
                  key={product._id}
                  className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] flex-shrink-0"
                >
                  <ProductCard {...product} />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* View All Button */}
      <div className="grid place-content-center mt-10">
        <Link href="/products">
          <Button className="px-6 py-2 shadow-md text-white bg-primary hover:bg-primary/90 hover:scale-105 transition-transform duration-200">
            View All
            <span className="ml-2">
              <ArrowRight className="w-5 h-5" />
            </span>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturesProducts;

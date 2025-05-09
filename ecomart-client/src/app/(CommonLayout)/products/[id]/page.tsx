/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Check, X, Loader, Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { IProduct } from "@/types/product.type";
import { getAllProducts, getSingleProduct } from "@/services/ProductsService";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import SectionBanner from "@/components/ui/core/SectionBannar";
import SuggestedProducts from "@/components/modules/products/SuggestedProducts";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const ProductDetailsPage = () => {
  const { user } = useUser();
  console.log(user);
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState<IProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const rental = await getSingleProduct(id as string);
        setProductDetails(rental);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const all = await getAllProducts();
        const filtered = all.filter(
          (p: IProduct) =>
            p._id !== id && p.category === productDetails?.category
        );

        setRelatedProducts(filtered.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch related products:", err);
      }
    };

    if (productDetails) {
      fetchRelated();
    }
  }, [productDetails, id]);

  if (loading) {
    return (
      <div className="container py-10 flex items-center justify-center h-64">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="container py-10 text-center">
        <p>Product not found</p>
      </div>
    );
  }

  const images = productDetails.images?.length
    ? productDetails.images
    : [
        "https://media.istockphoto.com/id/1300331505/vector/living-room-interior-comfortable-sofa-bookcase-chair-and-house-plants-vector-flat-style.jpg",
      ];

  return (
    <>
      <SectionBanner title="Product Details" subtitle="Home" />

      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-2 grid-cols-1">
          {/* Carousel */}
          <div>
            <div className="overflow-hidden rounded-lg" ref={emblaRef}>
              <div className="flex">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] relative h-96 w-full"
                  >
                    <Image
                      src={image}
                      alt={`${productDetails.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-4 gap-2">
              {images.map((_, index) => (
                <Button
                  key={index}
                  className={`w-2 h-1 rounded-full ${
                    index === selectedIndex
                      ? "bg-primary"
                      : "bg-muted-foreground"
                  }`}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="border-b border-primary pb-6">
              <div className="">
                <div className="flex justify-between">
                  <h1 className="text-3xl font-bold">{productDetails.name}</h1>
                  <div className="">
                    <Badge>{productDetails.category}</Badge>
                  </div>
                </div>
                <span className="flex items-center text-primary font-bold mt-2">
                  {productDetails.brand}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-2xl font-bold text-primary">
                ${productDetails.price.toLocaleString()}
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium">Availability:</span>
                {productDetails.inStock ? (
                  <span className="flex items-center text-primary">
                    <Check className="w-4 h-4 mr-1" /> Available
                  </span>
                ) : (
                  <span className="flex items-center text-red-600">
                    <X className="w-4 h-4 mr-1" /> Out of stock
                  </span>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground">
                {productDetails.description}
              </p>
            </div>

            <div className="mb-3 flex gap-10 text-muted-foreground">
              <p>
                Total Reviews:{" "}
                <span className="text-foreground">
                  {productDetails.totalReviews}
                </span>
              </p>
              <p className="flex items-center gap-1">
                Ratings:{" "}
                <span className="text-foreground font-medium flex items-center gap-1">
                  {productDetails.rating}
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                </span>
              </p>
            </div>
            {!user ? (
              <Link href="/login">
                <Button>Please Login</Button>
              </Link>
            ) : user.role === "admin" ? (
              <Button className="bg-red-600 hover:bg-red-700">
                Admin {"Can't"} Buy
              </Button>
            ) : !productDetails.inStock || productDetails.quantity <= 0 ? (
              <Button disabled>Out of stock</Button>
            ) : (
              <Link href={`/checkout/${productDetails._id}`}>
                <Button>Check Out</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Suggested Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <SuggestedProducts products={relatedProducts} />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetailsPage;

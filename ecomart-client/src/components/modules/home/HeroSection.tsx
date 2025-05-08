"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const HERO_SLIDES = [
  {
    image: "https://i.postimg.cc/VvfnjPZg/banner1.jpg",
    title: "Shop Smarter with Ecomart",
    subtitle: "Quality products. Unbeatable prices.",
  },
  {
    image: "https://i.postimg.cc/XYGFK8LR/banner-2.jpg",
    title: "Deals of the Season",
    subtitle: "Limited-time offers on top brands.",
  },
  {
    image: "https://i.postimg.cc/nrJtNbL7/top-view-spa-candles-salt-table.jpg",
    title: "Home Essentials & More",
    subtitle: "Everything you need in one place.",
  },
];

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative">
      <div className="overflow-hidden w-full h-[60vh]" ref={emblaRef}>
        <div className="flex">
          {HERO_SLIDES.map((slide, index) => (
            <div key={index} className="flex-shrink-0 w-full h-[60vh] relative">
              <Image
                src={slide.image}
                alt={`Slide ${index}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-4">{slide.subtitle}</p>
                <Link href="Products">
                  {" "}
                  <Button className="bg-primary px-6 py-2 hover:bg-primary/90 transition">
                    Products
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
        <Button
          onClick={scrollPrev}
          disabled={!prevEnabled}
          variant={"ghost"}
          className=" text-white "
        >
          <ChevronLeft className="w-32 h-32" />
        </Button>
        <Button
          onClick={scrollNext}
          disabled={!nextEnabled}
          variant={"ghost"}
          className=" text-white "
        >
          <ChevronRight />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;

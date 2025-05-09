"use client";

import Image from "next/image";
import { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import Slide1 from "../../../assets/images/offer-1.jpg";
import Slide2 from "../../../assets/images/offer-2.jpg";
import SectionTitle from "@/components/ui/core/SectionTitle";

const slides = [Slide1, Slide2];

const Offer = () => {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  return (
    <div>
      <SectionTitle
        title="Today's Offers"
        subtitle="Don't miss our special limited-time deals"
      />

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((src, index) => (
            <div key={index} className="flex-[0_0_100%]">
              <div className="relative w-screen h-[40vh]">
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offer;

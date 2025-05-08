"use client";

import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { Quote } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    designation: "Frequent Online Shopper",
    quote:
      "EcoMart has completely transformed my online grocery shopping experience. The product range is amazing, and everything arrives fresh and on time.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    designation: "Owner, Rodriguez Organics",
    quote:
      "Joining EcoMart as a vendor was a game-changer for my small business. The platform is easy to use, and I’ve seen a big boost in sales and customer reach.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Aisha Patel",
    designation: "Sustainability Advocate",
    quote:
      "I love how EcoMart allows me to shop sustainably. The eco-friendly packaging and local product options really align with my values.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "Jenny Oliver",
    designation: "Working Professional & Busy Mom",
    quote:
      "EcoMart’s delivery service is super reliable. I placed an urgent order and received it within hours. Definitely my go-to for everyday essentials!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const OPTIONS: EmblaOptionsType = {
  loop: true,
};

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative mt-12 bg-[url('https://i.postimg.cc/GhjcbS0r/newsletter.jpg')] bg-cover bg-center bg-fixed">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className=" px-4">
        <div className="relative z-10 ">
          {/* <div className="text-center mb-12 text-white">
            <h2 className="text-3xl font-bold mb-4 e">What Our Users Say</h2>
            <p className="max-w-2xl mx-auto">
              Hear from our happy customers and trusted vendors who love
              EcoMart.
            </p>
          </div> */}

          <div className="overflow-hidden md:max-w-2xl mx-auto" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 w-full md:px-4"
                >
                  <div className="p-6 rounded-lg relative h-full">
                    <Quote
                      size={32}
                      className="text-white absolute top-4 right-6"
                    />
                    <p className="mb-6 relative z-10 text-gray-300 italic">
                      {`"`}
                      {testimonial.quote}
                      {`"`}
                    </p>
                    <div className="flex items-center justify-center">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={500}
                        height={500}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-primary text-sm">
                          {testimonial.designation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-6 justify-center items-center">
            <Button
              type="button"
              variant="ghost"
              onClick={scrollPrev}
              aria-label="Scroll Left"
              className="hover:text-primary"
            >
              &lt;
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={scrollNext}
              aria-label="Scroll Right"
              className="hover:text-primary"
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

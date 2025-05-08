/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { LoaderCircle } from "lucide-react";

interface PricingPlan {
  title: string;
  price: number;
  description: string;
  features: string[];
}

const OPTIONS: EmblaOptionsType = { loop: true };

const Pricings: React.FC = () => {
  const [data, setData] = useState<PricingPlan[] | null>(null);
  const [loading, setLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}/pricings`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
        } else {
          setData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}/pricings`)
      .then((res) => res.json())
      .then((response) => {
        const pricingData = response.data;
        if (Array.isArray(pricingData)) {
          setData(pricingData);
        } else {
          setData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <LoaderCircle className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-12">
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex gap-4">
          {data?.map((plan, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[90%] sm:w-[80%] md:w-1/2 lg:w-1/4 border shadow-md p-4 rounded-md  mx-auto"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-primary flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-accent">
                  ${plan.price}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {plan.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{plan?.description}</p>
              <ul className="space-y-2 text-sm text-gray-400">
                {plan?.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricings;

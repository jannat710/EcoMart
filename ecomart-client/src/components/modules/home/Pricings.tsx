"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { LoaderCircle } from "lucide-react";
import SectionTitle from "@/components/ui/core/SectionTitle";

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
    const fetchPricing = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/pricings`);
        const json = await res.json();
        const pricingData = Array.isArray(json.data) ? json.data : [];
        setData(pricingData);
      } catch (error) {
        console.error("Failed to fetch pricing:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <LoaderCircle className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  return (
    <section>
      <SectionTitle
        title="Flexible Pricing Plans"
        subtitle="Choose the plan that fits your rental needs"
      />

      <div className="flex flex-col items-center">
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex gap-4">
            {data?.map((plan, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[90%] sm:w-[80%] md:w-1/2 lg:w-1/4 border shadow-md p-4 rounded-md mx-auto"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-primary flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-accent">
                    ${plan.price}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {plan.title}
                </h3>
                <p className="md:text-base text-muted-foreground text-sm mb-4 text-center">
                  {plan.description}
                </p>
                <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                  {plan.features.map((feature, idx) => (
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
    </section>
  );
};

export default Pricings;

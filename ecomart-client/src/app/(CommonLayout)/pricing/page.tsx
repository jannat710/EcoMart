import Pricings from "@/components/modules/home/Pricings";
import SectionBanner from "@/components/ui/core/SectionBannar";
import React from "react";

const PricingPage = () => {
  return (
    <div>
      <SectionBanner title="Pricing" subtitle="Home" />
      <Pricings />
    </div>
  );
};

export default PricingPage;

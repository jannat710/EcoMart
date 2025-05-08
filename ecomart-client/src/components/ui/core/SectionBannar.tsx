import React from "react";
import { Dot } from "lucide-react";
import Image from "next/image";
import Banner from "../../../assets/images/newsletter.jpg";

interface SectionBannerProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
}

const SectionBanner: React.FC<SectionBannerProps> = ({ title, subtitle }) => {
  return (
    <div className="relative w-full h-[30vh] rounded-xl overflow-hidden">
      <Image
        src={Banner}
        alt="Banner"
        layout="fill"
        objectFit="cover"
        className="rounded-xl"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>

        <div className="flex items-center justify-center gap-2 mt-2 text-primary">
          <span className="text-sm md:text-base">{subtitle}</span>
          <Dot className="h-8 w-8" />
          <span className="text-sm md:text-base">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default SectionBanner;

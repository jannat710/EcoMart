import React from "react";
import clsx from "clsx"; // Optional: for cleaner class merging

const BrandLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div>
      <h1
        className={clsx("font-extrabold tracking-widest uppercase", className)}
      >
        <span className="text-primary">Eco</span>
        <span className="inline-block w-2" />
        <span className="">Mart</span>
      </h1>
    </div>
  );
};

export default BrandLogo;

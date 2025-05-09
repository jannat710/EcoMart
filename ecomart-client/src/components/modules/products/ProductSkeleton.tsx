import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="property-card group overflow-hidden transition duration-300 relative">
      <div className="relative overflow-hidden h-48 sm:h-56">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="p-4 space-y-2">
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-3/4 h-5" />
        <div className="flex items-center gap-1 text-sm text-yellow-500 mt-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-4 h-4 bg-yellow-500 rounded-full" />
          ))}
          <Skeleton className="w-16 h-4 bg-muted-foreground" />{" "}
        </div>
        <Skeleton className="w-full h-10 rounded-md" />
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition bg-black/40">
          <div className="grid grid-cols-1 w-full gap-4 px-4">
            <Skeleton className="w-full h-10 rounded-md" />{" "}
            <Skeleton className="w-full h-10 rounded-md" />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;

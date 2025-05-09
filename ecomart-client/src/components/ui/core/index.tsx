"use client";

import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Switch } from "@/components/ui/switch"; // You may need this for inStock toggle

interface SearchFiltersProps {
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;

  brandFilter: string;
  onBrandFilterChange: (value: string) => void;

  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;

  inStockOnly: boolean;
  onInStockOnlyChange: (value: boolean) => void;

  onResetFilters: () => void;
}

const SearchFilters = ({
  priceRange,
  onPriceRangeChange,
  brandFilter,
  onBrandFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  inStockOnly,
  onInStockOnlyChange,
  onResetFilters,
}: SearchFiltersProps) => {
  return (
    <div className="bg-accent p-6 rounded-lg shadow-sm mb-10">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <Slider
            value={priceRange}
            onValueChange={(value) =>
              onPriceRangeChange(value as [number, number])
            }
            min={0}
            max={1000}
            step={10}
            minStepsBetweenThumbs={1}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Brand</label>
          <Input
            type="text"
            placeholder="Search brand..."
            value={brandFilter}
            onChange={(e) => onBrandFilterChange(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="Grocery">Grocery</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Clothing">Clothing</SelectItem>
              <SelectItem value="Beauty">Beauty</SelectItem>
              <SelectItem value="Home">Home</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            In Stock Only
          </label>
          <div className="flex items-center gap-2">
            <Switch
              checked={inStockOnly}
              onCheckedChange={onInStockOnlyChange}
            />
            <span className="text-sm text-muted-foreground">
              {inStockOnly ? "Yes" : "No"}
            </span>
          </div>
        </div>
        <div className="flex items-end">
          <Button
            onClick={onResetFilters}
            variant="outline"
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;

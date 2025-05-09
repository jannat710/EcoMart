"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product.type";
import { getAllProducts } from "@/services/ProductsService";
import ProductSkeleton from "@/components/modules/products/ProductSkeleton";
import ProductCard from "@/components/modules/products/ProductCard";
import SearchFilters from "@/components/ui/core";
import SectionBanner from "@/components/ui/core/SectionBannar";
import SectionTitle from "@/components/ui/core/SectionTitle";

const ITEMS_PER_PAGE = 4;

const ProductsPage = () => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [brandFilter, setBrandFilter] = useState<string | "any">("any");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await getAllProducts();
        setAllProducts(products);
        setFilteredProducts(products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = allProducts.filter((product) => {
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const brandMatch = brandFilter === "any" || product.brand === brandFilter;
      const categoryMatch =
        categoryFilter === "" ||
        product.category.toLowerCase().includes(categoryFilter.toLowerCase());
      const stockMatch = !inStockOnly || product.inStock;

      return priceMatch && brandMatch && categoryMatch && stockMatch;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [allProducts, priceRange, brandFilter, categoryFilter, inStockOnly]);

  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setBrandFilter("any");
    setCategoryFilter("");
    setInStockOnly(false);
  };

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      <SectionBanner title="Products" subtitle="Home" />
      <div className="py-12">
        <SectionTitle
          title="Browse Our Products"
          subtitle=" Find the best deals across all categories"
        />
        <SearchFilters
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          brandFilter={brandFilter}
          onBrandFilterChange={setBrandFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          inStockOnly={inStockOnly}
          onInStockOnlyChange={setInStockOnly}
          onResetFilters={resetFilters}
        />
        {error && (
          <div className="text-center text-red-500 py-10">
            <p>{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </div>
        )}
        {!loading && !error && (
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {currentProducts.length} of {filteredProducts.length}{" "}
              products
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <ProductSkeleton key={idx} />
              ))
            : currentProducts.length > 0
            ? currentProducts.map((product) => (
                <ProductCard key={product._id} {...product} />
              ))
            : !error && (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-lg font-medium mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters to see more results
                  </p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </div>
              )}
        </div>
        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
            <Button onClick={handlePrev} disabled={currentPage === 1}>
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, idx) => {
              const page = idx + 1;
              return (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className={`${page === currentPage ? " text-white " : ""}`}
                >
                  {page}
                </Button>
              );
            })}

            <Button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsPage;

import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import ManageProducts from "@/components/modules/products";
import { getAllProducts } from "@/services/ProductsService";

const AllListsPage = async () => {
  const allProducts = await getAllProducts();
  return (
    <div>
      <HeaderPath role="Admin" subPath="All Products" />
      <ManageProducts allProducts={allProducts} />
    </div>
  );
};

export default AllListsPage;

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IProduct } from "@/types/product.type";
import { deleteProduct } from "@/services/ProductsService";
import ProductCard from "./ProductCard";
import { Trash2, Pencil, Eye } from "lucide-react";

interface ManageProductsProps {
  allProducts: IProduct[];
}

const ManageProducts = ({ allProducts }: ManageProductsProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setProductToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    setDeletingId(productToDelete);
    const toastId = toast.loading("Deleting product...");
    setShowDeleteDialog(false);

    try {
      const res = await deleteProduct(productToDelete);

      if (res?.status) {
        toast.success("Product deleted successfully", { id: toastId });
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to delete product", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred while deleting the product", {
        id: toastId,
      });
    } finally {
      setDeletingId(null);
      setProductToDelete(null);
    }
  };

  return (
    <div className="mx-auto px-4 py-8">
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the product and its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        {allProducts.map((product) => (
          <div key={product._id} className="relative">
            {/* Product Card */}
            <div className=" flex flex-col justify-between h-full">
              <ProductCard {...product} />
              <div className="flex items-center px-2">
                <Link href={`/products/${product._id}`}>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/admin/edit-product/${product._id}`}>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(product._id!)}
                  disabled={deletingId === product._id}
                >
                  {deletingId === product._id ? (
                    <svg
                      className="animate-spin h-4 w-4 text-red-600"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  ) : (
                    <Trash2 className="h-4 w-4 text-red-600" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache";

interface IApiResponse {
  status: boolean;
  data?: any;
  message?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const createProducts = async (
  productData: FieldValues
): Promise<IApiResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!res.ok) {
      throw new Error("Failed to create product");
    }

    const result = await res.json();

    revalidateTag("PRODUCT");

    return result;
  } catch (error: any) {
    return {
      status: false,
      message: error?.message || "Something went wrong",
    };
  }
};

export const getAllProducts = async (): Promise<any[]> => {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const result = await res.json();
    return result.data;
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong");
  }
};

export const getSingleProduct = async (id: string): Promise<any> => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch single product");
    }

    const result = await res.json();
    return result.data;
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong");
  }
};

// export const deleteProduct = async (id: string): Promise<IApiResponse> => {
//   try {
//     const res = await fetch(`${BASE_URL}/products/${id}`, {
//       method: "DELETE",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to delete product");
//     }

//     const result = await res.json();
//     revalidateTag("PRODUCT");
//     return result;
//   } catch (error: any) {
//     return {
//       status: false,
//       message: error?.message || "Something went wrong",
//     };
//   }
// };
export const deleteProduct = async (id: string): Promise<IApiResponse> => {
  try {
    console.log("Sending DELETE request to", `${BASE_URL}/products/${id}`);
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });

    console.log("Delete status:", res.status);

    const result = await res.json();
    console.log("Delete result:", result);

    revalidateTag("PRODUCT");

    return result;
  } catch (error: any) {
    console.error("Delete error:", error);

    return {
      status: false,
      message: error?.message || "Something went wrong",
    };
  }
};

export const updateProduct = async (
  id: string,
  updateProductData: FieldValues
): Promise<IApiResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProductData),
    });

    if (!res.ok) {
      throw new Error("Failed to update product");
    }

    const result = await res.json();

    revalidateTag("PRODUCT");

    return result;
  } catch (error: any) {
    return {
      status: false,
      message: error?.message || "Something went wrong",
    };
  }
};

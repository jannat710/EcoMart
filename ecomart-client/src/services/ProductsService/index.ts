/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache";

export const createProducts = async (productData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const result = await res.json();

    revalidateTag("PRODUCT");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products`, {
      cache: "no-store",
    });

    const result = await res.json();
    return result.data;
  } catch (error: any) {
    return Error(error);
  }
};
export const getSingleProduct = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`,
      {
        cache: "no-store",
      }
    );

    const result = await res.json();
    return result.data;
  } catch (error: any) {
    return Error(error);
  }
};
export const deleteProduct = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await res.json();
    revalidateTag("PRODUCT");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const updateProduct = async (
  id: string,
  updateProductData: FieldValues
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProductData),
      }
    );

    const result = await res.json();

    revalidateTag("PRODUCT");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

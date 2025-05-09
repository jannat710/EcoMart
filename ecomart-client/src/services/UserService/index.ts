/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IUser } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Get all users (Admin only)
export const getAllUsers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`, {
      next: {
        tags: ["USERS"],
      },
    });

    const result = await res.json();
    return result.data;
  } catch (error: any) {
    return Error(error);
  }
};

// Get single user (Authenticated)
// export const getSingleUser = async (userId: string) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`,
//       {
//         headers: {
//           Authorization: (await cookies()).get("accessToken")?.value || "",
//         },
//         cache: "no-store",
//         next: {
//           tags: ["USER"],
//         },
//       }
//     );

//     if (!res.ok) {
//       const error = await res.json();
//       throw new Error(error.message || "Failed to fetch user");
//     }

//     const result = await res.json();
//     return result.data;
//   } catch (error: any) {
//     throw new Error(error.message || "Failed to fetch user");
//   }
// };
export const getSingleUser = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`, {
      headers: {
        Authorization: (await cookies()).get("accessToken")?.value || "",
      },
      cache: "no-store",
      next: {
        tags: ["USER"],
      },
    });

    const result = await res.json();
    return result.data;
  } catch (error: any) {
    return Error(error);
  }
};

// Toggle active/inactive status (Admin only)
export const updateUserActiveStatus = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/activation/${userId}`,
      {
        method: "PATCH",
      }
    );

    const result = await res.json();
    revalidateTag("USERS");
    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to update user status");
  }
};

// Change user role (Admin only)
export const updateUserRole = async (
  userId: string,
  role: "admin" | "customer"
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/change-role/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update user role");
    }

    const result = await res.json();
    revalidateTag("USERS");
    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to update user role");
  }
};

// Update user profile (Authenticated)

export const updateProfile = async (
  id: string,
  formData: Pick<IUser, "name" | "email">
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(
        `Failed to update user role: ${error.message || "Unknown error"}`
      );
    }

    const result = await res.json();
    revalidateTag("USER");
    return result.data;
  } catch (error) {
    throw error;
  }
};

// Update password
export const updatePassword = async (
  id: string,
  formData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
) => {
  if (formData.newPassword !== formData.confirmPassword) {
    throw new Error("Passwords do not match");
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/update-password/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update password");
    }

    const result = await res.json();
    revalidateTag("USER");
    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to update password");
  }
};

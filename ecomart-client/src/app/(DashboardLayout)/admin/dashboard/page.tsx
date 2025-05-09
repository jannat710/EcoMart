import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/core/charts";

import { getAllProducts } from "@/services/ProductsService";
import { getAllUsers } from "@/services/UserService";
import { IUser } from "@/types";
import { IProduct } from "@/types/product.type";
import { Boxes, Check, PackageCheck, PackageX, Users, X } from "lucide-react";
import Link from "next/link";

const AdminDashboard = async () => {
  const [users, products] = await Promise.all([
    getAllUsers(),
    getAllProducts(),
  ]);
  // User data
  const activeUsers =
    users.length && users.filter((u: IUser) => u.isActive).length;
  const blockedUsers = users.length && users.length - activeUsers;
  // Product data
  const inStock = products.filter((p: IProduct) => p.inStock).length;
  const outOfStock = products.length - inStock;
  // Chart data
  const barChartData = {
    labels: ["Users", "Products"],
    datasets: [
      {
        label: "Active",
        data: [activeUsers, inStock],
        backgroundColor: "#10b981",
      },
      {
        label: "Inactive",
        data: [blockedUsers, outOfStock],
        backgroundColor: "#ef4444",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <HeaderPath role="Admin" subPath="Dashboard" />
      {/* Users Card */}
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Users Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <div className="flex items-center justify-between mt-4">
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Check className="h-4 w-4 mr-1 text-green-500" />
                  <span>Active: {activeUsers}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <X className="h-4 w-4 mr-1 text-red-500" />
                  <span>Blocked: {blockedUsers}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/allUsers">Manage</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Boxes className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <div className="flex items-center justify-between mt-4">
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <PackageCheck className="h-4 w-4 mr-1 text-green-500" />
                  <span>In Stock: {inStock}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <PackageX className="h-4 w-4 mr-1 text-red-500" />
                  <span>Out of Stock: {outOfStock}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/allProducts">Manage</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Bar Chart - Users vs Rentals */}
        <Card>
          <CardHeader>
            <CardTitle>Users & Rentals Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <BarChart data={barChartData} />
          </CardContent>
        </Card>

        {/* Pie Chart - Request Status */}
      </div>
    </div>
  );
};

export default AdminDashboard;

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Home,
  LayoutDashboard,
  Loader,
  User,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/types";
import { protectedRoutes } from "@/constants";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout, isLoading, setUser, setIsLoading } = useUser();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = async () => {
    await logout();
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getCurrentUser();
      if (res) {
        setUser(res as IUser);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
  ];

  return (
    <nav className="bg-accent shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <h1 className="text-xl font-extrabold tracking-widest uppercase text-primary">
            <span className="text-primary">Eco</span>
            <span className="inline-block w-2" />
            <span className="text-gray-800">Mart</span>
          </h1>
        </Link>
        <nav className="hidden md:flex space-x-8 items-center">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.path}
              className={
                isActive(link.path)
                  ? "text-primary flex items-center gap-1"
                  : "text-gray-600 hover:text-primary flex items-center gap-1"
              }
            >
              <span>{link.name}</span>
            </Link>
          ))}

          {isLoading ? (
            <Button variant="default" className="">
              <Loader className="animate-spin" />
            </Button>
          ) : user ? (
            <div className="relative">
              <Button
                variant="default"
                className=" cursor-pointer"
                onClick={toggleProfile}
              >
                <User size={16} />
                <span>Profile</span>
              </Button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    href={
                      user?.role == "admin"
                        ? "/admin/dashboard"
                        : "/user/dashboard"
                    }
                    className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link href="/register">
                <Button variant="default" className="  cursor-pointer">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </nav>

        <div className="flex justify-between items-center">
          <ModeToggle />
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-2 -right-3  text-xs rounded-full px-2 text-primary">
              {/* {cart.length} */}1
            </span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.path}
                className={
                  isActive(link.path)
                    ? " flex items-center gap-2 pl-1"
                    : "text-gray-600  py-2 flex items-center gap-2"
                }
                onClick={toggleMenu}
              >
                <Home size={16} />
                <span>{link.name}</span>
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  href={`/${user?.role}/dashboard`}
                  className="text-gray-600 py-2 flex items-center gap-2"
                  onClick={toggleMenu}
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 py-2 flex items-center gap-2 w-full"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link href="/login" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={toggleMenu}>
                  <Button variant="default" className="w-full ">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

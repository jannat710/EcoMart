"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  LayoutDashboard,
  Loader,
  User,
  LogOut,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { IUser } from "@/types";
import { protectedRoutes } from "@/constants";
import { ModeToggle } from "../mode-toggle";
import BrandLogo from "./BrandLogo";
import { getCurrentUser } from "@/services/AuthService";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => {
    const [basePath] = path.split("#");
    return pathname === basePath;
  };
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
  }, [setIsLoading, setUser]);

  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-accent shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <BrandLogo />
        </Link>
        <nav className="hidden md:flex space-x-8 items-center">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.path}
              className={
                isActive(link.path)
                  ? "text-primary flex items-center gap-1"
                  : "text-foreground hover:text-primary flex items-center gap-1"
              }
            >
              <span>{link.name}</span>
            </Link>
          ))}
          {/* Mega Menu */}
          <div className="relative group">
            <button className="text-foreground hover:text-primary flex items-center gap-1">
              Pages <ChevronDown size={16} />
            </button>
            <div className="absolute left-0 top-full bg-accent shadow-lg p-4 hidden group-hover:block w-48 z-40">
              <Link
                href="/help-centre#news"
                className="text-foreground flex items-center gap-2 hover:text-primary"
              >
                News
              </Link>
              <Link
                href="/help-centre#faq"
                className="text-foreground flex items-center gap-2 hover:text-primary py-2"
              >
                FAQ
              </Link>
              <Link
                href="/help-centre#privacy"
                className="text-foreground flex items-center gap-2 hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/404"
                className="text-foreground pt-2 flex items-center gap-2 hover:text-primary"
              >
                404 Page
              </Link>
            </div>
          </div>
          {isLoading ? (
            <Button variant="default" className="">
              <Loader className="animate-spin" />
            </Button>
          ) : user ? (
            <div className="relative text-foreground">
              <Button
                variant="default"
                className=" cursor-pointer "
                onClick={toggleProfile}
              >
                <User size={16} />
                <span className="">Profile</span>
              </Button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-accent rounded-md shadow-lg py-1 z-50">
                  <Link
                    href={
                      user?.role == "admin"
                        ? "/admin/dashboard"
                        : "/user/dashboard"
                    }
                    className=" px-4 py-2 text-sm text-foreground hover:text-primary flex items-center gap-2"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-foreground hover:text-primary flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link href="/login">
                <Button variant="default" className="  cursor-pointer">
                  Login
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
          className="md:hidden text-foreground focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden min-h-screen bg-accent px-4 pt-2 pb-4 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.path}
                className={
                  isActive(link.path)
                    ? " flex items-center gap-2 pl-1 text-primary"
                    : "text-foreground  py-2 flex items-center gap-2"
                }
                onClick={toggleMenu}
              >
                <span>{link.name}</span>
              </Link>
            ))}
            {/* Mobile Mega Menu Section */}
            <>
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-foreground py-2">
                  <span className="flex items-center gap-2">Pages</span>
                  <ChevronDown
                    size={16}
                    className="group-open:rotate-180 transition-transform"
                  />
                </summary>
                <div className="pl-4 mt-2 space-y-8">
                  <Link
                    href="/help-centre#news"
                    className="block text-sm text-foreground hover:text-primary pt-4"
                    onClick={toggleMenu}
                  >
                    News
                  </Link>
                  <Link
                    href="/404"
                    className="block text-sm text-foreground hover:text-primary"
                    onClick={toggleMenu}
                  >
                    404 Page
                  </Link>
                </div>
              </details>
            </>

            {user ? (
              <>
                <Link
                  href={`/${user?.role}/dashboard`}
                  className="text-foreground py-2 flex items-center gap-2"
                  onClick={toggleMenu}
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-foreground py-2 flex items-center gap-2 w-full"
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

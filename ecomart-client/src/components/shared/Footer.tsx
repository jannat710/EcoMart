import Link from "next/link";
import BrandLogo from "./BrandLogo";

const Footer = () => {
  return (
    <footer className="bg-accent py-8 border-t">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
        {/* Brand and Navigation */}
        <div>
          <div className="space-y-2">
            <BrandLogo className="text-2xl" />
            <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm  text-gray-500">
              <Link href="/" className="hover:text-primary transition">
                Home
              </Link>
              <Link href="/about" className="hover:text-primary transition">
                About
              </Link>
              <Link href="/products" className="hover:text-primary transition">
                Products
              </Link>
              <Link href="/pricing" className="hover:text-primary transition">
                Pricing
              </Link>
              <Link href="/contact" className="hover:text-primary transition">
                Contact
              </Link>
              <Link
                href="/help-centre"
                className="hover:text-primary transition"
              >
                Help Centre
              </Link>
            </nav>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 text-primary">
          <a
            href="https://www.facebook.com/jannatulfee"
            className="border px-4 py-2 hover:bg-primary hover:text-white transition"
          >
            Facebook
          </a>
          <a
            href="https://x.com/jannatul_zz"
            className="border px-4 py-2 hover:bg-primary hover:text-white transition"
          >
            Twitter
          </a>
          <a
            href="https://github.com/jannat710"
            className="border px-4 py-2 hover:bg-primary hover:text-white transition"
          >
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/jannatul38/"
            className="border px-4 py-2 hover:bg-primary hover:text-white transition"
          >
            LinkedIn
          </a>
        </div>

        {/* Credit */}
        <p className="text-sm text-gray-400">
          Created by{" "}
          <span className="font-semibold text-primary">Jannatul Ferdous</span> |
          All rights reserved © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-accent py-8 mt-12 border-t">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
        {/* Brand and Navigation */}
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold tracking-widest uppercase text-primary">
            <span className="text-primary">Eco</span>
            <span className="inline-block w-2" />
            <span className="text-gray-800">Mart</span>
          </h1>
          <nav className="flex justify-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-primary transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-primary transition">
              About
            </Link>
            <Link href="/products" className="hover:text-primary transition">
              Products
            </Link>
            <Link href="/contact" className="hover:text-primary transition">
              Contact
            </Link>
          </nav>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 text-primary">
          <a
            href="#"
            className="border px-4 py-2 hover:bg-primary hover:text-white transition"
          >
            Facebook
          </a>
          <a
            href="#"
            className="border px-4 py-2 hover:bg-primary hover:text-white transition"
          >
            Twitter
          </a>
          <a
            href="#"
            className="border px-4 py-2 hover:bg-primary hover:text-white transition"
          >
            Instagram
          </a>
          <a
            href="#"
            className="border px-4 py-2 hover:bg-primary hover:text-white transition"
          >
            Pinterest
          </a>
          <a
            href="#"
            className="border px-4 py-2 hover:bg-primary hover:text-white transition"
          >
            LinkedIn
          </a>
        </div>

        {/* Credit */}
        <p className="text-sm text-gray-500">
          Created by{" "}
          <span className="font-semibold text-primary">Jannatul Ferdous</span> |
          All rights reserved © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

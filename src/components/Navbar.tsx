"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, Search, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";

const navLinks = [
  { href: "/collections", label: "Collections" },
  { href: "/bespoke", label: "Bespoke" },
  { href: "/heritage", label: "Heritage" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useStore((s) => s.cartCount());
  const wishlistCount = useStore((s) => s.wishlist.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled
            ? "bg-obsidian/90 backdrop-blur-md border-b border-silver/10"
            : "bg-transparent"
        }`}
      >
        <div className="container-luxury flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl tracking-[4px] text-white relative group"
          >
            AnexaraWorld
            <span className="absolute -bottom-px left-0 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-ui text-[0.7rem] tracking-[2px] uppercase relative group transition-colors duration-300 ${
                  pathname === href ? "text-gold" : "text-silver hover:text-white"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-px left-0 h-px bg-gold transition-transform duration-500 origin-left ${
                    pathname === href ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Search"
              className="text-silver hover:text-white transition-colors duration-300 p-1"
            >
              <Search size={18} />
            </button>

            <button
              aria-label={`Wishlist (${wishlistCount} items)`}
              className="text-silver hover:text-white transition-colors duration-300 p-1 relative"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-neon text-obsidian text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              aria-label={`Shopping bag (${cartCount} items)`}
              className="text-silver hover:text-white transition-colors duration-300 p-1 relative"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-neon text-obsidian text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((p) => !p)}
              className="md:hidden text-silver hover:text-white transition-colors duration-300 p-1"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-0 z-[999] bg-obsidian/98 backdrop-blur-lg flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-3xl tracking-[6px] uppercase text-white hover:text-gold transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

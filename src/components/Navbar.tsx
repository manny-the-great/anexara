"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, Search, Menu, X, ArrowLeft } from "lucide-react";
import { useStore } from "@/lib/store";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-ink-soft/10 ${
          scrolled ? "backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        style={scrolled ? { backgroundColor: "var(--t-canvas)", opacity: 0.97 } : {}}
      >
        <div className="container-luxury flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="relative h-10 w-36 block group"
          >
            <Image
              src="/assets/brand_logo.PNG"
              alt="AnexaraWorld Logo"
              fill
              className="object-contain object-left filter brightness-100"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-ui text-[0.7rem] tracking-[2px] uppercase relative group transition-colors duration-300 ${
                  pathname === href ? "text-gold" : "text-ink-soft hover:text-ink"
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
            {/* Theme Toggle */}
            <ThemeToggle />

            <button
              aria-label="Search"
              className="text-ink-soft hover:text-ink transition-colors duration-300 p-1"
            >
              <Search size={18} />
            </button>

            <button
              aria-label={`Wishlist (${wishlistCount} items)`}
              className="text-ink-soft hover:text-ink transition-colors duration-300 p-1 relative"
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
              className="text-ink-soft hover:text-ink transition-colors duration-300 p-1 relative"
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
              className="md:hidden text-ink-soft hover:text-ink transition-colors duration-300 p-1"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel — always dark overlay regardless of theme */}
      <div
        className={`fixed inset-0 z-[999] backdrop-blur-xl flex flex-col justify-between p-8 transition-all duration-500 md:hidden ${
          mobileOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(10,10,10,0.98)" }}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between border-b border-silver/5 pb-4 mt-2">
          <div className="relative h-8 w-28">
            <Image
              src="/assets/brand_logo.PNG"
              alt="AnexaraWorld Logo"
              fill
              className="object-contain object-left"
            />
          </div>
          
          {/* Close / Go Back Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-silver hover:text-white transition-colors duration-300 font-ui text-[10px] tracking-[2px] uppercase border border-silver/10 px-4 py-2 bg-obsidian-card"
            style={{ borderRadius: "0 10px 0 10px" }}
          >
            <ArrowLeft size={14} className="text-gold" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Mobile Menu Links */}
        <nav className="flex flex-col gap-8 my-auto pl-4">
          {[
            { href: "/collections", label: "Collections", num: "01", desc: "Haute Couture & Ready-to-Wear" },
            { href: "/bespoke", label: "Bespoke", num: "02", desc: "Live Configurator & Fittings" },
            { href: "/heritage", label: "Heritage", num: "03", desc: "The House Craftsmanship & Story" },
            { href: "/contact", label: "Contact", num: "04", desc: "Showrooms & VIP Client Care" },
          ].map(({ href, label, num, desc }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="group flex items-start gap-4 transition-all duration-300"
            >
              <span className="font-display text-xs text-gold mt-1.5">{num}</span>
              <div className="flex flex-col gap-1">
                <span className="font-display text-2xl tracking-[4px] uppercase text-white group-hover:text-gold transition-colors duration-300">
                  {label}
                </span>
                <span className="font-body text-[10px] text-silver/50 tracking-[1px] uppercase font-light">
                  {desc}
                </span>
              </div>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Footer */}
        <div className="border-t border-silver/5 pt-6 flex flex-col gap-4 items-center">
          <div className="flex gap-6">
            <a
              href="https://wa.me/2348136828387"
              target="_blank"
              rel="noopener noreferrer"
              className="text-silver/50 hover:text-gold transition-colors text-xs font-ui tracking-[1px]"
            >
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/anexaraworld"
              target="_blank"
              rel="noopener noreferrer"
              className="text-silver/50 hover:text-gold transition-colors text-xs font-ui tracking-[1px]"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@anexaraworld"
              target="_blank"
              rel="noopener noreferrer"
              className="text-silver/50 hover:text-gold transition-colors text-xs font-ui tracking-[1px]"
            >
              TikTok
            </a>
          </div>
          <p className="font-ui text-[8px] tracking-[2px] text-silver/30 uppercase">
            &copy; {new Date().getFullYear()} AnexaraWorld. All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
}

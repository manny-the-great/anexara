"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-canvas border-t border-ink-soft/10 pt-20 pb-10">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Brand Manifesto & Newsletter */}
          <div className="flex flex-col gap-8 max-w-lg">
            <Link href="/" className="relative h-12 w-48 block group">
              <Image
                src="/assets/brand_logo.PNG"
                alt="AnexaraWorld Logo"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="font-accent text-lg text-ink-soft/80 italic leading-relaxed">
              Defy Gravity. Embrace Elegance. Where futuristic design sensibility meets timeless craftsmanship.
            </p>
            
            <div className="mt-4">
              <h5 className="font-ui text-xs tracking-[2px] uppercase text-gold mb-4">Join the Inner Circle</h5>
              {subscribed ? (
                <p className="font-ui text-xs tracking-[1px] text-neon uppercase">Welcome to the Inner Circle.</p>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-4 border-b border-ink-soft/30 pb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL"
                    required
                    className="flex-1 bg-transparent text-ink font-ui text-xs tracking-[2px] uppercase placeholder-text-muted focus:outline-none text-center lg:text-left"
                  />
                  <button
                    type="submit"
                    className="font-ui text-xs tracking-[2px] uppercase text-ink-soft hover:text-gold transition-colors duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col gap-6">
              <h5 className="font-ui text-[0.75rem] tracking-[2px] uppercase text-ink font-semibold">Collections</h5>
              <ul className="flex flex-col gap-4 text-xs tracking-[1px] text-ink-soft/70 font-ui uppercase">
                <li>
                  <Link href="/collections?filter=couture" className="hover:text-gold transition-colors duration-300">
                    Haute Couture
                  </Link>
                </li>
                <li>
                  <Link href="/collections?filter=rtw" className="hover:text-gold transition-colors duration-300">
                    Ready-To-Wear
                  </Link>
                </li>
                <li>
                  <Link href="/collections?filter=bridal" className="hover:text-gold transition-colors duration-300">
                    Bridal Overview
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h5 className="font-ui text-[0.75rem] tracking-[2px] uppercase text-ink font-semibold">Bespoke</h5>
              <ul className="flex flex-col gap-4 text-xs tracking-[1px] text-ink-soft/70 font-ui uppercase">
                <li>
                  <Link href="/bespoke" className="hover:text-gold transition-colors duration-300">
                    Custom Draping
                  </Link>
                </li>
                <li>
                  <Link href="/bespoke" className="hover:text-gold transition-colors duration-300">
                    Atelier Bookings
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gold transition-colors duration-300">
                    VIP Client Care
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h5 className="font-ui text-[0.75rem] tracking-[2px] uppercase text-ink font-semibold">Heritage</h5>
              <ul className="flex flex-col gap-4 text-xs tracking-[1px] text-ink-soft/70 font-ui uppercase">
                <li>
                  <Link href="/heritage" className="hover:text-gold transition-colors duration-300">
                    About the House
                  </Link>
                </li>
                <li>
                  <Link href="/heritage" className="hover:text-gold transition-colors duration-300">
                    Craftsmanship
                  </Link>
                </li>
                <li>
                  <Link href="/heritage" className="hover:text-gold transition-colors duration-300">
                    Sustainability
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-ink-soft/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-ui text-[0.65rem] tracking-[2px] text-ink-soft/50 uppercase">
            &copy; {new Date().getFullYear()} AnexaraWorld Fashion. All Rights Reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <a href="https://wa.me/2348136828387" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-silver/50 hover:text-gold transition-colors duration-300">
                {/* WhatsApp SVG */}
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.66.986 3.296 1.489 4.905 1.492 5.288.002 9.593-4.299 9.596-9.591.002-2.564-1.002-4.971-2.81-6.78-1.808-1.81-4.218-2.81-6.786-2.812-5.293 0-9.6 4.309-9.603 9.601-.001 1.705.474 3.374 1.372 4.838L1.921 21.21l4.726-1.24c.004-.002.006-.003.01-.005.163.087.329.171.497.252z"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/anexaraworld" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-silver/50 hover:text-gold transition-colors duration-300">
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@anexaraworld" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-silver/50 hover:text-gold transition-colors duration-300">
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31.03 2.61.18 3.86.5-.08 1.54.43 3.03 1.48 4.1 1.08 1.1 2.58 1.69 4.135 1.67v3.74c-1.89-.01-3.71-.62-5.23-1.74-.18-.13-.35-.27-.51-.42v6.86c.01 2.11-.7 4.15-2.01 5.76-1.45 1.77-3.66 2.82-5.99 2.82-2.22 0-4.34-.96-5.83-2.61a9.92 9.92 0 0 1-2.115-6.24c0-2.46 1.07-4.8 2.94-6.38 1.78-1.5 4.12-2.25 6.46-2.07v3.71c-1.2-.1-2.41.22-3.37 1.02-.91.76-1.43 1.9-1.43 3.1 0 .97.34 1.91.97 2.65.65.77 1.63 1.21 2.66 1.21.9 0 1.76-.33 2.42-.92.74-.66 1.16-1.61 1.16-2.61V.02z"/>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
// Since social icons are representing standard brands, using custom inline SVGs matches custom brand layouts perfectly.

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
    <footer className="bg-obsidian border-t border-silver/10 pt-20 pb-10">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Brand Manifesto & Newsletter */}
          <div className="flex flex-col gap-8 max-w-lg">
            <Link href="/" className="font-display text-2xl tracking-[4px] uppercase text-white">
              Antigravity<span className="text-gold">.</span>
            </Link>
            <p className="font-accent text-lg text-silver/80 italic leading-relaxed">
              Defy Gravity. Embrace Elegance. Where futuristic design sensibility meets timeless craftsmanship.
            </p>
            
            <div className="mt-4">
              <h5 className="font-ui text-xs tracking-[2px] uppercase text-gold mb-4">Join the Inner Circle</h5>
              {subscribed ? (
                <p className="font-ui text-xs tracking-[1px] text-neon uppercase">Welcome to the Inner Circle.</p>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-4 border-b border-silver/30 pb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL"
                    required
                    className="flex-1 bg-transparent text-white font-ui text-xs tracking-[2px] uppercase placeholder-text-muted focus:outline-none text-center lg:text-left"
                  />
                  <button
                    type="submit"
                    className="font-ui text-xs tracking-[2px] uppercase text-white hover:text-gold transition-colors duration-300"
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
              <h5 className="font-ui text-[0.75rem] tracking-[2px] uppercase text-white font-semibold">Collections</h5>
              <ul className="flex flex-col gap-4 text-xs tracking-[1px] text-silver/70 font-ui uppercase">
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
              <h5 className="font-ui text-[0.75rem] tracking-[2px] uppercase text-white font-semibold">Bespoke</h5>
              <ul className="flex flex-col gap-4 text-xs tracking-[1px] text-silver/70 font-ui uppercase">
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
              <h5 className="font-ui text-[0.75rem] tracking-[2px] uppercase text-white font-semibold">Heritage</h5>
              <ul className="flex flex-col gap-4 text-xs tracking-[1px] text-silver/70 font-ui uppercase">
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
        <div className="border-t border-silver/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-ui text-[0.65rem] tracking-[2px] text-silver/50 uppercase">
            &copy; {new Date().getFullYear()} ANTIGRAVITY Fashion. All Rights Reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <a href="#" aria-label="Instagram" className="text-silver/50 hover:text-gold transition-colors duration-300">
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="#" aria-label="Pinterest" className="text-silver/50 hover:text-gold transition-colors duration-300">
                {/* Pinterest custom SVG */}
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.396-5.914 1.396-5.914s-.356-.715-.356-1.777c0-1.664.962-2.907 2.167-2.907 1.02 0 1.513.765 1.513 1.683 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 0 1 .083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.173.264-.398.158-1.482-.689-2.412-2.852-2.412-4.594 0-3.742 2.721-7.178 7.842-7.178 4.116 0 7.313 2.933 7.313 6.85 0 4.09-2.578 7.382-6.156 7.382-1.202 0-2.332-.624-2.718-1.362l-.742 2.827c-.269 1.037-.998 2.339-1.488 3.136 1.12.345 2.306.53 3.538.53 6.621 0 11.988-5.366 11.988-11.986C23.987 5.367 18.638 0 12.017 0z"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="#" aria-label="TikTok" className="text-silver/50 hover:text-gold transition-colors duration-300">
                {/* TikTok custom SVG */}
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31.03 2.61.18 3.86.5-.08 1.54.43 3.03 1.48 4.1 1.08 1.1 2.58 1.69 4.135 1.67v3.74c-1.89-.01-3.71-.62-5.23-1.74-.18-.13-.35-.27-.51-.42v6.86c.01 2.11-.7 4.15-2.01 5.76-1.45 1.77-3.66 2.82-5.99 2.82-2.22 0-4.34-.96-5.83-2.61a9.92 9.92 0 0 1-2.115-6.24c0-2.46 1.07-4.8 2.94-6.38 1.78-1.5 4.12-2.25 6.46-2.07v3.71c-1.2-.1-2.41.22-3.37 1.02-.91.76-1.43 1.9-1.43 3.1 0 .97.34 1.91.97 2.65.65.77 1.63 1.21 2.66 1.21.9 0 1.76-.33 2.42-.92.74-.66 1.16-1.61 1.16-2.61V.02z"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="#" aria-label="YouTube" className="text-silver/50 hover:text-gold transition-colors duration-300">
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.556a3.003 3.003 0 0 0-2.11 2.107C0 8.017 0 12 0 12s0 3.982.502 5.837a3.003 3.003 0 0 0 2.11 2.107C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.556a3.003 3.003 0 0 0 2.11-2.107C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

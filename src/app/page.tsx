"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterJoined, setNewsletterJoined] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterJoined(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-obsidian">
      {/* ── Cinematic Hero Section ── */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/Background.jpg"
            alt="AnexaraWorld Gold Embroidered Obsidian Gown"
            fill
            priority
            className="object-cover object-[center_15%] brightness-[0.4] scale-105 select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="container-luxury relative z-10 w-full">
          <Reveal delay={0.2} duration={1.2} yOffset={50}>
            <span className="font-ui text-xs tracking-[4px] uppercase text-gold mb-4 block">
              Anexara World
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-[-1px] leading-tight text-white mb-6">
              Defy Gravity.<br />
              <span className="text-silver italic">Embrace Elegance.</span>
            </h1>
            <p className="font-body text-silver/80 text-sm md:text-base max-w-md tracking-[0.5px] mb-10 leading-relaxed font-light">
              Where futuristic design sensibility meets timeless craftsmanship.
            </p>
            <Link href="/collections" className="btn-luxury btn-gold">
              Enter the Atelier
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Design Philosophy & Manifesto ── */}
      <section className="section bg-obsidian">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Asymmetrical Image block */}
            <Reveal delay={0.1} className="relative group">
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden border border-silver/10">
                <Image
                  src="/assets/_OLA9806.JPG.jpg"
                  alt="AnexaraWorld Atelier Sketching"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-4 left-4 font-accent text-xs text-silver/60 italic">
                AnexaraWorld Lagos Atelier, 2026
              </div>
            </Reveal>

            {/* Right Column: Narrative & Counter stats */}
            <div className="flex flex-col justify-center">
              <Reveal delay={0.3}>
                <span className="font-ui text-[10px] tracking-[4px] uppercase text-gold-dim border border-gold/20 px-3 py-1 rounded-full mb-6 inline-block">
                  The Manifesto
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-white mb-8 tracking-[0.5px] leading-snug">
                  Defying Conventions in High Fashion
                </h2>
                <p className="font-body text-silver/70 text-sm leading-relaxed mb-6 font-light">
                  AnexaraWorld was born from a desire to liberate the female silhouette. We design with structural weightlessness in mind-crafting garments that flow organically, respond dynamically to motion, and command presence.
                </p>
                <p className="font-body text-silver/70 text-sm leading-relaxed mb-10 font-light">
                  Every piece is engineered in our Lagos workshop, blending architectural draping techniques with sustainable luxury textiles. We don&apos;t just dress the body; we elevate it.
                </p>
              </Reveal>

              {/* Counters */}
              <Reveal delay={0.4} className="grid grid-cols-3 gap-6 border-t border-silver/15 pt-8">
                <div className="text-center lg:text-left">
                  <span className="font-ui text-[10px] tracking-[2px] uppercase text-silver/50 block">Est.</span>
                  <AnimatedCounter value={2018} />
                </div>
                <div className="text-center lg:text-left">
                  <span className="font-ui text-[10px] tracking-[2px] uppercase text-silver/50 block">Editions</span>
                  <AnimatedCounter value={15} />
                </div>
                <div className="text-center lg:text-left">
                  <span className="font-ui text-[10px] tracking-[2px] uppercase text-silver/50 block">Ethical</span>
                  <AnimatedCounter value={100} suffix="%" />
                </div>
              </Reveal>

              <Reveal delay={0.5} className="mt-12">
                <Link href="/heritage" className="btn-luxury">
                  Discover Our Story
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Collections Showcase ── */}
      <section className="section border-y border-silver/10 bg-obsidian-card">
        <div className="container-luxury">
          <Reveal className="text-center mb-16">
            <span className="font-ui text-xs tracking-[4px] uppercase text-gold mb-2 block">Selected Works</span>
            <h2 className="font-display text-3xl sm:text-4xl text-white">The Seasonal Collections</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Couture */}
            <Reveal delay={0.2} className="group relative aspect-[3/4] overflow-hidden border border-silver/10 cursor-pointer">
              <Link href="/collections?filter=couture">
                <Image
                  src="/assets/_OLA0933.JPG.jpg"
                  alt="AnexaraWorld Haute Couture Collection"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 brightness-90 group-hover:brightness-[0.7]"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-obsidian via-transparent to-transparent">
                  <span className="font-ui text-[9px] tracking-[2px] uppercase text-gold mb-2 block">Defy Expectations</span>
                  <h3 className="font-display text-xl text-white mb-4">Haute Couture</h3>
                  <span className="font-ui text-[9px] tracking-[2px] uppercase text-white flex items-center gap-2 group-hover:text-gold transition-colors">
                    Explore Collection <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* Card 2: RTW */}
            <Reveal delay={0.3} className="group relative aspect-[3/4] overflow-hidden border border-silver/10 cursor-pointer">
              <Link href="/collections?filter=rtw">
                <Image
                  src="/assets/TAP_1302.jpg"
                  alt="AnexaraWorld Ready-to-Wear Collection"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 brightness-90 group-hover:brightness-[0.7]"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-obsidian via-transparent to-transparent">
                  <span className="font-ui text-[9px] tracking-[2px] uppercase text-gold mb-2 block">Daily Elevation</span>
                  <h3 className="font-display text-xl text-white mb-4">Ready-To-Wear</h3>
                  <span className="font-ui text-[9px] tracking-[2px] uppercase text-white flex items-center gap-2 group-hover:text-gold transition-colors">
                    Explore Collection <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* Card 3: Bridal */}
            <Reveal delay={0.4} className="group relative aspect-[3/4] overflow-hidden border border-silver/10 cursor-pointer">
              <Link href="/collections?filter=bridal">
                <Image
                  src="/assets/_OLA9760.JPG.jpg"
                  alt="AnexaraWorld Bridal Collection"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 brightness-90 group-hover:brightness-[0.7]"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-obsidian via-transparent to-transparent">
                  <span className="font-ui text-[9px] tracking-[2px] uppercase text-gold mb-2 block">Ethereal Grace</span>
                  <h3 className="font-display text-xl text-white mb-4">Modern Bridal</h3>
                  <span className="font-ui text-[9px] tracking-[2px] uppercase text-white flex items-center gap-2 group-hover:text-gold transition-colors">
                    Explore Collection <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Inner Circle Newsletter ── */}
      <section className="section bg-obsidian">
        <div className="container-luxury">
          <Reveal className="max-w-2xl mx-auto text-center">
            <span className="font-ui text-xs tracking-[4px] uppercase text-gold mb-4 block">Exclusive Privileges</span>
            <h2 className="font-display text-3xl sm:text-4xl text-white mb-6">Join the Inner Circle</h2>
            <p className="font-accent text-lg text-silver/70 italic mb-10">
              Subscribe to receive private lookbook previews, limited edition drops, and invitations to showroom exhibitions.
            </p>

            {newsletterJoined ? (
              <p className="font-ui text-sm tracking-[2px] text-neon uppercase py-4">
                Thank you. You have been added to the Private Inner Circle.
              </p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto border-b border-silver/30 pb-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL"
                  required
                  className="flex-1 bg-transparent text-white font-ui text-xs tracking-[2px] uppercase text-center sm:text-left focus:outline-none placeholder-text-muted"
                />
                <button type="submit" className="btn-luxury btn-gold !py-2 !px-6 text-[10px]">
                  Subscribe
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}

"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Heritage() {
  return (
    <div className="min-h-screen bg-obsidian text-white pt-28">
      {/* Header Banner */}
      <section className="py-12 border-b border-silver/10">
        <div className="container-luxury">
          <Reveal>
            <span className="font-ui text-[10px] tracking-[4px] uppercase text-gold block mb-2">
              The Heritage
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-white tracking-[0.5px]">
              About the House
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="section bg-obsidian">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal delay={0.1}>
              <span className="font-ui text-[10px] tracking-[3px] uppercase text-gold mb-4 block">
                The Origins
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-white mb-6 leading-tight tracking-[0.5px]">
                Avant-Garde Structure Meet Parisian Draping
              </h2>
              <p className="font-body text-silver/70 text-sm leading-relaxed mb-6 font-light">
                Founded in Paris, AnexaraWorld was established to explore the relationship between architectural space and the human body. Our focus is gravity-defying, structural silhouettes that offer absolute freedom of movement.
              </p>
              <p className="font-body text-silver/70 text-sm leading-relaxed mb-6 font-light">
                We believe couture is not a relic of the past, but a template for the future. By merging zero-waste cutting patterns, digital drapery, and classic hand-sewing, we deliver sustainable clothing made to outlast fast-fashion trends.
              </p>
              <p className="font-body text-silver/70 text-sm leading-relaxed mb-10 font-light">
                Every bead of gold dust, every raw edge of silk is deliberately crafted in our private workspace, making each commission a unique work of wearable art.
              </p>
            </Reveal>

            {/* Asymmetrical layout illustration */}
            <Reveal delay={0.3} className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 overflow-hidden border border-silver/10">
              <Image
                src="/assets/2267.jpg"
                alt="AnexaraWorld Atelier Dressmaking"
                fill
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Craftsmanship Columns */}
      <section className="section bg-obsidian-card border-t border-silver/10">
        <div className="container-luxury">
          <Reveal className="text-center mb-16">
            <span className="font-ui text-xs tracking-[4px] uppercase text-gold mb-2 block">
              The Pillars
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-white">
              Signature Craftsmanship
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Pillar 1 */}
            <Reveal delay={0.1} className="flex flex-col gap-6 p-8 border border-silver/5 bg-obsidian/40 hover:border-gold/30 transition-colors duration-500">
              <span className="font-display text-4xl text-gold-dim">01</span>
              <h3 className="font-display text-xl text-white font-medium tracking-[0.5px]">
                Architectural Draping
              </h3>
              <p className="font-body text-silver/70 text-xs leading-relaxed font-light">
                We mold fabric directly onto forms using weightless bias-cutting methods, allowing the dress to suspend and react dynamically to natural body kinetics.
              </p>
            </Reveal>

            {/* Pillar 2 */}
            <Reveal delay={0.2} className="flex flex-col gap-6 p-8 border border-silver/5 bg-obsidian/40 hover:border-gold/30 transition-colors duration-500">
              <span className="font-display text-4xl text-gold-dim">02</span>
              <h3 className="font-display text-xl text-white font-medium tracking-[0.5px]">
                Zero-Waste Precision
              </h3>
              <p className="font-body text-silver/70 text-xs leading-relaxed font-light">
                By carefully planning layout cutting matrices and using off-cuts in embroidery details, we ensure that raw silk and velvet yields approach absolute zero waste.
              </p>
            </Reveal>

            {/* Pillar 3 */}
            <Reveal delay={0.3} className="flex flex-col gap-6 p-8 border border-silver/5 bg-obsidian/40 hover:border-gold/30 transition-colors duration-500">
              <span className="font-display text-4xl text-gold-dim">03</span>
              <h3 className="font-display text-xl text-white font-medium tracking-[0.5px]">
                Gold Dust Embroidery
              </h3>
              <p className="font-body text-silver/70 text-xs leading-relaxed font-light">
                Intricate patterns are hand-stitched over weeks utilizing bullion threads, polished gold leafing, and metallic silver components to capture studio lighting.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sustainable Manifesto block */}
      <section className="section bg-obsidian">
        <div className="container-luxury text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="font-ui text-xs tracking-[4px] uppercase text-gold mb-4 block">
              Ethical Sourcing
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-white mb-6">
              Our Ecological Commitment
            </h2>
            <p className="font-accent text-lg text-silver/80 italic mb-8 leading-relaxed">
              &ldquo;We do not inherit the earth; we borrow it. In high fashion, elegance must never come at the cost of the environment. Every silk thread is certified biological and hand-dyed in local atelier vats.&rdquo;
            </p>
            <div className="w-12 h-px bg-gold mx-auto" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

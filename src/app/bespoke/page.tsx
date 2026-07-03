"use client";

import React, { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { formatPrice } from "@/lib/collections";

// Configurator options data
const silhouettes = [
  { id: "obsidian-gown", name: "Obsidian Evening Gown", basePrice: 8500, image: "/assets/hero.png" },
  { id: "runway-silk", name: "Runway Silk Gown", basePrice: 12400, image: "/assets/couture_1.png" },
  { id: "structural-silver", name: "Structural Silver Gown", basePrice: 16800, image: "/assets/couture_2.png" },
  { id: "champagne-veil", name: "Champagne Veil Dress", basePrice: 14500, image: "/assets/bridal_1.png" },
];

const fabrics = [
  { id: "liquid-silk", name: "Liquid Silk", price: 0 },
  { id: "heavy-satin", name: "Heavy Satin", price: 800 },
  { id: "gold-brocade", name: "Gold Dust Brocade", price: 1500 },
  { id: "crushed-velvet", name: "Crushed Velvet", price: 1200 },
];

const accents = [
  { id: "shoulder-pad", name: "Structured Shoulder Plaque", price: 600 },
  { id: "silver-bodice", name: "Metallic Silver Corsetry", price: 1200 },
  { id: "stitched-pearls", name: "Hand-Stitched Pearls", price: 2000 },
  { id: "sweeping-train", name: "Floor-Sweeping Train", price: 900 },
];

const consultationGoals = [
  { id: "red-carpet", name: "Red Carpet Gala" },
  { id: "bridal", name: "Modern Bridal Campaign" },
  { id: "archive", name: "Private Collection Piece" },
  { id: "suit", name: "Custom Architectural Suit" },
];

export default function Bespoke() {
  // Configurator state
  const [selectedSilhouette, setSelectedSilhouette] = useState(silhouettes[0]);
  const [selectedFabric, setSelectedFabric] = useState(fabrics[0]);
  const [selectedAccents, setSelectedAccents] = useState<string[]>([]);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    showroom: "Paris Showroom",
    date: "",
    notes: "",
  });
  const [selectedGoal, setSelectedGoal] = useState(consultationGoals[0].id);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Price calculations
  const basePrice = selectedSilhouette.basePrice;
  const fabricPrice = selectedFabric.price;
  const accentsPrice = accents
    .filter((a) => selectedAccents.includes(a.id))
    .reduce((sum, item) => sum + item.price, 0);
  const totalPrice = basePrice + fabricPrice + accentsPrice;

  // Toggle accents
  const handleAccentToggle = (accentId: string) => {
    setSelectedAccents((prev) =>
      prev.includes(accentId)
        ? prev.filter((id) => id !== accentId)
        : [...prev, accentId]
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-obsidian text-white pt-28">
      {/* Page Banner */}
      <section className="py-12 border-b border-silver/10">
        <div className="container-luxury">
          <Reveal>
            <span className="font-ui text-[10px] tracking-[4px] uppercase text-gold block mb-2">
              VIP Tailoring
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-white tracking-[0.5px]">
              Bespoke Configurator
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Main interactive area */}
      <section className="section py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Live Visual Render Column */}
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              <Reveal className="relative aspect-[3/4] w-full border border-silver/10 overflow-hidden bg-obsidian">
                <Image
                  src={selectedSilhouette.image}
                  alt={selectedSilhouette.name}
                  fill
                  className="object-cover transition-all duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute top-4 left-4 bg-obsidian/80 backdrop-blur-sm border border-silver/10 px-4 py-2 font-ui text-[10px] tracking-[2px] uppercase">
                  Preview Render
                </div>
              </Reveal>

              {/* Price display Card */}
              <Reveal delay={0.1} className="border border-silver/10 bg-obsidian-card p-8 flex flex-col gap-4">
                <h3 className="font-display text-xl text-white font-medium border-b border-silver/10 pb-4">
                  Piece Specification
                </h3>
                <ul className="flex flex-col gap-3 font-ui text-xs tracking-[1px] text-silver/85">
                  <li className="flex justify-between">
                    <span>Silhouette: {selectedSilhouette.name}</span>
                    <span className="text-white">{formatPrice(basePrice)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Fabric: {selectedFabric.name}</span>
                    <span className="text-white">+{formatPrice(fabricPrice)}</span>
                  </li>
                  <li className="flex justify-between border-b border-silver/5 pb-2">
                    <span>Accents &amp; Accoutrements: {selectedAccents.length} Selected</span>
                    <span className="text-white">+{formatPrice(accentsPrice)}</span>
                  </li>
                  <li className="flex justify-between items-center text-sm font-semibold text-gold pt-2">
                    <span>ESTIMATED INVESTMENT</span>
                    <span className="text-base">{formatPrice(totalPrice)}</span>
                  </li>
                </ul>
              </Reveal>
            </div>

            {/* Configurator Selection Column */}
            <div className="flex flex-col gap-12">
              
              {/* Silhouette Selection */}
              <Reveal>
                <div className="border-b border-silver/15 pb-3 mb-6">
                  <h3 className="font-display text-lg tracking-[0.5px]">1. The Silhouette</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {silhouettes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSilhouette(s)}
                      className={`p-4 border text-left flex flex-col gap-1 cursor-pointer transition-colors duration-300 ${
                        selectedSilhouette.id === s.id
                          ? "border-gold bg-gold/5"
                          : "border-silver/10 bg-obsidian-card/40 hover:border-white/20"
                      }`}
                    >
                      <span className="font-ui text-xs tracking-[1px] font-medium text-white">{s.name}</span>
                      <span className="font-ui text-[10px] tracking-[1px] text-silver/60">Base: {formatPrice(s.basePrice)}</span>
                    </button>
                  ))}
                </div>
              </Reveal>

              {/* Fabric Selection */}
              <Reveal delay={0.1}>
                <div className="border-b border-silver/15 pb-3 mb-6">
                  <h3 className="font-display text-lg tracking-[0.5px]">2. Premium Fabric selection</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fabrics.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFabric(f)}
                      className={`p-4 border text-left flex flex-col gap-1 cursor-pointer transition-colors duration-300 ${
                        selectedFabric.id === f.id
                          ? "border-gold bg-gold/5"
                          : "border-silver/10 bg-obsidian-card/40 hover:border-white/20"
                      }`}
                    >
                      <span className="font-ui text-xs tracking-[1px] font-medium text-white">{f.name}</span>
                      <span className="font-ui text-[10px] tracking-[1px] text-silver/60">
                        {f.price === 0 ? "Included" : `+${formatPrice(f.price)}`}
                      </span>
                    </button>
                  ))}
                </div>
              </Reveal>

              {/* Accents Selection */}
              <Reveal delay={0.2}>
                <div className="border-b border-silver/15 pb-3 mb-6">
                  <h3 className="font-display text-lg tracking-[0.5px]">3. Accents &amp; Structure Detail</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {accents.map((a) => {
                    const isSelected = selectedAccents.includes(a.id);
                    return (
                      <button
                        key={a.id}
                        onClick={() => handleAccentToggle(a.id)}
                        className={`p-4 border text-left flex flex-col gap-1 cursor-pointer transition-colors duration-300 ${
                          isSelected
                            ? "border-gold bg-gold/5"
                            : "border-silver/10 bg-obsidian-card/40 hover:border-white/20"
                        }`}
                      >
                        <span className="font-ui text-xs tracking-[1px] font-medium text-white">{a.name}</span>
                        <span className="font-ui text-[10px] tracking-[1px] text-silver/60">+{formatPrice(a.price)}</span>
                      </button>
                    );
                  })}
                </div>
              </Reveal>

              {/* Consultation Booking Inquiry Form */}
              <Reveal delay={0.3} className="border-t border-silver/15 pt-12 mt-4">
                <div className="mb-8">
                  <h3 className="font-display text-2xl text-white mb-2 tracking-[0.5px]">
                    Atelier Booking Enquiry
                  </h3>
                  <p className="font-accent text-sm text-silver/60 italic">
                    Request a private draping consultation in showroom or online
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="border border-gold/30 bg-gold/5 p-8 text-center flex flex-col gap-4">
                    <h4 className="font-display text-lg text-white">Request Received</h4>
                    <p className="font-body text-xs text-silver/80 leading-relaxed font-light">
                      Thank you for contacting the Atelier. A VIP Customer Liaison officer will review your config setup and contact you within 24 hours to schedule your styling.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Goal Selection tiles */}
                    <div className="flex flex-col gap-3">
                      <span className="font-ui text-xs tracking-[1.5px] uppercase text-silver/80">
                        Consultation Objective
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        {consultationGoals.map((goal) => (
                          <button
                            key={goal.id}
                            type="button"
                            onClick={() => setSelectedGoal(goal.id)}
                            className={`py-3 px-4 border text-center font-ui text-[10px] tracking-[1.5px] uppercase transition-colors cursor-pointer ${
                              selectedGoal === goal.id
                                ? "border-gold bg-gold/10 text-white"
                                : "border-silver/10 bg-obsidian-card/20 text-silver/60 hover:border-white/10 hover:text-white"
                            }`}
                          >
                            {goal.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Form Inputs */}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="name-input" className="font-ui text-xs tracking-[1.5px] uppercase text-silver/85">
                        Client Name
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-obsidian-card border border-silver/10 py-3 px-4 text-sm font-ui focus:outline-none focus:border-gold transition-colors text-white"
                        placeholder="ENTER YOUR FULL NAME"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="email-input" className="font-ui text-xs tracking-[1.5px] uppercase text-silver/85">
                        Private Email
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-obsidian-card border border-silver/10 py-3 px-4 text-sm font-ui focus:outline-none focus:border-gold transition-colors text-white"
                        placeholder="EMAIL@DOMAIN.COM"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="showroom-input" className="font-ui text-xs tracking-[1.5px] uppercase text-silver/85">
                          Showroom
                        </label>
                        <select
                          id="showroom-input"
                          name="showroom"
                          value={formData.showroom}
                          onChange={handleInputChange}
                          className="bg-obsidian-card border border-silver/10 py-3 px-4 text-sm font-ui focus:outline-none focus:border-gold transition-colors text-white"
                        >
                          <option value="Paris Showroom">Paris Showroom</option>
                          <option value="Milan Showroom">Milan Showroom</option>
                          <option value="Remote Consultation">Remote Video Consultation</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="date-input" className="font-ui text-xs tracking-[1.5px] uppercase text-silver/85">
                          Desired Date
                        </label>
                        <input
                          id="date-input"
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          className="bg-obsidian-card border border-silver/10 py-3 px-4 text-sm font-ui focus:outline-none focus:border-gold transition-colors text-white"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="notes-input" className="font-ui text-xs tracking-[1.5px] uppercase text-silver/85">
                        Atelier Directives &amp; Sizing Notes
                      </label>
                      <textarea
                        id="notes-input"
                        name="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="bg-obsidian-card border border-silver/10 py-3 px-4 text-sm font-ui focus:outline-none focus:border-gold transition-colors text-white resize-none"
                        placeholder="SPECIFY ANY CUSTOM CONFIGURATION REQUIREMENTS, SIZE DETAILS OR PREFERENCES..."
                      />
                    </div>

                    <button type="submit" className="btn-luxury btn-gold w-full mt-2">
                      Submit Custom Commission
                    </button>
                  </form>
                )}
              </Reveal>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

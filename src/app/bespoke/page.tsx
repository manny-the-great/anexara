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

  // Appointment form state
  const [apptData, setApptData] = useState({
    name: "",
    email: "",
    date: "",
    requests: "",
  });
  const [apptStyle, setApptStyle] = useState<"paris" | "virtual">("paris");
  const [apptSubmitted, setApptSubmitted] = useState(false);

  const handleApptChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setApptData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApptSubmitted(true);
  };

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

      {/* ── Journey of Creation ── */}
      <section className="section bg-obsidian-card border-t border-silver/10">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: Process Timeline */}
            <div className="flex flex-col">
              <Reveal>
                <span className="font-ui text-[10px] tracking-[4px] uppercase text-gold mb-4 block">
                  Bespoke Process
                </span>
                <h2 className="font-display text-4xl sm:text-5xl text-white mb-6 leading-tight">
                  The Journey of Creation
                </h2>
                <p className="font-body text-silver/65 text-sm leading-relaxed font-light mb-14">
                  A bespoke commission is a dialogue between client, silhouette, and fabric. We host physical
                  consultations in our Paris showroom or virtual consultations globally.
                </p>
              </Reveal>

              {/* Timeline Steps */}
              <div className="relative flex flex-col gap-0 pl-6">
                {/* Vertical connector line */}
                <div className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-gold/60 via-gold/20 to-transparent" />

                {[
                  {
                    step: "01",
                    title: "Initial Consultation",
                    desc: "Discuss silhouettes, style profiles, lifestyle needs, and visual aesthetics in person or via video link.",
                  },
                  {
                    step: "02",
                    title: "Conceptual Draping & Sketches",
                    desc: "We present two customized render concepts alongside physical swatches of proposed materials.",
                  },
                  {
                    step: "03",
                    title: "Atelier Fitting Session",
                    desc: "A canvas fitting toile is constructed to configure the pattern uniquely to your proportions.",
                  },
                  {
                    step: "04",
                    title: "Handcrafting the Silhouette",
                    desc: "Artisans build the final piece over 80–120 labor hours with couture finishes.",
                  },
                ].map(({ step, title, desc }, i) => (
                  <Reveal key={step} delay={i * 0.12} className="relative flex gap-6 pb-12 last:pb-0">
                    {/* Circle node */}
                    <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border border-gold bg-obsidian-card flex-shrink-0 z-10" />

                    <div className="flex flex-col gap-2">
                      <span className="font-ui text-[9px] tracking-[3px] uppercase text-gold">
                        Step {step}
                      </span>
                      <h3 className="font-display text-xl text-white font-medium">
                        {title}
                      </h3>
                      <p className="font-body text-silver/60 text-xs leading-relaxed font-light">
                        {desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right: Appointment Form */}
            <Reveal delay={0.2} className="border border-silver/10 bg-obsidian p-8 sm:p-10 flex flex-col gap-8 lg:sticky lg:top-28">
              <div className="text-center border-b border-silver/10 pb-6">
                <span className="font-ui text-[9px] tracking-[4px] uppercase text-gold">
                  Secure an Appointment
                </span>
              </div>

              {apptSubmitted ? (
                <div className="border border-gold/30 bg-gold/5 p-8 text-center flex flex-col gap-4">
                  <h4 className="font-display text-lg text-white">Appointment Requested</h4>
                  <p className="font-body text-xs text-silver/80 leading-relaxed font-light">
                    Your fitting request has been received. A VIP Liaison will confirm your appointment within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApptSubmit} className="flex flex-col gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="appt-name" className="font-ui text-[9px] tracking-[2px] uppercase text-gold">
                      Full Name
                    </label>
                    <input
                      id="appt-name"
                      type="text"
                      name="name"
                      value={apptData.name}
                      onChange={handleApptChange}
                      required
                      placeholder="JEANNE DEE"
                      className="bg-transparent border-b border-silver/20 py-2 text-sm font-ui text-white focus:outline-none focus:border-gold transition-colors placeholder:text-silver/25"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="appt-email" className="font-ui text-[9px] tracking-[2px] uppercase text-gold">
                      Email Address
                    </label>
                    <input
                      id="appt-email"
                      type="email"
                      name="email"
                      value={apptData.email}
                      onChange={handleApptChange}
                      required
                      placeholder="JEANNE@ATELIER.COM"
                      className="bg-transparent border-b border-silver/20 py-2 text-sm font-ui text-white focus:outline-none focus:border-gold transition-colors placeholder:text-silver/25"
                    />
                  </div>

                  {/* Date */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="appt-date" className="font-ui text-[9px] tracking-[2px] uppercase text-gold">
                      Preferred Consultation Date
                    </label>
                    <input
                      id="appt-date"
                      type="date"
                      name="date"
                      value={apptData.date}
                      onChange={handleApptChange}
                      required
                      className="bg-transparent border-b border-silver/20 py-2 text-sm font-ui text-white focus:outline-none focus:border-gold transition-colors [color-scheme:dark]"
                    />
                  </div>

                  {/* Consultation Style Toggle */}
                  <div className="flex flex-col gap-3">
                    <span className="font-ui text-[9px] tracking-[2px] uppercase text-gold">
                      Consultation Style
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setApptStyle("paris")}
                        className={`py-3 px-4 border font-ui text-[9px] tracking-[2px] uppercase transition-all duration-300 ${
                          apptStyle === "paris"
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-silver/15 text-silver/50 hover:border-silver/30 hover:text-white"
                        }`}
                      >
                        Paris Showroom
                      </button>
                      <button
                        type="button"
                        onClick={() => setApptStyle("virtual")}
                        className={`py-3 px-4 border font-ui text-[9px] tracking-[2px] uppercase transition-all duration-300 ${
                          apptStyle === "virtual"
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-silver/15 text-silver/50 hover:border-silver/30 hover:text-white"
                        }`}
                      >
                        Virtual Draping
                      </button>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="appt-requests" className="font-ui text-[9px] tracking-[2px] uppercase text-gold">
                      Special Requests & Sizing Requirements
                    </label>
                    <textarea
                      id="appt-requests"
                      name="requests"
                      rows={4}
                      value={apptData.requests}
                      onChange={handleApptChange}
                      placeholder="E.g., High collar, gold filament highlights, custom sizing requirements..."
                      className="bg-transparent border-b border-silver/20 py-2 text-sm font-ui text-white focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-silver/25"
                    />
                  </div>

                  <button type="submit" className="btn-luxury btn-gold w-full mt-2">
                    Book Private Fitting
                  </button>
                </form>
              )}
            </Reveal>

          </div>
        </div>
      </section>

    </div>
  );
}

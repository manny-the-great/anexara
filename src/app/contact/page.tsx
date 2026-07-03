"use client";

import React, { useState } from "react";
import Reveal from "@/components/Reveal";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "How long does a bespoke dress take to complete?",
    answer: "Typically, a custom drape or Haute Couture piece requires 4 to 8 weeks to design, stitch, and deliver. We perform three separate fittings to ensure custom architectural alignment.",
  },
  {
    question: "Do you offer sizing fitting adjustments outside Paris?",
    answer: "Yes. Our private client team travels to major global cities quarterly. For remote commissions, we host video fittings and coordinate with local certified master tailors.",
  },
  {
    question: "Can I customize a Ready-to-Wear piece?",
    answer: "Certainly. Any Ready-To-Wear piece can be altered, customized with gold embroidery, or tailored to custom proportions through our Bespoke Consultation service.",
  },
  {
    question: "What is your ethical sourcing policy?",
    answer: "All fabrics are sourced from certified biological European farms. Our dyes are hand-applied in small vats utilizing natural botanicals to minimize water and toxic runoff.",
  },
];

export default function Contact() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Bespoke",
    message: "",
  });

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
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
      {/* Banner */}
      <section className="py-12 border-b border-silver/10">
        <div className="container-luxury">
          <Reveal>
            <span className="font-ui text-[10px] tracking-[4px] uppercase text-gold block mb-2">
              VIP Client Care
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-white tracking-[0.5px]">
              Connect with the House
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Showroom Contacts & Form */}
      <section className="section py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Showroom contacts & mockup map */}
            <div className="flex flex-col gap-10">
              <Reveal>
                <span className="font-ui text-[10px] tracking-[3px] uppercase text-gold mb-4 block">
                  Locations
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-white mb-6">
                  Our Showrooms
                </h2>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Paris */}
                <Reveal delay={0.1} className="flex flex-col gap-3 p-6 border border-silver/5 bg-obsidian-card/40">
                  <h4 className="font-display text-lg text-white font-medium">Paris Atelier</h4>
                  <p className="font-body text-xs text-silver/70 leading-relaxed font-light">
                    Rue de la Paix, 75002 Paris, France<br />
                    Mon - Sat: By Appointment Only
                  </p>
                  <a href="tel:+3310000000" className="font-ui text-[10px] tracking-[1px] text-gold hover:text-white transition-colors mt-2">
                    +33 (1) 00 00 00 00
                  </a>
                </Reveal>

                {/* Milan */}
                <Reveal delay={0.2} className="flex flex-col gap-3 p-6 border border-silver/5 bg-obsidian-card/40">
                  <h4 className="font-display text-lg text-white font-medium">Milan Showroom</h4>
                  <p className="font-body text-xs text-silver/70 leading-relaxed font-light">
                    Via Montenapoleone, 20121 Milan, Italy<br />
                    Tue - Sun: By Appointment Only
                  </p>
                  <a href="tel:+3902000000" className="font-ui text-[10px] tracking-[1px] text-gold hover:text-white transition-colors mt-2">
                    +39 (02) 00 00 00 00
                  </a>
                </Reveal>
              </div>

              {/* Mockup Map Frame */}
              <Reveal delay={0.3} className="relative aspect-[16/9] w-full border border-silver/10 overflow-hidden bg-obsidian-card flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                <div className="relative z-10 text-center flex flex-col gap-2 p-6">
                  <span className="font-ui text-[9px] tracking-[3px] uppercase text-gold">Secure Connection</span>
                  <h5 className="font-display text-base text-white">Private Client Portal Map</h5>
                  <p className="font-body text-[10px] text-silver/50 tracking-[0.5px]">GPS Coords: 48.8687° N, 2.3301° E</p>
                </div>
              </Reveal>
            </div>

            {/* Inquiry Form */}
            <Reveal className="border border-silver/10 bg-obsidian-card p-8 sm:p-10 flex flex-col gap-8">
              <div>
                <h3 className="font-display text-2xl text-white mb-2">Private Inquiry</h3>
                <p className="font-accent text-sm text-silver/50 italic">
                  Leave a directive for general queries or media partnerships
                </p>
              </div>

              {formSubmitted ? (
                <div className="border border-gold/30 bg-gold/5 p-8 text-center flex flex-col gap-4">
                  <h4 className="font-display text-lg text-white">Message Transmitted</h4>
                  <p className="font-body text-xs text-silver/80 leading-relaxed font-light">
                    Your inquiry has been successfully sent. A representative will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="inquiry-name" className="font-ui text-xs tracking-[1.5px] uppercase text-silver/80">
                      Full Name
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-obsidian border border-silver/10 py-3 px-4 text-sm font-ui focus:outline-none focus:border-gold text-white"
                      placeholder="ENTER FULL NAME"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="inquiry-email" className="font-ui text-xs tracking-[1.5px] uppercase text-silver/80">
                      Private Email
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-obsidian border border-silver/10 py-3 px-4 text-sm font-ui focus:outline-none focus:border-gold text-white"
                      placeholder="EMAIL@DOMAIN.COM"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="inquiry-subject" className="font-ui text-xs tracking-[1.5px] uppercase text-silver/80">
                      Department
                    </label>
                    <select
                      id="inquiry-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-obsidian border border-silver/10 py-3 px-4 text-sm font-ui focus:outline-none focus:border-gold text-white"
                    >
                      <option value="Bespoke">Bespoke Fitting</option>
                      <option value="Retailer">Retailer / Wholesale Inquiry</option>
                      <option value="Press">Press &amp; Media Relations</option>
                      <option value="Career">Atelier Careers</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="inquiry-message" className="font-ui text-xs tracking-[1.5px] uppercase text-silver/80">
                      Directive Message
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="bg-obsidian border border-silver/10 py-3 px-4 text-sm font-ui focus:outline-none focus:border-gold text-white resize-none"
                      placeholder="ENTER THE FULL DETAILS OF YOUR INQUIRY..."
                    />
                  </div>

                  <button type="submit" className="btn-luxury btn-gold w-full mt-2">
                    Submit Inquiry
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section bg-obsidian-card border-t border-silver/10">
        <div className="container-luxury max-w-3xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="font-ui text-xs tracking-[4px] uppercase text-gold mb-2 block">
              Knowledge Base
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-white">
              Frequently Asked Queries
            </h2>
          </Reveal>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <Reveal
                  key={index}
                  delay={index * 0.05}
                  className="border border-silver/10 bg-obsidian/45"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-5 px-6 flex justify-between items-center text-left font-display text-base text-white hover:text-gold transition-colors duration-300 focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <span className="font-ui text-xl text-gold font-light ml-4">
                      {isOpen ? "\u2212" : "\u002B"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 px-6 font-body text-xs text-silver/70 leading-relaxed font-light border-t border-silver/5 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { Heart } from "lucide-react";
import { useStore } from "@/lib/store";
import { collections, CollectionCategory, categoryLabels, formatPrice } from "@/lib/collections";
import Reveal from "@/components/Reveal";
import { AnimatePresence, motion } from "framer-motion";

function CollectionsContent() {
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState<CollectionCategory>(() => {
    const filter = searchParams.get("filter") as CollectionCategory;
    return filter && ["all", "couture", "rtw", "bridal"].includes(filter) ? filter : "all";
  });
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null);

  // Zustand Store integrations
  const wishlist = useStore((s) => s.wishlist);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const addToCart = useStore((s) => s.addToCart);

  // Filtered collections items
  const filteredCollections = collections.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  // Keybindings for lightbox modal navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProductIndex === null) return;
      if (e.key === "Escape") {
        setSelectedProductIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedProductIndex((prev) =>
          prev !== null ? (prev + 1) % filteredCollections.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedProductIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredCollections.length) % filteredCollections.length
            : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProductIndex, filteredCollections]);

  // Prevent scroll when lightbox modal is active
  useEffect(() => {
    document.body.style.overflow = selectedProductIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProductIndex]);

  const activeProduct = selectedProductIndex !== null ? filteredCollections[selectedProductIndex] : null;

  return (
    <div className="min-h-screen bg-canvas text-ink pt-28">
      {/* Banner */}
      <section className="py-12 border-b border-ink-soft/10">
        <div className="container-luxury">
          <Reveal>
            <span className="font-ui text-[10px] tracking-[4px] uppercase text-gold block mb-2">
              Seasonal Directory
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-ink tracking-[0.5px]">
              The Collections
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Main collections section */}
      <section className="section py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
            
            {/* Sidebar Filters */}
            <aside className="lg:sticky lg:top-28 flex flex-col gap-8">
              <Reveal delay={0.1}>
                <div className="border-b border-ink-soft/15 pb-4 mb-4">
                  <span className="font-ui text-xs tracking-[2px] uppercase text-ink-soft font-medium">
                    Category
                  </span>
                </div>
                <ul className="flex flex-col gap-4">
                  {(Object.keys(categoryLabels) as CollectionCategory[]).map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => {
                          setActiveCategory(cat);
                          setSelectedProductIndex(null);
                        }}
                        className={`font-ui text-xs tracking-[2px] uppercase text-left transition-colors duration-300 ${
                          activeCategory === cat ? "text-gold font-medium" : "text-ink-soft/60 hover:text-ink"
                        }`}
                      >
                        {categoryLabels[cat]}
                      </button>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.2} className="hidden lg:flex flex-col gap-8 mt-12">
                <div className="border-b border-ink-soft/15 pb-4 mb-4">
                  <span className="font-ui text-xs tracking-[2px] uppercase text-ink-soft font-medium">
                    Archive
                  </span>
                </div>
                <ul className="flex flex-col gap-4 text-xs tracking-[2px] text-ink-soft/30 font-ui uppercase">
                  <li className="cursor-not-allowed">SS 2024 (Archived)</li>
                  <li className="cursor-not-allowed">FW 2025 (Archived)</li>
                </ul>
              </Reveal>
            </aside>

            {/* Collections Grid */}
            <main className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {filteredCollections.map((product, index) => {
                  const isWishlisted = wishlist.includes(product.id);
                  return (
                    <Reveal
                      key={product.id}
                      delay={index * 0.05}
                      className="group relative flex flex-col border border-ink-soft/10 bg-panel rounded-2xl overflow-hidden"
                    >
                      {/* Heart Wishlist Trigger */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-obsidian/75 border border-silver/20 text-silver hover:text-gold transition-colors duration-300"
                      >
                        <Heart size={16} fill={isWishlisted ? "var(--color-gold)" : "none"} className={isWishlisted ? "text-gold" : ""} />
                      </button>

                      {/* Card Image */}
                      <div
                        onClick={() => setSelectedProductIndex(index)}
                        className="relative aspect-[3/4] cursor-pointer overflow-hidden rounded-t-2xl bg-panel"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-ui text-[9px] tracking-[3px] uppercase border border-white py-2 px-6 bg-obsidian/80 backdrop-blur-sm text-white">
                            Click to Enlarge
                          </span>
                        </div>
                      </div>

                      {/* Card Details */}
                      <div className="p-6 flex flex-col gap-4 border-t border-ink-soft/10 justify-between flex-grow">
                        <div className="flex flex-col gap-1">
                          <span className="font-ui text-[8px] tracking-[2px] uppercase text-gold">
                            {product.tag}
                          </span>
                          <h4 className="font-display text-base text-ink font-medium">
                            {product.name}
                          </h4>
                          <span className="font-accent text-xs text-ink-soft/60 italic">
                            {product.subtitle}
                          </span>
                        </div>

                        <div className="flex justify-between items-center mt-2 pt-4 border-t border-ink-soft/5">
                          <span className="font-ui text-sm text-ink font-medium">
                            {formatPrice(product.price)}
                          </span>
                          <button
                            onClick={() => addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              category: product.category,
                              image: product.image
                            })}
                            className="font-ui text-[9px] tracking-[2px] uppercase text-gold hover:text-ink transition-colors duration-300 font-semibold"
                          >
                            Acquire Piece
                          </button>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              {filteredCollections.length === 0 && (
                <div className="py-20 text-center text-ink-soft/40 font-ui text-sm tracking-[2px] uppercase">
                  No pieces currently visible.
                </div>
              )}
            </main>

          </div>
        </div>
      </section>

      {/* Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {activeProduct && selectedProductIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[5000] bg-obsidian/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedProductIndex(null)}
          >
            {/* Close trigger */}
            <button
              onClick={() => setSelectedProductIndex(null)}
              className="absolute top-6 right-6 font-ui text-2xl text-silver hover:text-white transition-colors cursor-pointer p-4 z-50"
              aria-label="Close details view"
            >
              &times;
            </button>

            {/* Lightbox Frame */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full flex flex-col items-center"
            >
              <div className="relative aspect-[3/4] w-full max-h-[70vh] border border-silver/10 overflow-hidden bg-obsidian rounded-2xl">
                <Image
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </div>

              {/* Caption details */}
              <div className="text-center mt-6 flex flex-col gap-2 max-w-md">
                <h4 className="font-display text-xl text-white font-medium">
                  {activeProduct.name}
                </h4>
                <p className="font-accent text-sm text-silver/80 italic">
                  {activeProduct.subtitle}
                </p>
                <span className="font-ui text-base text-gold mt-1 font-semibold">
                  {formatPrice(activeProduct.price)}
                </span>
              </div>
            </motion.div>

            {/* Navigation prompts (hidden on small touch interfaces) */}
            <div className="absolute bottom-6 font-ui text-[8px] tracking-[3px] uppercase text-silver/40 hidden md:block">
              Use Left &amp; Right Arrow keys to navigate · Escape to Close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Collections() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-canvas flex items-center justify-center font-ui text-xs tracking-[3px] uppercase text-ink-soft/50">
        Loading Collection...
      </div>
    }>
      <CollectionsContent />
    </Suspense>
  );
}

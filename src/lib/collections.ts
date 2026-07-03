export const collections = [
  {
    id: "obs-evening-gown",
    name: "Obsidian Evening Gown",
    subtitle: "Gold Dust Hand-Embroidery · SS 2026",
    price: 850000,
    category: "couture",
    image: "/assets/_OLA9751.JPG.jpg",
    tag: "Defy Expectations",
  },
  {
    id: "runway-silk-gown",
    name: "Runway Silk Gown",
    subtitle: "Asymmetric Architecture · SS 2026",
    price: 1240000,
    category: "couture",
    image: "/assets/_OLA0933.JPG.jpg",
    tag: "Avant-Garde",
  },
  {
    id: "structural-silver-gown",
    name: "Structural Silver Gown",
    subtitle: "Avant-Garde Shoulders · SS 2026",
    price: 1680000,
    category: "couture",
    image: "/assets/_OLA5746.jpeg",
    tag: "Architecture",
  },
  {
    id: "ivory-tailored-suit",
    name: "Ivory Tailored Suit",
    subtitle: "Structured Minimalist Wool · FW 2026",
    price: 220000,
    category: "rtw",
    image: "/assets/TAP_1302.jpg",
    tag: "Daily Elevation",
  },
  {
    id: "noir-wrap-midi",
    name: "Noir Wrap Midi Dress",
    subtitle: "Gold Belt Accent · FW 2026",
    price: 185000,
    category: "rtw",
    image: "/assets/be311e9a295b47d7a9fde776ba9b4c71.jpg",
    tag: "Effortless",
  },
  {
    id: "atelier-linen-coat",
    name: "Atelier Linen Coat",
    subtitle: "Oversize Silhouette · FW 2026",
    price: 310000,
    category: "rtw",
    image: "/assets/0523a12cd65145848442a691036149a3.jpg",
    tag: "Utility Luxury",
  },
  {
    id: "champagne-veil-dress",
    name: "Champagne Veil Dress",
    subtitle: "Fine Silk & Modern Veil · Bridal 2026",
    price: 1450000,
    category: "bridal",
    image: "/assets/_OLA9760.JPG.jpg",
    tag: "Ethereal Grace",
  },
  {
    id: "lagos-runway-kaftan",
    name: "Lagos Runway Silk Kaftan",
    subtitle: "Fluid Silk Organza · SS 2026",
    price: 450000,
    category: "rtw",
    image: "/assets/IMG_9620.JPG",
    tag: "Fluid Elegance",
  },
] as const;

export type Collection = (typeof collections)[number];
export type CollectionCategory = "all" | "couture" | "rtw" | "bridal";

export const categoryLabels: Record<CollectionCategory, string> = {
  all: "All Pieces",
  couture: "Haute Couture",
  rtw: "Ready-To-Wear",
  bridal: "Modern Bridal",
};

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(price);

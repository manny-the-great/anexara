export const collections = [
  {
    id: "floral-corsage-cape-gown",
    name: "Floral Corsage Cape Gown",
    subtitle: "3D Botanical Bodice & Ivory Mermaid Skirt · SS 2026",
    price: 850000,
    category: "couture",
    image: "/assets/_OLA9751.JPG.jpg",
    tag: "Defy Expectations",
  },
  {
    id: "fuchsia-embellished-power-suit",
    name: "Fuchsia Power Suit",
    subtitle: "Crystal Beaded Trim Co-Ord · SS 2026",
    price: 1240000,
    category: "couture",
    image: "/assets/_OLA0933.JPG.jpg",
    tag: "Avant-Garde",
  },
  {
    id: "rose-feather-off-shoulder-gown",
    name: "Rose Feather Gown",
    subtitle: "Off-Shoulder Feather-Trim Silhouette · SS 2026",
    price: 1680000,
    category: "couture",
    image: "/assets/_OLA5746.jpeg",
    tag: "Ethereal Grace",
  },
  {
    id: "sage-brocade-aso-oke-set",
    name: "Sage Brocade Aso-Oke Set",
    subtitle: "Gold-Flecked Brocade with Structured Shoulders · FW 2026",
    price: 220000,
    category: "rtw",
    image: "/assets/TAP_1302.jpg",
    tag: "Heritage Luxe",
  },
  {
    id: "rose-tiered-ruffle-gown",
    name: "Rose Tiered Ruffle Gown",
    subtitle: "Multi-Layer Taffeta Cascade · FW 2026",
    price: 185000,
    category: "rtw",
    image: "/assets/be311e9a295b47d7a9fde776ba9b4c71.jpg",
    tag: "Effortless",
  },
  {
    id: "burgundy-bridal-aso-ebi-set",
    name: "Burgundy Bridal Aso-Ebi Set",
    subtitle: "Wine Gele, Lace Peplum & Brocade Wrap Skirt · Bridal 2026",
    price: 310000,
    category: "rtw",
    image: "/assets/0523a12cd65145848442a691036149a3.jpg",
    tag: "Bridal Heritage",
  },
  {
    id: "floral-peplum-mermaid-gown",
    name: "Floral Peplum Mermaid Gown",
    subtitle: "Botanical Embroidered Peplum & Ivory Fitted Skirt · Bridal 2026",
    price: 1450000,
    category: "bridal",
    image: "/assets/_OLA9760.JPG.jpg",
    tag: "Eternal Bloom",
  },
  {
    id: "wine-ruched-column-gown",
    name: "Wine Ruched Column Gown",
    subtitle: "Long-Sleeve Ruched Jersey Silhouette · SS 2026",
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

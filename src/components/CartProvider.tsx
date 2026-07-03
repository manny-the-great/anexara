"use client";

import { ReactNode } from "react";

// CartProvider is a thin client boundary wrapper that makes Zustand
// (which needs browser APIs) work safely with Next.js RSC tree.
// No-op — just marks the boundary so children can import the store.
export default function CartProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

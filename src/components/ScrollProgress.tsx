"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrolled =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = `${Math.min(scrolled, 100)}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div ref={barRef} id="scroll-progress" />;
}

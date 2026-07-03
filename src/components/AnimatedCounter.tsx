"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number; // in ms
  suffix?: string;
}

export default function AnimatedCounter({
  value,
  duration = 1800,
  suffix = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!isInView) return;

    const start = 0;
    const end = value;
    const range = end - start;
    if (range === 0) return;

    const startTime = performance.now();

    const animate = (now: number) => {
      const timePassed = now - startTime;
      const progress = Math.min(timePassed / duration, 1);
      
      // cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + eased * range);
      
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <p ref={ref} className="text-3xl lg:text-4xl font-display text-white mt-2">
      {count}
      {suffix}
    </p>
  );
}

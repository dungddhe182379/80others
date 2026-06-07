"use client";

import React, { useEffect, useState } from "react";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const HEART_COLORS = ["text-brand-pink", "text-brand-purple-light", "text-red-400", "text-pink-300"];

export const HeartRain: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const handleSpawn = (e: Event) => {
      const customEvent = e as CustomEvent<{ x?: number; y?: number; count?: number }>;
      const x = customEvent.detail?.x ?? Math.random() * (window.innerWidth - 60) + 30;
      const y = customEvent.detail?.y ?? window.innerHeight - 80;
      const count = customEvent.detail?.count ?? 1;

      const newHearts: Heart[] = Array.from({ length: count }).map((_, i) => {
        // Offset multiple hearts slightly so they don't overlap exactly
        const offsetX = count > 1 ? (Math.random() - 0.5) * 80 : 0;
        const offsetY = count > 1 ? (Math.random() - 0.5) * 40 : 0;
        
        return {
          id: Date.now() + Math.random() + i,
          x: x + offsetX,
          y: y + offsetY,
          size: Math.random() * 16 + 18, // 18px - 34px
          color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        };
      });

      setHearts((prev) => [...prev, ...newHearts]);

      // Remove hearts after animation completes (2.2 seconds matches CSS)
      newHearts.forEach((h) => {
        setTimeout(() => {
          setHearts((prev) => prev.filter((heart) => heart.id !== h.id));
        }, 2200);
      });
    };

    window.addEventListener("spawn-heart", handleSpawn);
    return () => window.removeEventListener("spawn-heart", handleSpawn);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className={`heart-float ${h.color} select-none`}
          style={{
            left: `${h.x}px`,
            top: `${h.y}px`,
            fontSize: `${h.size}px`,
          }}
        >
          <i className="hn hn-heart-solid" style={{ fontSize: "inherit" }} />
        </span>
      ))}
    </div>
  );
};

export const triggerHeart = (x?: number, y?: number, count: number = 1) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("spawn-heart", {
        detail: { x, y, count },
      })
    );
  }
};

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Turn the entry flyer on/off. To run it for a new event: drop the new
// poster into /public/splash/, update FLYER below, and set this to true.
const SPLASH_ENABLED = true;

const FLYER = {
  src: "/splash/festival-poster-2.png",
  alt: "Celebrate Divine Joy at ISKCON Austin — Shri Radha Ashtami Festival, Srimati Radha Rani's Appearance Day, on Sunday, September 13, 2026: kirtan 11:00–11:30 AM, glorification of Srimati Radha Rani 11:40 AM–12:30 PM, arati at 12:30 PM, followed by a feast",
  width: 768,
  height: 1365,
};

/**
 * Full-screen entry splash announcing upcoming festivals. Shown once per
 * browser session (tracked in sessionStorage) — visitors click anywhere in
 * the surrounding area to dismiss it and reach the site underneath.
 */
export default function FestivalSplash() {
  return SPLASH_ENABLED ? <Splash /> : null;
}

function Splash() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem("iskcon-festival-splash-dismissed");
      if (!dismissed) setVisible(true);
    } catch {
      // sessionStorage unavailable (private browsing, etc.) — just show it.
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      sessionStorage.setItem("iskcon-festival-splash-dismissed", "1");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-dark/90 backdrop-blur-sm p-4 sm:p-8 cursor-pointer animate-[fadeIn_0.3s_ease-out]"
      onClick={dismiss}
      role="button"
      tabIndex={0}
      aria-label="Click anywhere to enter the ISKCON Austin website"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") dismiss();
      }}
    >
      {/* Widths are capped against the viewport height too — this poster is
          tall, so on short screens the height is what limits it, not the width. */}
      <div className="relative w-full max-w-[min(24rem,44vh)] sm:max-w-[min(32rem,44vh)] text-center">
        <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
          <Image
            src={FLYER.src}
            alt={FLYER.alt}
            width={FLYER.width}
            height={FLYER.height}
            className="w-full h-auto"
            priority
          />
        </div>
        <p className="mt-5 text-white/80 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
          Tap anywhere to enter the site
        </p>
      </div>
    </div>
  );
}

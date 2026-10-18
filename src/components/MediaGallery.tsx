"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { CornerFrame } from "@/components/ornaments";

type GalleryPhoto = {
  src: string;
  alt: string;
  // Which part of the photo to keep when the square thumbnail crops it.
  // Defaults to center. Use "left"/"right" when the subject sits at an edge.
  position?: "left" | "center" | "right";
};

const positionClass = {
  left: "object-left",
  center: "object-center",
  right: "object-right",
} as const;

export type GallerySection = {
  key: string;
  label: string;
  description?: string;
  photos: GalleryPhoto[];
};

export default function MediaGallery({
  sections,
}: {
  sections: GallerySection[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Flatten all sections into one ordered list so the lightbox can walk
  // across section boundaries with next/prev.
  const photos = useMemo(
    () => sections.flatMap((s) => s.photos),
    [sections]
  );

  // Map each section's local photo to its index within the flat `photos`
  // array, so grid buttons can open the lightbox at the right spot.
  const sectionOffsets = useMemo(() => {
    const offsets: number[] = [];
    let running = 0;
    for (const s of sections) {
      offsets.push(running);
      running += s.photos.length;
    }
    return offsets;
  }, [sections]);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);
  const prev = useCallback(() => {
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + photos.length) % photos.length
    );
  }, [photos.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, next, prev]);

  return (
    <div className="space-y-14">
      {sections.map((section, sIdx) => (
        <div key={section.key}>
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <h3 className="font-display text-2xl font-semibold text-navy">
              {section.label}
            </h3>
            <span className="text-xs font-semibold uppercase tracking-wide text-gold">
              {section.photos.length} photos
            </span>
          </div>
          {section.description && (
            <p className="mt-1.5 text-sm text-ink-soft max-w-2xl">
              {section.description}
            </p>
          )}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {section.photos.map((photo, i) => (
              <button
                key={photo.src}
                onClick={() => setOpenIndex(sectionOffsets[sIdx] + i)}
                className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-cream-deep bg-cream shadow-sm"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className={`object-cover ${positionClass[photo.position ?? "center"]} transition-transform duration-500 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/10 transition-colors" />
                <CornerFrame tone="white" size={14} inset={7} />
              </button>
            ))}
          </div>
        </div>
      ))}

      {openIndex !== null && photos[openIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={photos[openIndex].alt}
          onClick={close}
        >
          <button
            aria-label="Close"
            onClick={close}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 border border-white/25 text-white text-xl hover:bg-white/20 transition-colors"
          >
            ×
          </button>

          <button
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="hidden sm:flex absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/25 text-white text-xl hover:bg-white/20 transition-colors"
          >
            ‹
          </button>
          <button
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="hidden sm:flex absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/25 text-white text-xl hover:bg-white/20 transition-colors"
          >
            ›
          </button>

          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/15 shadow-2xl bg-navy">
              <Image
                src={photos[openIndex].src}
                alt={photos[openIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
              <CornerFrame tone="white" size={24} inset={12} />
            </div>
            <div className="mt-4 text-center text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-light">
                {openIndex + 1} of {photos.length}
              </p>
              <p className="mt-1 font-display text-lg font-semibold">
                {photos[openIndex].alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { EventFlyer } from "@/lib/data";

/**
 * Event flyer preview. Shows the top of the flyer (ornament, title and date)
 * as a compact teaser inside an event card; tapping it opens the full flyer
 * in a lightbox — same look as the festival splash — with a download link.
 */
export default function FlyerViewer({
  flyer,
  title,
  className = "",
}: {
  flyer: EventFlyer;
  title: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View the ${title} flyer`}
        className={`group relative block w-full aspect-[2/1] overflow-hidden bg-navy-dark text-left ${className}`}
      >
        <Image
          src={flyer.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-dark/80 to-transparent" aria-hidden />
        <span className="absolute bottom-3 right-3 rounded-full bg-gold px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors group-hover:bg-gold-light">
          View Flyer
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-navy-dark/90 backdrop-blur-sm p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} flyer`}
          onClick={close}
        >
          <div
            className="relative flex max-h-full flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={flyer.src}
              alt={flyer.alt}
              width={flyer.width}
              height={flyer.height}
              sizes="(min-width: 640px) 560px, 92vw"
              className="h-auto max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl ring-1 ring-white/10"
              priority
            />
            <div className="mt-4 flex items-center gap-3">
              <a
                href={flyer.src}
                download
                className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold-light transition-colors"
              >
                Download Flyer
              </a>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-cream-deep">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-18 items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <Image
              src="/logo.png"
              alt="ISKCON Austin logo"
              width={44}
              height={38}
              className="h-10 w-auto"
              priority
            />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg font-semibold text-navy">
                {site.name}
              </span>
              <span className="text-[11px] uppercase tracking-wide text-ink-soft">
                Hare Krishna Temple
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    active
                      ? "text-navy bg-cream"
                      : "text-ink-soft hover:text-navy hover:bg-cream/60"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/media#gallery"
              className="text-sm font-semibold text-navy hover:text-gold transition-colors"
            >
              Photo Gallery
            </Link>
            <Link
              href="/donate"
              className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold-light transition-colors shadow-sm"
            >
              Donate
            </Link>
          </div>

          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-navy" />
            <span className="block h-0.5 w-6 bg-navy" />
            <span className="block h-0.5 w-6 bg-navy" />
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-cream-deep bg-white px-4 pb-4">
          <nav className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-ink border-b border-cream-deep last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Donate
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

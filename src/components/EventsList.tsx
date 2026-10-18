"use client";

import { useMemo, useState } from "react";
import { Card, Pill } from "@/components/ui";
import { MapPinIcon } from "@/components/devotional-art";
import FlyerViewer from "@/components/FlyerViewer";
import { parseEventDate, upcomingEvents, type EventCategory } from "@/lib/data";

const categories: (EventCategory | "All")[] = [
  "All",
  "Festival",
  "Class",
  "Community",
];

const PAGE_SIZE = 4;

export default function EventsList() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Upcoming only, soonest first — past events drop off automatically.
  const sorted = useMemo(() => upcomingEvents(), []);

  const filtered = useMemo(
    () =>
      filter === "All" ? sorted : sorted.filter((e) => e.category === filter),
    [sorted, filter]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => {
              setFilter(c);
              setVisible(PAGE_SIZE);
            }}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              filter === c
                ? "bg-navy text-white"
                : "bg-cream text-navy hover:bg-cream-deep"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        {filtered.slice(0, visible).map((e) => (
          <Card key={`${e.title}-${e.date}`} className="flex flex-col">
            {e.flyer && <FlyerViewer flyer={e.flyer} title={e.title} />}
            <div className="p-6 flex flex-col sm:flex-row gap-5 flex-1">
            <div className="shrink-0 w-20 self-start text-center rounded-xl bg-cream py-3">
              <p className="text-xs font-semibold uppercase text-gold">
                {parseEventDate(e.date).toLocaleDateString("en-US", { month: "short" })}
              </p>
              <p className="text-2xl font-display font-bold text-navy">
                {parseEventDate(e.date).getDate()}
              </p>
            </div>
            <div>
              <Pill>{e.category}</Pill>
              <h3 className="font-display text-lg font-semibold text-navy mt-2">
                {e.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                {e.description}
              </p>
              <div className="mt-3 space-y-1 text-xs text-ink-soft">
                <p className="font-semibold text-gold">{e.time}</p>
                <p className="flex items-start gap-1.5">
                  <MapPinIcon className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gold" />
                  {e.location}
                </p>
              </div>
            </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-ink-soft text-sm">
          No events in this category right now — check back soon.
        </p>
      )}

      {visible < filtered.length && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border border-navy/30 px-6 py-3 text-sm font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
          >
            Load More Events
          </button>
        </div>
      )}
    </div>
  );
}

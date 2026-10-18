import type { Metadata } from "next";
import Image from "next/image";
import { Button, Card, PageHero, SectionHeading } from "@/components/ui";
import { MapPinIcon } from "@/components/devotional-art";
import { CornerFrame } from "@/components/ornaments";
import { locations, weeklySchedule } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sunday Programs Location",
  description:
    "Everything you need to know about ISKCON Austin's Sunday Programs location — address, schedule, directions, and photos.",
};

const location = locations.find((l) => l.key === "sunday")!;
const schedule = weeklySchedule.filter((s) => s.day === "Sunday");

// Real photos from temple life at this location.
const photos = Array.from({ length: 8 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return `/gallery/temple-life-${n}.jpg`;
});

export default function SundayLocationPage() {
  return (
    <div>
      <PageHero
        eyebrow="Current Location"
        title="Sunday Programs"
        description={location.description}
        image="/temple-renderings/interior-02-great-hall.jpg"
      />

      {/* Location details */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading eyebrow="Find Us" title="Address & Hours" />
            <div className="mt-6 flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-gold border border-cream-deep">
                <MapPinIcon className="w-5 h-5" />
              </span>
              <div>
                <p className="font-semibold text-navy">{location.address}</p>
                <p className="text-sm text-ink-soft mt-1">
                  Sundays, 11:00 AM – 1:00 PM
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={location.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white hover:bg-gold-light transition-colors shadow-sm"
              >
                Get Directions
              </a>
              <Button href="/visit" variant="secondary">
                Plan Your Visit
              </Button>
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Every Sunday" title="Schedule" />
            <div className="mt-6 space-y-3">
              {schedule.map((s) => (
                <Card key={s.title} className="p-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                      {s.time}
                    </p>
                    <p className="font-semibold text-navy mt-0.5">{s.title}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photos */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="See It for Yourself"
            title="Photos From This Location"
            description="Moments from Sunday kirtan, class, and the free feast, held here."
          />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {photos.map((src, i) => (
              <div
                key={src}
                className="relative aspect-square w-full overflow-hidden rounded-2xl border border-cream-deep bg-white shadow-sm"
              >
                <Image
                  src={src}
                  alt={`Sunday Programs location — photo ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  // Photo 2: anchor left so the speaker isn't cropped out.
                  className={`object-cover ${src.endsWith("temple-life-02.jpg") ? "object-left" : "object-center"}`}
                />
                <CornerFrame tone="gold" size={14} inset={7} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

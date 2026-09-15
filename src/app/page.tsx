import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Card,
  Eyebrow,
  SectionHeading,
} from "@/components/ui";
import { CornerFrame, OrnamentDivider } from "@/components/ornaments";
import HeroCarousel from "@/components/HeroCarousel";
import LocationCards from "@/components/LocationCards";
import JoinCourseBanner from "@/components/JoinCourseBanner";
import { campaignPercent, events, givingFunds, weeklySchedule } from "@/lib/data";

export default function HomePage() {
  const sundayItems = weeklySchedule.filter((s) => s.day === "Sunday");
  const upcoming = events.slice(0, 3);

  return (
    <div>
      <HeroCarousel />

      {/* Weekly schedule cards */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <SectionHeading
          eyebrow="Every Sunday"
          title="This Week at the Temple"
          description="A simple, welcoming flow — come for one part or stay for the whole afternoon."
        />
        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          {sundayItems.map((item) => (
            <Card key={item.title} className="p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                {item.time}
              </p>
              <h3 className="font-display text-xl font-semibold text-navy mt-2">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/visit" variant="secondary">
            View Full Weekly Schedule
          </Button>
          <Button href="/media#gallery" variant="primary">
            View Photo Gallery
          </Button>
        </div>
      </section>

      {/* Location guide — current locations, each expandable for details */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Find Us"
              title="Our Locations"
              description="Two locations — tap a card for schedule and directions."
              descriptionSize="sm"
            />
            <Link
              href="/visit"
              className="text-sm font-semibold text-gold hover:text-gold-light whitespace-nowrap"
            >
              View Full Schedule →
            </Link>
          </div>
          <div className="mt-10">
            <LocationCards />
          </div>
        </div>
      </section>

      {/* Capital campaign */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-cream-deep shadow-sm">
            <Image
              src="/new-temple/campaign-hero.jpg"
              alt="Devotees gathered outside the new ISKCON Austin temple's front entrance and reflecting pool"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <CornerFrame tone="gold" size={20} inset={8} />
          </div>
          <div>
            <Eyebrow>New Temple Campaign</Eyebrow>
            <OrnamentDivider className="mt-3" />
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-navy">
              A Home Built to Last Generations
            </h2>
            <p className="mt-4 text-ink-soft leading-relaxed">
              {givingFunds[0].description}
            </p>
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm font-semibold text-navy mb-2">
                <span>{givingFunds[0].stat}</span>
                <span>{campaignPercent()}%</span>
              </div>
              <div className="h-3 rounded-full bg-white overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light"
                  style={{ width: `${campaignPercent()}%` }}
                />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/donate" variant="secondary">
                Give to the Campaign
              </Button>
              <Button href="/virtual-tour" variant="ghost" className="!text-navy !border-navy/30 !bg-transparent hover:!bg-navy/5">
                Take the Virtual Tour
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Mark Your Calendar" title="Upcoming Events" />
          <Link href="/get-involved#events" className="text-sm font-semibold text-gold hover:text-gold-light">
            View Full Calendar →
          </Link>
        </div>
        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          {upcoming.map((e) => (
            <Card key={`${e.title}-${e.date}`} className="p-6 flex flex-col">
              <span className="inline-block w-fit rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy">
                {e.category}
              </span>
              <p className="mt-3 text-xs font-semibold text-gold">
                {new Date(e.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <h3 className="font-display text-xl font-semibold text-navy mt-1">
                {e.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed flex-1">
                {e.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 text-center">
          <Eyebrow>॥ हरे कृष्ण ॥</Eyebrow>
          <OrnamentDivider center tone="white" className="mt-3" />
          <h2 className="font-display text-3xl font-semibold">
            Stay Connected
          </h2>
          <p className="mt-4 text-white/75 max-w-xl mx-auto">
            Get weekly program updates, festival announcements, and campaign
            news in your inbox.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 rounded-full bg-white px-5 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button
              type="submit"
              className="rounded-full bg-gold px-6 py-3 text-sm font-semibold hover:bg-gold-light transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <JoinCourseBanner />
    </div>
  );
}

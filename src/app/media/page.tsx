import type { Metadata } from "next";
import { Button, PageHero, SectionHeading } from "@/components/ui";
import {
  JapaMalaIcon,
  KirtanIcon,
  LotusBloomIcon,
  MandalaIcon,
  PeacockFeatherIcon,
  ScriptureIcon,
  TempleSilhouetteIcon,
} from "@/components/devotional-art";
import MediaGallery, { type GallerySection } from "@/components/MediaGallery";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Browse photos from temple life, Sunday programs, and festivals at ISKCON Austin.",
};

// Livestream + Video Archive are hidden until real video content exists.
// Flip to true to bring both sections back (and restore the metadata/hero
// copy and the "Watch" links in Navbar and on the homepage).
const SHOW_VIDEO_SECTIONS = false;

const archive = [
  { title: "Sunday Class — Bhagavad-gita 2.13", icon: ScriptureIcon },
  { title: "Janmashtami Kirtan Highlights", icon: KirtanIcon },
  { title: "New Devotee Orientation", icon: JapaMalaIcon },
  { title: "Ratha Yatra Recap", icon: PeacockFeatherIcon },
  { title: "Wednesday Study Circle", icon: MandalaIcon },
  { title: "Temple Groundbreaking Ceremony", icon: TempleSilhouetteIcon },
] as const;

const gallerySections: GallerySection[] = [
  {
    key: "temple-life",
    label: "Temple Life",
    description:
      "Sunday programs, kirtan, Deity darshan, and everyday moments at the temple.",
    photos: Array.from({ length: 13 }, (_, i) => i + 1).map((i) => ({
      src: `/gallery/temple-life-${String(i).padStart(2, "0")}.jpg`,
      alt: `Temple Life — Photo ${i}`,
    })),
  },
  {
    key: "ratha-yatra",
    label: "Ratha Yatra Festival",
    description:
      "Scenes from ISKCON Austin's Ratha Yatra chariot festival celebrations.",
    photos: Array.from({ length: 18 }, (_, i) => {
      const n = String(i + 1).padStart(2, "0");
      return {
        src: `/gallery/ratha-yatra-${n}.jpg`,
        alt: `Ratha Yatra Festival — Photo ${i + 1}`,
      };
    }),
  },
  {
    key: "festivals",
    label: "Festivals & Celebrations",
    description:
      "Abhishek ceremonies, Holi, and other devotional celebrations throughout the year.",
    photos: [
      { src: "/gallery/festivals-01.jpg", alt: "Community temple activity — evening aarti and darshan" },
      { src: "/gallery/festivals-02.jpg", alt: "Festival and devotional celebrations — decorated altar offerings" },
      { src: "/gallery/festivals-03.jpg", alt: "Abhishek devotional ceremony" },
      { src: "/gallery/festivals-04.jpg", alt: "Holi community celebration" },
    ],
  },
];

export default function MediaPage() {
  return (
    <div>
      <PageHero
        eyebrow="Moments from the Temple"
        title="Media"
        description="Browse photos from temple life, Sunday programs, and festival celebrations at ISKCON Austin."
        image="/media/banner.jpg"
      />

      {SHOW_VIDEO_SECTIONS && (
        <>
          {/* Livestream */}
          <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
            <SectionHeading eyebrow="Join Live" title="Livestream" />
            <div className="mt-8 relative aspect-video w-full rounded-2xl bg-gradient-to-br from-navy to-navy-dark overflow-hidden flex flex-col items-center justify-center text-white gap-4">
              <LotusBloomIcon className="absolute -right-10 -bottom-10 w-56 h-56 text-white/5" />
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-2xl relative">
                ▶
              </span>
              <p className="text-sm text-white/70 relative">
                Live during Sunday programs.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="https://youtube.com" variant="secondary">
                Subscribe on YouTube
              </Button>
              <Button href="https://facebook.com" variant="primary">
                Follow on Facebook
              </Button>
            </div>
          </section>

          {/* Archive */}
          <section className="bg-cream">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
              <SectionHeading eyebrow="Watch Again" title="Video Archive" />
              <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {archive.map((item) => (
                  <div key={item.title}>
                    <div className="relative aspect-video rounded-xl bg-gradient-to-br from-navy to-navy-dark overflow-hidden flex items-center justify-center">
                      <item.icon className="w-14 h-14 text-gold-light" />
                      <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gold text-white text-xs">
                        ▶
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-navy">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Temple Life"
          title="Photo Gallery"
          description="Moments from temple life, festivals, and Sunday programs at ISKCON Austin, organized by occasion."
        />
        <div className="mt-10">
          <MediaGallery sections={gallerySections} />
        </div>
      </section>
    </div>
  );
}

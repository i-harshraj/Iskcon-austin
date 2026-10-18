// ---------------------------------------------------------------------------
// Central content file for the ISKCON Austin website.
// Everything marked TODO is placeholder copy — swap in real temple content
// before launch. Keeping it all here means no page code needs to change
// when real content arrives.
// ---------------------------------------------------------------------------

export const site = {
  name: "ISKCON Austin",
  legalName: "International Society for Krishna Consciousness of Austin",
  tagline: "A Home for Krishna Consciousness in Central Texas",
  phone: "+1-512-835-2121", // TODO: confirm current number
  email: "info@iskconaustin.com", // TODO: confirm current inbox
  address: "12012 North IH 35, Austin, TX 78753", // TODO: confirm current/new address
  hours: "Sundays, 11:00 AM – 1:00 PM", // TODO: confirm single source of truth for hours
  socials: {
    facebook: "https://facebook.com/iskconaustin",
    instagram: "https://instagram.com/iskconaustin",
    youtube: "https://youtube.com/@iskconaustin",
  },
  // Direct temple contacts.
  contactPeople: [
    { name: "Abhay Charan Das", phone: "+1-512-762-6644" },
    { name: "Sravanananda Das", phone: "+1-408-594-8864" },
  ],
  map: {
    // Google Business Profile listing (cid link) provided by the client.
    placeUrl:
      "https://www.google.com/maps?cid=9067017259345413292&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed",
    // Embeddable iframe version of the same listing — no API key required.
    embedUrl: "https://www.google.com/maps?cid=9067017259345413292&output=embed",
    // Deep link that opens turn-by-turn directions straight away.
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=12012+North+IH+35%2C+Austin%2C+TX+78753",
  },
};

// ISKCON Austin operates across two addresses — keep them distinct rather
// than collapsing to a single "site.address".
// Note: the "Weekday Daily Program" location has been intentionally removed
// site-wide per the client's requested updates — do not re-add a "daily"
// entry here without also re-adding its dedicated page and homepage section.
export const locations = [
  {
    key: "sunday",
    label: "Sunday Programs",
    address: "12012 N Interstate 35, Austin, TX 78753, USA",
    description: "Sunday Feast, kirtan, and the weekly Bhagavad-gita class are held here.",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=12012+N+Interstate+35%2C+Austin%2C+TX+78753",
  },
  {
    key: "newTemple",
    label: "New Temple (Under Construction)",
    address: "1311 Collinwood W Dr, Austin, TX 78753, USA",
    description: "Site of ISKCON Austin's future permanent home — see the Virtual Tour for renderings.",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=1311+Collinwood+W+Dr%2C+Austin%2C+TX+78753",
  },
] as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/visit", label: "Visit" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/about", label: "About" },
  { href: "/virtual-tour", label: "Virtual Tour" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
];

export const weeklySchedule = [
  {
    day: "Every Day",
    title: "Mangala Aarti & Tulasi Worship",
    time: "4:30 AM",
    description: "Morning worship and devotional offering to Srimati Tulasi Devi.",
  },
  {
    day: "Every Day",
    title: "Greeting of the Deities & Guru Puja",
    time: "6:45 AM",
    description: "The Deities' curtains open for the day, followed by worship of the spiritual master.",
  },
  {
    day: "Every Day",
    title: "Srimad Bhagavatam Class",
    time: "7:15 AM",
    description: "Daily scriptural class exploring the teachings of the Srimad Bhagavatam.",
  },
  {
    day: "Every Day",
    title: "Dhoop Aarti",
    time: "12:30 PM",
    description: "Midday offering of incense to the Deities.",
  },
  {
    day: "Every Day",
    title: "Gaura Aarti",
    time: "6:30 PM",
    description: "Evening offering of lamps, incense, and kirtan.",
  },
  {
    day: "Sunday",
    title: "Ecstatic Kirtan",
    time: "11:00 AM – 11:30 AM",
    description: "Congregational chanting and dancing open to all — no experience needed.",
  },
  {
    day: "Sunday",
    title: "Bhagavad-gita Study & Q&A",
    time: "11:40 AM – 12:30 PM",
    description: "A talk on the Bhagavad-gita followed by open questions and discussion.",
  },
  {
    day: "Sunday",
    title: "Aarti & Prasadam",
    time: "12:30 PM – 1:00 PM", // TODO: confirm exact end time with the temple
    description: "Closing aarti followed by a free vegetarian feast, offered to Krishna and shared with everyone.",
  },
  {
    day: "Wednesday",
    title: "Bhagavad-gita Study Circle",
    time: "7:30 PM – 8:30 PM",
    description: "In-depth weekly study group for all levels, online and in person.",
  },
] as const;

// Single source of truth for the New Temple capital campaign progress —
// change these two numbers and the label/percentage everywhere on the site
// (hero, homepage, About, Virtual Tour, New Temple location page) update
// together automatically.
export const campaignProgress = {
  raised: 1_250_000, // $1.25M — confirmed by Sravanananda
  goal: 4_500_000, // $4.5M — updated per client's requested website changes
};

export function campaignPercent() {
  return Math.round((campaignProgress.raised / campaignProgress.goal) * 100);
}

function formatMoney(n: number) {
  if (n % 1_000_000 === 0) return `$${n / 1_000_000}M`;
  return `$${(n / 1_000_000).toFixed(2).replace(/0$/, "")}M`;
}

function givingProgressLabel() {
  return `${formatMoney(campaignProgress.raised)} raised of ${formatMoney(campaignProgress.goal)} goal`;
}

// Home hero carousel — one slide per key message. `image` points at a file
// the client should drop into /public/hero/ (see the image-prompt list
// handed back alongside this file); until that file exists, the slide
// falls back to a devotional gradient + icon automatically.
export const heroSlides = [
  {
    key: "sunday",
    image: "/hero/sunday-program.jpg",
    eyebrow: "Every Sunday",
    title: "Join Us for the Sunday Program",
    body: "Kirtan, scripture study, and a free feast — every Sunday, open to everyone.",
    primaryCta: { label: "Plan Your Visit", href: "/locations/sunday" },
    schedule: [
      { time: "11:00 – 11:30 AM", title: "Ecstatic Kirtan" },
      { time: "11:40 AM – 12:30 PM", title: "Bhagavad-gita Study & Q&A" },
      { time: "12:30 – 1:00 PM", title: "Aarti Followed by Prasadam" },
    ],
  },
  {
    key: "kirtan",
    image: "/hero/kirtan.jpg",
    eyebrow: "Chant Together",
    title: "Kirtan",
    body: "Congregational chanting of the Hare Krishna maha-mantra — music, dancing, and joy open to everyone, no experience needed.",
    primaryCta: { label: "See Festival Calendar", href: "/get-involved#events" },
  },
  {
    key: "temple",
    image: "/temple-renderings/exterior-04-front-entrance-pool.jpg",
    eyebrow: "A Gift for Generations",
    title: "A Grand New Temple Is Coming to Austin",
    body: "Help us build a permanent home for Krishna consciousness in Central Texas — a worship hall, residences, and gardens for generations of devotees to come.",
    primaryCta: { label: "Explore the New Temple", href: "/virtual-tour" },
    stat: givingProgressLabel(),
  },
] as const;

// New temple construction status — Sri Sri Radha Damodar Temple.
// Single source of truth; update here and it reflects everywhere it's shown
// (currently the New Temple location page).
export const constructionUpdates = {
  templeName: "Sri Sri Radha Damodar Temple",
  milestones: [
    {
      title: "Site Plan Approved by City",
      detail: "Completed by our civil engineering team.",
      date: "2024",
      done: true,
    },
    {
      title: "Building Permit Approved by City",
      date: "February 2026",
      done: true,
    },
    {
      title: "General Contractor Bidding Process Completed",
      date: "July 2026",
      done: true,
    },
    {
      title: "Final Round of Fundraising",
      detail: "Construction can begin once complete.",
      date: "In progress",
      done: false,
    },
    {
      title: "Construction Begins",
      detail: "Ground will break once the final round of fundraising is complete.",
      date: "Upcoming",
      done: false,
    },
  ],
  constructionDuration: "10 to 12 months",
  features: [
    "Modern design",
    "48 car parking spots",
    "Centrally located — an easy commute from both north and south Austin",
    "Krishna prasadam distribution to begin shortly after the Grand Opening",
  ],
};

// Virtual tour — architectural renderings of the new temple, grouped by
// Exterior / Interior. Images live in /public/temple-renderings/.
export const virtualTourImages = [
  {
    key: "exterior-01",
    group: "Exterior" as const,
    src: "/temple-renderings/exterior-01-entrance-courtyard.jpg",
    title: "Entrance Courtyard",
    caption: "Approaching the new temple across the entrance courtyard.",
  },
  {
    key: "exterior-02",
    group: "Exterior" as const,
    src: "/temple-renderings/exterior-02-facade.jpg",
    title: "Temple Facade",
    caption: "The main facade, viewed from the parking and arrival area.",
  },
  {
    key: "exterior-03",
    group: "Exterior" as const,
    src: "/temple-renderings/exterior-03-covered-porch.jpg",
    title: "Covered Porch",
    caption: "A shaded, covered porch along the side of the temple.",
  },
  {
    key: "exterior-04",
    group: "Exterior" as const,
    src: "/temple-renderings/exterior-04-front-entrance-pool.jpg",
    title: "Front Entrance & Reflecting Pool",
    caption: "The front entrance framed by a reflecting pool.",
  },
] as const;

export type EventCategory = "Festival" | "Class" | "Community";

export type EventFlyer = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const events: {
  title: string;
  date: string; // ISO date, TODO: replace with real dates
  category: EventCategory;
  description: string;
  location: string;
  time: string; // TODO: confirm exact timing with the temple calendar
  // Optional event flyer, shown as a tappable preview (with a full-size
  // viewer + download) on the homepage and the events calendar. To add one:
  // drop the image in /public/events/ and fill this in.
  flyer?: EventFlyer;
}[] = [
  {
    title: "Janmashtami — Appearance of Lord Krishna",
    date: "2026-09-04",
    category: "Festival",
    description: "The biggest celebration of the year: abhishek, kirtan, drama, and a midnight feast.",
    location: "12012 N Interstate 35, Austin, TX 78753",
    time: "6:00 PM – 12:00 AM",
  },
  {
    title: "Radhastami",
    date: "2026-09-19",
    category: "Festival",
    description: "Celebrating the appearance of Srimati Radharani with special offerings and kirtan.",
    location: "12012 N Interstate 35, Austin, TX 78753",
    time: "6:00 PM – 8:30 PM",
  },
  {
    title: "Govardhan Puja",
    date: "2026-11-09",
    category: "Festival",
    description: "Kirtan, a lecture with Q&A, and aarti — followed by the Grand Feast.",
    location: "12012 N Interstate 35, Austin, TX 78753", // I-35 location
    time: "6:00 PM – 7:00 PM, then the Grand Feast",
    flyer: {
      src: "/events/govardhan-pooja-2026.jpg",
      alt: "Govardhan Pooja at ISKCON Austin, Monday, November 9, 2026, at 12012 N Interstate 35, Austin, TX 78753: kirtan 6:00–6:20 PM CT, lecture and Q&A 6:20–7:00 PM CT, aarti at 7:00 PM CT followed by the Grand Feast",
      width: 1545,
      height: 2000,
    },
  },
  {
    title: "Prabhupada Marathon Book Distribution",
    date: "2026-10-01",
    category: "Community",
    description: "Community outreach distributing Srila Prabhupada's books across Austin.",
    location: "Various locations around Austin, TX",
    time: "10:00 AM – 4:00 PM",
  },
  {
    title: "Diwali / Dipavali Celebration",
    date: "2026-11-08",
    category: "Festival",
    description: "A festival of lights for the whole family: offering ghee lamps and flowers to the Lord, face painting, henna, a book stall, and skits/drama.",
    location: "12012 N Interstate 35, Austin, TX 78753",
    time: "11:00 AM – 2:00 PM",
    flyer: {
      src: "/events/diwali-celebration-2026.jpg",
      alt: "Diwali Celebration at ISKCON Austin, Sunday, November 8, 2026, 11:00 AM to 2:00 PM CT, at 12012 N Interstate 35, Austin, TX 78753: group celebration with offering of ghee lamps and flowers to the Lord, face painting, henna, a book stall, and skits/drama",
      width: 1545,
      height: 2000,
    },
  },
] as const;

// Event dates are plain calendar days ("2026-11-08"). Parsing them with a
// bare `new Date("2026-11-08")` treats them as UTC midnight, which shows up
// as the *previous* day for visitors in US time zones — so anchor them to
// local midnight instead.
export function parseEventDate(iso: string) {
  return new Date(`${iso}T00:00:00`);
}

// Events that haven't happened yet (today still counts), soonest first.
// Used by the homepage and the events calendar so past events drop off
// automatically the next time the site is deployed.
export function upcomingEvents() {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return [...events]
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

// Ongoing outreach programs — recurring activities without a single fixed
// date, shown separately from the dated events calendar.
export const ongoingPrograms = [
  {
    title: "Book Distribution",
    description: "Sharing Srila Prabhupada's books with the Austin community at outreach events and public locations.",
  },
  {
    title: "Harinam Sankirtan",
    description: "Public chanting of the holy names — kirtan processions through the streets and community spaces.",
  },
  {
    title: "Home Programs",
    description: "Kirtan, class, and prasadam hosted in devotees' homes across Austin — contact us to host one.",
  },
] as const;

export const donationTiers = [
  { amount: 21, label: "Offer a garland of flowers for the Deities" },
  { amount: 51, label: "Sponsor prasadam for a Sunday Feast guest" },
  { amount: 108, label: "Support a week of temple worship and upkeep" },
  { amount: 251, label: "Sponsor a full Sunday Feast program" },
] as const;

// Donation methods & donor recognition, carried over from the original
// iskconaustin.com/temple-donate/ page as closely as possible.
export const donationMethods = [
  {
    key: "online",
    title: "Credit / Debit / Google Pay",
    description: "Give securely online using the form above — credit card, debit card, or Google Pay all accepted.",
  },
  {
    key: "check",
    title: "By Check",
    description: "Make checks payable to “ISKCON Austin” and mail to:",
    detail: "10700 Jonwood Way, Austin, TX 78753",
  },
  {
    key: "paypal",
    title: "PayPal",
    description: "Send your gift directly via PayPal to:",
    detail: "sda@ultimateselfrealization.com",
  },
  {
    key: "wire",
    title: "Wire / Bank Transfer",
    description: "For wire or ACH transfers, use the following account details:",
    detail:
      "Account Name: Sri Sri Radha Damodar Temple, Inc · ACH Routing: 314977175 · Account: 1800207606 · Type: Checking · Address: 10700 Jonwood Way, Austin, TX 78753, USA",
  },
] as const;

// Donor recognition levels for one-time major gifts.
export const donorRecognitionTiers = [
  {
    amount: "$1,000+",
    title: "Saptarishi Set",
    description: "Receive a complimentary copy of the Saptarishi Set — a collection of 7 books by Srila Prabhupada.",
  },
  {
    amount: "$2,500+",
    title: "Complete Srimad Bhagavatam",
    description: "Receive a complimentary copy of all twelve Cantos of the Srimad Bhagavatam, the most sacred scripture.",
  },
  {
    amount: "$5,000+",
    title: "Wall of Gratitude",
    description: "Your name is inscribed on our Wall of Gratitude, adorning the Main Lobby — with further recognition for gifts of $10,000+ and $25,000+.",
  },
] as const;

// Donation-specific point of contact (distinct from the general temple
// contact) — carried over from iskconaustin.com/temple-donate/.
export const donationContact = {
  name: "Sankarshan Das Adhikari",
  email: "sda@backtohome.com",
  phone: "+1-512-835-2121",
};

export const givingFunds = [
  {
    key: "capital",
    title: "New Temple Capital Campaign",
    description:
      "Help build ISKCON Austin's permanent home — a 300-person worship hall, residences, and gardens for generations to come.",
    stat: givingProgressLabel(), // single source of truth: campaignProgress above
  },
  {
    key: "operations",
    title: "Temple Operations & Seva",
    description:
      "Support day-to-day temple life: Deity worship, the free Sunday Feast, utilities, and outreach programs.",
    stat: "Ongoing — every gift helps",
  },
] as const;

// ISKCON philosophy copy, carried over from the original iskconaustin.com
// About page as closely as possible (source: iskconaustin.com/about/).
export const iskconPhilosophy = {
  intro:
    "Welcome to our website. We are the ISKCON Austin Hare Krishna center, the Austin, Texas, USA branch of ISKCON, the International Society for Krishna Consciousness. ISKCON is a worldwide organization of over 650 temples and centers that was started in New York City in 1966. Globally we are endeavoring to bring to planet earth a new age of unparalleled peace and prosperity for all. And locally we are dedicated to making Austin a spiritual city where everyone lives in perfect peace and harmony by making Krishna or God the center of their lives.",
  paragraphs: [
    "ISKCON is popularly known as the Hare Krishna Movement. This is a movement with historical roots going back at least 5,000 years ago to the time when Lord Sri Krishna was present on the planet in India and spoke the now famous Bhagavad-gita to his beloved friend Arjuna.",
    "In the later part of the 15th century, Sri Chaitanya Mahaprabhu revitalized the bhakti tradition by introducing an expansive spiritual movement that swept India. Central to this renaissance was Chaitanya Mahaprabhu's emphasis on the chanting of Lord Krishna's holy names. Underlying the practice was a profound, rational, and intellectually comprehensive theology. ISKCON is a continuation of the movement that Sri Chaitanya revitalized.",
  ],
} as const;

// Core teachings, shown as a card grid on the About page.
export const coreBeliefs = [
  {
    title: "Krishna, the Supreme",
    description: "Krishna is understood as the Supreme Personality of Godhead — the source of all that exists, worshiped as a personal, loving God rather than an abstract force.",
  },
  {
    title: "Bhagavad-gita As It Is",
    description: "The Bhagavad-gita is our central scripture, studied through Srila Prabhupada's translation and commentary, Bhagavad-gita As It Is.",
  },
  {
    title: "Bhakti Yoga",
    description: "Devotional service — chanting, worship, study, and service to others — is the direct path to reconnecting with Krishna, open to absolutely everyone.",
  },
  {
    title: "Karma & Reincarnation",
    description: "The soul is eternal and passes through many bodies across lifetimes; our actions shape what comes next, and bhakti offers a way beyond the cycle entirely.",
  },
] as const;

// Global movement stats, shown on the About page.
export const iskconStats = [
  { stat: "1966", label: "Founded in New York City" },
  { stat: "800+", label: "Temples & centers worldwide" },
  { stat: "~1M", label: "Congregational members globally" },
  { stat: "60", label: "Years spreading Krishna consciousness" },
] as const;

export const leadership = [
  {
    name: "Sankarshan Das", // TODO: confirm title/spelling
    role: "Temple President",
    bio: "Sankarshan Das has served the Austin devotee community for over a decade, overseeing temple programs and the new temple capital campaign.", // TODO
  },
  {
    name: "Resident Priest", // TODO: name
    role: "Pujari / Worship Coordinator",
    bio: "Leads daily Deity worship, aartis, and festival observances at the temple.", // TODO
  },
  {
    name: "Congregational Coordinator", // TODO: name
    role: "Community & Outreach",
    bio: "Coordinates Sunday programs, new-devotee classes, and volunteer service (seva) opportunities.", // TODO
  },
] as const;

export const getInvolvedOptions = [
  {
    title: "Sunday Feast Seva",
    description: "Help cook, serve, or clean up for the free weekly community feast.",
  },
  {
    title: "Book Distribution",
    description: "Share Srila Prabhupada's books with the Austin community at outreach events.",
  },
  {
    title: "Food for Life",
    description: "Prepare and distribute free vegetarian meals to those in need around Austin.",
  },
  {
    title: "Youth Programs",
    description: "Support kirtan, drama, and educational programs for children and teens.",
  },
  {
    title: "Temple Upkeep",
    description: "Lend a hand with grounds, Deity garments, altar decoration, and facilities.",
  },
  {
    title: "Capital Campaign Volunteers",
    description: "Help with fundraising events, outreach, and communications for the new temple.",
  },
] as const;

// "Krishna Consciousness at Home" — a rebuild of the legacy site's
// /kc-at-home/ page with clearer structure and proper headings.
export const kcAtHome = {
  mantra: [
    "Hare Krishna, Hare Krishna",
    "Krishna Krishna, Hare Hare",
    "Hare Rama, Hare Rama",
    "Rama Rama, Hare Hare",
  ],
  altarItems: [
    "A picture of Srila Prabhupada",
    "A picture of Lord Chaitanya and associates",
    "A picture of Sri Sri Radha-Krishna",
    "An altar cloth",
    "Water cups and an offering plate",
    "A bell, incense, candles, and fresh flowers",
  ],
  offerableFoods: ["Milk & dairy products", "Vegetables", "Fruits & nuts", "Grains"],
  nonOfferableFoods: ["Meat, fish & eggs", "Garlic & onions", "Caffeinated beverages"],
  regulativePrinciples: [
    {
      title: "No Meat, Fish, or Eggs",
      description: "A diet free of violence toward other living beings, centered on foods offered to Krishna.",
    },
    {
      title: "No Gambling",
      description: "Gambling breeds anxiety, greed, and envy — the opposite of a peaceful, devotional mind.",
    },
    {
      title: "No Intoxication",
      description: "Alcohol, drugs, tobacco, and even caffeine cloud consciousness and cause forgetfulness of Krishna.",
    },
    {
      title: "No Illicit Sex",
      description: "Sexual life is restricted to marriage, for procreation, in keeping with a life of self-control.",
    },
  ],
  dailyPractices: [
    {
      title: "Chant the Holy Names",
      description: "Chant japa on 108 beads — 16 rounds daily is the standard for serious practitioners, ideally in the early morning hours.",
    },
    {
      title: "Worship at Your Altar",
      description: "Keep it clean, offer fresh water and incense daily, and remove wilted flowers promptly.",
    },
    {
      title: "Offer Your Food",
      description: "Prepare vegetarian food with devotion and offer it to Krishna before eating — it becomes prasadam, spiritualized food.",
    },
    {
      title: "Read Daily",
      description: "Set aside time each day to read Srila Prabhupada's books — available at store.krishna.com.",
    },
    {
      title: "Engage Your Work",
      description: "Offer the fruits of your profession — writing, art, or any skill — in service to Krishna rather than for self alone.",
    },
    {
      title: "Stay in Association",
      description: "Visit the temple regularly and join a home study group to stay connected to the devotee community.",
    },
  ],
} as const;

export const faqs = [
  {
    q: "What should I wear?",
    a: "Modest, comfortable clothing is welcome — there's no strict dress code for visitors. Many devotees wear traditional Indian clothing, but it isn't required.",
  },
  {
    q: "Is there anything to eat?",
    a: "Yes — a free vegetarian feast (prasadam) is offered every Sunday after the program, open to everyone regardless of background.",
  },
  {
    q: "Do I need to know anything about Krishna consciousness beforehand?",
    a: "Not at all. Newcomers are welcome at every program, and temple greeters are happy to explain what's happening as it unfolds.",
  },
  {
    q: "Is parking available?",
    a: "Yes, free on-site parking is available at the temple.",
  },
  {
    q: "Can I bring my family, including children?",
    a: "Absolutely — Sunday programs are family-friendly, with activities for children and a warm, welcoming community.",
  },
];

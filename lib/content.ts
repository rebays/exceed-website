/** Site content shared across pages. Edit copy here, not in components. */

export const contact = {
  email: "simbi@exceed.com.sb",
  phoneDisplay: "+677 7421687 | 39333",
  phoneHref: "tel:+6777421687",
  address: ["Room 19, Level 1", "Capital Park", "Honiara, Solomon Islands"],
};

export const navItems = [
  { name: "Work", href: "/portfolio" },
  { name: "Solutions", href: "/solutions" },
  { name: "About", href: "/about" },
];

export type ServiceIcon = "brand" | "signage" | "wrap" | "software" | "print" | "fabrication";

export const services: { title: string; desc: string; icon: ServiceIcon }[] = [
  {
    title: "Design & Branding",
    desc: "Rebrands, social media and photography that give your identity one consistent voice.",
    icon: "brand",
  },
  {
    title: "Signage & Billboards",
    desc: "LED signs, lightboxes and billboards, built and installed to last outdoors.",
    icon: "signage",
  },
  {
    title: "Vehicle Wraps",
    desc: "Fleet, vehicle and boat wraps, one-way vision and frosting for brands on the move.",
    icon: "wrap",
  },
  {
    title: "Software Development",
    desc: "Custom web apps and enterprise systems built around how your business actually runs.",
    icon: "software",
  },
  {
    title: "Print & Merchandise",
    desc: "Posters, business cards, PVC ID cards, apparel and merchandise, finished to spec.",
    icon: "print",
  },
  {
    title: "Fabrication & Displays",
    desc: "Welding, fabrication and premium media displays for spaces that need to impress.",
    icon: "fabrication",
  },
];

export type ProjectMedia = { type: "video" | "image"; src: string } | null;

export const projects: {
  client: string;
  category: string;
  title: string;
  excerpt: string;
  media: ProjectMedia;
}[] = [
  {
    client: "Global Retail Co.",
    category: "Rebranding & Signage",
    title: "A complete corporate identity overhaul.",
    excerpt:
      "Full rebrand with high-resolution signage, storefront channel letters and WaveLight media displays.",
    media: { type: "image", src: "/hero-image.jpg" },
  },
  {
    client: "TransNational Freight",
    category: "Software Development",
    title: "A logistics portal that moves at freight speed.",
    excerpt: "A bespoke web application for real-time tracking that cut processing delays by 34%.",
    media: null,
  },
  {
    client: "City Services Group",
    category: "Vehicle Fleet Wraps",
    title: "Five hundred vehicles. One brand.",
    excerpt: "High-durability wraps designed, printed and installed across 500+ commercial vans and trucks.",
    media: { type: "video", src: "/videos/print-1.mp4" },
  },
  {
    client: "Metro Sports Arena",
    category: "Venue Branding",
    title: "A stadium, lit up end to end.",
    excerpt: "LED lightboxes, A-frames and stadium-wide one-way vision, delivered on a tight deadline.",
    media: { type: "image", src: "/printer.jpg" },
  },
];

export const partners = ["ORG Clinic", "Rebays", "OVO"];

// White one-colour logos for the hero. `displayHeight` is in px,
// tuned so wide wordmarks and tall crests carry similar visual weight.
export const heroClients = [
  { name: "Our Telekom", src: "/clients/our-telekom.png", width: 497, height: 240, displayHeight: 36 },
  { name: "Oceania Football Confederation", src: "/clients/ofc.png", width: 320, height: 235, displayHeight: 34 },
  { name: "Solomon Submarine Cable", src: "/clients/siscc.png", width: 529, height: 261, displayHeight: 32 },
  { name: "Solomon Islands Government", src: "/clients/solomon-islands-government.png", width: 199, height: 240, displayHeight: 46 },
  { name: "Australian Government Department of Foreign Affairs and Trade", src: "/clients/dfat.png", width: 1375, height: 240, displayHeight: 30 },
];

export const stats = [
  { label: "Founded", value: "2022" },
  { label: "Regional offices", value: "8" },
  { label: "Enterprise clients", value: "150+" },
  { label: "Industry awards", value: "24" },
];

export const processSteps = [
  { title: "Discovery", time: "2–3 days", desc: "We study the brand, the market and the constraints first." },
  { title: "Strategy", time: "3–5 days", desc: "We decide what matters before we make anything." },
  { title: "Concept", time: "4–5 days", desc: "Directions are explored and pressure-tested." },
  { title: "Build", time: "1–4 weeks", desc: "Design files become signage, print and software, to spec." },
  { title: "Delivery", time: "Ongoing", desc: "Installed, tested and supported. We launch when it's ready." },
];

export const leaders = [
  { name: "Simbi Jama", role: "Founder & CEO", bio: "15 years in enterprise strategy. The first and last eye on every project." },
  { name: "Bradon Tupiti", role: "Chief Technology Officer", bio: "Distributed systems and cloud architecture behind every software build." },
  { name: "Carlos Saliga", role: "Head of Global Operations", bio: "Keeps scope, timelines and fabrication running without drama." },
];

export const tiers = [
  {
    name: "Project",
    desc: "Defined work with a clear scope.",
    features: ["Brand or signage", "One active workstream", "Milestone-based delivery"],
  },
  {
    name: "Advanced",
    desc: "Broader scope, deeper involvement.",
    features: ["Brand, signage or software", "Direct senior access", "Priority scheduling"],
    featured: true,
  },
  {
    name: "Signature",
    desc: "End-to-end execution for complex work.",
    features: ["Full-scope design & fabrication", "Multiple workstreams", "Senior-led team"],
  },
];

export const faqs = [
  {
    q: "How do we start working together?",
    a: "A short call to understand scope, timeline and priorities. If there's a fit, we define the engagement and start with a clear plan.",
  },
  {
    q: "Who will I work with day to day?",
    a: "The person who scopes the work stays involved throughout, from design through fabrication or development.",
  },
  {
    q: "Do you handle both digital and physical work?",
    a: "Yes. Branding, signage, fabrication and software are all in-house, so nothing gets lost between vendors.",
  },
  {
    q: "What happens if the scope changes?",
    a: "We adjust the scope together before continuing. No silent overages, no unclear extensions.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Clarity on goals, access to existing materials and a single point of contact. We structure the rest together.",
  },
];

export const featuredProject = {
  tag: "Full service",
  location: "Global Tech HQ",
  title: "One launch. Every surface, physical and digital.",
  excerpt:
    "LED lightboxes, architectural frosting, custom merchandise and a tailor-made digital check-in system — one holistic build for a headquarters opening.",
};

export const solutions = [
  {
    title: "Design & Brand",
    desc: "Branding and design that sharpens your identity and engages your audience.",
    features: [
      "Design & corporate rebranding",
      "Social media marketing & management",
      "Photography & high-res scanning",
      "Sport venue branding & consultancy",
      "Welding & fabrication",
      "Billboard & signage installation",
    ],
  },
  {
    title: "Premium Products",
    desc: "Physical products, from large-scale signs and billboards to bespoke merchandise and apparel.",
    features: [
      "Signs, banners & billboards",
      "LEDs & LED lightboxes",
      "Channel letters & vehicle/boat wraps",
      "Flyers, posters and books",
      "PVC ID/business cards & t-shirts",
      "WaveLight media displays",
    ],
  },
  {
    title: "Software",
    desc: "Engineering tailored to your business, from enterprise applications to custom builds.",
    features: ["Custom software solutions", "Web & mobile applications", "Enterprise systems"],
  },
];

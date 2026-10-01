import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  ChevronRight,
  CircleHelp,
  Compass,
  Gauge,
  Gem,
  HeartHandshake,
  Layers3,
  Menu,
  MessageCircleHeart,
  MousePointer2,
  Palette,
  Radar,
  Rocket,
  ScanSearch,
  Sparkles,
  Target,
  WandSparkles,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import audioImage from "@/assets/nova-case-audio.jpg";
import beautyImage from "@/assets/nova-case-beauty.jpg";
import fashionImage from "@/assets/nova-case-fashion.jpg";
import editorialObject from "@/assets/nova-editorial-object.jpg";
import wellnessImage from "@/assets/nova-case-wellness.jpg";
import { NovaLogo } from "@/components/nova/logo";
import { ThemeToggle } from "@/components/nova/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type IconType = LucideIcon;
type Tint = "lavender" | "blue" | "blush" | "yellow" | "mint";

const tintClasses: Record<Tint, string> = {
  lavender: "bg-studio-lavender shadow-studio-lavender",
  blue: "bg-studio-blue shadow-studio-blue",
  blush: "bg-studio-blush shadow-studio-blush",
  yellow: "bg-studio-yellow shadow-studio-yellow",
  mint: "bg-studio-mint shadow-studio-mint",
};

const services: { title: string; copy: string; points: string[]; icon: IconType; tint: Tint }[] = [
  {
    title: "Trend intelligence",
    copy: "Find the cultural signals worth your team’s attention before they become yesterday’s format.",
    points: ["12 youth categories", "Momentum scoring", "Audience context"],
    icon: Radar,
    tint: "lavender",
  },
  {
    title: "Content strategy",
    copy: "Turn a strong signal into a clear campaign angle and a complete social content direction.",
    points: ["Campaign concepts", "Channel-specific hooks", "Ready-to-use hashtags"],
    icon: WandSparkles,
    tint: "blue",
  },
  {
    title: "Brand voice",
    copy: "Give every marketer a shared creative standard without flattening the personality of your brand.",
    points: ["Voice profiles", "Banned-word guardrails", "Consistent output"],
    icon: MessageCircleHeart,
    tint: "blush",
  },
];

const caseStudies = [
  {
    image: wellnessImage,
    client: "Luma Fizz",
    category: "Wellness beverage",
    result: "A ritual-led campaign built from an emerging soft-energy signal.",
  },
  {
    image: fashionImage,
    client: "Halo Form",
    category: "Streetwear",
    result: "A tactile product story shaped around low-key futurism.",
  },
  {
    image: beautyImage,
    client: "Dew Club",
    category: "Beauty",
    result: "A calm launch world inspired by the rise of quiet routine content.",
  },
  {
    image: audioImage,
    client: "Softwave",
    category: "Consumer tech",
    result: "A playful identity moment for a new everyday-listening ritual.",
  },
];

const benefits: { title: string; copy: string; icon: IconType; tint?: Tint; wide?: boolean }[] = [
  { title: "Earlier signals", copy: "See new formats and conversation shifts while there is still room to make them yours.", icon: ScanSearch, tint: "lavender", wide: true },
  { title: "Faster decisions", copy: "Give your team a shared, evidence-backed read in minutes.", icon: Zap },
  { title: "Brand fit", copy: "Score cultural momentum against your audience and positioning.", icon: Target, tint: "mint" },
  { title: "One clear voice", copy: "Keep vocabulary, tone and creative boundaries consistent.", icon: BadgeCheck },
  { title: "Campaign range", copy: "Move from a strategic angle to hooks, captions and formats.", icon: Layers3, tint: "blue", wide: true },
  { title: "Human judgment", copy: "Recommendations explain the why, so marketers stay in control.", icon: Compass },
  { title: "Team-ready", copy: "Create work that is easier to present, review and improve together.", icon: HeartHandshake, tint: "blush" },
  { title: "Category depth", copy: "Explore intelligence tuned to 12 fast-moving youth categories.", icon: BarChart3 },
];

const process = [
  { title: "Set the brief", copy: "Choose a category, add your brand if you want personalisation, and define the question.", icon: MousePointer2, tint: "lavender" as Tint },
  { title: "Read the culture", copy: "NOVA maps audience conversations, formats and early signals around your space.", icon: Radar, tint: "blue" as Tint },
  { title: "Score the momentum", copy: "Each direction is assessed for audience energy, relevance and fit out of 100.", icon: Gauge, tint: "mint" as Tint },
  { title: "Find your angle", copy: "The signal becomes a credible marketing opportunity with a clear reason to act.", icon: Target, tint: "yellow" as Tint },
  { title: "Shape the work", copy: "Build campaign ideas, captions, hooks and hashtags inside your brand voice.", icon: Palette, tint: "blush" as Tint },
  { title: "Launch with clarity", copy: "Review, copy and share a complete direction your whole team can understand.", icon: Rocket, tint: "lavender" as Tint },
];

const gallery = [
  { image: beautyImage, name: "Quiet Glow", category: "Skincare launch", span: "md:col-span-7" },
  { image: audioImage, name: "Everyday Frequency", category: "Audio campaign", span: "md:col-span-5" },
  { image: fashionImage, name: "Soft Utility", category: "Streetwear direction", span: "md:col-span-5" },
  { image: wellnessImage, name: "Ritual Energy", category: "Beverage positioning", span: "md:col-span-7" },
];

const testimonials = [
  { quote: "NOVA turns the ‘we should do something with this’ conversation into a real brief before the moment passes.", name: "Maya Chen", role: "Brand Director, Luma", initials: "MC", featured: true },
  { quote: "The recommendations feel strategic, not like a pile of internet trends dropped into a deck.", name: "Theo Grant", role: "Strategy Lead, Halo", initials: "TG" },
  { quote: "Our social team finally has one shared view of what matters and why it fits our audience.", name: "Ari Bell", role: "Social Lead, Dew Club", initials: "AB" },
  { quote: "It makes trend research calmer, clearer and much easier to defend with the wider team.", name: "Noor Patel", role: "Insights Manager", initials: "NP" },
  { quote: "Brand voice gives us useful guardrails without making every caption sound identical.", name: "Sam Rivera", role: "Creative Producer", initials: "SR" },
  { quote: "We moved from signal to a launch-ready concept in one working session.", name: "Iris Cole", role: "Growth Director", initials: "IC" },
];

const faqs = [
  { q: "Who is NOVA for?", a: "Brand, insights, social and creative teams building for Gen Z and youth audiences." },
  { q: "Is NOVA a general AI assistant?", a: "No. Every workflow is built around cultural intelligence, campaign strategy and brand-safe content." },
  { q: "Does it use live trend data?", a: "This preview uses realistic sample intelligence. A production workspace can connect your approved data sources." },
  { q: "Can we define our own voice?", a: "Yes. Add personality, audience, preferred vocabulary and words to avoid once, then reuse that profile." },
  { q: "Does NOVA promise virality?", a: "No. It helps teams make more relevant decisions; audience response and distribution remain platform-dependent." },
  { q: "Can multiple teams use it?", a: "The Team plan is designed for shared brand profiles, collaborative workflows and higher usage." },
];

function SectionIntro({ label, title, copy }: { label: string; title: string; copy?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="studio-pill">{label}</span>
      <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight sm:text-5xl">{title}</h2>
      {copy ? <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{copy}</p> : null}
    </div>
  );
}

function StudioNav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Services", "#services"], ["About", "#about"], ["Features", "#features"], ["Work", "#work"], ["Pricing", "#pricing"],
  ];
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div className={cn("mx-auto max-w-7xl border border-border bg-background/90 px-4 shadow-sm backdrop-blur-xl transition-[border-radius] sm:px-6", open ? "rounded-[2rem]" : "rounded-full")}>
        <div className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
          <Link to="/" aria-label="NOVA home" className="min-w-0"><NovaLogo /></Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            {links.map(([label, href]) => <a key={href} href={href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{label}</a>)}
          </nav>
          <div className="flex shrink-0 items-center justify-end gap-2">
            <ThemeToggle className="border-0 bg-secondary" />
            <Button asChild className="hidden h-10 rounded-full bg-foreground px-5 text-background shadow-none hover:bg-foreground/85 sm:inline-flex">
              <Link to="/signup">Request access</Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {open ? (
          <nav className="border-t border-border px-2 py-4 md:hidden" aria-label="Mobile navigation">
            {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-sm font-medium hover:bg-secondary">{label}</a>)}
            <Button asChild className="mt-3 w-full rounded-full bg-foreground text-background hover:bg-foreground/85"><Link to="/signup">Request access</Link></Button>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="px-5 pb-20 pt-12 sm:pb-28 sm:pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
        <div>
          <span className="studio-pill"><Sparkles className="size-3.5" /> Youth culture, made useful</span>
          <h1 className="mt-7 max-w-4xl font-display text-6xl font-bold uppercase leading-[0.88] sm:text-8xl lg:text-[7.8rem]">
            See what culture becomes next.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-7 text-muted-foreground sm:text-xl">
            NOVA turns emerging cultural signals into clear marketing opportunities, original campaign thinking, and content your brand can confidently own.
          </p>
          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-13 w-full bg-foreground px-7 text-background shadow-none hover:bg-foreground/85 sm:w-auto">
              <Link to="/signup">Request access <ArrowRight /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-13 border-foreground bg-transparent px-6 text-foreground"><Link to="/app/trends">Explore Trend Scanner <ChevronRight /></Link></Button>
          </div>
        </div>
        <figure className="overflow-hidden rounded-[3.5rem] bg-card">
          <img src={editorialObject} alt="A tactile arrangement of NOVA's signal and strategy building blocks" width={1400} height={1200} className="aspect-[7/6] h-full w-full object-cover" />
        </figure>
        <div className="lg:col-span-2 lg:mt-8">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Made for ambitious teams in</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-9 gap-y-4 text-sm font-semibold text-foreground/55 sm:text-base">
            <span>BEAUTY LABS</span><span>STREET / FORM</span><span>GOOD DAY GOODS</span><span>SOFTWAVE</span><span>CAMPUS CLUB</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="studio-section">
      <SectionIntro label="What NOVA does" title="From cultural noise to your next sharp move." copy="Three connected capabilities help strategy, social, and creative teams move together — without chasing every passing moment." />
      <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className={cn("studio-card group relative min-h-[26rem] overflow-hidden p-7 transition duration-300 hover:-translate-y-1.5 sm:p-9", tintClasses[service.tint])}>
            <div className="absolute right-6 top-6 grid size-24 rotate-6 place-items-center rounded-[2rem] border border-background/70 bg-background/55 shadow-lg transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105">
              <service.icon className="size-10 text-foreground/75" strokeWidth={1.5} />
            </div>
            <div className="flex h-full flex-col justify-end pt-40">
              <h3 className="text-2xl font-semibold">{service.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{service.copy}</p>
              <ul className="mt-6 space-y-3">
                {service.points.map((point) => <li key={point} className="flex items-center gap-3 text-sm font-medium"><span className="grid size-5 place-items-center rounded-full bg-background/70"><Check className="size-3" /></span>{point}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Showcase() {
  const [active, setActive] = useState(0);
  const move = (direction: number) => setActive((current) => (current + direction + caseStudies.length) % caseStudies.length);
  return (
    <section className="studio-section overflow-hidden" aria-roledescription="carousel">
      <SectionIntro label="Inside the work" title="Strategy you can see, feel, and build on." copy="A few fictional campaign worlds showing how NOVA can carry an early signal into a distinctive creative direction." />
      <div className="relative mx-auto mt-14 max-w-7xl">
        <div className="grid grid-cols-[0.18fr_1fr_0.18fr] items-center gap-3 sm:grid-cols-[0.35fr_1fr_0.35fr] sm:gap-6">
          {[-1, 0, 1].map((offset) => {
            const index = (active + offset + caseStudies.length) % caseStudies.length;
            const item = caseStudies[index];
            if (!item) return null;
            return (
              <article key={`${active}-${offset}`} className={cn("overflow-hidden rounded-[1.75rem] border border-border bg-card transition-all duration-500", offset === 0 ? "relative z-10 shadow-studio-lavender" : "scale-90 opacity-40 blur-[1px]")}>
                <img src={item.image} alt={`${item.client} ${item.category} campaign concept`} loading="lazy" width={1408} height={1008} className={cn("aspect-[7/5] w-full object-cover", offset !== 0 && "min-h-52")} />
                {offset === 0 ? <div className="grid gap-2 p-6 sm:grid-cols-[1fr_auto] sm:items-end sm:p-8"><div><p className="text-sm text-muted-foreground">{item.category}</p><h3 className="mt-1 text-2xl font-semibold">{item.client}</h3></div><p className="max-w-sm text-sm leading-6 text-muted-foreground sm:text-right">{item.result}</p></div> : null}
              </article>
            );
          })}
        </div>
        <div className="mt-7 flex justify-center gap-3">
          <Button variant="outline" size="icon" className="size-12 rounded-full bg-card" onClick={() => move(-1)} aria-label="Previous case study"><ArrowLeft /></Button>
          <Button variant="outline" size="icon" className="size-12 rounded-full bg-card" onClick={() => move(1)} aria-label="Next case study"><ArrowRight /></Button>
        </div>
      </div>
    </section>
  );
}

function About() {
  const cards = [
    { label: "Our mission", title: "Make cultural intelligence feel clear, useful, and creatively alive.", copy: "NOVA exists to help good teams notice meaningful change without becoming slaves to the feed.", bullets: ["Signals with context", "Ideas with a point of view", "Technology that supports judgment"], tint: "lavender" as Tint, symbol: "✦" },
    { label: "Who we are", title: "A focused intelligence platform for brands built around young people.", copy: "We blend cultural research, strategic structure, and generative workflows into one calm place to think and make.", bullets: ["Built for brand teams", "Designed around real workflows", "Serious intelligence, friendly interface"], tint: "mint" as Tint, symbol: "◌" },
  ];
  return (
    <section id="about" className="studio-section">
      <SectionIntro label="About NOVA" title="Calm technology for fast-moving culture." />
      <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-2">
        {cards.map((card) => <article key={card.label} className={cn("studio-card relative min-h-[31rem] overflow-hidden p-8 sm:p-10", tintClasses[card.tint])}>
          <span className="studio-pill bg-background/60">{card.label}</span>
          <div className="absolute right-8 top-8 grid size-24 place-items-center rounded-full border border-background/80 bg-background/60 text-4xl shadow-lg">{card.symbol}</div>
          <div className="mt-32 max-w-xl"><h3 className="text-3xl font-semibold leading-tight sm:text-4xl">{card.title}</h3><p className="mt-5 leading-7 text-muted-foreground">{card.copy}</p><ul className="mt-7 grid gap-3 sm:grid-cols-3">{card.bullets.map((item) => <li key={item} className="border-t border-foreground/10 pt-3 text-sm font-medium">{item}</li>)}</ul></div>
        </article>)}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="studio-section">
      <SectionIntro label="Why NOVA" title="Everything your team needs to move with relevance." copy="Built to make the gap between insight and execution shorter, smarter, and more collaborative." />
      <div className="mx-auto mt-14 grid max-w-7xl gap-4 md:grid-cols-3">
        {benefits.map((item) => <article key={item.title} className={cn("studio-card min-h-56 p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg", item.wide && "md:col-span-2", item.tint ? tintClasses[item.tint] : "bg-card")}><span className="grid size-11 place-items-center rounded-2xl border border-border bg-background/70"><item.icon className="size-5" /></span><h3 className="mt-8 text-xl font-semibold">{item.title}</h3><p className="mt-2 max-w-lg leading-7 text-muted-foreground">{item.copy}</p></article>)}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="studio-section">
      <SectionIntro label="How it works" title="From signal to strategy in six clear steps." />
      <ol className="mx-auto mt-14 max-w-3xl space-y-4">
        {process.map((step, index) => <li key={step.title} className={cn("studio-card grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-5 sm:gap-6 sm:p-7", tintClasses[step.tint])}><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-background/70"><step.icon className="size-5" /></span><div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Step {index + 1}</p><h3 className="mt-1 text-lg font-semibold sm:text-xl">{step.title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{step.copy}</p></div><span className="hidden text-3xl font-semibold text-foreground/10 sm:block">0{index + 1}</span></li>)}
      </ol>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="studio-section">
      <SectionIntro label="Selected directions" title="Built for brands people want to be part of." />
      <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-12">
        {gallery.map((item) => <article key={item.name} className={cn("group relative overflow-hidden rounded-[1.75rem] border border-border bg-card", item.span)}><img src={item.image} alt={`${item.name}, ${item.category}`} loading="lazy" width={1408} height={1008} className="aspect-[7/5] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /><div className="absolute inset-x-4 bottom-4 translate-y-2 rounded-2xl bg-background/90 p-4 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"><p className="text-sm text-muted-foreground">{item.category}</p><h3 className="font-semibold">{item.name}</h3></div></article>)}
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "NOVA Studio", summary: "For focused teams building a sharper weekly rhythm.", price: "$79", note: "per workspace / month", features: ["Trend Scanner", "12 categories", "Brand Voice profile", "Content Studio", "Saved opportunities", "Email support"], icon: Gem, prominent: false },
    { name: "NOVA Team", summary: "For growing brand teams working across markets and channels.", price: "$189", note: "per workspace / month", features: ["Everything in Studio", "5 team seats", "Multiple brand profiles", "Priority intelligence", "Shared campaign library", "Priority support"], icon: Sparkles, prominent: true },
  ];
  return (
    <section id="pricing" className="studio-section">
      <SectionIntro label="Simple pricing" title="Choose the pace that fits your team." copy="Start with one focused workspace. Move up when more brands, markets, and collaborators join the work." />
      <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-2">
        {plans.map((plan) => <article key={plan.name} className={cn("studio-card flex flex-col p-7 sm:p-9", plan.prominent ? "bg-studio-lavender shadow-studio-lavender" : "bg-card")}><div className="flex items-start justify-between gap-4"><span className="grid size-12 place-items-center rounded-2xl bg-background/75"><plan.icon className="size-5" /></span>{plan.prominent ? <span className="studio-pill bg-background/60">Most popular</span> : null}</div><h3 className="mt-8 text-2xl font-semibold">{plan.name}</h3><p className="mt-2 text-muted-foreground">{plan.summary}</p><div className="mt-8"><span className="text-5xl font-semibold">{plan.price}</span><span className="ml-2 text-sm text-muted-foreground">{plan.note}</span></div><Button asChild className="mt-8 h-12 w-full rounded-full bg-foreground text-background hover:bg-foreground/85"><Link to="/signup">Choose {plan.name}</Link></Button><ul className="mt-8 grid gap-x-5 gap-y-3 sm:grid-cols-2">{plan.features.map((feature) => <li key={feature} className="flex gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{feature}</li>)}</ul></article>)}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="studio-section">
      <SectionIntro label="From the team chat" title="Less chasing. More clarity." />
      <div className="mx-auto mt-14 grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => <figure key={item.name} className={cn("studio-card flex min-h-64 flex-col p-7", item.featured ? "bg-studio-blue shadow-studio-blue" : "bg-card")}><blockquote className="text-lg leading-7">“{item.quote}”</blockquote><figcaption className="mt-auto flex items-center gap-3 pt-8"><span className="grid size-10 place-items-center rounded-full bg-foreground text-xs font-semibold text-background">{item.initials}</span><span><span className="block text-sm font-semibold">{item.name}</span><span className="block text-xs text-muted-foreground">{item.role}</span></span></figcaption></figure>)}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="studio-section">
      <SectionIntro label="Good to know" title="Questions, answered simply." />
      <div className="mx-auto mt-14 grid max-w-7xl gap-x-10 md:grid-cols-2 lg:grid-cols-3">
        {faqs.map((item) => <article key={item.q} className="border-t border-border py-7"><CircleHelp className="size-5 text-primary" /><h3 className="mt-5 font-semibold">{item.q}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.a}</p></article>)}
      </div>
    </section>
  );
}

function StudioFooter() {
  return (
    <footer className="px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-border bg-studio-lavender p-7 shadow-studio-lavender sm:p-10 lg:p-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div><NovaLogo /><h2 className="mt-7 max-w-lg text-3xl font-semibold leading-tight sm:text-4xl">Make your next cultural move feel unmistakably yours.</h2><Button asChild className="mt-7 rounded-full bg-foreground text-background hover:bg-foreground/85"><Link to="/signup">Request access <ArrowRight /></Link></Button></div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3"><div><p className="text-sm font-semibold">Explore</p><nav className="mt-4 space-y-3 text-sm text-muted-foreground"><a className="block hover:text-foreground" href="#services">Services</a><a className="block hover:text-foreground" href="#features">Features</a><a className="block hover:text-foreground" href="#pricing">Pricing</a></nav></div><div><p className="text-sm font-semibold">Platform</p><nav className="mt-4 space-y-3 text-sm text-muted-foreground"><Link className="block hover:text-foreground" to="/app/trends">Trend Scanner</Link><Link className="block hover:text-foreground" to="/app/studio">Content Studio</Link><Link className="block hover:text-foreground" to="/login">Log in</Link></nav></div><div><p className="text-sm font-semibold">Social</p><nav className="mt-4 space-y-3 text-sm text-muted-foreground"><a className="block hover:text-foreground" href="mailto:hello@nova.example">Email</a><span className="block">LinkedIn</span><span className="block">Instagram</span></nav></div></div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-foreground/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} NOVA. All rights reserved.</p><p>AI marketing intelligence for youth brands.</p></div>
      </div>
    </footer>
  );
}

export function StudioHomepage() {
  return (
    <div className="studio-home min-h-screen bg-background font-studio text-foreground">
      <StudioNav />
      <main><Hero /><Services /><Showcase /><About /><Features /><Process /><Work /><Pricing /><Testimonials /><FAQ /></main>
      <StudioFooter />
    </div>
  );
}

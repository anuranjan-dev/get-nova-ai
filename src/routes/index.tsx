import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Hash,
  Radar,
  Sparkles,
  Users,
  Wand2,
} from "lucide-react";

import { WorkspacePreview } from "@/components/landing/workspace-preview";
import { NovaLogo } from "@/components/nova/logo";
import { ThemeToggle } from "@/components/nova/theme-toggle";
import { TextScramble } from "@/components/nova/text-scramble";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnomalousMatterHero } from "@/components/ui/anomalous-matter-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { tools } from "@/lib/nova/tools";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOVA — AI Marketing Intelligence for Youth Brands" },
      {
        name: "description",
        content:
          "NOVA helps youth-focused brands spot Gen Z cultural signals early and turn them into campaign ideas, Instagram content, hooks, captions and hashtags that stay relevant.",
      },
      { property: "og:title", content: "NOVA — AI Marketing Intelligence for Youth Brands" },
      {
        property: "og:description",
        content:
          "Trend intelligence, cultural signals and on-brand social content for marketing teams at youth-focused brands.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const capabilities = [
  {
    icon: Radar,
    name: "Cultural signal detection",
    copy: "Catch emerging Gen Z trends, formats and references in your category while they're still early — not after every competitor has posted them.",
  },
  {
    icon: Users,
    name: "Audience conversations",
    copy: "See what young audiences are actually talking about, sharing and defending, in the language they use themselves.",
  },
  {
    icon: Sparkles,
    name: "Trend → opportunity",
    copy: "Every signal is translated into a concrete marketing opportunity: the angle, the product tie-in, and why it fits your brand.",
  },
  {
    icon: Wand2,
    name: "Social content generation",
    copy: "Instagram and short-form content ideas with hooks, captions, CTAs and hashtag sets built for relevance and discoverability.",
  },
  {
    icon: Hash,
    name: "Brand voice consistency",
    copy: "Define personality, vocabulary and banned words once — every draft comes back sounding recognisably like your brand.",
  },
  {
    icon: BarChart3,
    name: "Engagement insights",
    copy: "Understand which formats and posting windows earn attention with youth audiences, and what to do differently next week.",
  },
];

const pipeline = [
  {
    step: "Cultural signals",
    copy: "NOVA reads momentum across youth communities, creator formats and category conversations.",
  },
  {
    step: "Trend intelligence",
    copy: "Signals are scored for momentum, saturation risk and fit with your audience.",
  },
  {
    step: "Marketing opportunity",
    copy: "Each trend becomes a positioning angle or campaign idea your team can argue for internally.",
  },
  {
    step: "Content strategy",
    copy: "Choose platform, goal and voice, and NOVA shapes the format around them.",
  },
  {
    step: "Ready to publish",
    copy: "Hooks, captions, CTAs, hashtags and campaign concepts, on-brand and review-ready.",
  },
];

const teams = [
  { label: "Beauty & skincare", copy: "Shelfie culture, routine content, ingredient discourse." },
  { label: "Fashion & streetwear", copy: "Drop cycles, styling formats, resale conversation." },
  { label: "Food & beverage", copy: "Flavour trends, cafe culture, snack rituals." },
  { label: "Lifestyle & tech", copy: "Setup culture, everyday-carry, campus life." },
];

const faqs = [
  {
    q: "Who is NOVA built for?",
    a: "Brand, social and growth teams at youth-focused companies — beauty, fashion, food, lifestyle and consumer tech. It's an internal intelligence platform for marketers, not a general-purpose chatbot.",
  },
  {
    q: "Does NOVA guarantee that content will go viral?",
    a: "No, and any tool that promises that is selling you something. NOVA identifies cultural opportunities early and helps you produce more relevant, discoverable, engagement-focused content. Distribution and audience response still belong to the platforms.",
  },
  {
    q: "How does hashtag intelligence work?",
    a: "Hashtags are treated as discoverability signals, not magic. NOVA suggests tag sets tied to real conversation context so your content is findable by the audiences already discussing the topic.",
  },
  {
    q: "How does NOVA keep our brand voice intact?",
    a: "You define personality traits, audience, tone, preferred vocabulary and words to avoid. Every generation in Content Studio is conditioned on that profile, so output stays recognisable across the team.",
  },
  {
    q: "Is this preview connected to live data?",
    a: "Responses in this preview are realistic samples so you can judge the workflow. The interface talks to a single client contract, so your own trend and model backend can be connected without touching the UI — credentials never reach the browser.",
  },
];

function Landing() {
  const soon = tools.filter((t) => t.status === "soon");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link to="/" aria-label="NOVA home">
            <NovaLogo />
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#platform" className="transition-colors hover:text-foreground">
              Platform
            </a>
            <a href="#workflow" className="transition-colors hover:text-foreground">
              Workflow
            </a>
            <a href="#categories" className="transition-colors hover:text-foreground">
              Categories
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" asChild className="rounded-xl text-muted-foreground">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild className="rounded-xl">
              <Link to="/signup">Request access</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="hero-glow relative overflow-hidden border-b border-border">
        <AnomalousMatterHero />
        <div className="relative z-10 mx-auto max-w-6xl px-5 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="rounded-full border-border-strong px-3 py-1 text-xs font-normal text-muted-foreground"
            >
              Trend intelligence for brand teams
            </Badge>
            <h1 className="text-balance-tight mt-6 text-4xl font-semibold sm:text-6xl sm:leading-[1.05]">
              <TextScramble>AI Marketing Intelligence</TextScramble>
              <span className="block text-muted-foreground">for Youth Brands.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              NOVA helps ambitious brands understand how youth culture moves — then turns
              fast-moving cultural signals into sharper product positioning, stronger campaigns
              and social content that stays relevant.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 w-full rounded-xl px-6 sm:w-auto">
                <Link to="/signup">Request access</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-xl px-6 sm:w-auto"
              >
                <Link to="/app">
                  Explore the command center
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              Built for marketing teams in beauty, fashion, food, lifestyle and consumer tech.
            </p>
          </div>

          <div className="mt-16 sm:mt-20">
            <WorkspacePreview />
          </div>
        </div>
      </section>

      <section id="platform" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-[0.7rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Platform
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              A brand intelligence command center, not a chat window.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Six connected capabilities that take your team from cultural signal to
              publish-ready content — inside one workspace, on one shared brand voice.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => (
              <div
                key={item.name}
                className="surface-sheen rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <item.icon className="size-4" />
                </span>
                <h3 className="mt-5 text-base font-medium">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-[0.7rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Workflow
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              From trend detected to content ready — in one sitting.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The gap between noticing a cultural moment and publishing something worth seeing is
              where most brands lose relevance. NOVA closes it.
            </p>
          </div>

          <ol className="mt-12 grid gap-4 lg:grid-cols-5">
            {pipeline.map((item, index) => (
              <li
                key={item.step}
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <span className="flex size-8 items-center justify-center rounded-lg border border-border text-xs text-muted-foreground">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-sm font-medium text-foreground">{item.step}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Built on audience signals, not guesswork.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Youth culture doesn't wait for a quarterly planning cycle. NOVA gives brand and
              social teams a shared, evidence-backed read on what young audiences care about this
              week — so campaign decisions can be argued with signals instead of opinions.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Momentum scoring shows what's rising and what's already saturated.",
                "Audience quotes and conversation themes back every recommendation.",
                "Content opportunities are tied to formats with real engagement potential.",
                "Brand voice rules travel with every draft your team generates.",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Cultural signals tracked weekly", value: "3.4k" },
              { label: "Youth communities monitored", value: "260+" },
              { label: "Avg. time from trend to draft", value: "9 min" },
              { label: "Brand voice profiles per team", value: "Unlimited" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-surface p-6">
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
            <p className="text-xs text-muted-foreground sm:col-span-2">
              Illustrative figures shown in this preview environment.
            </p>
          </div>
        </div>
      </section>

      <section id="categories" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-[0.7rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Categories
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Tuned to the categories young audiences move fastest in.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {teams.map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="text-base font-medium">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">On the roadmap</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The next modules in design — each one landing inside the same command center, on the
              same brand voice.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {soon.map((tool) => (
              <div
                key={tool.name}
                className="rounded-2xl border border-border bg-background p-6 transition-colors hover:border-border-strong"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-surface text-foreground/70">
                    <tool.icon className="size-4" />
                  </span>
                  <Badge variant="outline" className="border-primary/40 text-primary">
                    Soon
                  </Badge>
                </div>
                <h3 className="mt-5 text-base font-medium">{tool.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="text-3xl font-semibold sm:text-4xl">Questions, answered</h2>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q} className="border-border">
                <AccordionTrigger className="text-left text-base hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <h2 className="text-balance-tight text-3xl font-semibold sm:text-4xl">
            Stay relevant to the audience everyone is competing for.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Give your marketing team a shared read on youth culture — and a faster route from
            cultural signal to content worth publishing.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 w-full rounded-xl px-6 sm:w-auto">
              <Link to="/signup">Request access</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 w-full rounded-xl px-6 sm:w-auto"
            >
              <Link to="/app/trends">See the Trend Scanner</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <NovaLogo />
            <p className="mt-3 text-sm text-muted-foreground">
              AI Marketing Intelligence for Youth Brands.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link to="/app" className="hover:text-foreground">
              Command center
            </Link>
            <Link to="/app/trends" className="hover:text-foreground">
              Trend Scanner
            </Link>
            <Link to="/app/studio" className="hover:text-foreground">
              Content Studio
            </Link>
            <Link to="/login" className="hover:text-foreground">
              Log in
            </Link>
          </nav>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-10 text-xs text-muted-foreground sm:px-8">
          © {new Date().getFullYear()} NOVA. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

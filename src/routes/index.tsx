import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Braces,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  PenLine,
  Telescope,
} from "lucide-react";

import { WorkspacePreview } from "@/components/landing/workspace-preview";
import { NovaLogo } from "@/components/nova/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { tools } from "@/lib/nova/tools";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOVA — Intelligence, made simple." },
      {
        name: "description",
        content:
          "NOVA is one intelligent workspace for AI: chat, documents, images, writing, code and research, organized in a single calm interface.",
      },
      { property: "og:title", content: "NOVA — Intelligence, made simple." },
      {
        property: "og:description",
        content:
          "One intelligent workspace for AI chat, documents, images, writing, code and research.",
      },
    ],
  }),
  component: Landing,
});

const capabilities = [
  {
    icon: MessageSquare,
    name: "AI Chat",
    copy: "A focused thread for thinking out loud, with history you can actually find again.",
  },
  {
    icon: FileText,
    name: "Document Intelligence",
    copy: "Ask questions across contracts, papers and reports and get answers with citations.",
  },
  {
    icon: ImageIcon,
    name: "Image Understanding",
    copy: "Describe scenes, pull text out of screenshots, and get feedback on visuals.",
  },
  {
    icon: PenLine,
    name: "AI Writing",
    copy: "Draft, tighten and re-tone anything without losing the way you sound.",
  },
  {
    icon: Braces,
    name: "Code Assistant",
    copy: "Understand unfamiliar code, refactor with intent, and debug in fewer steps.",
  },
  {
    icon: Telescope,
    name: "Research",
    copy: "Follow a question through several steps and keep every source in view.",
  },
];

const steps = [
  {
    title: "Start with a question",
    copy: "Type it plainly. NOVA opens a thread and keeps the context for you.",
  },
  {
    title: "Bring in your material",
    copy: "Attach a document or an image when the answer depends on it.",
  },
  {
    title: "Keep the good thinking",
    copy: "Rename, revisit and search past conversations instead of starting over.",
  },
];

const faqs = [
  {
    q: "Is NOVA connected to a live model right now?",
    a: "Not in this preview. Responses are realistic samples so you can judge the experience. The interface talks to a single client interface, so a backend can be connected without changing the UI.",
  },
  {
    q: "Where will my data live?",
    a: "Conversations in this preview stay in your browser. In production, NOVA is designed to talk to your own backend, so model credentials never reach the browser.",
  },
  {
    q: "Does NOVA work on mobile?",
    a: "Yes. The workspace, chat and tools are fully responsive, with the sidebar collapsing into a drawer on smaller screens.",
  },
  {
    q: "Which model does NOVA use?",
    a: "NOVA is provider-agnostic by design. The chat client is a single interface, so you can point it at the model your team already trusts.",
  },
  {
    q: "What does the free plan include?",
    a: "Unlimited chats, full history and search, plus access to every tool marked available. Higher usage limits arrive with the Pro workspace.",
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
            <a href="#capabilities" className="transition-colors hover:text-foreground">
              Capabilities
            </a>
            <a href="#how" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#roadmap" className="transition-colors hover:text-foreground">
              Roadmap
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="rounded-xl text-muted-foreground">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild className="rounded-xl">
              <Link to="/signup">Start for free</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="hero-glow border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="rounded-full border-border-strong px-3 py-1 text-xs font-normal text-muted-foreground"
            >
              Intelligence, made simple.
            </Badge>
            <h1 className="text-balance-tight mt-6 text-4xl font-semibold sm:text-6xl sm:leading-[1.05]">
              One intelligent workspace
              <span className="block text-muted-foreground">for all of your AI work.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Chat, documents, images, writing, code and research — in a single calm interface
              that keeps your thinking organized instead of scattered across ten tabs.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 w-full rounded-xl px-6 sm:w-auto">
                <Link to="/signup">Start for free</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-xl px-6 sm:w-auto"
              >
                <Link to="/app">
                  Explore NOVA
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 sm:mt-20">
            <WorkspacePreview />
          </div>
        </div>
      </section>

      <section id="capabilities" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">What can NOVA do?</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Six capabilities that cover most of the thinking work in a week — each one built
              into the same workspace, with one shared history.
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

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              One workspace. Multiple ways to think.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Most AI tools ask you to change what you're doing to fit them. NOVA keeps the same
              surface whether you're reading a contract, reviewing a diff or drafting a memo —
              so switching modes costs you nothing.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Every thread stays searchable, renameable and yours.",
                "Answers arrive formatted: headings, lists, tables and code.",
                "Tools share context, so you never re-explain yourself.",
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
              { label: "Median first token", value: "0.4s" },
              { label: "Threads kept per user", value: "120+" },
              { label: "Formats understood", value: "18" },
              { label: "Workspace members", value: "Unlimited" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="text-3xl font-semibold sm:text-4xl">How it works</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title}>
                <span className="flex size-9 items-center justify-center rounded-xl border border-border text-sm text-muted-foreground">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-base font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="roadmap" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">Coming to NOVA</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The next set of tools, already in design. They'll land in the same workspace, with
              the same history.
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
            Bring your thinking somewhere calmer.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
            Start free, keep every thread, and add tools as you need them.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 w-full rounded-xl px-6 sm:w-auto">
              <Link to="/signup">Start for free</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 w-full rounded-xl px-6 sm:w-auto"
            >
              <Link to="/app/tools">See all tools</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <NovaLogo />
            <p className="mt-3 text-sm text-muted-foreground">Intelligence, made simple.</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link to="/app" className="hover:text-foreground">
              Workspace
            </Link>
            <Link to="/app/tools" className="hover:text-foreground">
              Tools
            </Link>
            <Link to="/login" className="hover:text-foreground">
              Log in
            </Link>
            <Link to="/signup" className="hover:text-foreground">
              Start for free
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

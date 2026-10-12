import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Settings — NOVA" },
      {
        name: "description",
        content: "Manage your NOVA profile, appearance, notifications, security and billing.",
      },
      { property: "og:title", content: "Settings — NOVA" },
      {
        property: "og:description",
        content: "Manage your NOVA profile, appearance, notifications, security and billing.",
      },
    ],
  }),
  component: SettingsPage,
});

const sections = [
  "Profile",
  "Appearance",
  "Notifications",
  "Security",
  "Connected",
  "API",
  "Billing",
] as const;

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <Separator className="my-5" />
      {children}
    </div>
  );
}

function Row({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-3.5">
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="shrink-0 pt-0.5">{children}</div>
    </div>
  );
}

function SettingsPage() {
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");

  const saved = () => toast.success("Changes saved", { description: "Preview only for now." });

  return (
    <div className="scroll-slim h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-8 sm:py-14">
        <h1 className="text-2xl font-semibold sm:text-3xl">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Workspace preferences for Ada Reyes.
        </p>

        <Tabs defaultValue="Profile" className="mt-8">
          <TabsList className="scroll-slim h-auto w-full justify-start overflow-x-auto rounded-xl bg-surface p-1">
            {sections.map((section) => (
              <TabsTrigger key={section} value={section} className="rounded-lg px-3 py-1.5">
                {section}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="Profile" className="mt-6">
            <Section title="Profile" description="How you appear inside NOVA.">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" defaultValue="Ada Reyes" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="ada@novaworkspace.com"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="about">About</Label>
                  <Textarea
                    id="about"
                    rows={3}
                    className="rounded-xl"
                    defaultValue="Product lead. Uses NOVA for research summaries and release notes."
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button className="rounded-xl" onClick={saved}>
                  Save profile
                </Button>
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="Appearance" className="mt-6">
            <Section title="Appearance" description="NOVA is tuned for dark, low-glare reading.">
              <Row title="Theme" description="Dark is the default and only theme today.">
                <Badge variant="secondary" className="gap-1.5">
                  <Check className="size-3" /> Dark
                </Badge>
              </Row>
              <Separator />
              <Row title="Message density" description="Spacing used across generated content lists.">
                <div className="flex gap-1 rounded-xl border border-border p-1">
                  {(["comfortable", "compact"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setDensity(option)}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-xs capitalize transition-colors",
                        density === option
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </Row>
              <Separator />
              <Row title="Reduce motion" description="Minimise transitions and animation.">
                <Switch />
              </Row>
            </Section>
          </TabsContent>

          <TabsContent value="Notifications" className="mt-6">
            <Section title="Notifications" description="Choose what NOVA tells you about.">
              <Row title="Product updates" description="New tools and meaningful changes.">
                <Switch defaultChecked />
              </Row>
              <Separator />
              <Row title="Long task finished" description="When a research run completes.">
                <Switch defaultChecked />
              </Row>
              <Separator />
              <Row title="Weekly summary" description="A weekly recap of new cultural signals in your category.">
                <Switch />
              </Row>
            </Section>
          </TabsContent>

          <TabsContent value="Security" className="mt-6">
            <Section title="Security" description="Protect access to your workspace.">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="next">New password</Label>
                  <Input id="next" type="password" className="rounded-xl" />
                </div>
              </div>
              <Separator className="my-5" />
              <Row title="Two-factor authentication" description="Require a code at sign in.">
                <Switch />
              </Row>
              <Separator />
              <Row title="Active sessions" description="MacBook Pro · Berlin · active now">
                <Button variant="secondary" size="sm" className="rounded-lg" onClick={saved}>
                  Sign out others
                </Button>
              </Row>
            </Section>
          </TabsContent>

          <TabsContent value="Connected" className="mt-6">
            <Section
              title="Connected accounts"
              description="Bring context from the tools you already use."
            >
              {[
                { name: "Google Drive", detail: "Documents and slides", connected: true },
                { name: "Notion", detail: "Workspace pages", connected: true },
                { name: "GitHub", detail: "Repositories and issues", connected: false },
                { name: "Slack", detail: "Channels and threads", connected: false },
              ].map((item, index) => (
                <div key={item.name}>
                  {index > 0 ? <Separator /> : null}
                  <Row title={item.name} description={item.detail}>
                    <Button
                      variant={item.connected ? "secondary" : "outline"}
                      size="sm"
                      className="rounded-lg"
                      onClick={saved}
                    >
                      {item.connected ? "Disconnect" : "Connect"}
                    </Button>
                  </Row>
                </div>
              ))}
            </Section>
          </TabsContent>

          <TabsContent value="API" className="mt-6">
            <Section
              title="API & integrations"
              description="Point NOVA at your own backend when you're ready."
            >
              <div className="space-y-2">
                <Label htmlFor="endpoint">Backend endpoint</Label>
                <Input
                  id="endpoint"
                  placeholder="https://api.yourdomain.com"
                  className="rounded-xl font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Model credentials stay on your server. NOVA never stores keys in the browser.
                </p>
              </div>
              <Separator className="my-5" />
              <Row title="Streaming responses" description="Use server-sent events when available.">
                <Switch defaultChecked />
              </Row>
              <div className="mt-6">
                <Button className="rounded-xl" onClick={saved}>
                  Save integration
                </Button>
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="Billing" className="mt-6">
            <Section title="Billing" description="Plan, usage and invoices.">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-background p-5">
                <div>
                  <p className="text-sm font-medium">Pro workspace</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    $20 per member / month · renews 1 September
                  </p>
                </div>
                <Button variant="secondary" className="rounded-xl" onClick={saved}>
                  Manage plan
                </Button>
              </div>
              <Separator className="my-5" />
              <Row title="Usage this month" description="18,420 of 50,000 messages used.">
                <Badge variant="secondary">37%</Badge>
              </Row>
              <Separator />
              <Row title="Invoices" description="Download past receipts as PDF.">
                <Button variant="outline" size="sm" className="rounded-lg" onClick={saved}>
                  View invoices
                </Button>
              </Row>
            </Section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

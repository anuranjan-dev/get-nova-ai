import type { TrendReport } from "./types";

/** Everything in this file is clearly-labelled sample data used until a real data source is connected. */

export const trendCategories = [
  "Streetwear",
  "Beauty & skincare",
  "Energy drinks",
  "Gaming",
  "Fintech for students",
  "Sneakers",
];

export function demoTrendReport(category: string): TrendReport {
  const c = category.trim() || "Youth culture";
  return {
    category: c,
    generatedAt: Date.now(),
    risingTopics: [
      {
        title: "Unfiltered founder POV clips",
        summary: `Low-production founder videos are outperforming polished ads in ${c}. Audiences reward honesty over gloss.`,
        momentum: 92,
        window: "Last 7 days",
      },
      {
        title: "Get-ready-with-me formats",
        summary: `Routine-led storytelling gives ${c} brands a natural place to show product in real use.`,
        momentum: 84,
        window: "Last 14 days",
      },
      {
        title: "Comment-section storytelling",
        summary: "Creators reply to comments as new posts, turning audience questions into free content pipelines.",
        momentum: 77,
        window: "Last 30 days",
      },
      {
        title: "Nostalgia remix",
        summary: "Early-2010s aesthetics keep resurfacing — a cheap way to feel culturally in-step without chasing memes.",
        momentum: 68,
        window: "Last 30 days",
      },
    ],
    contentIdeas: [
      `Behind-the-scenes of one ${c} decision you almost got wrong`,
      "Three things our audience asked us this week (and honest answers)",
      "A 12-second product demo with zero voiceover, text-only captions",
      "Let a customer take over the account for one post",
      "Ranking our own products from most to least hyped",
      "\u201cWe read your comments\u201d recap post",
    ],
    hashtags: [
      { tag: `#${c.toLowerCase().replace(/[^a-z0-9]/g, "")}`, volume: "1.2M posts", trend: "up" },
      { tag: "#grwm", volume: "890K posts", trend: "up" },
      { tag: "#smallbrandcheck", volume: "412K posts", trend: "up" },
      { tag: "#honestreview", volume: "306K posts", trend: "flat" },
      { tag: "#dayinmylife", volume: "2.4M posts", trend: "flat" },
      { tag: "#foryoubrands", volume: "148K posts", trend: "up" },
    ],
    conversations: [
      {
        audience: "18–21, students",
        quote: "I'll buy from a brand that talks like a person, not a press release.",
        takeaway: "Cut corporate phrasing from captions and replies.",
      },
      {
        audience: "22–26, early career",
        quote: "Show me the price up front or I scroll.",
        takeaway: "Lead with value and price clarity in the first 2 seconds.",
      },
      {
        audience: "16–19, creators",
        quote: "The best brands make content I'd repost even without a discount.",
        takeaway: "Design assets to be shareable, not just clickable.",
      },
    ],
  };
}

export const insightsDemo = {
  kpis: [
    { label: "Content produced", value: "128", delta: "+34%", positive: true },
    { label: "Avg. engagement rate", value: "6.8%", delta: "+1.2pt", positive: true },
    { label: "Saves per post", value: "412", delta: "+18%", positive: true },
    { label: "Time to first draft", value: "3m", delta: "−72%", positive: true },
  ],
  engagement: [
    { week: "W1", value: 38 },
    { week: "W2", value: 44 },
    { week: "W3", value: 41 },
    { week: "W4", value: 56 },
    { week: "W5", value: 63 },
    { week: "W6", value: 59 },
    { week: "W7", value: 74 },
    { week: "W8", value: 82 },
  ],
  formats: [
    { name: "Short-form video", score: 88 },
    { name: "Carousel", score: 71 },
    { name: "Creator collab", score: 66 },
    { name: "Static post", score: 39 },
    { name: "Story poll", score: 33 },
  ],
  slots: [
    { day: "Tuesday", time: "18:00–20:00", note: "Highest saves from 18–24 audience" },
    { day: "Thursday", time: "12:00–13:00", note: "Peak comment activity mid-week" },
    { day: "Sunday", time: "20:00–22:00", note: "Best window for longer storytelling" },
  ],
  recommendations: [
    "Shift two static posts per week into short-form video — it earns 2.3× the engagement in your category.",
    "Your captions drift formal after 40 words. Keep them under 30 to match your defined brand voice.",
    "Creator collabs peak in week 4 of a launch, not week 1. Hold budget back for the follow-through.",
  ],
};

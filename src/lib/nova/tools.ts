import {
  BarChart3,
  CalendarClock,
  Camera,
  Hash,
  Radar,
  Sparkles,
  Users,
  Video,
  Wand2,
  type LucideIcon,
} from "lucide-react";

export interface Tool {
  name: string;
  description: string;
  icon: LucideIcon;
  status: "available" | "soon";
  to?: "/app/trends" | "/app/studio" | "/app/voice" | "/app/insights";
}

export const tools: Tool[] = [
  {
    name: "Trend Scanner",
    description:
      "Surface emerging Gen Z cultural signals in your category before they saturate.",
    icon: Radar,
    status: "available",
    to: "/app/trends",
  },
  {
    name: "Content Studio",
    description:
      "Turn a trend into hooks, captions, CTAs and campaign concepts built for relevance.",
    icon: Wand2,
    status: "available",
    to: "/app/studio",
  },
  {
    name: "Brand Voice Engine",
    description:
      "Lock your personality, vocabulary and no-go words so every draft sounds like you.",
    icon: Sparkles,
    status: "available",
    to: "/app/voice",
  },
  {
    name: "Performance Insights",
    description:
      "See which formats earn attention with young audiences, and when to publish them.",
    icon: BarChart3,
    status: "available",
    to: "/app/insights",
  },
  {
    name: "Hashtag Intelligence",
    description:
      "Understand which tags carry real conversation volume and improve discoverability.",
    icon: Hash,
    status: "soon",
  },
  {
    name: "Audience Listening",
    description:
      "Read what young audiences are actually saying about your category, in their words.",
    icon: Users,
    status: "soon",
  },
  {
    name: "Campaign Calendar",
    description:
      "Map cultural moments and drops into a publishing plan your team can execute.",
    icon: CalendarClock,
    status: "soon",
  },
  {
    name: "Creator Matching",
    description:
      "Shortlist creators whose audience and tone genuinely overlap with your brand.",
    icon: Camera,
    status: "soon",
  },
  {
    name: "Short-Form Storyboards",
    description:
      "Shot-by-shot Reels and TikTok outlines derived from a detected trend.",
    icon: Video,
    status: "soon",
  },
];

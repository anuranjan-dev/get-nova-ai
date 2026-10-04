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
  status: "available";
  to?: "/app/trends" | "/app/studio" | "/app/voice" | "/app/insights";
}

export const tools: Tool[] = [
  {
    name: "Trend Scanner",
    description: "Create strategic trend hypotheses, content angles, and hashtags from your business context.",
    icon: Radar,
    status: "available",
    to: "/app/trends",
  },
  {
    name: "Content Studio",
    description:
      "Fill in a short brief and get post ideas, hooks, captions, ad copy and CTAs you can paste straight into a post.",
    icon: Wand2,
    status: "available",
    to: "/app/studio",
  },
  {
    name: "Brand Voice Engine",
    description:
      "Save how your brand talks once, and everything NOVA writes for you will match it.",
    icon: Sparkles,
    status: "available",
    to: "/app/voice",
  },
  {
    name: "Performance Insights",
    description: "Review the real work generated and saved in your account.",
    icon: BarChart3,
    status: "available",
    to: "/app/insights",
  },
];

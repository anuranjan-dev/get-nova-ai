import {
  Bot,
  Braces,
  FileText,
  Globe,
  Image as ImageIcon,
  MessageSquare,
  Mic,
  PenLine,
  Telescope,
  type LucideIcon,
} from "lucide-react";

export interface Tool {
  name: string;
  description: string;
  icon: LucideIcon;
  status: "available" | "soon";
  to?: string;
}

export const tools: Tool[] = [
  {
    name: "AI Chat",
    description: "Think out loud, ask anything, and keep the thread organized.",
    icon: MessageSquare,
    status: "available",
    to: "/app",
  },
  {
    name: "PDF Assistant",
    description: "Ask questions across long documents and get cited answers.",
    icon: FileText,
    status: "available",
  },
  {
    name: "Image Understanding",
    description: "Describe scenes, read text in images, and critique visuals.",
    icon: ImageIcon,
    status: "available",
  },
  {
    name: "Writing Assistant",
    description: "Draft, tighten, and adapt tone without losing your voice.",
    icon: PenLine,
    status: "available",
  },
  {
    name: "Code Assistant",
    description: "Explain unfamiliar code, refactor safely, and debug faster.",
    icon: Braces,
    status: "available",
  },
  {
    name: "Voice Assistant",
    description: "Speak naturally and get answers back in real time.",
    icon: Mic,
    status: "soon",
  },
  {
    name: "Research Mode",
    description: "Multi-step research with sources you can verify yourself.",
    icon: Telescope,
    status: "soon",
  },
  {
    name: "AI Agents",
    description: "Delegate repeatable work to agents that report back.",
    icon: Bot,
    status: "soon",
  },
  {
    name: "Web Intelligence",
    description: "Pull live context from the web into your workspace.",
    icon: Globe,
    status: "soon",
  },
];

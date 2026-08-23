import {
  Braces,
  FileText,
  Image as ImageIcon,
  Lightbulb,
  PenLine,
  type LucideIcon,
} from "lucide-react";

export interface Suggestion {
  icon: LucideIcon;
  title: string;
  hint: string;
  prompt: string;
}

export const suggestions: Suggestion[] = [
  {
    icon: Lightbulb,
    title: "Explain a complex topic",
    hint: "Plain language, no jargon",
    prompt: "Explain how vector databases work, in plain language, with one analogy.",
  },
  {
    icon: FileText,
    title: "Summarize a document",
    hint: "Key points and takeaways",
    prompt: "Summarize a long research report into five key points and one caveat.",
  },
  {
    icon: PenLine,
    title: "Help me write something",
    hint: "Emails, posts, docs",
    prompt: "Help me write a short project update email to my team.",
  },
  {
    icon: ImageIcon,
    title: "Analyze an image",
    hint: "Describe, extract, critique",
    prompt: "Analyze an image of a dashboard screenshot and critique the layout.",
  },
  {
    icon: Braces,
    title: "Solve a coding problem",
    hint: "Debug, refactor, explain",
    prompt: "Write a TypeScript helper that retries a failed fetch with backoff.",
  },
];

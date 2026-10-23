/**
 * Content helpers for the signed-in workspace.
 * Everything here is built from the user's own input plus illustrative,
 * hand-written examples. Nothing here is live data and nothing calls an AI model.
 */
import type { BrandProfile } from "./types";

export const CATEGORIES = [
  "Fashion & Apparel",
  "Sneakers & Footwear",
  "Beauty & Skincare",
  "Food & Beverage",
  "Fitness & Wellness",
  "Gaming & Entertainment",
  "Consumer Technology",
  "Education & Student Life",
  "Finance & Fintech",
  "Home & Lifestyle",
  "Travel & Hospitality",
  "Sports & Outdoor",
  "Retail & E-commerce",
  "Creator & Personal Brand",
  "Other",
] as const;

export interface TrendTopic {
  title: string;
  meaning: string;
  why: string;
  angle: string;
}

export interface ScanResult {
  category: string;
  brandName: string;
  topics: TrendTopic[];
  ideas: string[];
  hashtags: { group: string; tags: string[] }[];
}

type Pack = { noun: string; topics: TrendTopic[]; tags: string[] };

const PACKS: Record<string, Pack> = {
  "Sneakers & Footwear": {
    noun: "pair",
    topics: [
      { title: "Everyday comfort and all-day wear", meaning: "People talk about how shoes feel after a full day, not just how they look.", why: "A footwear brand can show real comfort details instead of only product photos.", angle: "Film a 'day in my shoes' clip from morning to night." },
      { title: "Styling sneakers with everyday outfits", meaning: "People look for different ways to wear the same pair with casual outfits.", why: "This shows versatility rather than a single product shot.", angle: "Create a post showing three different ways to style the same pair." },
      { title: "Sneaker care and restoration", meaning: "Cleaning and keeping shoes looking new is a common how-to topic.", why: "Care tips build trust and keep your product visible after purchase.", angle: "Share a simple 3-step cleaning routine for your best seller." },
      { title: "Retail versus resale prices", meaning: "Buyers compare store prices with resale prices before deciding.", why: "Being open about value can position your brand as fair.", angle: "Explain what goes into the price of one of your pairs." },
    ],
    tags: ["#SneakerStyle", "#Sneakerhead", "#SneakerCommunity", "#StreetStyle", "#OOTD", "#SneakerRotation", "#SneakerCare", "#Footwear"],
  },
  "Food & Beverage": {
    noun: "menu item",
    topics: [
      { title: "Behind-the-counter preparation", meaning: "People enjoy seeing how food and drinks are actually made.", why: "It shows craft and freshness in a way a menu photo can't.", angle: "Film the full preparation of your most-ordered item." },
      { title: "Seasonal and limited menus", meaning: "Time-limited items give people a reason to visit soon.", why: "A clear deadline makes an announcement feel worth acting on.", angle: "Reveal a weekend special with the date it ends." },
      { title: "Honest taste tests", meaning: "Short, real reactions to trying something for the first time.", why: "Unscripted reactions feel more believable than ads.", angle: "Ask a regular to try something new on camera." },
    ],
    tags: ["#Foodie", "#CafeLife", "#FoodLover", "#WeekendEats", "#Coffee", "#LocalEats", "#Homemade"],
  },
  "Beauty & Skincare": {
    noun: "product",
    topics: [
      { title: "Simple routines", meaning: "People look for short routines they can actually keep up.", why: "Placing your product in a routine shows when and why to use it.", angle: "Show a 3-step morning routine featuring one product." },
      { title: "Ingredient explainers", meaning: "Buyers want to understand what ingredients do in plain words.", why: "Clear explanations build trust and reduce returns.", angle: "Explain one key ingredient in under 30 seconds." },
      { title: "Real-skin results", meaning: "Unfiltered photos and honest timelines are valued.", why: "Showing realistic results sets the right expectations.", angle: "Share an unfiltered week-by-week update." },
    ],
    tags: ["#Skincare", "#SkincareRoutine", "#SelfCare", "#BeautyTips", "#CleanBeauty", "#GlowUp", "#SkinHealth"],
  },
};

function generic(category: string): Pack {
  const c = category === "Other" ? "your space" : category;
  return {
    noun: "product",
    topics: [
      { title: `How-to content in ${c}`, meaning: "Short, practical tutorials that solve one small problem.", why: "Useful posts get saved and shared, keeping your brand in view.", angle: "Teach one quick tip your customers often ask about." },
      { title: "Behind the scenes", meaning: "A look at the people and process behind a brand.", why: "It makes a brand feel human and trustworthy.", angle: "Show how one product or service comes together." },
      { title: "Community questions", meaning: "Inviting the audience to choose, vote or share opinions.", why: "Replies start conversations and show what people care about.", angle: "Post two options and ask which one people prefer." },
    ],
    tags: ["#SmallBusiness", "#BehindTheScenes", "#HowTo", "#Community", "#NewDrop", "#ShopLocal"],
  };
}

function slug(s: string) {
  return s.replace(/[^a-zA-Z0-9]/g, "");
}

export function buildScan(category: string, brandName: string): ScanResult {
  const pack = PACKS[category] ?? generic(category);
  const brand = brandName.trim();
  const ideas = [
    `Show one ${pack.noun} styled or used in three different ways.`,
    `Demonstrate the small details that make your ${pack.noun} useful.`,
    `Share a simple care or usage routine for your ${pack.noun}.`,
    "Ask your audience which colour or style they prefer.",
    `Post a behind-the-scenes look at how ${brand || "your brand"} makes things.`,
  ];
  const hashtags = [
    ...(brand ? [{ group: "Brand", tags: [`#${slug(brand)}`, `#${slug(brand)}Style`, `#Team${slug(brand)}`] }] : []),
    { group: "Category", tags: pack.tags.slice(0, 5) },
    { group: "Topic", tags: pack.tags.slice(5).concat(["#ContentIdeas", "#BrandStory"]) },
  ];
  return { category, brandName: brand, topics: pack.topics, ideas, hashtags };
}

/* ---------------- Captions ---------------- */

export const PLATFORMS = ["Instagram", "TikTok", "Facebook", "LinkedIn", "X", "WhatsApp", "Other"] as const;
export const CONTENT_TYPES = ["Reel or short video", "Photo", "Carousel", "Story", "Text post"] as const;
export const CAPTION_TONES = [
  "Fun & Playful",
  "Warm & Friendly",
  "Heartfelt",
  "Motivational",
  "Professional",
  "Bold & Confident",
  "Minimal & Clean",
  "Witty",
  "Inspirational",
  "Custom",
] as const;
export const CAPTION_EXAMPLES = [
  "New product launch",
  "Small business introduction",
  "Café menu reveal",
  "Travel photo",
  "Gym motivation",
  "Behind the scenes",
  "Product demonstration",
  "Customer review",
  "Event announcement",
  "Weekend update",
];

const OPENERS: Record<string, string[]> = {
  "Fun & Playful": ["Okay, we're a little too excited about this.", "Plot twist:"],
  "Warm & Friendly": ["We couldn't wait to share this with you.", "Hi friends —"],
  Heartfelt: ["This one means a lot to us.", "From our hearts to yours:"],
  Motivational: ["Small steps still count.", "Today is a good day to start."],
  Professional: ["We're pleased to share an update.", "Introducing:"],
  "Bold & Confident": ["No small talk. Here it is.", "We did it our way."],
  "Minimal & Clean": ["New.", "Simply put:"],
  Witty: ["Spoiler: it's good.", "We'd say 'no big deal', but it is."],
  Inspirational: ["Every big thing starts small.", "Made for what's next."],
};

const CTAS: Record<string, string> = {
  Instagram: "Save this for later and tell us what you think below.",
  TikTok: "Follow for part two.",
  Facebook: "Share this with someone who'd love it.",
  LinkedIn: "I'd value your thoughts in the comments.",
  X: "Reply with your take.",
  WhatsApp: "Message us to find out more.",
  Other: "Let us know what you think.",
};

export interface CaptionDraft {
  caption: string;
  hashtags: string[];
  cta: string;
}

/** Builds a template-based caption from the user's own words. Not AI output. */
export function buildCaption(input: {
  topic: string;
  platform: string;
  contentType: string;
  tone: string;
  variant: number;
  profile?: BrandProfile | null;
}): CaptionDraft {
  const topic = input.topic.trim().replace(/\.$/, "");
  const openers = OPENERS[input.tone] ?? ["Here's something new."];
  const opener = openers[input.variant % openers.length] ?? "";
  const brand = input.profile?.brandName?.trim();
  const useWord = input.profile?.useWords?.split(/[,\n]/).map((w) => w.trim()).filter(Boolean)[0];
  const typeLine =
    input.contentType === "Carousel" ? "Swipe through to see it all." :
    input.contentType === "Reel or short video" ? "Watch till the end." :
    input.contentType === "Story" ? "Tap through for more." : "";
  const short = input.platform === "X" || input.tone === "Minimal & Clean";
  const body = short
    ? `${opener} ${topic}.`
    : `${opener} ${topic.charAt(0).toUpperCase() + topic.slice(1)}.${brand ? ` From all of us at ${brand}.` : ""}${useWord ? ` ${useWord.charAt(0).toUpperCase() + useWord.slice(1)}.` : ""} ${typeLine}`.trim();
  const words = topic.toLowerCase().split(/\s+/).filter((w) => w.length > 3).slice(0, 3);
  const tags = [...(brand ? [`#${slug(brand)}`] : []), ...words.map((w) => `#${slug(w)}`)];
  if (input.platform === "LinkedIn") tags.splice(3);
  return { caption: body, hashtags: Array.from(new Set(tags)).filter((t) => t.length > 1), cta: CTAS[input.platform] ?? "Let us know what you think." };
}

/* ---------------- Brand voice ---------------- */

export const PERSONALITIES = ["Playful", "Bold", "Warm", "Minimal", "Rebellious", "Nerdy", "Premium", "Wholesome"];
export const VOICE_TONES = ["Friendly", "Playful", "Professional", "Warm", "Bold", "Witty", "Motivational", "Minimal", "Custom"];
export const VOICE_USAGE = ["All content", "Social media captions", "Advertisements", "Product descriptions"];

export function voiceExample(p: BrandProfile): string | null {
  const brand = p.brandName.trim();
  if (!brand) return null;
  const tone = p.toneOption === "Custom" ? "Custom" : p.toneOption || "Friendly";
  const lead: Record<string, string> = {
    Friendly: "Hey there!",
    Playful: "Guess what just landed?",
    Professional: "We're pleased to introduce",
    Warm: "We made this with you in mind.",
    Bold: "No compromises.",
    Witty: "We'd play it cool, but we can't.",
    Motivational: "Your next step starts here.",
    Minimal: "New.",
    Custom: p.customTone?.trim() ? `(${p.customTone.trim()})` : "",
  };
  const traits = p.personality.length ? ` ${p.personality.slice(0, 2).join(" and ").toLowerCase()} by nature,` : "";
  const audience = p.audience.trim() ? ` for ${p.audience.trim().replace(/\.$/, "")}` : "";
  const word = p.useWords.split(/[,\n]/).map((w) => w.trim()).filter(Boolean)[0];
  const avoid = p.avoidWords.split(/[,\n]/).map((w) => w.trim().toLowerCase()).filter(Boolean);
  let text = `${lead[tone] ?? ""} ${brand} —${traits} made${audience}. ${word ? `${word.charAt(0).toUpperCase() + word.slice(1)}, every time.` : "Come see what's new."}`;
  for (const a of avoid) text = text.replace(new RegExp(`\\b${a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi"), "");
  return text.replace(/\s+/g, " ").trim();
}

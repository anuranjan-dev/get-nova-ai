import type { TrendReport } from "./types";

/**
 * Hand-written sample trend datasets, one per category.
 * `{brand}` inside any string is replaced with the brand name entered by the user.
 * To add a category: append an entry to `trendLibrary` — nothing else needs changing.
 */

export interface CategoryDataset {
  /** Canonical label shown in the UI and in the category chips. */
  label: string;
  /** Lowercase aliases used to match free-text input. */
  aliases: string[];
  risingTopics: { title: string; summary: string; brandAngle: string; momentum: number; window: string }[];
  contentIdeas: string[];
  hashtags: { tag: string; volume: string; trend: "up" | "flat" }[];
  conversations: { audience: string; quote: string; takeaway: string }[];
}

export const trendLibrary: CategoryDataset[] = [
  {
    label: "Streetwear",
    aliases: ["streetwear", "street wear", "fashion", "apparel", "clothing"],
    risingTopics: [
      {
        title: "Proof-of-fabric close-ups",
        summary:
          "Buyers pause on macro shots of stitching, GSM weight and seam tape before they look at fit pics.",
        brandAngle: "Shoot one 8-second fabric macro per drop so {brand} answers the quality question before it's asked.",
        momentum: 93,
        window: "Last 7 days",
      },
      {
        title: "Sold-out restock lore",
        summary:
          "Waitlist storytelling is outperforming launch teasers — scarcity told honestly reads as demand, not hype.",
        brandAngle: "Post {brand}'s real restock numbers and waitlist size instead of a generic 'coming soon'.",
        momentum: 86,
        window: "Last 14 days",
      },
      {
        title: "Thrift-vs-new styling battles",
        summary:
          "Creators pair one new piece with four secondhand items to prove versatility on a student budget.",
        brandAngle: "Give creators a single {brand} hero piece and let them build looks around charity-shop finds.",
        momentum: 78,
        window: "Last 21 days",
      },
      {
        title: "Size-inclusive fit checks",
        summary:
          "Multi-body fit videos are the top-saved format; single-model lookbooks are losing watch time.",
        brandAngle: "Show every {brand} silhouette on three body types in the same 20-second clip.",
        momentum: 71,
        window: "Last 30 days",
      },
    ],
    contentIdeas: [
      "8-second fabric macro: zoom on stitching, weight and hem finish, text-only captions",
      "Restock diary — how many units, how fast they went, what changed in v2",
      "One piece, five ways: style it with secondhand basics only",
      "Fit check on three body types, same outfit, same lighting",
      "Cost breakdown of one hoodie: fabric, labour, printing, margin",
      "Warehouse pack-along with a customer note read out loud",
    ],
    hashtags: [
      { tag: "#fitcheck", volume: "4.1M posts", trend: "up" },
      { tag: "#streetwearfinds", volume: "1.3M posts", trend: "up" },
      { tag: "#thriftflip", volume: "2.7M posts", trend: "up" },
      { tag: "#outfitinspo", volume: "6.8M posts", trend: "flat" },
      { tag: "#smallbrandcheck", volume: "412K posts", trend: "up" },
      { tag: "#restockalert", volume: "188K posts", trend: "flat" },
    ],
    conversations: [
      {
        audience: "18–22, university students",
        quote: "If I can't see the fabric up close I assume it's a dropshipper.",
        takeaway: "Lead product pages and Reels with material detail, not lifestyle shots.",
      },
      {
        audience: "16–19, sneaker and fashion communities",
        quote: "I want to know what it looks like after ten washes, not on day one.",
        takeaway: "Publish worn-in photos of older stock as social proof of durability.",
      },
      {
        audience: "22–26, early career",
        quote: "Drops that restock forever feel less special, but at least I can actually buy them.",
        takeaway: "Be explicit about restock policy — reliability now beats artificial scarcity.",
      },
    ],
  },
  {
    label: "Beauty & skincare",
    aliases: ["beauty", "skincare", "skin care", "cosmetics", "makeup", "beauty & skincare"],
    risingTopics: [
      {
        title: "Ingredient-percentage transparency",
        summary:
          "Audiences quote actives by concentration and call out brands that hide them behind 'complexes'.",
        brandAngle: "Put exact active percentages on {brand}'s packshots and pin them in the first comment.",
        momentum: 94,
        window: "Last 7 days",
      },
      {
        title: "Skin-barrier repair over glow",
        summary:
          "The conversation shifted from glass skin to recovery after over-exfoliating — gentler routines are winning.",
        brandAngle: "Frame {brand}'s routine as a repair week, not a 12-step glow-up.",
        momentum: 88,
        window: "Last 14 days",
      },
      {
        title: "Dermatologist reaction stitches",
        summary:
          "Pros duetting product claims drive more trust than any paid creator post in the same window.",
        brandAngle: "Invite a derm to review {brand}'s formula on camera, unscripted and unedited.",
        momentum: 80,
        window: "Last 21 days",
      },
      {
        title: "Empties and cost-per-use maths",
        summary:
          "Finish-the-bottle videos with cost-per-day maths outperform first-impression unboxings.",
        brandAngle: "Publish {brand}'s cost per use next to the retail price — students do this maths anyway.",
        momentum: 69,
        window: "Last 30 days",
      },
    ],
    contentIdeas: [
      "Read your own INCI list on camera and explain the three actives in plain words",
      "Barrier-repair week: same face, same light, day 1 to day 7",
      "Send the formula to a dermatologist and post the unedited verdict",
      "Empties video with cost-per-use maths on screen",
      "Answer the three most sceptical comments from last month's launch",
      "Patch-test tutorial for sensitive skin, 15 seconds, no music",
    ],
    hashtags: [
      { tag: "#skinbarrier", volume: "980K posts", trend: "up" },
      { tag: "#skintok", volume: "8.2M posts", trend: "flat" },
      { tag: "#ingredientcheck", volume: "263K posts", trend: "up" },
      { tag: "#dermapproved", volume: "540K posts", trend: "up" },
      { tag: "#emptiesreview", volume: "197K posts", trend: "up" },
      { tag: "#sensitiveskin", volume: "1.6M posts", trend: "flat" },
    ],
    conversations: [
      {
        audience: "18–24, skincare-first buyers",
        quote: "Tell me the percentage or I'll assume it's under 1%.",
        takeaway: "Concentration disclosure is now table stakes for credibility.",
      },
      {
        audience: "16–20, acne communities",
        quote: "I destroyed my skin doing a 10-step routine I saw online.",
        takeaway: "Position products as subtraction from a routine, not addition.",
      },
      {
        audience: "21–26, value-conscious",
        quote: "£38 is fine if it lasts four months. Say that on the box.",
        takeaway: "Publish usage duration to defend premium pricing.",
      },
    ],
  },
  {
    label: "Energy drinks",
    aliases: ["energy drinks", "energy drink", "energy", "beverage", "drinks"],
    risingTopics: [
      {
        title: "Caffeine-dose literacy",
        summary:
          "Young buyers compare mg per can across brands in the comments and reject vague 'energy blends'.",
        brandAngle: "Show {brand}'s mg per can as the first frame of every product video.",
        momentum: 91,
        window: "Last 7 days",
      },
      {
        title: "Gym-bag flavour rankings",
        summary:
          "Flavour tier-list videos filmed mid-workout are the highest-shared format in the category.",
        brandAngle: "Let gym creators rank {brand}'s full flavour range on camera, worst to best, unedited.",
        momentum: 87,
        window: "Last 14 days",
      },
      {
        title: "Afternoon-crash alternatives",
        summary:
          "Lower-caffeine and no-sugar options are being discussed as study fuel rather than extreme sports fuel.",
        brandAngle: "Reposition one {brand} SKU around 3pm study focus instead of pre-workout.",
        momentum: 76,
        window: "Last 21 days",
      },
      {
        title: "Can design as desk decor",
        summary:
          "Cans are photographed as objects — colourways and limited art runs drive collection behaviour.",
        brandAngle: "Drop a limited {brand} can artwork with a student illustrator and show the sketches.",
        momentum: 64,
        window: "Last 30 days",
      },
    ],
    contentIdeas: [
      "Caffeine mg comparison card: your can vs three competitors, no names needed",
      "Blind flavour tier list with three gym-goers, one take",
      "3pm study session: what one can actually does for two hours of revision",
      "Limited can artwork reveal with the illustrator's sketch process",
      "Answer 'is this bad for me?' honestly, with the label on screen",
      "Fridge restock ASMR with the flavour poll results on screen",
    ],
    hashtags: [
      { tag: "#energydrink", volume: "3.4M posts", trend: "flat" },
      { tag: "#caffeinecheck", volume: "142K posts", trend: "up" },
      { tag: "#gymfuel", volume: "1.1M posts", trend: "up" },
      { tag: "#flavourranking", volume: "228K posts", trend: "up" },
      { tag: "#studyfuel", volume: "376K posts", trend: "up" },
      { tag: "#cancollection", volume: "96K posts", trend: "flat" },
    ],
    conversations: [
      {
        audience: "18–22, gym regulars",
        quote: "I want the mg on the front, not buried in tiny print on the back.",
        takeaway: "Dose transparency is the primary trust signal in this category.",
      },
      {
        audience: "17–20, students",
        quote: "I drink these for lectures, not for skateboarding off a roof.",
        takeaway: "Extreme-sports imagery is off-target for the biggest use case.",
      },
      {
        audience: "21–25, creators",
        quote: "The can has to look good on my desk or I'm not filming with it.",
        takeaway: "Design for the shelf and the shot, not just the fridge.",
      },
    ],
  },
  {
    label: "Gaming",
    aliases: ["gaming", "games", "esports", "game", "video games"],
    risingTopics: [
      {
        title: "Patch-note reaction cycles",
        summary:
          "Within an hour of a balance patch, clip creators publish verdicts that shape community sentiment for weeks.",
        brandAngle: "Have {brand} post a plain-English patch summary within 60 minutes of every update.",
        momentum: 95,
        window: "Last 7 days",
      },
      {
        title: "Clip-culture highlight edits",
        summary:
          "Community-submitted clips edited into weekly compilations outperform official trailers on retention.",
        brandAngle: "Run a weekly {brand} clip roundup and credit every creator on screen.",
        momentum: 89,
        window: "Last 14 days",
      },
      {
        title: "Discord-first announcements",
        summary:
          "Players expect news to break in Discord before socials; late posts read as corporate distance.",
        brandAngle: "Break {brand} news in Discord first, then mirror it publicly an hour later.",
        momentum: 81,
        window: "Last 21 days",
      },
      {
        title: "Anti-FOMO battle passes",
        summary:
          "Backlash against expiring content is pushing goodwill toward permanent unlocks and honest roadmaps.",
        brandAngle: "State clearly which {brand} content never expires — it converts sceptics faster than a discount.",
        momentum: 72,
        window: "Last 30 days",
      },
    ],
    contentIdeas: [
      "Patch notes explained in 30 seconds by a dev, no marketing language",
      "Weekly community clip roundup with creator handles on screen",
      "Dev answers the top three angriest Discord messages of the week",
      "Roadmap post that says clearly what is not coming",
      "Speedrun challenge with a leaderboard pinned in the comments",
      "Before/after of a bug the community reported and you fixed",
    ],
    hashtags: [
      { tag: "#gamingclips", volume: "5.6M posts", trend: "up" },
      { tag: "#patchnotes", volume: "134K posts", trend: "up" },
      { tag: "#speedrun", volume: "2.2M posts", trend: "flat" },
      { tag: "#discordcommunity", volume: "310K posts", trend: "up" },
      { tag: "#gamedev", volume: "4.4M posts", trend: "flat" },
      { tag: "#nofomo", volume: "88K posts", trend: "up" },
    ],
    conversations: [
      {
        audience: "16–21, competitive players",
        quote: "If the devs don't explain the nerf, the clip guys will explain it for you.",
        takeaway: "Speed of explanation controls the narrative more than the change itself.",
      },
      {
        audience: "18–24, Discord moderators",
        quote: "We find out from a leak before the official account posts. That's embarrassing.",
        takeaway: "Sequence announcements community-first to protect moderator credibility.",
      },
      {
        audience: "20–26, returning players",
        quote: "I stopped playing because missing two weeks meant losing the rewards.",
        takeaway: "Removing expiry pressure is a retention lever, not a monetisation loss.",
      },
    ],
  },
  {
    label: "Fintech for students",
    aliases: ["fintech", "fintech for students", "banking", "finance", "student finance", "money"],
    risingTopics: [
      {
        title: "Fee-screenshot receipts",
        summary:
          "Students post screenshots of surprise charges; brands that show a zero-fee statement get shared as proof.",
        brandAngle: "Publish a real {brand} statement with every fee line visible, including the zeroes.",
        momentum: 90,
        window: "Last 7 days",
      },
      {
        title: "Split-the-bill etiquette",
        summary:
          "Group-payment awkwardness is the most relatable hook in the category right now.",
        brandAngle: "Show {brand} settling a messy group dinner in one tap, filmed at the table.",
        momentum: 85,
        window: "Last 14 days",
      },
      {
        title: "Term-loan reality checks",
        summary:
          "Honest budget breakdowns across a full term outperform aspirational investing content.",
        brandAngle: "Co-post a real 12-week {brand} student budget, overspend months included.",
        momentum: 79,
        window: "Last 21 days",
      },
      {
        title: "Scam-spotting explainers",
        summary:
          "Fraud-awareness content earns the highest saves of any finance format with under-25s.",
        brandAngle: "Turn {brand}'s fraud team into a recurring 'is this a scam?' review series.",
        momentum: 74,
        window: "Last 30 days",
      },
    ],
    contentIdeas: [
      "Screen-record the fee page and read every line out loud",
      "Split a £94 group dinner at the table in one take",
      "12-week student budget with the two months it went wrong",
      "'Is this a scam?' — fraud team reviews three real messages",
      "What actually happens when you go £5 overdrawn, step by step",
      "One student's first payday, tracked hour by hour",
    ],
    hashtags: [
      { tag: "#studentbudget", volume: "620K posts", trend: "up" },
      { tag: "#moneytok", volume: "3.9M posts", trend: "flat" },
      { tag: "#nohiddenfees", volume: "104K posts", trend: "up" },
      { tag: "#splitthebill", volume: "76K posts", trend: "up" },
      { tag: "#scamalert", volume: "1.4M posts", trend: "up" },
      { tag: "#firstpayday", volume: "212K posts", trend: "flat" },
    ],
    conversations: [
      {
        audience: "18–21, first-year students",
        quote: "Every app says 'no fees' until you actually read the statement.",
        takeaway: "Show the statement itself; claims alone no longer land.",
      },
      {
        audience: "19–23, part-time workers",
        quote: "Investing content is useless to me. I need to survive until the 28th.",
        takeaway: "Anchor content on short-term cashflow, not wealth building.",
      },
      {
        audience: "17–20, new account holders",
        quote: "My mum asks me if every text is a scam. I don't always know either.",
        takeaway: "Fraud education is a trust product, not a compliance checkbox.",
      },
    ],
  },
  {
    label: "Sneakers",
    aliases: ["sneakers", "sneaker", "shoes", "trainers", "footwear"],
    risingTopics: [
      {
        title: "On-foot over studio shots",
        summary:
          "Handheld on-foot clips in real light beat studio product photography for saves and comments.",
        brandAngle: "Replace {brand}'s studio launch shot with three on-foot angles at street level.",
        momentum: 92,
        window: "Last 7 days",
      },
      {
        title: "Resale-price transparency",
        summary:
          "Communities track retail vs resale gaps publicly and reward brands that increase supply honestly.",
        brandAngle: "Say how many pairs {brand} made — silence is read as manufactured hype.",
        momentum: 86,
        window: "Last 14 days",
      },
      {
        title: "Repair and re-sole culture",
        summary:
          "Cobbler and clean-up videos are surging as durability becomes part of the buying decision.",
        brandAngle: "Show a two-year-old pair of {brand} being restored, not a fresh unboxing.",
        momentum: 77,
        window: "Last 21 days",
      },
      {
        title: "Comfort-first reviews",
        summary:
          "Step-count and all-day comfort reviews now rank above colourway hype in comment sentiment.",
        brandAngle: "Have a creator log 20,000 steps in {brand} and report honestly at hour eight.",
        momentum: 70,
        window: "Last 30 days",
      },
    ],
    contentIdeas: [
      "Three on-foot angles at golden hour, no studio, no voiceover",
      "State the production run size and why you chose it",
      "Restore a two-year-old pair with a cobbler, start to finish",
      "20,000-step comfort diary with honest hour-eight verdict",
      "Colourway poll: let the audience pick the next release",
      "Unbox a customer's returned pair and explain what went wrong",
    ],
    hashtags: [
      { tag: "#onfoot", volume: "2.9M posts", trend: "up" },
      { tag: "#sneakerhead", volume: "9.1M posts", trend: "flat" },
      { tag: "#resalecheck", volume: "118K posts", trend: "up" },
      { tag: "#sneakercleaning", volume: "740K posts", trend: "up" },
      { tag: "#comfortreview", volume: "156K posts", trend: "up" },
      { tag: "#colourwayvote", volume: "64K posts", trend: "flat" },
    ],
    conversations: [
      {
        audience: "16–20, sneaker communities",
        quote: "Studio photos tell me nothing. Show me them on real feet outside.",
        takeaway: "On-foot footage is the primary decision asset in this category.",
      },
      {
        audience: "21–25, resellers and collectors",
        quote: "Tell us the numbers. Fake scarcity kills brands faster than restocks.",
        takeaway: "Publish run sizes to convert scepticism into loyalty.",
      },
      {
        audience: "22–26, everyday wearers",
        quote: "I care more about hour eight than the first ten minutes.",
        takeaway: "Comfort claims need long-wear evidence, not launch-day hype.",
      },
    ],
  },
];

export const trendCategories = trendLibrary.map((c) => c.label);

function findDataset(category: string): CategoryDataset {
  const q = category.trim().toLowerCase();
  const exact = trendLibrary.find((c) => c.label.toLowerCase() === q);
  if (exact) return exact;
  const alias = trendLibrary.find((c) => c.aliases.some((a) => q.includes(a) || a.includes(q)));
  return alias ?? trendLibrary[0]!;
}

const fill = (text: string, brand: string) => text.replaceAll("{brand}", brand);

export function buildTrendReport(category: string, brandName: string): TrendReport {
  const data = findDataset(category);
  const brand = brandName.trim() || "your brand";
  return {
    category: data.label,
    brandName: brand,
    generatedAt: Date.now(),
    risingTopics: data.risingTopics.map((t) => ({
      title: t.title,
      summary: t.summary,
      brandAngle: fill(t.brandAngle, brand),
      momentum: t.momentum,
      window: t.window,
    })),
    contentIdeas: data.contentIdeas.map((i) => fill(i, brand)),
    hashtags: data.hashtags,
    conversations: data.conversations,
  };
}

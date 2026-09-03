import type { TrendReport } from "./types";

/**
 * Hand-written sample trend datasets, one per category.
 * `{brand}` is replaced with the brand name (or "your brand" when none is given).
 * `{b}` is an adjectival slot: "Nike " with a brand, empty without one.
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
    aliases: ["streetwear", "street wear", "hypebeast"],
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
        brandAngle: "Give creators a single {b}hero piece and let them build looks around charity-shop finds.",
        momentum: 78,
        window: "Last 21 days",
      },
      {
        title: "Size-inclusive fit checks",
        summary:
          "Multi-body fit videos are the top-saved format; single-model lookbooks are losing watch time.",
        brandAngle: "Show every {b}silhouette on three body types in the same 20-second clip.",
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
        brandAngle: "Reposition one {b}SKU around 3pm study focus instead of pre-workout.",
        momentum: 76,
        window: "Last 21 days",
      },
      {
        title: "Can design as desk decor",
        summary:
          "Cans are photographed as objects — colourways and limited art runs drive collection behaviour.",
        brandAngle: "Drop a limited {b}can artwork with a student illustrator and show the sketches.",
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
        brandAngle: "Run a weekly {b}clip roundup and credit every creator on screen.",
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
        brandAngle: "State clearly which {b}content never expires — it converts sceptics faster than a discount.",
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
        brandAngle: "Publish a real {b}statement with every fee line visible, including the zeroes.",
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
        brandAngle: "Co-post a real 12-week {b}student budget, overspend months included.",
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
  {
    label: "Food & beverage",
    aliases: ["food", "food & beverage", "snacks", "drinks", "restaurant", "fmcg"],
    risingTopics: [
      {
        title: "Ingredient-list read-alouds",
        summary:
          "Shoppers film themselves reading the back of the pack and rate brands on how few words they can't pronounce.",
        brandAngle: "Read {brand}'s full ingredient list on camera in one take, including the boring ones.",
        momentum: 92,
        window: "Last 7 days",
      },
      {
        title: "Portion-honesty videos",
        summary:
          "Pack shot versus real plate comparisons are the most-commented format — exaggeration gets called out instantly.",
        brandAngle: "Show one {b}pack served on a real plate at real portion size, no styling.",
        momentum: 84,
        window: "Last 14 days",
      },
      {
        title: "Dupe-recipe reverse engineering",
        summary:
          "Home cooks recreate popular products and publish cost-per-serving maths against the retail price.",
        brandAngle: "Publish the {b}recipe yourself and explain what's hard to make at home.",
        momentum: 76,
        window: "Last 21 days",
      },
      {
        title: "Late-night snack rituals",
        summary:
          "Midnight eating content is quietly outperforming breakfast and lunch occasions with under-24s.",
        brandAngle: "Film a {b}1am snack routine in a real kitchen with the lights half off.",
        momentum: 67,
        window: "Last 30 days",
      },
    ],
    contentIdeas: [
      "Read the ingredient list out loud, no music, no cuts",
      "Pack photo vs real plate, side by side, same camera",
      "Make your own product at home and total up the cost per serving",
      "1am snack ritual filmed in a student kitchen",
      "Factory line clip with one worker explaining one step",
      "Answer the harshest review from last month and say what you changed",
    ],
    hashtags: [
      { tag: "#foodtok", volume: "7.4M posts", trend: "flat" },
      { tag: "#ingredientlist", volume: "128K posts", trend: "up" },
      { tag: "#snackreview", volume: "890K posts", trend: "up" },
      { tag: "#costperserving", volume: "54K posts", trend: "up" },
      { tag: "#midnightsnack", volume: "1.2M posts", trend: "up" },
      { tag: "#realportion", volume: "71K posts", trend: "flat" },
    ],
    conversations: [
      {
        audience: "18–23, students cooking for one",
        quote: "If the photo is three times the size of what's in the bag, I'm done with the brand.",
        takeaway: "Match packaging imagery to the served portion — accuracy is now a purchase factor.",
      },
      {
        audience: "16–20, snack buyers",
        quote: "I read the back of the pack in the aisle. Every time.",
        takeaway: "Front-of-pack simplicity claims must survive a back-of-pack read.",
      },
      {
        audience: "22–26, budget-first shoppers",
        quote: "Tell me the price per serving, not the price per box.",
        takeaway: "Publish per-serving cost to defend against dupe recipes.",
      },
    ],
  },
  {
    label: "Fashion (general)",
    aliases: ["fashion", "fashion (general)", "clothing", "apparel", "style"],
    risingTopics: [
      {
        title: "Cost-per-wear framing",
        summary:
          "Buyers justify purchases publicly with cost-per-wear maths instead of trend cycles.",
        brandAngle: "Put a realistic cost-per-wear figure on {brand}'s core pieces and show the workings.",
        momentum: 90,
        window: "Last 7 days",
      },
      {
        title: "Wardrobe-decluttering confessions",
        summary:
          "Buy-less content is growing faster than haul content, and creators name brands they regret.",
        brandAngle: "Ask customers which {b}piece they kept longest and build the campaign on that.",
        momentum: 83,
        window: "Last 14 days",
      },
      {
        title: "Return-rate honesty",
        summary:
          "Sizing anxiety dominates comments; brands publishing return reasons are treated as safer bets.",
        brandAngle: "Show {brand}'s top three return reasons and what the next production run fixes.",
        momentum: 75,
        window: "Last 21 days",
      },
      {
        title: "Office-to-night one-piece styling",
        summary:
          "Single-garment transformation videos are replacing multi-look lookbooks in saves.",
        brandAngle: "Take one {b}garment from 9am desk to 9pm dinner in a single clip.",
        momentum: 66,
        window: "Last 30 days",
      },
    ],
    contentIdeas: [
      "Cost-per-wear card for your three best sellers, maths on screen",
      "Customers show the oldest piece of yours they still wear",
      "Read your top return reasons and say what changes next run",
      "One garment, 9am to 9pm, no outfit changes",
      "Measure the same size across three of your styles on camera",
      "Repair tutorial for a seam customers actually complain about",
    ],
    hashtags: [
      { tag: "#costperwear", volume: "96K posts", trend: "up" },
      { tag: "#capsulewardrobe", volume: "1.9M posts", trend: "up" },
      { tag: "#deinfluencing", volume: "740K posts", trend: "up" },
      { tag: "#sizingcheck", volume: "133K posts", trend: "up" },
      { tag: "#styleinspo", volume: "8.6M posts", trend: "flat" },
      { tag: "#slowfashion", volume: "2.4M posts", trend: "flat" },
    ],
    conversations: [
      {
        audience: "19–24, considered buyers",
        quote: "I'm not buying twelve things this season. I'm buying two that last.",
        takeaway: "Sell longevity per piece rather than breadth of range.",
      },
      {
        audience: "18–22, online-only shoppers",
        quote: "Half my order goes back because your medium isn't anyone else's medium.",
        takeaway: "Publish real garment measurements, not letter sizes alone.",
      },
      {
        audience: "23–27, working early career",
        quote: "If it only works for one occasion it's not worth the hanger space.",
        takeaway: "Demonstrate multi-occasion range on the same item.",
      },
    ],
  },
  {
    label: "Fitness & wellness",
    aliases: ["fitness", "wellness", "fitness & wellness", "gym", "health", "training"],
    risingTopics: [
      {
        title: "Beginner-gym-anxiety content",
        summary:
          "First-week-in-the-gym footage is out-performing physique transformations across all under-25 segments.",
        brandAngle: "Follow one true beginner through week one with {brand} and keep the awkward parts in.",
        momentum: 94,
        window: "Last 7 days",
      },
      {
        title: "Recovery over intensity",
        summary:
          "Sleep, mobility and rest-day content is overtaking hardcore training edits in saves and shares.",
        brandAngle: "Build a {b}rest-day routine and treat recovery as the product, not the filler.",
        momentum: 87,
        window: "Last 14 days",
      },
      {
        title: "Anti-transformation honesty",
        summary:
          "Audiences flag lighting-and-posing tricks; unedited progress posts earn far higher trust.",
        brandAngle: "Publish {b}progress photos in the same light and pose, months apart, unedited.",
        momentum: 78,
        window: "Last 21 days",
      },
      {
        title: "20-minute home sessions",
        summary:
          "Short equipment-free workouts filmed in small rooms are the highest-completion format.",
        brandAngle: "Film a 20-minute {b}session in a bedroom-sized space with nothing but a mat.",
        momentum: 68,
        window: "Last 30 days",
      },
    ],
    contentIdeas: [
      "Week one of a total beginner: nerves, wrong machine, first win",
      "Rest-day routine in real time, no motivational voiceover",
      "Same light, same pose, three months apart",
      "20-minute session in a 2m x 2m space, no equipment",
      "Coach corrects three form mistakes from the comments",
      "What one month of training actually costs, itemised",
    ],
    hashtags: [
      { tag: "#gymbeginner", volume: "1.7M posts", trend: "up" },
      { tag: "#restday", volume: "2.1M posts", trend: "up" },
      { tag: "#formcheck", volume: "820K posts", trend: "up" },
      { tag: "#homeworkout", volume: "6.3M posts", trend: "flat" },
      { tag: "#recoveryday", volume: "310K posts", trend: "up" },
      { tag: "#realprogress", volume: "148K posts", trend: "flat" },
    ],
    conversations: [
      {
        audience: "17–21, first-time gym members",
        quote: "I walked in, saw the free weights area, and walked straight back out.",
        takeaway: "Reduce entry anxiety before selling performance benefits.",
      },
      {
        audience: "20–25, burnt-out trainers",
        quote: "Everyone shows the PR. Nobody shows the deload week.",
        takeaway: "Recovery content builds credibility that intensity content cannot.",
      },
      {
        audience: "22–26, home trainers",
        quote: "I have a mat and a corner of my room. That's it.",
        takeaway: "Design programming for constrained space and zero equipment.",
      },
    ],
  },
  {
    label: "Consumer tech",
    aliases: ["consumer tech", "tech", "electronics", "gadgets", "hardware", "devices"],
    risingTopics: [
      {
        title: "Battery-degradation receipts",
        summary:
          "Buyers post battery health after 18 months and use it as the deciding spec over launch benchmarks.",
        brandAngle: "Publish {brand}'s battery health data at 12 and 24 months instead of day-one numbers.",
        momentum: 93,
        window: "Last 7 days",
      },
      {
        title: "Repairability scoring",
        summary:
          "Teardown creators score glue, screws and part pricing, and their verdicts outlive review cycles.",
        brandAngle: "Show a {b}teardown yourself and list every replaceable part with its price.",
        momentum: 85,
        window: "Last 14 days",
      },
      {
        title: "Real-use, not spec-sheet reviews",
        summary:
          "Week-long daily-driver diaries beat benchmark videos on watch time with student buyers.",
        brandAngle: "Give a student a {b}device for seven days and publish the diary uncut.",
        momentum: 79,
        window: "Last 21 days",
      },
      {
        title: "Subscription fatigue backlash",
        summary:
          "Hardware locked behind monthly fees triggers the sharpest negative sentiment in the category.",
        brandAngle: "State plainly which {b}features work forever with no subscription.",
        momentum: 71,
        window: "Last 30 days",
      },
    ],
    contentIdeas: [
      "Battery health screenshots from real units at 12 and 24 months",
      "Teardown with every spare part and its price on screen",
      "Seven-day daily-driver diary from a student, uncut",
      "List which features are free forever and which are paid",
      "Support call recreated: how long until a human answers",
      "One year of scratches: honest durability check",
    ],
    hashtags: [
      { tag: "#techtok", volume: "5.9M posts", trend: "flat" },
      { tag: "#batteryhealth", volume: "168K posts", trend: "up" },
      { tag: "#righttorepair", volume: "420K posts", trend: "up" },
      { tag: "#teardown", volume: "230K posts", trend: "up" },
      { tag: "#dailydriver", volume: "310K posts", trend: "up" },
      { tag: "#nosubscription", volume: "58K posts", trend: "flat" },
    ],
    conversations: [
      {
        audience: "18–23, student buyers",
        quote: "Benchmarks are useless. Tell me what it's like on day 400.",
        takeaway: "Long-term performance evidence beats launch specs.",
      },
      {
        audience: "20–25, repair-minded",
        quote: "If I can't replace the battery myself it's a rental, not a purchase.",
        takeaway: "Publish part availability and pricing as a trust asset.",
      },
      {
        audience: "21–26, first-job buyers",
        quote: "I already pay for five subscriptions. Don't make my charger one of them.",
        takeaway: "Be explicit about what is included outright.",
      },
    ],
  },
  {
    label: "Home & lifestyle",
    aliases: ["home", "lifestyle", "home & lifestyle", "interiors", "homeware", "decor"],
    risingTopics: [
      {
        title: "Rental-friendly upgrades",
        summary:
          "No-drill, no-paint changes dominate the category as under-25s decorate places they don't own.",
        brandAngle: "Show a {b}setup that leaves zero marks and comes down in five minutes.",
        momentum: 91,
        window: "Last 7 days",
      },
      {
        title: "Small-room realism",
        summary:
          "Tours of genuinely small rooms outperform aspirational apartments on comments and saves.",
        brandAngle: "Film {brand} styled in a 9m² room with the clutter left in frame.",
        momentum: 84,
        window: "Last 14 days",
      },
      {
        title: "Second-hand-first styling",
        summary:
          "Creators mix one new item with marketplace finds and publish the total spend on screen.",
        brandAngle: "Pair one {b}piece with a fully second-hand room and show the receipt.",
        momentum: 77,
        window: "Last 21 days",
      },
      {
        title: "Evening wind-down routines",
        summary:
          "Low-light, low-energy routine content is the fastest-growing occasion in the category.",
        brandAngle: "Build a {b}10pm wind-down sequence with no talking and no upbeat music.",
        momentum: 65,
        window: "Last 30 days",
      },
    ],
    contentIdeas: [
      "No-drill install and full removal in one take",
      "Room tour of a genuinely small room, clutter included",
      "One new item, everything else second-hand, total spend on screen",
      "10pm wind-down routine, no voiceover",
      "Assembly timed honestly, including the confusing step",
      "What it looks like after six months of real use",
    ],
    hashtags: [
      { tag: "#rentalfriendly", volume: "410K posts", trend: "up" },
      { tag: "#smallspaceliving", volume: "1.5M posts", trend: "up" },
      { tag: "#homeinspo", volume: "7.1M posts", trend: "flat" },
      { tag: "#secondhandhome", volume: "260K posts", trend: "up" },
      { tag: "#winddownroutine", volume: "180K posts", trend: "up" },
      { tag: "#roomtour", volume: "3.3M posts", trend: "flat" },
    ],
    conversations: [
      {
        audience: "19–24, renters",
        quote: "My contract says no drilling. Most of your ideas break my deposit.",
        takeaway: "Lead with damage-free installation, not permanent fixtures.",
      },
      {
        audience: "18–22, shared housing",
        quote: "Nobody I know has a bedroom that looks like that.",
        takeaway: "Shoot in realistic room sizes to keep credibility.",
      },
      {
        audience: "23–27, first flat",
        quote: "I'd rather buy one good thing and find the rest on Marketplace.",
        takeaway: "Position products as the one new anchor piece in a mixed room.",
      },
    ],
  },
  {
    label: "Campus & edtech",
    aliases: ["campus", "edtech", "campus & edtech", "education", "study", "students", "learning"],
    risingTopics: [
      {
        title: "Anti-AI-cheating anxiety",
        summary:
          "Students discuss false plagiarism flags more than study hacks; fairness is the live issue.",
        brandAngle: "Explain exactly how {brand} handles AI-detection disputes, in plain language.",
        momentum: 95,
        window: "Last 7 days",
      },
      {
        title: "Study-with-me accountability",
        summary:
          "Long silent co-working streams keep growing while short productivity-hack clips lose retention.",
        brandAngle: "Host a weekly two-hour {b}silent study room and never sell during it.",
        momentum: 86,
        window: "Last 14 days",
      },
      {
        title: "Real exam-week breakdowns",
        summary:
          "Honest burnout posts during assessment weeks earn the highest engagement of the academic year.",
        brandAngle: "Publish an exam-week plan for {brand} that assumes two bad days, not perfect discipline.",
        momentum: 80,
        window: "Last 21 days",
      },
      {
        title: "Free-tier gatekeeping backlash",
        summary:
          "Paywalling basic features mid-term triggers fast, coordinated criticism in student communities.",
        brandAngle: "Guarantee which {b}features stay free for the whole academic year and say it once, clearly.",
        momentum: 73,
        window: "Last 30 days",
      },
    ],
    contentIdeas: [
      "Explain your AI-detection appeals process in 40 seconds",
      "Two-hour silent study stream, timer only, zero promotion",
      "Exam-week plan that budgets for two bad days",
      "List the features that stay free all year",
      "One student's real revision timetable, including the skipped sessions",
      "Answer the three questions support gets most in September",
    ],
    hashtags: [
      { tag: "#studywithme", volume: "4.7M posts", trend: "up" },
      { tag: "#studytok", volume: "6.2M posts", trend: "flat" },
      { tag: "#examweek", volume: "1.1M posts", trend: "up" },
      { tag: "#studentlife", volume: "9.4M posts", trend: "flat" },
      { tag: "#revisiontips", volume: "540K posts", trend: "up" },
      { tag: "#aidetection", volume: "88K posts", trend: "up" },
    ],
    conversations: [
      {
        audience: "18–21, undergraduates",
        quote: "I wrote it myself and still got flagged. Nobody explains the appeal.",
        takeaway: "Process transparency matters more than feature depth right now.",
      },
      {
        audience: "19–23, finalists",
        quote: "I don't need hacks, I need someone on the call so I actually sit down.",
        takeaway: "Accountability formats beat tips-and-tricks content.",
      },
      {
        audience: "17–20, applicants",
        quote: "It was free in October and paywalled by January. That's a bait.",
        takeaway: "Commit to free-tier stability across the academic year.",
      },
    ],
  },
];

export const trendCategories = trendLibrary.map((c) => c.label);

/** Categorical momentum tag derived from the relevance score. */
export type MomentumTag = "Exploding" | "Rising" | "Peaking" | "Stable" | "Declining";

export function momentumTag(score: number): MomentumTag {
  if (score >= 90) return "Exploding";
  if (score >= 80) return "Rising";
  if (score >= 72) return "Peaking";
  if (score >= 66) return "Stable";
  return "Declining";
}

function findDataset(category: string): CategoryDataset {
  const q = category.trim().toLowerCase();
  const exact = trendLibrary.find((c) => c.label.toLowerCase() === q);
  if (exact) return exact;
  const alias = trendLibrary.find((c) => c.aliases.some((a) => q.includes(a) || a.includes(q)));
  return alias ?? trendLibrary[0]!;
}

const fill = (text: string, brand: string) =>
  text.replaceAll("{b}", brand ? `${brand} ` : "").replaceAll("{brand}", brand || "your brand");

export function buildTrendReport(category: string, brandName: string): TrendReport {
  const data = findDataset(category);
  const brand = brandName.trim();
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

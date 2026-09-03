/**
 * Hand-written sample reputation datasets, one per Trend Scanner category.
 * `{brand}` is replaced with the entered brand name.
 * Illustrative only — nothing here is fetched from Reddit or Twitter/X.
 */

export interface ReputationQuote {
  source: string;
  quote: string;
  context: string;
}

export interface ReputationFix {
  title: string;
  action: string;
}

export interface ReputationDataset {
  loves: ReputationQuote[];
  frustrations: ReputationQuote[];
  fixes: ReputationFix[];
}

export interface ReputationReport {
  category: string;
  brandName: string;
  generatedAt: number;
  loves: ReputationQuote[];
  frustrations: ReputationQuote[];
  fixes: ReputationFix[];
}

const library: Record<string, ReputationDataset> = {
  Streetwear: {
    loves: [
      {
        source: "Reddit · r/streetwear",
        quote: "The heavyweight cotton actually holds shape after ten washes. Rare at this price.",
        context: "Fabric durability is the single most repeated compliment in fit-check threads.",
      },
      {
        source: "Twitter/X",
        quote: "Ordered Thursday, wore it Saturday. No drama, no delays.",
        context: "Fast dispatch gets called out more than the design itself.",
      },
      {
        source: "Reddit · r/streetwearstartup",
        quote: "Their size chart is measured in cm, not vibes. Fit came exactly as listed.",
        context: "Accurate measurements build trust for first-time buyers.",
      },
    ],
    frustrations: [
      {
        source: "Reddit · r/streetwear",
        quote: "Every drop sells out in four minutes and then nothing for two months.",
        context: "Scarcity is reading as bad planning rather than hype.",
      },
      {
        source: "Twitter/X",
        quote: "Returns took three weeks to refund and nobody replied to my emails.",
        context: "Post-purchase support is the most common one-star theme.",
      },
      {
        source: "Reddit · r/findfashion",
        quote: "Only see the hoodie on one 6'2\" model. No idea how it fits anyone else.",
        context: "Single-model photography blocks buyers outside that body type.",
      },
    ],
    fixes: [
      {
        title: "Publish a restock calendar",
        action:
          "Post a fixed monthly restock date on {brand}'s profile and stick to it, so sell-outs read as demand instead of chaos.",
      },
      {
        title: "Put a refund clock on the returns page",
        action:
          "Commit {brand} to a 72-hour refund window in writing and send an automatic email the moment a return is scanned.",
      },
      {
        title: "Shoot every style on three bodies",
        action:
          "Add a second and third fit model to {brand}'s next shoot and label height and size under each photo.",
      },
    ],
  },
  "Beauty & Skincare": {
    loves: [
      {
        source: "Reddit · r/SkincareAddiction",
        quote: "Full INCI list on the front of the box. I didn't have to email anyone.",
        context: "Ingredient transparency is the standout loyalty driver.",
      },
      {
        source: "Twitter/X",
        quote: "The serum didn't sting my rosacea. First one in a year that didn't.",
        context: "Sensitive-skin tolerance is the most shared positive result.",
      },
      {
        source: "Reddit · r/AsianBeauty",
        quote: "Refill pouches cost half the bottle. Actually rewarding me for staying.",
        context: "Refill pricing is read as respect, not gimmick.",
      },
    ],
    frustrations: [
      {
        source: "Reddit · r/SkincareAddiction",
        quote: "Sold as 'clinically proven' but the study was eleven people, unpublished.",
        context: "Thin evidence behind claims triggers the harshest backlash.",
      },
      {
        source: "Twitter/X",
        quote: "The pump dies with a third of the product still stuck inside.",
        context: "Packaging waste complaints outnumber formula complaints.",
      },
      {
        source: "Reddit · r/30PlusSkinCare",
        quote: "No percentages anywhere. Is it 2% niacinamide or 10%? Big difference.",
        context: "Missing actives concentrations makes routine-building impossible.",
      },
    ],
    fixes: [
      {
        title: "Show the study, or drop the claim",
        action:
          "Link {brand}'s full test protocol and sample size next to every efficacy claim, or restate it as a customer-reported result.",
      },
      {
        title: "Fix the last third of the bottle",
        action:
          "Switch {brand}'s pump to an airless dispenser or add a jar format, then film the empty-bottle test as proof.",
      },
      {
        title: "Print active percentages on the front",
        action:
          "List each active and its percentage on {brand}'s packaging and product page, and say which skin type it suits.",
      },
    ],
  },
  "Energy Drinks": {
    loves: [
      {
        source: "Reddit · r/energydrinks",
        quote: "200mg and it says so in big type. No mystery 'energy blend'.",
        context: "Clear caffeine labelling is the top-cited reason for repurchase.",
      },
      {
        source: "Twitter/X",
        quote: "Zero sugar and it doesn't taste like a vitamin tablet. How.",
        context: "Flavour without sweetener aftertaste drives the most quote-tweets.",
      },
      {
        source: "Reddit · r/gamingsetups",
        quote: "The slim can actually fits my desk cup holder. Small thing, matters daily.",
        context: "Format practicality earns unprompted mentions in setup posts.",
      },
    ],
    frustrations: [
      {
        source: "Reddit · r/energydrinks",
        quote: "The crash at hour three is worse than the boost. What's in this?",
        context: "Crash reports dominate negative threads more than taste.",
      },
      {
        source: "Twitter/X",
        quote: "£3.20 a can in the shop, £1.80 in a 12-pack online. Feels punishing.",
        context: "Single-can pricing is seen as penalising casual buyers.",
      },
      {
        source: "Reddit · r/Fitness",
        quote: "Marketed at teenagers with 300mg caffeine. That's not fine.",
        context: "Youth targeting plus high caffeine is a live reputational risk.",
      },
    ],
    fixes: [
      {
        title: "Publish the energy curve",
        action:
          "Share {brand}'s own onset-and-taper chart with the ingredient reasoning, and name a realistic effect window.",
      },
      {
        title: "Close the single-can gap",
        action:
          "Fund a shelf price cap for {brand} singles or add a 4-pack tier so casual buyers aren't paying double per can.",
      },
      {
        title: "State the age guidance out loud",
        action:
          "Put an 18+ recommendation and a per-day limit on {brand}'s can and ad creative, and brief creators to repeat it.",
      },
    ],
  },
  Gaming: {
    loves: [
      {
        source: "Reddit · r/pcgaming",
        quote: "Patch notes are written by someone who actually plays the game.",
        context: "Developer-voiced updates are the most-upvoted brand behaviour.",
      },
      {
        source: "Twitter/X",
        quote: "No battle pass FOMO timer. I can log off and lose nothing.",
        context: "Respect for player time is repeatedly framed as the differentiator.",
      },
      {
        source: "Reddit · r/patientgamers",
        quote: "They fixed the input lag two days after a community bug thread.",
        context: "Visible response speed converts critics into defenders.",
      },
    ],
    frustrations: [
      {
        source: "Reddit · r/gaming",
        quote: "Cosmetics cost more than the game and the shop resets before I decide.",
        context: "Storefront pressure tactics are the loudest complaint.",
      },
      {
        source: "Twitter/X",
        quote: "Servers die every launch weekend and the account just says 'we're aware'.",
        context: "Generic status updates during outages amplify anger.",
      },
      {
        source: "Reddit · r/Games",
        quote: "Roadmap promised co-op in spring. It's autumn. No word at all.",
        context: "Silent roadmap slips damage trust more than the delay itself.",
      },
    ],
    fixes: [
      {
        title: "Kill the rotating shop timer",
        action:
          "Keep {brand}'s cosmetics permanently listed with fixed prices, and show what a bundle costs versus buying separately.",
      },
      {
        title: "Report outages like an engineer",
        action:
          "Give {brand} a live status page with cause, affected regions and a next-update time, then post the postmortem.",
      },
      {
        title: "Date every roadmap item honestly",
        action:
          "Ship a monthly {brand} roadmap update that marks each feature on track, moved or cut, with the reason attached.",
      },
    ],
  },
  "Fintech for Students": {
    loves: [
      {
        source: "Reddit · r/UniUK",
        quote: "It flagged my subscription price rise before the payment left. Saved me £40.",
        context: "Proactive alerts are the most concrete value users describe.",
      },
      {
        source: "Twitter/X",
        quote: "Signed up in four minutes with a student ID photo. No branch visit.",
        context: "Frictionless onboarding is the top acquisition compliment.",
      },
      {
        source: "Reddit · r/personalfinance",
        quote: "Fee page is one screen and in plain English. Nothing buried.",
        context: "Readable fee disclosure earns disproportionate goodwill.",
      },
    ],
    frustrations: [
      {
        source: "Reddit · r/UniUK",
        quote: "Account frozen for a 'review' for nine days with rent due. No human to call.",
        context: "Freeze-with-no-contact is the most damaging recurring story.",
      },
      {
        source: "Twitter/X",
        quote: "The 'no fees' bit doesn't mention the 2.5% weekend FX markup.",
        context: "Hidden FX spread undercuts the fee-transparency positioning.",
      },
      {
        source: "Reddit · r/StudentLoans",
        quote: "Budget tool assumes a monthly salary. My income is three gigs a term.",
        context: "Irregular income doesn't fit the default budgeting model.",
      },
    ],
    fixes: [
      {
        title: "Guarantee a human during a freeze",
        action:
          "Give every frozen {brand} account a named case handler within 24 hours and a written expected resolution date.",
      },
      {
        title: "Show FX cost before confirming",
        action:
          "Display {brand}'s exact weekend markup in pounds on the payment screen, not only in the fee schedule.",
      },
      {
        title: "Add an irregular-income budget mode",
        action:
          "Let {brand} users budget by term or per payout instead of per month, and forecast from their last three deposits.",
      },
    ],
  },
  Sneakers: {
    loves: [
      {
        source: "Reddit · r/Sneakers",
        quote: "Raffle results came on time and losers got a discount code. Classy.",
        context: "Fair, punctual releases are praised more than the shoe.",
      },
      {
        source: "Twitter/X",
        quote: "Resole service kept my pair alive for a second year.",
        context: "Repair options are read as genuine sustainability.",
      },
      {
        source: "Reddit · r/RunningShoeGeeks",
        quote: "They publish stack height and drop. I don't have to guess the ride.",
        context: "Spec honesty wins over performance-focused buyers.",
      },
    ],
    frustrations: [
      {
        source: "Reddit · r/Sneakers",
        quote: "Bots cleared the drop in seconds and it was on resale before my page loaded.",
        context: "Bot losses are the number one release-day grievance.",
      },
      {
        source: "Twitter/X",
        quote: "Midsole creased and split at week six. Warranty said 'wear and tear'.",
        context: "Warranty refusals on early failures generate viral threads.",
      },
      {
        source: "Reddit · r/WideFeet",
        quote: "Half sizes stop at 11 and there's no wide fit at all.",
        context: "Size-range gaps push a whole segment to competitors.",
      },
    ],
    fixes: [
      {
        title: "Verify entrants before the drop",
        action:
          "Move {brand} releases to a pre-verified raffle with one entry per ID, and publish the winner count afterwards.",
      },
      {
        title: "Define the warranty in wear time",
        action:
          "State a {brand} midsole guarantee in months of use, and replace early splits without asking for the receipt hunt.",
      },
      {
        title: "Extend the size run",
        action:
          "Add a wide fit and sizes to 14 in {brand}'s next production run, and open a waitlist to prove the demand publicly.",
      },
    ],
  },
  "Food & Beverage": {
    loves: [
      {
        source: "Reddit · r/EatCheapAndHealthy",
        quote: "Protein per pound beats everything else in the chiller aisle.",
        context: "Value-per-nutrient is the most repeated purchase reason.",
      },
      {
        source: "Twitter/X",
        quote: "Sourcing page names the actual farms. Not 'ethically sourced' filler.",
        context: "Named supply chain earns trust from sceptical buyers.",
      },
      {
        source: "Reddit · r/MealPrepSunday",
        quote: "Cooks in eight minutes and doesn't turn to mush. Weeknight saver.",
        context: "Practical convenience beats flavour talk in review posts.",
      },
    ],
    frustrations: [
      {
        source: "Reddit · r/shrinkflation",
        quote: "Same box, 340g became 290g, same price. Noticed instantly.",
        context: "Quiet size reductions are the fastest-spreading criticism.",
      },
      {
        source: "Twitter/X",
        quote: "'Recyclable' film that no council near me actually takes.",
        context: "Unclear recycling claims read as greenwashing.",
      },
      {
        source: "Reddit · r/glutenfree",
        quote: "Allergen info is in a PDF, not on the pack. That's not good enough.",
        context: "Hard-to-find allergen data blocks a high-intent audience.",
      },
    ],
    fixes: [
      {
        title: "Announce size changes before shelves do",
        action:
          "Publish any {brand} pack-size or recipe change with the reason and the new price-per-100g a month ahead.",
      },
      {
        title: "Say where the pack actually goes",
        action:
          "Replace {brand}'s generic recycling icon with the specific stream and a postcode checker on pack and site.",
      },
      {
        title: "Move allergens onto the front of pack",
        action:
          "Print {brand}'s allergen and cross-contamination status on the pack face and repeat it in the first product-page block.",
      },
    ],
  },
  "Fashion (general)": {
    loves: [
      {
        source: "Reddit · r/femalefashionadvice",
        quote: "Model height and size listed on every photo. Ordering got easy.",
        context: "Fit context is the most valued page detail.",
      },
      {
        source: "Twitter/X",
        quote: "Free exchanges meant I could try two sizes without stress.",
        context: "Low-risk trying is the strongest conversion lever mentioned.",
      },
      {
        source: "Reddit · r/BuyItForLife",
        quote: "Third winter in the same coat and the seams are still tight.",
        context: "Longevity stories function as organic advertising.",
      },
    ],
    frustrations: [
      {
        source: "Reddit · r/femalefashionadvice",
        quote: "Colour on screen was mustard, arrived neon. Not even close.",
        context: "Colour mismatch is the leading return reason cited.",
      },
      {
        source: "Twitter/X",
        quote: "Sizing changes between collections. My M fits, then it doesn't.",
        context: "Inconsistent grading destroys repeat-purchase confidence.",
      },
      {
        source: "Reddit · r/ZeroWaste",
        quote: "'Conscious collection' with no material percentages listed anywhere.",
        context: "Vague sustainability labels invite public scrutiny.",
      },
    ],
    fixes: [
      {
        title: "Shoot colour under one standard light",
        action:
          "Photograph every {brand} colourway under the same daylight setup and add a real-life fabric swatch clip to each listing.",
      },
      {
        title: "Freeze the size grade",
        action:
          "Lock {brand}'s measurement chart across collections and publish garment measurements, not just S/M/L.",
      },
      {
        title: "Replace 'conscious' with numbers",
        action:
          "List {brand}'s exact material composition and factory for the collection, and drop the label where the data isn't there.",
      },
    ],
  },
  "Fitness & Wellness": {
    loves: [
      {
        source: "Reddit · r/bodyweightfitness",
        quote: "Programme scales for beginners without treating me like a child.",
        context: "Respectful progression is the top retention factor.",
      },
      {
        source: "Twitter/X",
        quote: "Cancelled in two taps. No retention maze. I'll come back for that alone.",
        context: "Easy cancellation is repeatedly praised as trust-building.",
      },
      {
        source: "Reddit · r/xxfitness",
        quote: "Coaches cite actual studies instead of 'trust the process'.",
        context: "Evidence-led coaching separates the brand from influencer noise.",
      },
    ],
    frustrations: [
      {
        source: "Reddit · r/Fitness",
        quote: "Every plan assumes a full gym. I have a mat and a doorway.",
        context: "Equipment assumptions exclude home-training users.",
      },
      {
        source: "Twitter/X",
        quote: "Before-and-afters everywhere. Feels like a body-shaming funnel.",
        context: "Transformation-heavy marketing is drawing active criticism.",
      },
      {
        source: "Reddit · r/running",
        quote: "App double-charged for annual and monthly and support took ten days.",
        context: "Billing errors plus slow support drive cancellations.",
      },
    ],
    fixes: [
      {
        title: "Ship a no-equipment track",
        action:
          "Add a home-only path to every {brand} programme with swap suggestions listed next to each movement.",
      },
      {
        title: "Change the proof format",
        action:
          "Replace {brand}'s before-and-afters with performance milestones — first pull-up, first 5k — and show the training week behind them.",
      },
      {
        title: "Auto-refund duplicate charges",
        action:
          "Have {brand} detect overlapping subscriptions automatically, refund the same day and email the customer first.",
      },
    ],
  },
  "Consumer Tech": {
    loves: [
      {
        source: "Reddit · r/gadgets",
        quote: "Four years old and still getting firmware updates. Unheard of.",
        context: "Long support windows are the strongest loyalty signal.",
      },
      {
        source: "Twitter/X",
        quote: "Replaceable battery with a guide and £9 part. Instant respect.",
        context: "Repairability generates the most organic advocacy.",
      },
      {
        source: "Reddit · r/headphones",
        quote: "Spec sheet matched independent measurements almost exactly.",
        context: "Honest specs build credibility with technical buyers.",
      },
    ],
    frustrations: [
      {
        source: "Reddit · r/gadgets",
        quote: "Half the features are locked behind a subscription I didn't see at checkout.",
        context: "Paywalled hardware features are the top complaint.",
      },
      {
        source: "Twitter/X",
        quote: "Companion app is ad-riddled and asks for contacts. Why?",
        context: "Excessive app permissions raise privacy alarm.",
      },
      {
        source: "Reddit · r/techsupport",
        quote: "Warranty claim needed the original box. Who keeps the box for two years?",
        context: "Unreasonable warranty conditions read as bad faith.",
      },
    ],
    fixes: [
      {
        title: "Disclose subscriptions before checkout",
        action:
          "List which {brand} features need a plan, and their price, on the buy button screen and the retail box.",
      },
      {
        title: "Strip the app to what it needs",
        action:
          "Remove ads and non-essential permissions from {brand}'s app and publish a plain-language list of what data it collects.",
      },
      {
        title: "Accept serial numbers, not boxes",
        action:
          "Let {brand} warranty claims run on serial number and order lookup alone, and say so on the support page.",
      },
    ],
  },
  "Home & Lifestyle": {
    loves: [
      {
        source: "Reddit · r/malelivingspace",
        quote: "Dimensions in cm plus a scale photo next to a mug. Zero guesswork.",
        context: "Scale context prevents the most common ordering mistake.",
      },
      {
        source: "Twitter/X",
        quote: "Spare parts sold individually. Fixed my chair for £6.",
        context: "Parts availability creates long-term loyalty.",
      },
      {
        source: "Reddit · r/DesignMyRoom",
        quote: "Assembly took twenty minutes with real instructions, not pictograms.",
        context: "Clear assembly guides reduce returns and complaints.",
      },
    ],
    frustrations: [
      {
        source: "Reddit · r/HomeImprovement",
        quote: "Delivery window was 'sometime Tuesday' and nobody called ahead.",
        context: "Vague delivery slots are the loudest logistics gripe.",
      },
      {
        source: "Twitter/X",
        quote: "Studio photos make it look oak. It's printed veneer on chipboard.",
        context: "Material misrepresentation drives one-star reviews.",
      },
      {
        source: "Reddit · r/smallapartments",
        quote: "Nothing in the range fits a room under 12m². All showroom-sized.",
        context: "Small-space renters feel designed out of the catalogue.",
      },
    ],
    fixes: [
      {
        title: "Give a two-hour delivery slot",
        action:
          "Move {brand} deliveries to a two-hour window with live tracking and a text 30 minutes out.",
      },
      {
        title: "Name the material in the title",
        action:
          "Put {brand}'s actual construction — solid oak, veneer, chipboard — in the product name and add an unedited close-up.",
      },
      {
        title: "Launch a small-space line",
        action:
          "Tag {brand} products that fit rooms under 12m² and shoot the range in a real rented studio flat.",
      },
    ],
  },
  "Campus & EdTech": {
    loves: [
      {
        source: "Reddit · r/GetStudying",
        quote: "Offline mode saved me on a train with no signal before an exam.",
        context: "Reliability under bad conditions is the top praise.",
      },
      {
        source: "Twitter/X",
        quote: "Student pricing is actually student pricing, not 10% off.",
        context: "Genuine discounts drive word-of-mouth on campus.",
      },
      {
        source: "Reddit · r/UniUK",
        quote: "Exports my notes to plain markdown. No lock-in.",
        context: "Data portability is a decisive factor for long-term users.",
      },
    ],
    frustrations: [
      {
        source: "Reddit · r/GetStudying",
        quote: "AI summaries invented two citations. I nearly submitted them.",
        context: "Unflagged AI errors are the most serious credibility risk.",
      },
      {
        source: "Twitter/X",
        quote: "Free tier caps at three documents. That's a demo, not a free tier.",
        context: "Aggressive limits sour first impressions with students.",
      },
      {
        source: "Reddit · r/privacy",
        quote: "Terms allow training on my uploaded coursework. Absolutely not.",
        context: "Training-on-student-work clauses trigger organised backlash.",
      },
    ],
    fixes: [
      {
        title: "Cite or say nothing",
        action:
          "Make every {brand} AI summary link its source passage and flag unverified claims before a student can export them.",
      },
      {
        title: "Make the free tier usable in exam week",
        action:
          "Raise {brand}'s free limit to a full module's worth of documents and cap by monthly usage instead of total count.",
      },
      {
        title: "Default coursework to no-training",
        action:
          "Set {brand} accounts to exclude uploads from model training by default and show that setting during onboarding.",
      },
    ],
  },
};

const fallback = library["Streetwear"]!;

const fill = (text: string, brand: string) =>
  text.replaceAll("{brand}", brand.trim() || "your brand");

export function buildReputationReport(category: string, brandName: string): ReputationReport {
  const key =
    Object.keys(library).find((k) => k.toLowerCase() === category.trim().toLowerCase()) ?? null;
  const data = key ? library[key]! : fallback;
  const brand = brandName.trim();
  return {
    category: key ?? "Streetwear",
    brandName: brand,
    generatedAt: Date.now(),
    loves: data.loves,
    frustrations: data.frustrations,
    fixes: data.fixes.map((f) => ({ title: f.title, action: fill(f.action, brand) })),
  };
}

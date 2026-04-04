# Technical Requirements Document: BakingConverter.io
## Version: 3.0 Final (Anti-Snippet Strategy)
## Date: 2025
## Type: Programmatic SEO Platform — Baking Science Lab

---

# TABLE OF CONTENTS

1. Project Vision & Anti-Snippet Philosophy
2. Tech Stack
3. File Structure
4. Data Engine (Ingredients Database)
5. Conversion Logic & Math
6. Recipe Scaler Logic
7. Site Architecture & URL Structure
8. Page Components (Detailed)
9. SEO & Schema Markup (Anti-Snippet Titles)
10. Internal Linking Strategy
11. Sharing & Viral Features
12. Pinterest Strategy
13. Advertising (AdSense Integration)
14. Blog Section
15. Design System
16. Photo Production Guide
17. Performance Requirements
18. Legal Pages
19. Analytics & Tracking
20. Error Handling
21. Testing Requirements
22. Security
23. Content Value Filter
24. Launch Checklist
25. Post-Launch Growth Plan
26. Risks & Mitigations
27. Data Sources

---

# 1. PROJECT VISION & ANTI-SNIPPET PHILOSOPHY

## 1.1 What
A programmatic SEO platform generating 40,000+ unique pages
targeting long-tail baking conversion queries in the US market.
Not a simple calculator. A **Baking Science Lab** that provides
expertise Google AI Overview cannot replicate.

## 1.2 The Problem with Google AI Overview (2025 Reality)
Google now answers simple conversion queries directly in search results:
Query: "100g flour to cups"
Google AI: "Roughly 0.72 to 0.8 cups"



### Three weaknesses of Google AI Overview we exploit:

**Weakness 1: Range instead of precision**
Google says "0.72 to 0.8 cups" — a 10% difference.
For a baker, 10% error = dry cake vs fluffy cake.
We give ONE exact number based on the user's specific inputs.

**Weakness 2: "Roughly" and "Approximately"**
Google AI uses hedge words because it fears being wrong.
We provide exact numbers with scientific backing (USDA data).

**Weakness 3: Zero context**
Google does not ask what type of flour, what measurement method,
what altitude, or what state (melted vs solid).
We ask all of these and give a personalized answer.

## 1.3 Our Competitive Moat
Google AI Overview CANNOT:
- Provide an interactive slider that updates in real time
- Switch between measurement methods with a tab click
- Show real photographs of what 100g looks like in a cup
- Scale an entire recipe up or down interactively
- Generate a printable PDF or saveable PNG
- Remember user preferences

**We do ALL of these.**

## 1.4 Target Audience
NOT the casual user who accepts Google's "roughly 0.8 cups."

Our user is:
- US home baker who has ruined a recipe due to bad measurement
- Professional baker who needs exactness
- Cooking student learning proper technique
- Recipe blogger who needs reliable conversions for their content
- Anyone who has thought "Why did my cake turn out wrong?"

## 1.5 Monetization
- Google AdSense (primary, Phase 1-3)
- Mediavine (upgrade at 50K sessions/month)
- AdThrive/Raptive (upgrade at 100K sessions/month)
- Amazon Affiliates for kitchen scales (Phase 3+)
- Target RPM: $8-15 (Food/Cooking niche, US traffic)

## 1.6 Traffic Sources (Diversified, Not SEO-Only)
| Source | Strategy | % of Traffic Target |
|--------|----------|-------------------|
| Google Organic | Long-tail pSEO pages | 50% |
| Pinterest | Cheat sheet cards, recipe pins | 30% |
| Direct/Bookmarks | Returning users who saved the tool | 10% |
| Social (Reddit, Facebook groups) | Sharing in baking communities | 10% |

## 1.7 Success Metrics
| Metric | Target | Timeframe |
|--------|--------|-----------|
| Indexed pages | 50,000+ | 6 months |
| Monthly organic visitors | 100,000+ | 12 months |
| Pinterest monthly impressions | 500,000+ | 12 months |
| AdSense approval | Approved | 3 months |
| Average session duration | > 2.5 minutes | 6 months |
| Pages per session | > 3.0 | 6 months |
| Bounce rate | < 55% | 6 months |
| Return visitor rate | > 20% | 12 months |

---

# 2. TECH STACK

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | Next.js 15+ (App Router) | SSG + ISR for 40K+ pages |
| Language | TypeScript (strict mode) | Type safety for data models |
| Styling | Tailwind CSS 3.4+ | Rapid UI, mobile-first |
| Icons | Lucide React | Lightweight, tree-shakeable |
| Image Export | html2canvas | Client-side "Save as Image" |
| Analytics | Google Analytics 4 | Traffic tracking |
| Ads | Google AdSense | Monetization |
| Hosting | Vercel (Pro plan) | Edge network, ISR support |
| Images | Next.js Image component | Auto optimization, WebP |
| Domain | .io or .com | Brandable, trustworthy |

## 2.1 Why Next.js App Router
- `generateStaticParams` for pre-rendering top 1,000 pages at build
- ISR (Incremental Static Regeneration) for remaining 39,000+ pages
- `generateMetadata` for dynamic SEO per page
- Server Components for fast initial load
- Built-in `sitemap.ts` support
- React Server Components reduce client JS bundle

## 2.2 Package Dependencies
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^3.4.0",
    "lucide-react": "^0.400.0",
    "html2canvas": "^1.4.1"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "typescript": "^5.5.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
3. FILE STRUCTURE

bakingconverter.com/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── not-found.tsx
│   │
│   ├── [ingredient]/
│   │   ├── page.tsx
│   │   └── [conversion]/
│   │       └── page.tsx
│   │
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── privacy/
│   │   └── page.tsx
│   ├── terms/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── disclaimer/
│   │   └── page.tsx
│   └── cookies/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Breadcrumbs.tsx
│   │   └── CookieConsent.tsx
│   │
│   ├── calculator/
│   │   ├── ResultHero.tsx
│   │   ├── CupGauge.tsx
│   │   ├── MethodSwitcher.tsx
│   │   ├── StateSwitcher.tsx
│   │   ├── AltitudeToggle.tsx
│   │   ├── ComparisonMatrix.tsx
│   │   ├── WeightSlider.tsx
│   │   ├── NearbyValuesTable.tsx
│   │   ├── NutritionBlock.tsx
│   │   ├── RecipeContext.tsx
│   │   ├── RecipeScaler.tsx
│   │   ├── ProTips.tsx
│   │   ├── WhyItMatters.tsx
│   │   └── VisualMeasurementGuide.tsx
│   │
│   ├── seo/
│   │   ├── FAQSchema.tsx
│   │   ├── SoftwareAppSchema.tsx
│   │   ├── BreadcrumbSchema.tsx
│   │   └── HowToSchema.tsx
│   │
│   ├── sharing/
│   │   ├── ConversionCard.tsx
│   │   ├── CheatSheetCard.tsx
│   │   ├── PrintButton.tsx
│   │   ├── SaveImageButton.tsx
│   │   └── ShareButtons.tsx
│   │
│   ├── ads/
│   │   ├── AdBanner.tsx
│   │   ├── AdSidebar.tsx
│   │   └── AdInContent.tsx
│   │
│   └── ui/
│       ├── SearchBar.tsx
│       ├── IngredientGrid.tsx
│       └── BlogCard.tsx
│
├── lib/
│   ├── ingredients.json
│   ├── recipes.json
│   ├── blog-posts.json
│   ├── converter.ts
│   ├── recipe-scaler.ts
│   ├── constants.ts
│   ├── slug-utils.ts
│   ├── seo-utils.ts
│   ├── title-generator.ts
│   └── page-generator.ts
│
├── public/
│   ├── images/
│   │   ├── ingredients/
│   │   │   ├── all-purpose-flour/
│   │   │   │   ├── spoon-level.webp
│   │   │   │   ├── dip-sweep.webp
│   │   │   │   └── sifted.webp
│   │   │   ├── cake-flour/
│   │   │   └── ... (per ingredient)
│   │   ├── pinterest/
│   │   │   └── cheat-sheets/
│   │   └── blog/
│   ├── favicon.ico
│   └── apple-touch-icon.png
│
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
4. DATA ENGINE
4.1 Ingredient Database Schema (lib/ingredients.json)
Each ingredient object must contain:

Field	Type	Required	Description
id	string	Yes	URL slug (e.g., "cake-flour")
name	string	Yes	Display name (e.g., "Cake Flour")
category	string	Yes	"flour", "sugar", "fat", "liquid", "leavener", "dairy", "other"
base_density_g_per_ml	number	Yes	Grams per milliliter at Spoon & Level method
type	enum	Yes	"dry", "liquid", "fat"
states	object or null	If fat	{ "solid": 1.0, "softened": 0.95, "melted": 0.88 }
measurement_method_overrides	object or null	If differs from default	Override default method modifiers
nutrition_per_100g	object	Yes	{ calories, protein_g, carbs_g, fat_g, fiber_g, sugar_g }
pro_tips	string[]	Yes	2-3 expert tips specific to this ingredient
common_weights_g	number[]	Yes	Most searched weights for generateStaticParams
related_ingredients	string[]	Yes	IDs of similar ingredients for internal linking
faq	array	Yes	[{ question: string, answer: string }] min 2 pairs
description	string	Yes	2-3 sentence SEO description
photo_available	boolean	Yes	Whether measurement photos exist
density_source	string	Yes	"USDA FoodData Central" or "King Arthur Weight Chart"
4.1.1 Example Ingredient Object
json

{
  "id": "cake-flour",
  "name": "Cake Flour",
  "category": "flour",
  "base_density_g_per_ml": 0.467,
  "type": "dry",
  "states": null,
  "measurement_method_overrides": null,
  "nutrition_per_100g": {
    "calories": 362,
    "protein_g": 8.0,
    "carbs_g": 76.3,
    "fat_g": 1.0,
    "fiber_g": 1.8,
    "sugar_g": 0.3
  },
  "pro_tips": [
    "Cake flour has less protein (7-8%) than AP flour, producing a tender crumb.",
    "Always sift cake flour before measuring for the most accurate result.",
    "If you don't have cake flour, use AP flour minus 2 tbsp per cup, plus 2 tbsp cornstarch."
  ],
  "common_weights_g": [50, 75, 100, 120, 125, 130, 140, 150, 175, 200, 225, 250, 300, 350, 400, 500],
  "related_ingredients": ["all-purpose-flour", "bread-flour", "whole-wheat-flour", "cornstarch"],
  "faq": [
    {
      "question": "Does sifting cake flour change the cup measurement?",
      "answer": "Yes. 100g of sifted cake flour takes up approximately 15% more volume than unsifted. That's 0.96 cups sifted vs 0.83 cups spooned & leveled."
    },
    {
      "question": "Can I substitute all-purpose flour for cake flour?",
      "answer": "Yes, but adjust the weight. Use 100g AP flour minus 14g, plus 14g cornstarch. The density differs, so cup measurements will change."
    }
  ],
  "description": "Cake flour is a finely milled, low-protein flour (7-8% protein) used for tender cakes, cupcakes, and delicate pastries. Its lower gluten content produces a softer crumb than all-purpose flour.",
  "photo_available": false,
  "density_source": "USDA FoodData Central"
}
4.2 Required Ingredients for Launch (20 minimum)
Flours (6)
ID	Name	Density (g/ml)	Source
all-purpose-flour	All-Purpose Flour	0.529	USDA
bread-flour	Bread Flour	0.550	USDA
cake-flour	Cake Flour	0.467	USDA
whole-wheat-flour	Whole Wheat Flour	0.512	USDA
almond-flour	Almond Flour	0.406	King Arthur
coconut-flour	Coconut Flour	0.540	King Arthur
Sugars (4)
ID	Name	Density (g/ml)	Source
granulated-sugar	Granulated Sugar	0.845	USDA
brown-sugar	Brown Sugar (packed)	0.930	USDA
powdered-sugar	Powdered Sugar	0.508	USDA
honey	Honey	1.420	USDA
Fats (4)
ID	Name	Density (g/ml)	States	Source
butter	Butter	0.959	solid: 1.0, softened: 0.95, melted: 0.88	USDA
coconut-oil	Coconut Oil	0.924	solid: 1.0, melted: 0.90	USDA
vegetable-oil	Vegetable Oil	0.920	null (always liquid)	USDA
olive-oil	Olive Oil	0.916	null (always liquid)	USDA
Dairy & Liquids (3)
ID	Name	Density (g/ml)	Source
whole-milk	Whole Milk	1.030	USDA
heavy-cream	Heavy Cream	0.994	USDA
sour-cream	Sour Cream	1.013	USDA
Other (3)
ID	Name	Density (g/ml)	Source
cocoa-powder	Cocoa Powder (unsweetened)	0.449	USDA
rolled-oats	Rolled Oats	0.381	USDA
cornstarch	Cornstarch	0.541	USDA
4.3 Recipe Database Schema (lib/recipes.json)
Field	Type	Description
id	string	Slug
name	string	Recipe name
category	string	"bread", "cake", "cookie", "pastry", "sauce", "other"
serves	number	Number of servings
ingredients	array	[{ ingredient_id, weight_g, note }]
source_note	string	"Classic recipe" or similar attribution
4.3.1 Example Recipe
json

{
  "id": "basic-vanilla-cake",
  "name": "Basic Vanilla Cake",
  "category": "cake",
  "serves": 8,
  "ingredients": [
    { "ingredient_id": "cake-flour", "weight_g": 240, "note": "sifted" },
    { "ingredient_id": "granulated-sugar", "weight_g": 200, "note": "" },
    { "ingredient_id": "butter", "weight_g": 115, "note": "softened" },
    { "ingredient_id": "whole-milk", "weight_g": 180, "note": "room temperature" }
  ],
  "source_note": "Classic American vanilla cake recipe"
}
4.3.2 Minimum 15 recipes required for launch:
Basic Vanilla Cake
Chocolate Chip Cookies
Banana Bread
Pizza Dough
Pancakes
Simple White Bread
Blueberry Muffins
Pie Crust (single)
Brownies
Sugar Cookies
Biscuits
Cornbread
Crepes
Scones
Cinnamon Rolls
5. CONVERSION LOGIC & MATH
5.1 Constants (lib/constants.ts)
Constant	Value	Source
US_CUP_ML	236.588	NIST
US_TABLESPOON_ML	14.787	NIST
US_TEASPOON_ML	4.929	NIST
US_FL_OZ_ML	29.574	NIST
5.2 Default Measurement Method Modifiers
Method	ID	Modifier	Description	UI Badge
Spoon & Level	spoon_level	1.0	Spoon into cup, level with knife	✅ Recommended
Dip & Sweep	dip_sweep	1.18	Dip cup into bag, sweep excess	⚠️ Heavy (+18%)
Sifted	sifted	0.85	Sift through sieve into cup	🪶 Light (-15%)
Note: Some ingredients may override these defaults via measurement_method_overrides.

5.3 State Modifiers (fats only)
State	ID	Default Modifier	Applies to
Solid (cold)	solid	1.0	Butter, coconut oil
Softened (room temp)	softened	0.95	Butter
Melted	melted	0.88	Butter, coconut oil
5.4 Master Conversion Formula

cups = weight_g / (base_density_g_per_ml × US_CUP_ML) × method_modifier × state_modifier
Step by step:

Get base_density_g_per_ml from ingredient data
Get method_modifier (default or override)
Get state_modifier (1.0 if not a fat or not applicable)
Calculate: weight_g / (density × 236.588) × method × state
Round to 2 decimal places
5.5 Supported Output Units
Every conversion must simultaneously display:

Unit	Abbreviation	Formula from cups
US Cups	cups	(base result)
US Tablespoons	tbsp	cups × 16
US Teaspoons	tsp	cups × 48
Fluid Ounces	fl oz	cups × 8
Milliliters	ml	cups × 236.588
5.6 Altitude Advisory Logic
This is informational ONLY. It does NOT change the math.

Condition	Action
Altitude toggle OFF	Show nothing
Altitude toggle ON	Show yellow warning block
Altitude Warning Content:

⛰️ High Altitude Adjustment (above 3,500 ft)

When baking above 3,500 feet:
• Add 2-4 tablespoons of flour per cup
• Increase liquid by 2-4 tablespoons
• Increase oven temperature by 15-25°F
• Decrease sugar by 1-3 tablespoons per cup
• Decrease leavening by 25%

Cities affected: Denver, Salt Lake City, Albuquerque, 
Colorado Springs, Flagstaff, Santa Fe, Boise, Reno
5.7 Smart Display Rules
Scenario	Display Rule
Result < 0.01 cups	Show in teaspoons instead
Result < 0.125 cups (1/8)	Show in tablespoons as primary
Result > 20 cups	Show result + note: "For large batches, use a kitchen scale"
Fat ingredient	Show StateSwitcher component
Non-fat ingredient	Hide StateSwitcher component
Liquid ingredient	Hide MethodSwitcher (methods apply to dry only)
6. RECIPE SCALER LOGIC
6.1 Purpose
When a user views a specific weight (e.g., "150g cake flour"),
we check recipes.json for recipes that use a similar weight of
that ingredient. If found, we display the FULL recipe with
all ingredients converted.

6.2 Matching Logic

For a given ingredient_id and weight_g:
1. Search recipes.json for recipes containing ingredient_id
2. Filter to recipes where the ingredient weight is within ±20% of the page weight
3. Display the closest match (or top 2 matches)
4. Scale all recipe ingredients proportionally
6.3 Scaler Feature
The Recipe Scaler must allow:

Scale presets: 0.5x, 1x, 1.5x, 2x, 3x
Custom multiplier input field
ALL ingredients recalculate when scale changes
Each ingredient shows: grams AND cups (with method)
Entire component is interactive (client component)
6.4 Output Format

📋 Recipe: Basic Vanilla Cake (scaled to 1.5x, serves 12)

Cake Flour (sifted):   360g  =  3.26 cups
Granulated Sugar:       300g  =  1.50 cups
Butter (softened):      173g  =  0.76 cups
Whole Milk:             270g  =  1.11 cups

[0.5x] [1x] [1.5x] [2x] [3x] [Custom: ___]

[🖨️ Print Recipe Card] [📷 Save as Image]
7. SITE ARCHITECTURE & URL STRUCTURE
7.1 URL Patterns
Page Type	URL Pattern	Example
Homepage	/	bakingconverter.com
Ingredient Hub	/[ingredient]/	/cake-flour/
Leaf Page	/[ingredient]/[value]-grams-to-cups/	/cake-flour/150-grams-to-cups/
Blog Listing	/blog/	/blog/
Blog Post	/blog/[slug]/	/blog/why-cup-measurements-fail/
Privacy	/privacy/	/privacy/
Terms	/terms/	/terms/
About	/about/	/about/
Contact	/contact/	/contact/
Disclaimer	/disclaimer/	/disclaimer/
Cookies	/cookies/	/cookies/
7.2 Page Generation Strategy
Pre-rendered at build time (generateStaticParams):
All 20 ingredient hub pages
Top 1,000 leaf pages (common_weights × all ingredients)
All blog posts
All legal pages
ISR (Incremental Static Regeneration):
Remaining leaf pages (any valid weight 1-1000)
Generated on first visit
Revalidate: 604800 (7 days)
Valid weight range:
Minimum: 1g
Maximum: 1000g
Step: 1g (whole numbers only)
Total possible pages per ingredient: 1,000
Total possible pages (20 ingredients): 20,000
Total possible pages (future 100 ingredients): 100,000
7.3 Slug Parsing Rules (lib/slug-utils.ts)
URL slug format: [value]-grams-to-cups

Input	Action
150-grams-to-cups	Valid → extract 150
0-grams-to-cups	Invalid → 404
1001-grams-to-cups	Invalid → 404
abc-grams-to-cups	Invalid → 404
150.5-grams-to-cups	301 redirect to 150-grams-to-cups
150-grams-to-cups (no trailing slash)	301 redirect to add trailing slash
150-GRAMS-TO-CUPS	301 redirect to lowercase
7.4 Silo Structure

Homepage (/)
│
├── All-Purpose Flour (/all-purpose-flour/)
│   ├── /all-purpose-flour/50-grams-to-cups/
│   ├── /all-purpose-flour/100-grams-to-cups/
│   ├── /all-purpose-flour/150-grams-to-cups/
│   └── ... (1g to 1000g)
│
├── Cake Flour (/cake-flour/)
│   ├── /cake-flour/50-grams-to-cups/
│   └── ...
│
├── Butter (/butter/)
│   ├── /butter/50-grams-to-cups/
│   └── ...
│
├── ... (all 20 ingredients)
│
└── Blog (/blog/)
    ├── /blog/why-cup-measurements-fail/
    ├── /blog/high-altitude-baking-guide/
    └── ...
8. PAGE COMPONENTS (DETAILED REQUIREMENTS)
8.1 Root Layout (app/layout.tsx)
Must include:

HTML lang="en"
System font stack via Tailwind
Header component (all pages)
Footer component (all pages)
Cookie consent banner
Google Analytics 4 script (strategy: afterInteractive)
AdSense script (strategy: lazyOnload)
Global metadata defaults
8.2 Homepage (app/page.tsx)
Sections (top to bottom):
Section 1: Hero

H1: "Baking Conversions Done Right — Not 'Roughly'"
Subtitle: "Because Google's 'approximately 0.8 cups' isn't good enough for your sourdough"
Search bar with autocomplete
Section 2: SearchBar

Input with dropdown
Searches ingredient list
On select → navigates to ingredient hub
Also accepts format "150g flour" → goes directly to leaf page
Section 3: IngredientGrid

20 ingredient cards in responsive grid
Each card: icon/image + name + "X conversions available"
Links to ingredient hub page
Section 4: How It Works

Step 1: "Choose your ingredient" (icon)
Step 2: "Select your method" (icon)
Step 3: "Get your exact measurement" (icon)
Visual, clean, 3-column on desktop
Section 5: Why Accuracy Matters

300 word SEO content block
Key message: "A 10% measurement error can ruin your baking"
Internal links to blog posts
Include statistic: "The #1 cause of baking failure is incorrect measurement"
Section 6: Latest Blog Posts

3 most recent blog post cards
Thumbnail + title + excerpt
Section 7: Ad Slot

One AdBanner below the fold
Total word count on homepage: 400-600 words

8.3 Ingredient Hub Page (app/[ingredient]/page.tsx)
Sections (top to bottom):
Section 1: Breadcrumbs

Home > [Ingredient Name]
Section 2: Header

H1: "[Ingredient Name] — Grams to Cups Conversion Calculator"
Subtitle: "Precise measurements for [type] using three methods"
Section 3: Quick Calculator

Input field: "Enter weight in grams"
Method selector: Spoon & Level | Dip & Sweep | Sifted
State selector (if fat): Solid | Softened | Melted
Result displays instantly below input
"See full breakdown →" link to leaf page
Section 4: Description

2-3 paragraphs about the ingredient (from database)
Expert information: protein content, best uses, substitutes
Section 5: Popular Conversions Table

Table of all common_weights_g with calculated results
Columns: Weight (g) | Cups (S&L) | Cups (D&S) | Cups (Sifted)
Each row links to the leaf page
Bold the most common weights (100, 150, 200, 250, 500)
Section 6: Pro Tips

From ingredient database
Styled as callout boxes with icons
Section 7: Nutrition Facts

Per 100g table matching FDA nutrition label style
Calories, protein, carbs, fat, fiber, sugar
Section 8: Related Ingredients

Card links to other ingredient hub pages
"Compare: Cake Flour vs All-Purpose Flour"
Section 9: FAQ

From database
FAQPage schema markup
Expandable accordion style
Section 10: Ad Slots

AdBanner after Quick Calculator (Section 3)
AdBanner after FAQ (Section 9)
Total word count: 600-900 words


## 8.4 Leaf Page — THE MONEY PAGE (app/[ingredient]/[conversion]/page.tsx)

This is the most important page on the entire site.
Every section listed below MUST be present.
Order matters — it is optimized for engagement and ad revenue.

### Section A: Breadcrumbs
- Home > [Ingredient Name] > [Value]g to Cups
- BreadcrumbList schema attached

### Section B: Result Hero
- H1: "How Many Cups is [X]g of [Ingredient]?"
- Giant result number: "1.36 cups" (48px mobile, 72px desktop)
- Unit label below number: "US Cups"
- Subtitle: "Using the Spoon & Level method (recommended)"
- CupGauge component: Visual CSS cup showing fill level
  - Cup outline with fill proportional to result
  - Animated fill on page load (subtle, 0.5s ease)
  - Shows fraction: "≈ 1 and ⅓ cups" below gauge
- Background: Subtle branded card with slight shadow

### Section C: Method Switcher (Client Component — "use client")
- Three tab buttons: [Spoon & Level] [Dip & Sweep] [Sifted]
- Active tab highlighted with brand orange color
- Each tab shows badge:
  - Spoon & Level: "✅ Recommended"
  - Dip & Sweep: "⚠️ Heavy — adds 18% more"
  - Sifted: "🪶 Light — 15% less"
- Clicking a tab:
  - Recalculates Result Hero number instantly (no page reload)
  - Updates CupGauge fill level
  - Updates Comparison Matrix highlighted column
  - Updates all unit conversions
- Below tabs: One sentence explaining the active method
  - Spoon & Level: "Spoon [ingredient] into the measuring cup, then level off with a straight knife."
  - Dip & Sweep: "Dip the measuring cup directly into the container, then sweep off the excess. This packs the [ingredient] and adds ~18% more weight."
  - Sifted: "Sift [ingredient] through a fine mesh sieve into the measuring cup. This aerates the [ingredient] and reduces weight by ~15%."

### Section D: State Switcher (Client Component — ONLY for fats)
- Render ONLY if ingredient has `states` in database
- Toggle buttons: [Solid] [Softened] [Melted]
- Visual indicator for each state (icon or color)
- Clicking recalculates all values instantly
- Below toggles: One sentence explaining the active state
  - Solid: "Cold [ingredient] straight from the refrigerator"
  - Softened: "Room temperature [ingredient] that gives slightly when pressed"
  - Melted: "Fully liquid [ingredient] — volume decreases significantly"

### Section E: Altitude Toggle (Client Component)
- Small toggle switch: "⛰️ Baking above 3,500 ft?"
- Default: OFF
- When ON: Yellow warning box appears below with altitude advice
- Warning box content (from Section 5.6 of this document)
- Does NOT change any calculations

### Section F: Ad Slot #1
- AdBanner component (horizontal)
- Placed after the interactive controls, before the data tables
- On mobile: Full width
- On desktop: Centered, max-width 728px

### Section G: Comparison Matrix Table
Full table showing ALL methods × ALL units for the current weight:

| | Spoon & Level ✅ | Dip & Sweep ⚠️ | Sifted 🪶 |
|---|---|---|---|
| **Cups** | X.XX | X.XX | X.XX |
| **Tablespoons** | X.XX | X.XX | X.XX |
| **Teaspoons** | X.XX | X.XX | X.XX |
| **Fluid Ounces** | X.XX | X.XX | X.XX |
| **Milliliters** | X.XX | X.XX | X.XX |

- Active method column highlighted with light background
- Table must be horizontally scrollable on mobile
- Sticky first column on mobile
- Header row sticky on scroll

### Section H: Visual Measurement Guide (ANTI-AI FEATURE)
- H2: "What Does [X]g of [Ingredient] Look Like?"
- IF photos available (photo_available === true):
  - Three photos side by side (grid on desktop, stack on mobile):
    - Photo 1: "[X]g measured with Spoon & Level" + caption
    - Photo 2: "[X]g measured with Dip & Sweep" + caption
    - Photo 3: "[X]g after Sifting" + caption
  - Below photos: "Notice how the same [X]g looks different depending on your method"
- IF photos NOT available:
  - Illustration using CSS (stylized cup with fill lines)
  - Text: "Visual guide: Photos coming soon. For now, use our cup gauge above."
- WHY THIS MATTERS: Google AI Overview CANNOT show real photographs.
  This is content that forces a click-through.

### Section I: Nearby Values Table (Internal Linking Engine)
Table with links to nearby conversions:

| Weight | Cups (Spoon & Level) | |
|--------|---------------------|---|
| [value - 50]g | X.XX cups | → View |
| [value - 25]g | X.XX cups | → View |
| [value - 10]g | X.XX cups | → View |
| **[value]g** | **X.XX cups** | **You are here** |
| [value + 10]g | X.XX cups | → View |
| [value + 25]g | X.XX cups | → View |
| [value + 50]g | X.XX cups | → View |

- "View" links are internal links to those leaf pages
- Current weight row highlighted and not linked
- Edge cases: If value - 50 < 1, don't show that row
- Edge cases: If value + 50 > 1000, don't show that row

### Section J: Weight Slider (Client Component)
- Range slider: 1g to 1000g
- Default value: current page weight
- Thumb shows current value
- As user drags, result updates in real time above the slider
- Number input next to slider for precise entry
- Below slider: If user stops on a different weight:
  "See the full breakdown for [new weight]g of [ingredient] →"
  (links to that leaf page)
- Slider track shows color gradient (less = light, more = dark)

### Section K: Ad Slot #2
- AdInContent component (rectangle)
- Between data-heavy sections for natural content break

### Section L: Recipe Context Block
- H2: "Common Recipes Using [X]g of [Ingredient]"
- Check recipes.json for matches (±20% of current weight)
- IF match found:
  - Recipe name and description
  - List of ingredients with weights
  - Each ingredient links to its own conversion page
  - "This is a common weight for [Recipe Name] (serves [N])"
- IF no match:
  - Show closest recipe and note the difference:
    "The closest recipe is [Name] which uses [Y]g. That's [Z]g more/less than your conversion."
  - Link to that recipe's exact weight page

### Section M: Recipe Scaler (Client Component — KILLER FEATURE)
- Only shows if Recipe Context found a match
- H2: "Scale This Recipe"
- Full ingredient list with grams AND cups for each
- Scale buttons: [0.5x] [1x] [1.5x] [2x] [3x]
- Custom multiplier input
- Servings display updates with scale
- All calculations update instantly
- Each ingredient row shows:
  - Ingredient name (linked to its hub page)
  - Weight in grams (scaled)
  - Volume in cups (calculated with current method)
  - Any notes (e.g., "sifted", "softened")
- Bottom of scaler:
  - [🖨️ Print Recipe Card]
  - [📷 Save as Image]

### Section N: Nutrition Block
- H2: "Nutrition Facts for [X]g of [Ingredient]"
- Scaled to CURRENT page weight (not per 100g)
- FDA-style nutrition label layout:
  - Calories (bold, large)
  - Total Fat (g)
  - Total Carbohydrates (g)
  - Dietary Fiber (g)
  - Total Sugars (g)
  - Protein (g)
- Note: "Values are approximate and based on USDA data"

### Section O: Pro Tips
- H2: "Expert Tips for Measuring [Ingredient]"
- 2-3 tips from ingredient database
- Styled as callout boxes with lightbulb icon
- Each tip is a separate card/box

### Section P: Why Accuracy Matters
- H2: "Why Exact [Ingredient] Measurement Matters"
- 2-3 paragraphs of unique content
- Template with dynamic insertion:
  - "A [X]g error when measuring [ingredient] can change your result by [Y] cups."
  - "That's the difference between [positive outcome] and [negative outcome]."
  - Calculate the actual error: show what happens with +10g and -10g
- Example for flour: "Adding just 10 extra grams of flour (the weight of two teaspoons) to your cookie dough absorbs moisture and can turn chewy cookies into dry, crumbly ones."
- This is SEO content that also builds trust

### Section Q: FAQ Section
- H2: "Frequently Asked Questions"
- Questions from ingredient database FAQ field
- PLUS auto-generated questions:
  - "How many cups is [X]g of [ingredient]?"
    → "Using the Spoon & Level method, [X]g of [ingredient] equals [Y] cups."
  - "Does the measurement method matter for [ingredient]?"
    → "Yes. The same [X]g can measure [A] cups (sifted) or [B] cups (packed). That's a [C]% difference."
  - "How do I measure [ingredient] without a scale?"
    → "Use the Spoon & Level method: [description]."
- Expandable accordion UI
- FAQPage schema markup on all Q&A pairs

### Section R: Sharing Block
- ConversionCard component (see Section 11)
- Four buttons in a row:
  - [📌 Pin to Pinterest]
  - [🐦 Share on X]
  - [🖨️ Print]
  - [📷 Save Image]
- "Share your exact measurement" heading

### Section S: Related Conversions (Internal Links)
- H2: "More Conversions"
- Three subsections:

**Same ingredient, different weights:**
- "More [Ingredient] Conversions"
- Links to ±10g, ±25g, ±50g, ±100g
- Grid of linked cards

**Same weight, different ingredients:**
- "[X]g of Other Ingredients"
- Links to the same weight for related_ingredients
- Example: "150g Bread Flour | 150g Whole Wheat Flour | 150g Almond Flour"

**Popular conversions:**
- "Most Popular [Ingredient] Conversions"
- Links to common_weights_g from the database
- Styled as pill/tag links

### Section T: Ad Slot #3
- AdBanner component (horizontal)
- After all content, before footer
- Full width on mobile

### Section U: Sidebar (Desktop Only)
- AdSidebar component (sticky on scroll)
- Right column, 300px wide
- Shows ad + "Popular Ingredients" quick links
- Only visible on screens > 1024px
- Sticks to viewport on scroll until footer

### Total Sections Per Leaf Page: 21 (A through U)
### Minimum Word Count: 800-1200 words (dynamically generated)
### Ad Slots: 4 (F, K, T, U-sidebar)
### Internal Links: 15-25 per page
### Interactive Components: 5 (MethodSwitcher, StateSwitcher, AltitudeToggle, WeightSlider, RecipeScaler)

---

# 9. SEO & SCHEMA MARKUP (ANTI-SNIPPET STRATEGY)

## 9.1 Anti-Snippet Title Strategy (lib/title-generator.ts)

The title generator must rotate between three title formulas
to avoid pattern detection and maximize CTR against AI Overview.

### Formula 1 — Fear/Doubt
"Google Says [Google's Answer] for [X]g [Ingredient] — Here's Why That's Wrong for YOUR Recipe"


Use when: Google AI Overview gives a range or uses "roughly"

### Formula 2 — Ultra-Precision
"[X]g [Ingredient] to Cups: Exact Measurements for [N] Methods (Not 'Approximately')"


Use when: Targeting users frustrated with imprecise answers

### Formula 3 — Tool/Interactive
"[X]g [Ingredient] Converter: Adjust for Sifted, Packed & Altitude — Interactive Calculator"


Use when: Targeting users who want a tool, not an article

### Implementation:
- Rotate formulas based on value modulo 3
- Values ending in 0 or 5 (most common) → Formula 1 (highest impact)
- Values ending in 1, 4, 7 → Formula 2
- Values ending in 2, 3, 6, 8, 9 → Formula 3

### Fallback Title (if rotation logic fails):
"[X]g [Ingredient] to Cups — Precise Conversion (Sifted vs Packed) | BakingConverter"



## 9.2 Meta Description Strategy

### Template:
"How many cups is [X]g of [ingredient]? Exact answer: [Y] cups
(spoon & level). But sifted = [Z] cups and packed = [W] cups.
That's a [N]% difference. Use our interactive calculator for YOUR method."



- Must be 150-160 characters
- Must include the primary keyword
- Must include the exact number (to compete with snippet)
- Must include the differentiator ("sifted vs packed")
- Must include a call to action ("Use our calculator")

### Example:
"150g cake flour = 1.36 cups (spoon & level). But sifted? 1.60 cups.
Packed? 1.15 cups. That's 28% variance. Get YOUR exact number. Free tool."



## 9.3 JSON-LD Schema Requirements

Every leaf page must inject ALL FOUR schemas:

### Schema 1: FAQPage
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How many cups is 150g of cake flour?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "150g of cake flour equals 1.36 cups using the Spoon & Level method. With Dip & Sweep it's 1.15 cups, and sifted it's 1.60 cups."
      }
    },
    {
      "@type": "Question",
      "name": "Does sifting cake flour change the cup measurement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Sifted cake flour is lighter and more aerated. 150g of sifted cake flour fills approximately 1.60 cups, compared to 1.36 cups when spooned and leveled — a 17% difference."
      }
    },
    {
      "@type": "Question",
      "name": "Why does Google say 'roughly' for flour measurements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Because cup volume depends on how you fill the cup. Different methods (spooning, scooping, sifting) produce different volumes from the same weight. Google shows a range because it doesn't know YOUR method."
      }
    }
  ]
}
Schema 2: BreadcrumbList
json

{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://bakingconverter.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Cake Flour",
      "item": "https://bakingconverter.com/cake-flour/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "150g to Cups"
    }
  ]
}
Schema 3: SoftwareApplication
json

{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Cake Flour Grams to Cups Calculator",
  "description": "Interactive converter for cake flour with method comparison (sifted vs packed vs spooned)",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
Schema 4: HowTo
json

{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Measure 150g of Cake Flour in Cups",
  "description": "Step-by-step guide to accurately measure cake flour using the Spoon & Level method",
  "step": [
    {
      "@type": "HowToStep",
      "text": "Place your measuring cup on a flat, clean surface."
    },
    {
      "@type": "HowToStep",
      "text": "Using a spoon, lightly scoop cake flour into the measuring cup until it overflows."
    },
    {
      "@type": "HowToStep",
      "text": "Take a straight knife or spatula and level off the top — you need 1.36 cups (about 1 and 1/3 cups)."
    },
    {
      "@type": "HowToStep",
      "text": "Do not tap or shake the cup, as this compresses the flour and changes the measurement."
    }
  ]
}
9.4 Open Graph Tags (Every Page)
Tag	Value
og:title	Same as page title
og:description	Same as meta description
og:image	Dynamic per ingredient (1200x630)
og:url	Canonical URL
og:type	website
og:site_name	BakingConverter
twitter:card	summary_large_image
twitter:title	Same as page title
twitter:description	Same as meta description
twitter:image	Same as og:image
9.5 Canonical Tags
Every page must have a self-referencing canonical URL.

html

<link rel="canonical" href="https://bakingconverter.com/cake-flour/150-grams-to-cups/" />
9.6 Sitemap Strategy
Problem: 40,000+ URLs cannot fit in one sitemap (limit: 50,000 but Google recommends smaller).
Solution: Sitemap index with clustered sitemaps.

/sitemap.xml (sitemap index file)
│
├── /sitemap-pages.xml (homepage, about, contact, etc.)
├── /sitemap-blog.xml (all blog posts)
├── /sitemap-hubs.xml (all 20 ingredient hub pages)
│
├── /sitemap-all-purpose-flour.xml (1000 leaf pages)
├── /sitemap-bread-flour.xml (1000 leaf pages)
├── /sitemap-cake-flour.xml (1000 leaf pages)
├── /sitemap-whole-wheat-flour.xml (1000 leaf pages)
├── /sitemap-almond-flour.xml (1000 leaf pages)
├── /sitemap-coconut-flour.xml (1000 leaf pages)
├── /sitemap-granulated-sugar.xml (1000 leaf pages)
├── /sitemap-brown-sugar.xml (1000 leaf pages)
├── /sitemap-powdered-sugar.xml (1000 leaf pages)
├── /sitemap-honey.xml (1000 leaf pages)
├── /sitemap-butter.xml (1000 leaf pages)
├── /sitemap-coconut-oil.xml (1000 leaf pages)
├── /sitemap-vegetable-oil.xml (1000 leaf pages)
├── /sitemap-olive-oil.xml (1000 leaf pages)
├── /sitemap-whole-milk.xml (1000 leaf pages)
├── /sitemap-heavy-cream.xml (1000 leaf pages)
├── /sitemap-sour-cream.xml (1000 leaf pages)
├── /sitemap-cocoa-powder.xml (1000 leaf pages)
├── /sitemap-rolled-oats.xml (1000 leaf pages)
└── /sitemap-cornstarch.xml (1000 leaf pages)
Each sub-sitemap: max 1,000 URLs (well under Google's limit).

Sitemap Entry Format:
xml

<url>
  <loc>https://bakingconverter.com/cake-flour/150-grams-to-cups/</loc>
  <lastmod>2025-01-01</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
Priority Values:
Page Type	Priority
Homepage	1.0
Ingredient Hub	0.9
Leaf Page (common weight)	0.8
Leaf Page (other weight)	0.7
Blog Post	0.6
Legal Pages	0.3
9.7 Robots.txt

User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://bakingconverter.com/sitemap.xml
9.8 Additional SEO Elements
Heading Hierarchy (Every Leaf Page):

H1: How Many Cups is [X]g of [Ingredient]?
  H2: Measurement Methods Compared
  H2: What Does [X]g of [Ingredient] Look Like?
  H2: Nearby Conversions
  H2: Common Recipes Using [X]g of [Ingredient]
    H3: Scale This Recipe
  H2: Nutrition Facts for [X]g of [Ingredient]
  H2: Expert Tips for Measuring [Ingredient]
  H2: Why Exact [Ingredient] Measurement Matters
  H2: Frequently Asked Questions
  H2: More Conversions
Image Alt Text Rules:
Ingredient photos: "[X]g of [ingredient] measured using [method] in a standard US measuring cup"
Cup gauge: "Cup gauge showing [Y] cups fill level for [X]g of [ingredient]"
Pinterest cards: "[Ingredient] grams to cups conversion cheat sheet"
10. INTERNAL LINKING STRATEGY
10.1 Linking Rules Per Leaf Page
Link Type	Target	Quantity	Location
Nearby weights (same ingredient)	±10g, ±25g, ±50g, ±100g	6-8 links	Section I
Same weight, different ingredient	Related ingredients at same weight	3-5 links	Section S
Ingredient hub (parent)	Parent ingredient page	1 link	Breadcrumb + Section S
Recipe ingredients	Other ingredients in matched recipe	2-4 links	Section L, M
Blog posts	Relevant articles	1-2 links	Section P
Homepage	Via breadcrumb and logo	1 link	Header + Breadcrumb
Popular conversions	Common weights of same ingredient	5-8 links	Section S
Minimum internal links per leaf page: 18-25
Maximum internal links per leaf page: 35
10.2 Anchor Text Rules
Use descriptive keyword-rich text: "125g cake flour to cups"
Never use "click here" or "read more"
Vary anchor text naturally (don't repeat exact same text)
Include the weight and ingredient in anchor text
10.3 Hub-to-Leaf Linking
Each ingredient hub page links to ALL common_weights_g leaf pages.
This creates a strong topical cluster signal for Google.

10.4 Cross-Ingredient Linking
Each leaf page links to 3-5 related ingredients at the SAME weight.
Example: /cake-flour/150-grams-to-cups/ links to:

/all-purpose-flour/150-grams-to-cups/
/bread-flour/150-grams-to-cups/
/whole-wheat-flour/150-grams-to-cups/
/cornstarch/150-grams-to-cups/
11. SHARING & VIRAL FEATURES
11.1 ConversionCard Component
A beautiful, shareable card designed for social media and Pinterest.

Dimensions: 1080x1080px (square, Instagram/Pinterest optimal)
Layout:

┌─────────────────────────────────┐
│  🧁 BakingConverter.io            │
│                                 │
│  CAKE FLOUR                     │
│                                 │
│       150g                      │
│         =                       │
│     1.36 cups                   │
│                                 │
│  Method: Spoon & Level ✅        │
│                                 │
│  Sifted: 1.60 cups             │
│  Packed: 1.15 cups             │
│                                 │
│  bakingconverter.com/cake-flour/   │
└─────────────────────────────────┘
Design:
Background: Cream (#FDF6E3)
Border: 2px solid Orange (#F97316)
Font: Bold sans-serif
Result number: Extra large
Branding: Logo top-left, URL bottom-center
Must render correctly via html2canvas
11.2 CheatSheetCard Component (Pinterest-Optimized)
Tall card format for Pinterest (1000x1500px).

Layout:

┌──────────────────────────────┐
│  🧁 BakingConverter.io         │
│                              │
│  ALL-PURPOSE FLOUR           │
│  Grams to Cups Cheat Sheet   │
│                              │
│  ┌────────┬────────────────┐ │
│  │  50g   │  0.40 cups     │ │
│  │ 100g   │  0.80 cups     │ │
│  │ 125g   │  1.00 cups     │ │
│  │ 150g   │  1.20 cups     │ │
│  │ 200g   │  1.60 cups     │ │
│  │ 250g   │  2.00 cups     │ │
│  │ 300g   │  2.40 cups     │ │
│  │ 500g   │  4.00 cups     │ │
│  └────────┴────────────────┘ │
│                              │
│  ⚠️ Spoon & Level method     │
│  Results may vary ±5%        │
│                              │
│  Save this pin!              │
│  bakingconverter.com            │
└──────────────────────────────┘
Generate one CheatSheetCard per ingredient.
These are the PRIMARY Pinterest content.

11.3 Share Buttons
Button	Platform	Action
📌 Pin It	Pinterest	Opens Pinterest pin creator with ConversionCard image and description
🐦 Share	Twitter/X	Opens tweet: "[X]g of [ingredient] = [Y] cups. But sifted vs packed makes a [N]% difference! Calculate yours: [URL]"
📋 Copy Link	Clipboard	Copies canonical URL to clipboard with toast notification "Link copied!"
🖨️ Print	Browser print	Opens clean print view (see 11.4)
📷 Save Image	Download	Exports ConversionCard as PNG via html2canvas
11.4 Print Feature
When user clicks Print:

Open print-specific CSS layout
Remove: ads, navigation, footer, sharing buttons, sidebar
Show: Result, comparison table, recipe (if any), tips, branding
Include: Small "bakingconverter.com" watermark at bottom
Paper size: US Letter, single page
12. PINTEREST STRATEGY
12.1 Why Pinterest is Critical
Google AI Overview does NOT affect Pinterest traffic
Pinterest audience = our exact target audience (home bakers)
Pins have long shelf life (months to years of traffic)
Food/baking is a top Pinterest category
Cheat sheets are highly saveable/pinnable content
12.2 Pinterest Content Types
Type 1: Cheat Sheet Pins (Primary)
One per ingredient (20 at launch)
CheatSheetCard component format (1000x1500px)
Contains common weights → cups table
Branded with bakingconverter.com
Type 2: Single Conversion Pins
ConversionCard format (1080x1080px)
For popular conversions (e.g., "200g butter to cups")
Generated on-demand via Save Image button
Users create these themselves and share
Type 3: Blog Post Pins
Featured image from blog posts
1000x1500px vertical format
Title overlay on image
Links to blog post
Type 4: Infographic Pins
"Flour Comparison: AP vs Bread vs Cake"
"Butter: Solid vs Softened vs Melted — Volume Changes"
One infographic per blog post
12.3 Pinterest Account Setup
Create Pinterest Business account
Enable Rich Pins (website verification)
Create boards:
"Baking Conversions"
"Flour Measurements"
"Butter & Fats Guide"
"Baking Tips"
"Recipe Scaling"
Join relevant group boards in baking niche
12.4 Pinterest Posting Schedule
Content	Frequency	Tool
Cheat sheet pins	2 per day	Manual or Tailwind
Conversion card pins	3 per day	Manual or Tailwind
Blog post pins	1 per new post	Manual
Re-pins from group boards	5 per day	Manual
12.5 Pinterest SEO
Every pin must have:

Keyword-rich title: "[Ingredient] Grams to Cups — Free Conversion Chart"
Description with keywords: "Convert [ingredient] from grams to cups. Includes sifted, packed, and spoon & level methods. Save this cheat sheet for your kitchen!"
Link to relevant page on bakingconverter.com
Alt text on image
13. ADVERTISING (ADSENSE)
13.1 Ad Placement Strategy
Leaf Page (4 slots maximum):
Slot	Position	Component	Ad Type
1	After interactive controls (Section F)	AdBanner	Horizontal 728x90
2	After comparison matrix (Section K)	AdInContent	Rectangle 336x280
3	After all content (Section T)	AdBanner	Horizontal 728x90
4	Right sidebar, desktop only (Section U)	AdSidebar	Sticky 300x250
Ingredient Hub (2 slots):
Slot	Position	Component
1	After quick calculator	AdBanner
2	After FAQ section	AdBanner
Homepage (1 slot):
Slot	Position	Component
1	Below the fold, after ingredient grid	AdBanner
Blog Post (2 slots):
Slot	Position	Component
1	Mid-article (after 3rd paragraph)	AdInContent
2	End of article	AdB


| 2 | End of article | AdBanner |

### Legal Pages, 404 Page: ZERO ad slots (AdSense policy)

## 13.2 AdSense Compliance Rules
- Maximum 4 ad units per page
- Ads must NOT push main content below the fold on mobile
- Ads must be clearly distinguishable from content
- No ads on pages with insufficient content (< 300 words)
- No auto-refreshing ads
- No ad placement that encourages accidental clicks
- Ad labels: "Advertisement" text above each ad unit
- Ads must not cover interactive elements (sliders, toggles)

## 13.3 Ad Loading Strategy
- AdSense script: load with `strategy="lazyOnload"` in Next.js
- Individual ad units: render only after page content is visible
- Reserve exact ad slot dimensions in CSS to prevent CLS
  - Horizontal: height 90px reserved
  - Rectangle: height 280px reserved
  - Sidebar: height 250px reserved
- On mobile: sidebar ads become in-content ads (reflow)

## 13.4 AdSense Approval Preparation
Before applying for AdSense (target: Week 4-6):
- [ ] Minimum 20 fully functional leaf pages with all sections
- [ ] All 20 ingredient hub pages live
- [ ] Homepage complete with 400+ words
- [ ] Minimum 5 blog posts (800+ words each)
- [ ] Privacy Policy page (complete, GDPR + CCPA)
- [ ] About Us page (explain who made the site and why)
- [ ] Contact page (working email or contact form)
- [ ] Terms of Service page
- [ ] Disclaimer page (conversion accuracy disclaimer)
- [ ] Cookie Policy page
- [ ] GDPR cookie consent banner functional
- [ ] Site navigation clear and working
- [ ] No broken links
- [ ] Mobile responsive
- [ ] SSL certificate active (HTTPS)
- [ ] Site speed: LCP < 2.5s

## 13.5 Ad Network Upgrade Path

| Monthly Sessions | Ad Network | Expected RPM | Action |
|-----------------|------------|-------------|--------|
| 0 - 10K | Google AdSense | $5-10 | Apply at Week 4 |
| 10K - 50K | Google AdSense (optimized) | $8-15 | Optimize placements |
| 50K - 100K | Mediavine | $15-25 | Apply when eligible |
| 100K+ | AdThrive / Raptive | $20-35 | Apply when eligible |

---

# 14. BLOG SECTION

## 14.1 Purpose
- Build domain authority and topical expertise
- Target informational keywords that leaf pages cannot
- Internal link to calculator pages (boost their rankings)
- Qualify for Google Discover traffic
- Satisfy AdSense content quality requirements
- Provide content for Pinterest and social sharing

## 14.2 Required Launch Articles (minimum 5)

### Article 1
- **Title**: "The 20% Error: Why Your Cup Measurements Are Ruining Your Baking"
- **Slug**: /blog/why-cup-measurements-fail/
- **Topic**: The difference between measurement methods and why it matters
- **Keywords**: "cup measurement accuracy", "why my baking fails", "flour measurement error"
- **Internal links**: Link to all flour calculator pages
- **Word count**: 1,200+
- **Key section**: Side-by-side comparison of 3 methods with photos

### Article 2
- **Title**: "Baking in Denver: The High-Altitude Adjustment Guide You Actually Need"
- **Slug**: /blog/high-altitude-baking-guide/
- **Topic**: How altitude affects baking and what to adjust
- **Keywords**: "high altitude baking", "baking in Denver", "altitude flour adjustment"
- **Internal links**: Multiple ingredient calculator pages
- **Word count**: 1,000+
- **Key section**: City-by-city altitude table with adjustments

### Article 3
- **Title**: "Butter Math: Why Solid vs Melted Changes Everything in Your Recipe"
- **Slug**: /blog/butter-solid-vs-melted-measurement/
- **Topic**: How butter state affects volume measurement
- **Keywords**: "butter measurement", "melted butter cups", "solid vs melted butter"
- **Internal links**: Butter calculator pages
- **Word count**: 800+
- **Key section**: Visual comparison table with photos

### Article 4
- **Title**: "All-Purpose vs Bread vs Cake Flour: The Weight Difference That Ruins Recipes"
- **Slug**: /blog/flour-types-weight-comparison/
- **Topic**: Different flour types have different densities
- **Keywords**: "flour types comparison", "cake flour vs all purpose", "bread flour weight"
- **Internal links**: All flour hub pages and popular leaf pages
- **Word count**: 1,000+
- **Key section**: Comparison table of all flour types at same weight

### Article 5
- **Title**: "Stop Eyeballing: A Professional Baker's Guide to Precision Measurement"
- **Slug**: /blog/precision-measurement-guide/
- **Topic**: Why and how to measure ingredients accurately
- **Keywords**: "how to measure flour", "baking measurement guide", "measure ingredients accurately"
- **Internal links**: Multiple calculator pages across all ingredients
- **Word count**: 1,200+
- **Key section**: Step-by-step photo guide for each measurement method

## 14.3 Blog Post Template Requirements

Every blog post must contain:
- H1 title (keyword-optimized, matches slug)
- Meta description (150-160 chars, includes primary keyword)
- Featured image (1200x630, with descriptive alt text)
- Table of contents (auto-generated from H2 headings)
- 3-5 H2 subheadings with keyword variations
- At least 5 internal links to calculator pages
- 1-2 embedded mini-calculators or conversion tables
- At least 1 image or diagram per 300 words
- FAQ section at the bottom (2-3 questions, with FAQPage schema)
- Author byline: "The BakingConverter Team"
- Published date and "Last Updated" date
- Related posts section (3 related articles)
- Share buttons (Pinterest, Twitter/X, Copy Link)
- 2 ad slots (mid-article and end-of-article)

## 14.4 Future Blog Content Calendar (Post-Launch)

| Week | Article Topic | Target Keyword |
|------|--------------|----------------|
| 7 | "Brown Sugar: Packed vs Loose — The 30% Weight Trap" | "brown sugar measurement" |
| 8 | "Coconut Flour is NOT Regular Flour: Conversion Mistakes" | "coconut flour substitute" |
| 9 | "The Kitchen Scale: Why Every Serious Baker Needs One" | "best kitchen scale baking" |
| 10 | "Honey, Maple Syrup & Molasses: Liquid Sugar Conversions" | "honey to cups" |
| 11 | "Gluten-Free Flour Conversions: Almond, Coconut, Rice" | "gluten free flour cups" |
| 12 | "How to Scale Any Recipe Up or Down (Without Ruining It)" | "scale recipe calculator" |

Target: 2 blog posts per week after launch.

---

# 15. DESIGN SYSTEM

## 15.1 Color Palette

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| Cream | #FDF6E3 | --color-cream | Page background |
| Warm White | #FFFEF9 | --color-warm-white | Card backgrounds |
| Slate 900 | #0F172A | --color-text-primary | Primary headings |
| Slate 800 | #1E293B | --color-text-secondary | Body text |
| Slate 500 | #64748B | --color-text-muted | Secondary/caption text |
| Slate 200 | #E2E8F0 | --color-border | Borders, dividers |
| Slate 100 | #F1F5F9 | --color-bg-subtle | Table zebra stripes, hover states |
| Orange 500 | #F97316 | --color-accent | Primary buttons, active tabs, highlights |
| Orange 600 | #EA580C | --color-accent-hover | Button hover states |
| Orange 100 | #FFEDD5 | --color-accent-light | Active tab background, badges |
| Green 500 | #22C55E | --color-success | "Recommended" badges |
| Green 100 | #DCFCE7 | --color-success-light | Success badge background |
| Amber 500 | #F59E0B | --color-warning | Warning badges, altitude alert |
| Amber 100 | #FEF3C7 | --color-warning-light | Warning background |
| Red 500 | #EF4444 | --color-error | Error states |
| Red 100 | #FEE2E2 | --color-error-light | Error background |
| Blue 500 | #3B82F6 | --color-info | Info badges, links |
| Blue 100 | #DBEAFE | --color-info-light | Info background |

## 15.2 Typography

| Element | Weight | Size (Mobile) | Size (Desktop) | Line Height |
|---------|--------|--------------|----------------|-------------|
| H1 | Bold (700) | 28px | 40px | 1.2 |
| H2 | Semibold (600) | 22px | 30px | 1.3 |
| H3 | Semibold (600) | 18px | 24px | 1.3 |
| Body | Regular (400) | 16px | 18px | 1.6 |
| Result Number | Bold (700) | 48px | 72px | 1.1 |
| Unit Label | Medium (500) | 18px | 24px | 1.2 |
| Table Text | Regular (400) | 14px | 16px | 1.4 |
| Caption | Regular (400) | 12px | 14px | 1.4 |
| Badge | Medium (500) | 12px | 14px | 1.0 |

### Font Stack (System Fonts — Zero Network Requests):
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
  Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
15.3 Component Design Specifications
Cards
Background: Warm White (#FFFEF9)
Border: 1px solid Slate 200 (#E2E8F0)
Border radius: 12px
Shadow: 0 1px 3px rgba(0,0,0,0.08)
Padding: 24px (desktop), 16px (mobile)
Hover state: shadow increases to 0 4px 12px rgba(0,0,0,0.1)
Buttons — Primary
Background: Orange 500 (#F97316)
Text: White (#FFFFFF)
Border radius: 8px
Padding: 12px 24px
Min height: 44px (accessibility touch target)
Min width: 44px
Hover: Orange 600 (#EA580C)
Active: scale(0.98) transform
Focus: 2px Orange 500 outline, 2px offset
Disabled: opacity 0.5, cursor not-allowed
Buttons — Secondary
Background: Slate 100 (#F1F5F9)
Text: Slate 800 (#1E293B)
Border: 1px solid Slate 200 (#E2E8F0)
Border radius: 8px
Padding: 12px 24px
Min height: 44px
Hover: Slate 200 background
Focus: 2px Slate 500 outline, 2px offset
Method/State Tabs
Inactive: Slate 100 background, Slate 600 text
Active: Orange 100 background, Orange 600 text, 2px Orange 500 bottom border
Border radius: 8px top, 0 bottom
Padding: 12px 20px
Transition: all 0.2s ease
Tables
Header: Slate 800 text on Slate 100 background
Rows: Alternate Warm White / Slate 50
Active column: Orange 100 background
Current row (nearby table): Orange 100 background, bold text
Border: 1px solid Slate 200 between rows
Cell padding: 12px 16px
Mobile: Horizontal scroll wrapper with left column sticky
Sticky header on vertical scroll
Input Fields
Background: White
Border: 1px solid Slate 300
Border radius: 8px
Padding: 12px 16px
Focus: 2px Orange 500 border
Height: 44px minimum
Font size: 16px (prevents iOS zoom)
Slider (Weight Slider)
Track: Slate 200 background, 6px height, rounded
Fill: Orange 500 from left to thumb
Thumb: 24px circle, Orange 500, white border
Thumb hover: 28px, shadow
Value tooltip above thumb while dragging
Toast Notifications
Background: Slate 900
Text: White
Border radius: 8px
Position: Bottom center, 20px from bottom
Animation: Slide up, fade in
Auto-dismiss: 3 seconds
Used for: "Link copied!", "Image saved!"
Accordion (FAQ)
Header: Clickable, full-width, Slate 800 text
Chevron icon on right, rotates 180° on open
Content: Slate 600 text, padding 16px
Border bottom: 1px Slate 200
Animation: max-height transition, 0.3s ease
Callout Boxes (Tips, Warnings)
Tip box: Blue 100 background, Blue 500 left border (4px), lightbulb icon
Warning box: Amber 100 background, Amber 500 left border (4px), alert icon
Error box: Red 100 background, Red 500 left border (4px)
Border radius: 8px
Padding: 16px 20px
Margin: 24px 0
Cup Gauge Visual
Container: 120px wide, 160px tall
Cup outline: 2px Slate 400 border, trapezoid shape (wider at top)
Fill: Orange 500 with 50% opacity
Fill height: Proportional to cups result (1 cup = full, 0.5 = half)
Fill animation: 0.5s ease-in on page load
Label below: "≈ 1⅓ cups" text
For values > 1 cup: Show "1 cup + remainder" visualization
15.4 Responsive Breakpoints
Breakpoint	Name	Width	Layout
sm	Mobile	< 640px	Single column, full-width cards, no sidebar
md	Tablet	640-1023px	Single column, wider cards, no sidebar
lg	Desktop	1024-1279px	Two column (content 70% + sidebar 30%)
xl	Wide	≥ 1280px	Two column with max-width 1200px centered
Mobile-Specific Rules:
All tap targets minimum 44x44px
Tables: horizontal scroll with sticky first column
Sidebar ads move to inline between sections
Method/State tabs: full-width, stack if needed
Share buttons: fixed bottom bar on scroll
Slider: full-width with large thumb for touch
Font size: never below 14px
Input fields: 16px font (prevents iOS auto-zoom)
Desktop-Specific Rules:
Sticky sidebar (position: sticky, top: 20px)
Sidebar contains: Ad + Popular Ingredients links
Max content width: 800px
Two-column layout for comparison tables
15.5 Accessibility Requirements (WCAG 2.1 Level AA)
Requirement	Implementation
Color contrast	Minimum 4.5:1 for normal text, 3:1 for large text
Keyboard navigation	All interactive elements focusable via Tab
Focus indicators	Visible 2px outline on all focused elements
Screen readers	Proper heading hierarchy H1→H2→H3
ARIA labels	All icon-only buttons have aria-label
Alt text	All images have descriptive alt text
Reduced motion	Respect prefers-reduced-motion media query
Form labels	All inputs have associated labels
Error messages	Descriptive, not just color-coded
Skip navigation	"Skip to main content" link for screen readers
Language	html lang="en" attribute
15.6 Dark Mode
NOT required for launch (Phase 2+ feature)
Reason: Baking audience typically uses device in well-lit kitchen
When implemented: Use Tailwind dark: variant with prefers-color-scheme
16. PHOTO PRODUCTION GUIDE
16.1 Why Photos Are Critical (Anti-AI Feature)
Google AI Overview can generate text answers but CANNOT show
real photographs of what 100g of flour looks like in a measuring cup.
Photos force users to click through to the site.

16.2 Photo Requirements Per Ingredient
Each ingredient needs 3 measurement photos:

Photo	Filename	Description
Spoon & Level	spoon-level.webp	Cup filled by spooning, leveled with knife
Dip & Sweep	dip-sweep.webp	Cup dipped into container, heaped before sweep
Sifted	sifted.webp	Cup filled with sifted ingredient through mesh
Total Photos Needed:
Launch (20 ingredients): 60 photos
Phase 4 (50 ingredients): 150 photos
Phase 6 (100 ingredients): 300 photos
16.3 Photo Specifications
Property	Requirement
Format	WebP (primary), PNG (fallback)
Dimensions	800x600px (4:3 ratio)
File size	< 80KB per image (WebP)
Background	Clean white or light wood surface
Lighting	Natural light or bright, even artificial light
Equipment	Measuring cup, digital kitchen scale visible in frame
Scale reading	Must show weight on scale display
Label	Text overlay in post-production: method name + weight
Consistency	Same measuring cup, same surface, same angle for all photos
16.4 Photo Production Options
Option A: Shoot Yourself (Recommended for Authenticity)
Equipment: Smartphone (any modern phone), natural window light
Props: Standard US measuring cup set, digital kitchen scale, ingredients
Estimated time: 2-3 hours for all 20 ingredients (60 photos)
Cost: $0 (assumes you own a scale and measuring cups)
Pro: Authentic, unique, Google values original photos
Option B: Stock Photos
NOT recommended
Generic, not specific to exact weights
Other sites may use same images
Google may rank lower for duplicate imagery
Option C: AI-Generated Photos
NOT recommended for launch
Google can detect AI-generated images
Lacks authenticity signal
Does not show real measurement accuracy
Option D: Launch Without Photos, Add Later
RECOMMENDED as compromise
Launch with CSS cup gauge illustrations instead
Add real photos in Phase 3 (Week 7-12)
Photos become a content update that signals freshness to Google
16.5 Photo Alt Text Template

"[Weight]g of [ingredient] measured into a standard US measuring cup 
using the [method] method, shown on a digital kitchen scale"
Example:


"150g of cake flour measured into a standard US measuring cup 
using the Spoon and Level method, shown on a digital kitchen scale"
17. PERFORMANCE REQUIREMENTS
17.1 Core Web Vitals Targets
Metric	Target	Maximum Acceptable
LCP (Largest Contentful Paint)	< 1.5s	< 2.5s
FID (First Input Delay)	< 50ms	< 100ms
CLS (Cumulative Layout Shift)	< 0.05	< 0.1
TTFB (Time to First Byte)	< 200ms	< 600ms
INP (Interaction to Next Paint)	< 100ms	< 200ms
FCP (First Contentful Paint)	< 1.0s	< 1.8s
17.2 Performance Rules
Images
Format: WebP only with PNG fallback
Lazy loading: All images below the fold
Explicit width/height attributes on all images (prevents CLS)
Maximum ingredient photo size: 80KB (WebP)
Use Next.js Image component for automatic optimization
Responsive srcset for different viewport sizes
Priority loading only on first visible image (Result Hero area)
JavaScript
Minimize client-side JavaScript
Server Components by default (no "use client" unless needed)
"use client" only on: MethodSwitcher, StateSwitcher, AltitudeToggle, WeightSlider, RecipeScaler, ShareButtons, SaveImageButton, CookieConsent
html2canvas: Dynamic import, loaded ONLY when user clicks "Save Image"
AdSense script: strategy="lazyOnload"
GA4 script: strategy="afterInteractive"
No other third-party scripts at launch
CSS
Tailwind CSS purging enabled (removes unused styles in production)
No external CSS files beyond Tailwind
Critical CSS inlined automatically by Next.js
No CSS-in-JS libraries
Fonts
System font stack only (zero external font requests)
Zero FOUT (Flash of Unstyled Text)
Zero FOIT (Flash of Invisible Text)
Zero font-related network requests
Caching Headers
Static pages (SSG): Cache-Control max-age=604800, stale-while-revalidate=86400
ISR pages: Vercel handles cache automatically
Static assets (/public/): immutable cache, max-age=31536000
Images: immutable cache via Next.js Image optimization
17.3 Bundle Size Limits
Item	Maximum Size (gzipped)
First Load JS (shared)	< 80KB
Per-page JS (leaf page)	< 30KB
Per-page JS (hub page)	< 25KB
Per-page JS (homepage)	< 20KB
html2canvas (dynamic)	Loaded only on click (~40KB)
Total page weight (no ads)	< 400KB
Total page weight (with ads)	< 800KB
17.4 Lighthouse Score Targets
Category	Minimum Score
Performance	90
Accessibility	95
Best Practices	95
SEO	100
18. LEGAL PAGES
18.1 Required Pages
Page	URL	Word Count
Privacy Policy	/privacy/	800-1200
Terms of Service	/terms/	600-800
About Us	/about/	400-600
Contact	/contact/	200-300
Disclaimer	/disclaimer/	300-500
Cookie Policy	/cookies/	400-600
18.2 Privacy Policy Must Include
What data is collected (Google Analytics cookies, AdSense cookies)
How cookies are used (analytics, advertising)
Third-party services list (Google Analytics, Google AdSense)
User rights under GDPR (EU visitors)
User rights under CCPA (California visitors)
How to request data deletion
Contact email for privacy inquiries
Cookie categories: Necessary, Analytics, Advertising
Last updated date
Statement: "We do not collect personal information directly"
18.3 About Us Page Must Include
What BakingConverter.io is
Why it was created ("Because 'roughly 0.8 cups' isn't good enough")
Data sources (USDA, King Arthur)
Mission: "Precision baking measurements for everyone"
This builds trust for both users and AdSense reviewers
18.4 Disclaimer Must Include
All conversions are approximate estimates
Actual density varies between batches and brands
Not a substitute for a digital kitchen scale
"For professional or commercial baking, always weigh ingredients"
We are not responsible for recipe outcomes
Data sourced from USDA FoodData Central
18.5 Cookie Consent Banner
Requirements:
Appears on first visit (overlay bottom bar)
Three options: [Accept All] [Reject Non-Essential] [Customize]
"Customize" opens modal with toggles:
✅ Necessary cookies (always on, cannot disable)
☐ Analytics cookies (Google Analytics)
☐ Advertising cookies (Google AdSense)
Must BLOCK GA4 and AdSense scripts until consent given
Stores consent in localStorage (key: "cookie_consent")
Does not reappear after consent is given
Small "Cookie Settings" link in footer to change preferences
On mobile: Must not cover more than 30% of screen height
Design: Matches site theme (Cream background, Orange accept button)
19. ANALYTICS & TRACKING
19.1 Google Analytics 4 Setup
Property type: Web
Enhanced measurement: ON
Data stream: bakingconverter.com
Load GA4 ONLY after cookie consent for analytics is granted
19.2 Custom Events to Track
Event Name	Trigger	Parameters
page_conversion_view	Leaf page loads	ingredient_id, weight_g, method
method_switched	User clicks method tab	ingredient_id, weight_g, from_method, to_method
state_switched	User clicks state toggle	ingredient_id, weight_g, from_state, to_state
altitude_toggled	User toggles altitude switch	enabled: true/false
slider_moved	User releases weight slider	ingredient_id, from_weight, to_weight
slider_link_clicked	User clicks "See full breakdown" from slider	ingredient_id, target_weight
recipe_scaled	User changes recipe scale	recipe_id, scale_factor
result_printed	User clicks Print button	ingredient_id, weight_g
result_saved_image	User clicks Save Image	ingredient_id, weight_g
result_shared	User clicks share button	ingredient_id, weight_g, platform
search_used	User submits search on homepage	search_term, result_found: bool
ingredient_selected	User clicks ingredient card	ingredient_id, source_page
nearby_link_clicked	User clicks nearby value link	ingredient_id, from_weight, to_weight
cross_ingredient_clicked	User clicks related ingredient	from_ingredient, to_ingredient, weight_g
faq_expanded	User opens FAQ accordion	ingredient_id, question_index
blog_post_view	Blog post page loads	post_slug
hub_calculator_used	User uses hub quick calculator	ingredient_id, weight_g
19.3 Key Reports to Monitor
Report	Frequency	What to Look For
Top landing pages	Weekly	Which leaf pages get most organic traffic
Search queries (GSC)	Weekly	What users search to find us
Method switcher usage	Monthly	Which method is most popular
Bounce rate by page type	Weekly	Are leaf pages engaging enough
Session duration by source	Monthly	Pinterest vs Google user behavior
Slider interaction rate	Monthly	Are users exploring different weights
Recipe scaler usage	Monthly	Is the feature being used
Share button clicks	Weekly	Which platform gets most shares
Conversion path	Monthly	Do users visit multiple pages
19.4 Google Search Console
Verify property on Day 1 of deployment
Submit sitemap index immediately after launch
Monitor:
Index coverage (weekly) — watch for "Crawled but not indexed"
Core Web Vitals (weekly)
Top queries and clicks (weekly)
Top pages by impressions (weekly)
Mobile usability issues (monthly)
Manual actions (monthly — should always be zero)
20. ERROR HANDLING
20.1 Custom 404 Page
Design: Matches site theme
H1: "This conversion doesn't exist — yet"
Content:
Search bar: "Find your ingredient"
Popular ingredient links (grid of 8)
"Back to homepage" button
NO ads on 404 page (AdSense policy)
Track 404 hits in GA4 to find broken links or popular missing pages
20.2 Invalid URL Handling
Scenario	HTTP Code	Action
/cake-flour/0-grams-to-cups/	404	Show 404 page
/cake-flour/1001-grams-to-cups/	404	Show 404 page
/cake-flour/-5-grams-to-cups/	404	Show 404 page
/cake-flour/abc-grams-to-cups/	404	Show 404 page
/cake-flour/150.5-grams-to-cups/	301	Redirect to /cake-flour/150-grams-to-cups/
/cake-flour/150-grams-to-cups (no slash)	301	Redirect to add trailing slash
/Cake-Flour/150-Grams-To-Cups/	301	Redirect to all lowercase
/nonexistent-ingredient/150-grams-to-cups/	404	Show 404 page
/cake-flour/ (valid hub)	200	Show hub page
/cake-flour/150-grams-to-cups/ (valid)	200	Show leaf page
20.3 Edge Cases in Conversion Display
Scenario	Display Rule
Result < 0.01 cups	Show in teaspoons as primary unit
Result < 0.125 cups	Show in tablespoons as primary unit
Result > 20 cups	Show result + note: "For large batches, we recommend using a kitchen scale"
Weight = 0	Should never occur (404 for 0g)
Fat ingredient without state selected	Default to "solid" state
Liquid ingredient	Hide MethodSwitcher entirely (methods apply to dry only)
Liquid ingredient	Hide StateSwitcher entirely
Ingredient with no recipes matched	Show "No common recipes found" with link to hub page
20.4 Runtime Error Handling
All client-side calculations wrapped in try/catch
On calculation error: Show "Unable to calculate. Please try again." message
Log errors to console in development, suppress in production
Never show raw error messages to users
All JSON data validated at build time (TypeScript strict mode)
21. TESTING REQUIREMENTS
21.1 Conversion Accuracy Testing
Test Matrix:
For every ingredient, test at these weights:

1g, 10g, 25g, 50g, 100g, 150g, 200g, 250g, 500g, 1000g
For every weight, test:

All three methods (Spoon & Level, Dip & Sweep, Sifted)
All states (if fat ingredient)
All output units (cups, tbsp, tsp, fl oz, ml)
Validation Rules:
Cross-reference results with USDA food composition database
Cross-reference with King Arthur weight chart
Maximum acceptable variance from reference: ±3%
All conversions must be mathematically reversible:
If 150g = 1.36 cups, then 1.36 cups × density × cup_ml must ≈ 150g
Test Cases (examples):
Ingredient	Weight	Method	Expected Cups	Source
All-Purpose Flour	125g	Spoon & Level	1.00	King Arthur
All-Purpose Flour	125g	Dip & Sweep	0.85	Calculated (÷1.18)
Butter (solid)	113g	Spoon & Level	0.	


| Butter (solid) | 113g | Spoon & Level | 0.50 | USDA (1 stick) |
| Butter (melted) | 113g | Spoon & Level | 0.57 | Calculated (×0.88) |
| Granulated Sugar | 200g | Spoon & Level | 1.00 | King Arthur |
| Cake Flour | 130g | Sifted | 1.40 | Calculated (×0.85) |
| Honey | 340g | Spoon & Level | 1.01 | USDA (1 cup = 336g) |
| Cocoa Powder | 85g | Spoon & Level | 0.80 | King Arthur |

## 21.2 SEO Testing

### Pre-Launch SEO Checklist:
- [ ] Every page has a unique title tag (no duplicates across entire site)
- [ ] Every page has a unique meta description (no duplicates)
- [ ] Every page has a self-referencing canonical URL
- [ ] All JSON-LD schemas validate with Google Rich Results Test
- [ ] All Open Graph tags validate with Facebook Sharing Debugger
- [ ] Twitter Card tags validate with Twitter Card Validator
- [ ] Sitemap index is valid XML and parseable
- [ ] All URLs in sitemaps return HTTP 200
- [ ] No orphan pages (every page reachable via internal links)
- [ ] Heading hierarchy correct on every page type (H1 → H2 → H3, no skips)
- [ ] No multiple H1 tags on any page
- [ ] All images have alt text
- [ ] robots.txt is accessible and correct
- [ ] No "noindex" tags on pages that should be indexed
- [ ] Hreflang not needed (English only, US market)

### Post-Launch SEO Monitoring:
- [ ] Submit sitemap to Google Search Console within 1 hour of launch
- [ ] Check index coverage report after 48 hours
- [ ] Check for "Crawled — currently not indexed" issues after 1 week
- [ ] Verify FAQ rich results appearing in search after 2 weeks
- [ ] Monitor for manual actions (should always be zero)

## 21.3 Performance Testing

### Pages to Test:
- Homepage
- 1 ingredient hub page
- 3 leaf pages (different ingredients: 1 flour, 1 fat, 1 liquid)
- 1 blog post
- 1 legal page

### Tools:
- Google Lighthouse (Chrome DevTools)
- Google PageSpeed Insights (lab + field data)
- WebPageTest.org (waterfall analysis)

### All tested pages must score:
| Category | Minimum |
|----------|---------|
| Performance | 90 |
| Accessibility | 95 |
| Best Practices | 95 |
| SEO | 100 |

### Test Conditions:
- Mobile: Simulated Moto G Power, slow 4G
- Desktop: Default Lighthouse settings
- Test with ads disabled AND enabled

## 21.4 Functional Testing

### Interactive Components:
| Component | Test |
|-----------|------|
| MethodSwitcher | All 3 tabs switch, result updates, correct math |
| StateSwitcher | All states switch, result updates, only shows for fats |
| AltitudeToggle | ON shows warning, OFF hides it, no math change |
| WeightSlider | Dragging updates result, link generates for new weight |
| RecipeScaler | All scale factors work, all ingredients recalculate |
| SearchBar | Autocomplete works, navigates to correct page |
| PrintButton | Opens clean print layout without ads |
| SaveImageButton | Downloads PNG, image contains correct data |
| ShareButtons | Each platform opens correct share dialog |
| CookieConsent | Blocks scripts until consent, remembers choice |
| FAQ Accordion | Expand/collapse works, smooth animation |

### Edge Case Testing:
| Test | Expected Result |
|------|----------------|
| Rapidly clicking method tabs | No state corruption, last click wins |
| Slider dragged to 1g | Valid result displayed, no errors |
| Slider dragged to 1000g | Valid result displayed, note about scale |
| Browser back button after tab switch | Returns to previous page, not previous tab |
| Page reload mid-interaction | Resets to default state (spoon & level, no altitude) |
| JavaScript disabled | Server-rendered content still visible, interactive features hidden |
| Slow network (3G) | Page content loads, ads load later, no layout shift |

## 21.5 Cross-Browser Testing

| Browser | Version | Priority | Platform |
|---------|---------|----------|----------|
| Chrome | Latest 2 versions | Critical | Desktop + Mobile |
| Safari | Latest 2 versions | Critical | Desktop + iOS |
| Firefox | Latest 2 versions | High | Desktop |
| Samsung Internet | Latest version | High | Mobile |
| Edge | Latest version | Medium | Desktop |

### Mobile Device Testing:
| Device | Screen Size | Priority |
|--------|------------|----------|
| iPhone SE (3rd gen) | 375x667 | Critical (smallest common) |
| iPhone 14/15 | 390x844 | Critical |
| iPhone 14/15 Pro Max | 430x932 | High |
| iPad (10th gen) | 820x1180 | High |
| Samsung Galaxy S23 | 360x780 | High |
| Pixel 7 | 412x915 | Medium |

## 21.6 Accessibility Testing
- Run axe DevTools on every page type
- Test full keyboard navigation flow (Tab through all interactive elements)
- Test with VoiceOver (Mac/iOS) on homepage and 1 leaf page
- Test with NVDA (Windows) on homepage and 1 leaf page
- Verify all ARIA labels are descriptive and accurate
- Verify focus order matches visual order
- Verify skip-to-content link works

---

# 22. SECURITY

## 22.1 Security Requirements

| Requirement | Implementation |
|-------------|---------------|
| HTTPS | Enforced via Vercel (automatic) |
| Content Security Policy | Configure in next.config.ts headers |
| X-Frame-Options | DENY (prevent iframe embedding by other sites) |
| X-Content-Type-Options | nosniff |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | Disable unused browser APIs (camera, microphone, etc.) |

### Content Security Policy Header:
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: https://pagead2.googlesyndication.com;
font-src 'self';
connect-src 'self' https://www.google-analytics.com;
frame-src https://googleads.g.doubleclick.net;



## 22.2 Why Security Risk is Low
- No user accounts or authentication
- No user-generated content
- No forms that submit data to backend (except optional contact form)
- No payment processing
- No database (all data is static JSON)
- No API routes exposing data
- No environment variables with secrets in client bundle
- All calculations happen client-side in the browser
- Static/ISR site — minimal server-side attack surface

## 22.3 Contact Form Security (if implemented)
- Use a third-party form service (Formspree, Netlify Forms) OR
- Simple mailto: link instead of a form
- If form is used: implement honeypot field for spam prevention
- No CAPTCHA needed for a simple contact form
- Rate limiting handled by form service provider

---

# 23. CONTENT VALUE FILTER

## 23.1 Purpose
Every page on the site must pass this filter before being created.
This ensures we never create pages that Google AI Overview can
fully answer, making our pages clickworthy.

## 23.2 The Four-Question Test

Before creating any page or content block, ask:

### Question 1: Can Google AI answer this with one sentence?
- If YES → The page must provide SIGNIFICANTLY more than one sentence
- The page must include interactive tools, comparison tables, or photos
- The title must create a curiosity gap that one sentence cannot satisfy

### Question 2: Does the answer depend on user input?
- If YES → Excellent. Build an interactive tool.
- Google AI cannot accept user input and recalculate.
- Examples: Method selection, state selection, weight slider, recipe scaler

### Question 3: Does the answer benefit from visual proof?
- If YES → Include photos or detailed CSS illustrations
- Google AI Overview cannot show real measurement photos
- Examples: "What does 100g of flour look like in a cup?"

### Question 4: Will the user want to save, print, or share the result?
- If YES → Include export features
- Google AI Overview results cannot be printed as recipe cards
- Examples: Print recipe card, save conversion image for Pinterest

### Scoring:
- 4/4 YES → Perfect page, build it
- 3/4 YES → Good page, build it with extra content
- 2/4 YES → Borderline, add more interactive/visual elements
- 1/4 YES → Do NOT build this page as a standalone
- 0/4 YES → Do NOT build this page at all

### Every leaf page scores at least 3/4 because:
1. Google gives a range, we give exact → ✅ (need to click for precision)
2. Method + State + Altitude = user input → ✅
3. Measurement photos + cup gauge → ✅
4. Print + Save Image + Pinterest → ✅

---

# 24. LAUNCH CHECKLIST

## Phase 0: Pre-Development (Week 0)

### Domain & Accounts
- [ ] Register domain (bakingconverter.com or .com alternative)
- [ ] Create Vercel account and link to GitHub repo
- [ ] Create Google Analytics 4 property
- [ ] Create Google Search Console property
- [ ] Create Pinterest Business account
- [ ] Create Twitter/X account (@bakingscience)
- [ ] Create Gmail for the project (contact@bakingconverter.com)

### Branding
- [ ] Design simple text logo (clean sans-serif + icon)
- [ ] Create favicon (32x32, 16x16)
- [ ] Create Apple Touch Icon (180x180)
- [ ] Create Open Graph default image (1200x630)

---

## Phase 1: MVP Development (Week 1-3)

### Core Infrastructure
- [ ] Initialize Next.js 15+ project with TypeScript
- [ ] Configure Tailwind CSS with custom theme (colors, fonts from Section 15)
- [ ] Set up file structure per Section 3
- [ ] Configure next.config.ts (security headers, image optimization)
- [ ] Configure tailwind.config.ts with design system values

### Data Layer
- [ ] Create lib/constants.ts with all measurement constants
- [ ] Create lib/ingredients.json with 20 ingredients (full schema per Section 4)
- [ ] Create lib/recipes.json with 15 recipes (per Section 4.3)
- [ ] Create lib/converter.ts with master conversion formula
- [ ] Create lib/recipe-scaler.ts with scaling logic
- [ ] Create lib/slug-utils.ts with URL parsing and validation
- [ ] Create lib/seo-utils.ts with metadata generators
- [ ] Create lib/title-generator.ts with anti-snippet title rotation
- [ ] Create lib/page-generator.ts with generateStaticParams logic
- [ ] Unit test converter.ts against USDA reference values

### Layout Components
- [ ] Build Header.tsx (logo, nav, mobile hamburger menu)
- [ ] Build Footer.tsx (links, legal pages, copyright, cookie settings link)
- [ ] Build Breadcrumbs.tsx (dynamic, schema-aware)
- [ ] Build CookieConsent.tsx (banner with Accept/Reject/Customize)
- [ ] Build app/layout.tsx (root layout with all global elements)

### Homepage
- [ ] Build app/page.tsx with all 7 sections per Section 8.2
- [ ] Build SearchBar.tsx with autocomplete
- [ ] Build IngredientGrid.tsx with 20 ingredient cards
- [ ] Generate homepage metadata

### Ingredient Hub Pages
- [ ] Build app/[ingredient]/page.tsx with all 10 sections per Section 8.3
- [ ] Build quick calculator (inline, client component)
- [ ] Build popular conversions table with links to leaf pages
- [ ] Generate hub metadata for all 20 ingredients

### Leaf Pages (THE MONEY PAGES)
- [ ] Build app/[ingredient]/[conversion]/page.tsx with ALL 21 sections (A-U) per Section 8.4
- [ ] Build ResultHero.tsx (giant number + subtitle)
- [ ] Build CupGauge.tsx (CSS cup fill visualization)
- [ ] Build MethodSwitcher.tsx (3 tabs, instant recalculation)
- [ ] Build StateSwitcher.tsx (state toggles, conditional render)
- [ ] Build AltitudeToggle.tsx (switch + warning box)
- [ ] Build ComparisonMatrix.tsx (methods × units table)
- [ ] Build VisualMeasurementGuide.tsx (photo grid or CSS placeholder)
- [ ] Build NearbyValuesTable.tsx (±10g, ±25g, ±50g with links)
- [ ] Build WeightSlider.tsx (range 1-1000, real-time update)
- [ ] Build RecipeContext.tsx (matched recipes display)
- [ ] Build RecipeScaler.tsx (interactive scaling with presets)
- [ ] Build NutritionBlock.tsx (FDA-style label, scaled to weight)
- [ ] Build ProTips.tsx (callout boxes)
- [ ] Build WhyItMatters.tsx (dynamic content block)
- [ ] Generate leaf page metadata with anti-snippet titles
- [ ] Implement generateStaticParams for top 1,000 pages
- [ ] Configure ISR with 7-day revalidation for remaining pages

### SEO Components
- [ ] Build FAQSchema.tsx (dynamic FAQ JSON-LD)
- [ ] Build SoftwareAppSchema.tsx (calculator schema)
- [ ] Build BreadcrumbSchema.tsx (breadcrumb JSON-LD)
- [ ] Build HowToSchema.tsx (measurement steps JSON-LD)
- [ ] All schemas inject into page head via Script component

### Sharing Components
- [ ] Build ConversionCard.tsx (1080x1080 shareable card)
- [ ] Build CheatSheetCard.tsx (1000x1500 Pinterest card)
- [ ] Build PrintButton.tsx (clean print CSS layout)
- [ ] Build SaveImageButton.tsx (html2canvas dynamic import)
- [ ] Build ShareButtons.tsx (Pinterest, Twitter/X, Copy Link)

### Ad Placeholder Components
- [ ] Build AdBanner.tsx (placeholder div with reserved height)
- [ ] Build AdInContent.tsx (placeholder div with reserved height)
- [ ] Build AdSidebar.tsx (placeholder div, desktop only)
- [ ] All ad components show "Advertisement" label
- [ ] All ad components reserve exact dimensions (prevent CLS)
- [ ] Ad code injection disabled until AdSense approved

### Sitemap & Robots
- [ ] Build app/sitemap.ts with sitemap index strategy per Section 9.6
- [ ] Build app/robots.ts per Section 9.7

### Error Pages
- [ ] Build app/not-found.tsx per Section 20.1
- [ ] Implement all URL redirect rules per Section 20.2

### Legal Pages
- [ ] Build /privacy/ page
- [ ] Build /terms/ page
- [ ] Build /about/ page
- [ ] Build /contact/ page
- [ ] Build /disclaimer/ page
- [ ] Build /cookies/ page

### Quality Assurance
- [ ] Test all 20 ingredient hub pages render correctly
- [ ] Test 20 sample leaf pages (1 per ingredient at common weight)
- [ ] Test all interactive components (Section 21.4)
- [ ] Test URL redirect rules (Section 20.2)
- [ ] Test conversion accuracy against reference values (Section 21.1)
- [ ] Run Lighthouse on homepage, 1 hub, 3 leaf pages
- [ ] Fix any score below 90 (Performance) or 95 (Accessibility, Best Practices)
- [ ] Test on Chrome, Safari, Firefox (desktop)
- [ ] Test on iPhone SE, iPhone 14, Android phone
- [ ] Validate all JSON-LD with Google Rich Results Test
- [ ] Verify no duplicate titles or descriptions

### Deployment
- [ ] Deploy to Vercel
- [ ] Verify HTTPS is active
- [ ] Verify all pages load correctly on production URL
- [ ] Submit sitemap to Google Search Console
- [ ] Verify GA4 is receiving data
- [ ] Monitor Vercel build logs for errors

---

## Phase 2: Content & AdSense (Week 4-6)

### Blog Posts
- [ ] Write and publish Article 1: "The 20% Error" (1,200+ words)
- [ ] Write and publish Article 2: "Baking in Denver" (1,000+ words)
- [ ] Write and publish Article 3: "Butter Math" (800+ words)
- [ ] Write and publish Article 4: "Flour Types Compared" (1,000+ words)
- [ ] Write and publish Article 5: "Stop Eyeballing" (1,200+ words)
- [ ] Each article has 5+ internal links to calculator pages
- [ ] Each article has FAQ schema markup
- [ ] Each article has Pinterest-optimized featured image

### AdSense Application
- [ ] Verify all AdSense requirements from Section 13.4 are met
- [ ] Apply for Google AdSense
- [ ] If rejected: review feedback, fix issues, reapply after 2 weeks
- [ ] If approved: implement ad code in placeholder components
- [ ] Verify cookie consent blocks ads until consent given
- [ ] Test ad rendering on mobile and desktop
- [ ] Verify no CLS from ad loading

### Pinterest Launch
- [ ] Set up Pinterest Business account
- [ ] Verify website for Rich Pins
- [ ] Create 5 boards per Section 12.3
- [ ] Generate CheatSheetCard for all 20 ingredients
- [ ] Pin 20 cheat sheets (1 per ingredient)
- [ ] Begin daily pinning schedule per Section 12.4

### Monitoring
- [ ] Check Google Search Console index coverage
- [ ] Check for crawl errors or "not indexed" issues
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Track first organic impressions and clicks
- [ ] Monitor Pinterest pin impressions

---

## Phase 3: Growth & Photos (Week 7-12)

### Photo Production
- [ ] Shoot measurement photos for top 10 ingredients (30 photos)
- [ ] Edit photos: crop, compress, convert to WebP
- [ ] Upload to /public/images/ingredients/
- [ ] Update VisualMeasurementGuide component to show real photos
- [ ] Add photo alt text per Section 16.5
- [ ] Update ingredient database: photo_available = true

### Content Expansion
- [ ] Add 10 more ingredients (total: 30)
- [ ] Generate hub pages and leaf pages for new ingredients
- [ ] Update sitemaps
- [ ] Write 2 blog posts per week (total: 12 more posts by Week 12)

### Feature Enhancements
- [ ] Add Pinterest "Pin It" hover button on all images
- [ ] Implement "Save as Image" for CheatSheetCards
- [ ] Add email newsletter signup (optional, for Phase 4 prep)

### SEO Monitoring
- [ ] Weekly: Check index coverage, fix any issues
- [ ] Weekly: Review top queries, create content for rising queries
- [ ] Monthly: Full site audit with Screaming Frog or similar
- [ ] Monitor competitor rankings

---

## Phase 4: Scale (Month 4-6)

### Ingredient Expansion
- [ ] Expand to 50 ingredients total
- [ ] New categories: Nuts & Seeds, Spices
- [ ] Generate all new hub and leaf pages
- [ ] Shoot measurement photos for new ingredients
- [ ] Update all sitemaps

### New Conversion Types
- [ ] Add /[ingredient]/[value]-grams-to-tablespoons/ route
- [ ] Add /[ingredient]/[value]-ounces-to-cups/ route
- [ ] Update slug parser for new URL patterns
- [ ] Update sitemap with new URL patterns
- [ ] Update internal linking to include new conversion types

### Blog Growth
- [ ] Continue 2 posts per week
- [ ] Target Google Discover with viral titles
- [ ] Create infographic blog posts for Pinterest

### Monetization Optimization
- [ ] A/B test ad placements
- [ ] Monitor RPM by page type
- [ ] If 50K sessions/month reached: Apply for Mediavine
- [ ] Implement Amazon affiliate links for kitchen scales
- [ ] Add "We recommend weighing with a digital scale" + affiliate link

### Pinterest Growth
- [ ] Generate cheat sheets for all 50 ingredients
- [ ] Create infographic pins for blog posts
- [ ] Join 5+ group boards
- [ ] Target 500K monthly Pinterest impressions

---

## Phase 5: Maturity (Month 7-12)

### Full Expansion
- [ ] Expand to 80-100 ingredients
- [ ] Add categories: Grains, Dried Fruits, Specialty (matcha, protein powder)
- [ ] Add /[ingredient]/[value]-cups-to-grams/ (reverse conversion)
- [ ] Add /[ingredient]/[value]-ml-to-cups/ route
- [ ] Total page count target: 100,000+

### Ad Network Upgrade
- [ ] If 100K sessions/month: Apply for AdThrive/Raptive
- [ ] Expected RPM increase from $8-15 to $20-35
- [ ] Revenue target: $2,000-3,500/month

### Advanced Features
- [ ] User preference memory (localStorage: default method, altitude)
- [ ] Dark mode toggle
- [ ] Multi-ingredient calculator ("Enter all your recipe ingredients")
- [ ] Browser PWA support (installable web app for kitchen use)

### Additional Revenue
- [ ] Sponsored content from baking equipment brands
- [ ] Email newsletter with affiliate links
- [ ] Premium printable conversion charts (PDF, $2-5)
- [ ] Mobile app consideration

---

# 25. POST-LAUNCH GROWTH PLAN

## 25.1 New Conversion Types (URL Patterns)

| URL Pattern | Example | New Pages |
|-------------|---------|-----------|
| /[ingredient]/[value]-grams-to-tablespoons/ | /butter/50-grams-to-tablespoons/ | +40,000 |
| /[ingredient]/[value]-ounces-to-cups/ | /flour/5-ounces-to-cups/ | +5,000 |
| /[ingredient]/[value]-ml-to-cups/ | /milk/200-ml-to-cups/ | +20,000 |
| /[ingredient]/[value]-cups-to-grams/ | /sugar/2-cups-to-grams/ | +2,000 |
| /[ingredient]/[value]-grams-to-ounces/ | /flour/100-grams-to-ounces/ | +20,000 |

Total potential: 100,000+ pages from the same data engine and 20 ingredients.
With 100 ingredients: 500,000+ possible pages.

## 25.2 New Ingredient Categories

| Category | Examples | Phase | Count |
|----------|---------|-------|-------|
| Flours | AP, bread, cake, whole wheat, almond, coconut | Launch | 6 |
| Sugars | Granulated, brown, powdered, honey | Launch | 4 |
| Fats | Butter, coconut oil, vegetable oil, olive oil | Launch | 4 |
| Dairy & Liquids | Milk, cream, sour cream | Launch | 3 |
| Other Dry | Cocoa, oats, cornstarch | Launch | 3 |
| Nuts & Seeds | Almonds, walnuts, chia, flax, sunflower | Phase 4 | 5 |
| Spices | Cinnamon, baking powder, baking soda, salt | Phase 4 | 4 |
| More Sugars | Maple syrup, molasses, agave, corn syrup | Phase 4 | 4 |
| Grains | Rice, quinoa, polenta, semolina | Phase 5 | 4 |
| Dried Fruits | Raisins, cranberries, dates, apricots | Phase 5 | 4 |
| Chocolate | Chocolate chips, cocoa nibs, melted chocolate | Phase 5 | 3 |
| Specialty | Matcha, protein powder, xanthan gum, gelatin | Phase 5 | 4 |
| More Flours | Rice flour, rye flour, buckwheat, spelt | Phase 5 | 4 |
| Nut Butters | Peanut butter, almond butter, tahini | Phase 5 | 3 |

**Target: 100+ ingredients by Month 12**

## 25.3 Revenue Projections

### Conservative Scenario
| Month | Pages | Monthly Visitors | RPM | Revenue |
|-------|-------|-----------------|-----|---------|
| 3 | 20,000 | 5,000 | $8 | $40 |
| 6 | 30,000 | 30,000 | $10 | $300 |
| 9 | 50,000 | 80,000 | $12 | $960 |
| 12 | 100,000 | 150,000 | $15 | $2,250 |

### Optimistic Scenario (with Pinterest traffic)
| Month | Pages | Monthly Visitors | RPM | Revenue |
|-------|-------|-----------------|-----|---------|
| 3 | 20,000 | 15,000 | $8 | $120 |
| 6 | 30,000 | 60,000 | $12 | $720 |
| 9 | 50,000 | 150,000 | $20 | $3,000 |
| 12 | 100,000 | 300,000 | $25 | $7,500 |

### Revenue Diversification (Month 12+)
| Stream | Monthly Revenue |
|--------|----------------|
| Display ads | $2,250 - $7,500 |
| Amazon affiliates (kitchen scales) | $100 - $500 |
| Pinterest affiliate pins | $50 - $200 |
| Premium PDF downloads | $50 - $200 |
| **Total** | **$2,450 - $8,400** |

## 25.4 Monitoring & Maintenance Schedule

| Task | Frequency | Tool |
|------|-----------|------|
| Check index coverage | Weekly | Google Search Console |
| Monitor Core Web Vitals | Weekly | PageSpeed Insights |
| Review top queries | Weekly | Google Search Console |
| Monitor ad performance | Weekly | AdSense / Mediavine dashboard |
| Check broken links | Monthly | Screaming Frog / Ahrefs |
| Full site audit | Monthly | Screaming Frog |
| Update ingredient data | Quarterly | Manual review vs USDA |
| Review competitor landscape | Monthly | Manual search |
| Publish blog posts | 2x per week | Manual |
| Pin to Pinterest | Daily | Manual or Tailwind scheduler |
| Review and respond to user feedback | Weekly | Email / social |
| Backup data files | Monthly | Git repository |
| Review hosting costs | Monthly | Vercel dashboard |
| Update dependencies | Monthly | npm audit, dependabot |

---

# 26. RISKS & MITIGATIONS

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Google AI Overview answers all queries | High | Medium | Anti-snippet titles, interactive tools, photos, Pinterest diversification |
| Google classifies pages as thin content | Medium | High | 800+ words per page, 5 interactive elements, unique data, FAQ, recipes |
| AdSense rejection | Low | Medium | Launch with 20 pages + 5 blog posts + all legal pages, reapply if rejected |
| Slow indexing of 40K pages | Medium | Medium | Sitemap clusters, strong internal linking, blog posts drive crawl budget |
| Competitor copies the concept | Low | Low | First mover advantage, photo content, brand authority, Pinterest following |
| Ingredient density data inaccuracy | Low | High | All data from USDA/King Arthur, cross-referenced, disclaimer on every page |
| Core Web Vitals degradation from ads | Medium | Medium | Lazy load ads, reserve slot dimensions, weekly CWV monitoring |
| Pinterest algorithm change | Low | Medium | Diversify traffic: SEO 50%, Pinterest 30%, Direct 10%, Social 10% |
| Vercel pricing increase | Low | Low | Site is static, can migrate to Cloudflare Pages or Netlify |
| Next.js major version breaking changes | Low | Medium | Pin dependencies, test before upgrading, Vercel maintains compatibility |
| User reports incorrect conversion | Medium | Low | Disclaimer, feedback mechanism, quarterly data audit |
| GDPR/CCPA compliance issue | Low | High | Cookie consent banner, privacy policy, no personal data collection |

---

# 27. DATA SOURCES & ATTRIBUTION

## 27.1 Primary Data Sources

| Source | URL | Used For |
|--------|-----|----------|
| USDA FoodData Central | https://fdc.nal.usda.gov/ | Ingredient densities, nutrition data |
| King Arthur Baking Ingredient Weight Chart | https://www.kingarthurbaking.com/learn/ingredient-weight-chart | Cross-reference densities, common cup weights |
| NIST Handbook 44 | https://www.nist.gov/pml/weights-and-measures/publications/nist-handbooks/nist-handbook-44 | US cup, tablespoon, teaspoon volumes |

## 27.2 Data Integrity Rules
- Every ingredient density MUST have a source documented in ingredients.json
- Never use brand-specific measurements (they vary between brands)
- Never guess or estimate densities
- All values must be verifiable by checking the original source
- If USDA and King Arthur disagree: Use USDA as primary, note discrepancy
- Quarterly audit: Re-check 5 random ingredients against sources

## 27.3 Calculation Transparency
Every leaf page must include (in small text, footer area or disclaimer):
"Density data sourced from USDA FoodData Central.
US Cup = 236.588ml (NIST). Results are estimates —
actual volume may vary by ±5% depending on brand and batch."



---

# APPENDIX A: QUICK REFERENCE — ALL COMPONENT PROPS

## ResultHero
| Prop | Type | Description |
|------|------|-------------|
| ingredientName | string | Display name |
| weightG | number | Weight in grams |
| resultCups | number | Calculated cups |
| methodName | string | Active method name |

## MethodSwitcher
| Prop | Type | Description |
|------|------|-------------|
| activeMethod | string | Currently selected method ID |
| onMethodChange | function | Callback when method changes |
| ingredientType | string | "dry", "liquid", "fat" (hide if liquid) |

## StateSwitcher
| Prop | Type | Description |
|------|------|-------------|
| states | object or null | Available states from ingredient data |
| activeState | string | Currently selected state ID |
| onStateChange | function | Callback when state changes |

## AltitudeToggle
| Prop | Type | Description |
|------|------|-------------|
| enabled | boolean | Current toggle state |
| onToggle | function | Callback when toggled |

## WeightSlider
| Prop | Type | Description |
|------|------|-------------|
| currentWeight | number | Page weight (default value) |
| ingredientId | string | For generating link URL |
| density | number | For real-time calculation |
| method | string | Active method for calculation |
| state | string | Active state for calculation |
| onWeightChange | function | Callback for real-time display update |

## ComparisonMatrix
| Prop | Type | Description |
|------|------|-------------|
| weightG | number | Weight in grams |
| density | number | Ingredient density |
| activeMethod | string | Highlight active column |
| stateModifier | number | Active state modifier |

## NearbyValuesTable
| Prop | Type | Description |
|------|------|-------------|
| currentWeight | number | Current page weight |
| ingredientId | string | For generating URLs |
| density | number | For calculating nearby results |

## RecipeScaler
| Prop | Type | Description |
|------|------|-------------|
| recipe | object | Matched recipe from recipes.json |
| currentWeight | number | Current conversion weight |
| ingredientId | string | Current ingredient |
| activeMethod | string | For cup calculations |

## ConversionCard
| Prop | Type | Description |
|------|------|-------------|
| ingredientName | string | Display name |
04.04.2026 01:16
Дальше


04.04.2026 01:17
markdown

| ingredientName | string | Display name |
| weightG | number | Weight in grams |
| resultCups | number | Main result |
| siftedCups | number | Sifted method result |
| packedCups | number | Dip & sweep result |
| methodName | string | Active method name |

## CheatSheetCard
| Prop | Type | Description |
|------|------|-------------|
| ingredientName | string | Display name |
| conversions | array | Array of { weightG, cups } for common weights |
| methodName | string | Method used for all values |

## NutritionBlock
| Prop | Type | Description |
|------|------|-------------|
| ingredientName | string | Display name |
| weightG | number | Current weight (for scaling) |
| nutritionPer100g | object | Nutrition data from database |

## RecipeContext
| Prop | Type | Description |
|------|------|-------------|
| ingredientId | string | Current ingredient |
| weightG | number | Current weight for matching |
| recipes | array | All recipes from recipes.json |

## VisualMeasurementGuide
| Prop | Type | Description |
|------|------|-------------|
| ingredientId | string | For photo paths |
| ingredientName | string | For alt text |
| weightG | number | For captions |
| photoAvailable | boolean | Show photos or CSS fallback |

## ShareButtons
| Prop | Type | Description |
|------|------|-------------|
| url | string | Canonical URL to share |
| title | string | Share text/title |
| description | string | Share description |
| imageUrl | string | OG image URL for Pinterest |

## PrintButton
| Prop | Type | Description |
|------|------|-------------|
| ingredientName | string | For print header |
| weightG | number | For print content |
| results | object | All conversion results |

## SaveImageButton
| Prop | Type | Description |
|------|------|-------------|
| targetRef | React.Ref | Ref to the ConversionCard DOM element |
| fileName | string | Download filename (e.g., "cake-flour-150g.png") |

## CupGauge
| Prop | Type | Description |
|------|------|-------------|
| cups | number | Number of cups to visualize |
| maxCups | number | Maximum cups for scale (default: 2) |
| animated | boolean | Whether to animate fill on mount |

## Breadcrumbs
| Prop | Type | Description |
|------|------|-------------|
| items | array | Array of { label, href } for each level |

## SearchBar
| Prop | Type | Description |
|------|------|-------------|
| ingredients | array | All ingredients for autocomplete |
| onSelect | function | Callback when ingredient selected |
| placeholder | string | Input placeholder text |

## AdBanner
| Prop | Type | Description |
|------|------|-------------|
| slot | string | AdSense slot ID |
| format | string | "horizontal" or "rectangle" |
| className | string | Additional Tailwind classes |

## AdSidebar
| Prop | Type | Description |
|------|------|-------------|
| slot | string | AdSense slot ID |
| sticky | boolean | Whether to stick on scroll (default: true) |

## AdInContent
| Prop | Type | Description |
|------|------|-------------|
| slot | string | AdSense slot ID |

## CookieConsent
| Prop | Type | Description |
|------|------|-------------|
| onAcceptAll | function | Enable all cookies |
| onRejectNonEssential | function | Block analytics + ads cookies |
| onCustomize | function | Open customization modal |

## BlogCard
| Prop | Type | Description |
|------|------|-------------|
| title | string | Post title |
| slug | string | Post URL slug |
| excerpt | string | Short description |
| featuredImage | string | Image path |
| publishedDate | string | ISO date string |

---

# APPENDIX B: STATE MANAGEMENT ON LEAF PAGE

## B.1 Client-Side State (React useState)

The leaf page wraps interactive sections in a client component.
The following state variables are managed:

| State Variable | Type | Default | Updated By |
|---------------|------|---------|-----------|
| activeMethod | string | "spoon_level" | MethodSwitcher |
| activeState | string | "solid" (or null) | StateSwitcher |
| altitudeEnabled | boolean | false | AltitudeToggle |
| sliderWeight | number | (page weight) | WeightSlider |
| recipeScale | number | 1.0 | RecipeScaler |

## B.2 Derived Values (Recalculated on State Change)

| Derived Value | Formula | Used In |
|--------------|---------|---------|
| methodModifier | MEASUREMENT_METHODS[activeMethod].modifier | All calculations |
| stateModifier | ingredient.states?[activeState] ?? 1.0 | All calculations |
| resultCups | weightG / (density × CUP_ML) × methodMod × stateMod | ResultHero, CupGauge |
| resultTbsp | resultCups × 16 | ComparisonMatrix |
| resultTsp | resultCups × 48 | ComparisonMatrix |
| resultFlOz | resultCups × 8 | ComparisonMatrix |
| resultMl | resultCups × 236.588 | ComparisonMatrix |
| sliderCups | sliderWeight / (density × CUP_ML) × methodMod × stateMod | WeightSlider display |
| scaledRecipe | recipe.ingredients.map(i => i.weight × recipeScale) | RecipeScaler |

## B.3 Component Architecture
app/[ingredient]/[conversion]/page.tsx (Server Component)
│
├── Static content: Breadcrumbs, SEO schemas, meta
├── Static content: Nutrition data, Pro Tips, Why It Matters
├── Static content: FAQ section (server-rendered for SEO)
│
└── <LeafPageCalculator> (Client Component — "use client")
│
├── State: activeMethod, activeState, altitudeEnabled, sliderWeight, recipeScale
│
├── <ResultHero cups={resultCups} />
├── <CupGauge cups={resultCups} />
├── <MethodSwitcher activeMethod={activeMethod} onChange={setActiveMethod} />
├── <StateSwitcher activeState={activeState} onChange={setActiveState} />
├── <AltitudeToggle enabled={altitudeEnabled} onToggle={setAltitudeEnabled} />
├── <ComparisonMatrix weightG={weightG} density={density} activeMethod={activeMethod} />
├── <WeightSlider currentWeight={weightG} onWeightChange={setSliderWeight} />
├── <RecipeScaler recipe={matchedRecipe} scale={recipeScale} onScale={setRecipeScale} />
│
└── <ShareButtons />
├── <PrintButton />
├── <SaveImageButton targetRef={cardRef} />
└── <ConversionCard ref={cardRef} />



### Key Architecture Decisions:
- Server Component handles ALL static content (SEO-critical)
- Single Client Component wrapper handles ALL interactive state
- State changes trigger recalculation of derived values
- No page reloads for any interaction
- URL does NOT change when method/state/altitude changes
  (these are UI preferences, not unique pages)
- Only the slider's "See full breakdown" link navigates to a new page

---

# APPENDIX C: METADATA GENERATION EXAMPLES

## C.1 Homepage Metadata
title: "BakingConverter — Precision Baking Conversions (Grams to Cups)"
description: "Stop guessing. Convert baking ingredients from grams to cups
with scientific accuracy. Accounts for sifted, packed, and spooned methods.
Free interactive calculator for 20+ ingredients."



## C.2 Ingredient Hub Metadata (Example: Cake Flour)
title: "Cake Flour — Grams to Cups Calculator (12 Methods Compared) | BakingConverter"
description: "Convert cake flour from grams to cups with precision.
See how sifted, packed, and spooned methods change your measurement.
Includes nutrition facts and expert baking tips."



## C.3 Leaf Page Metadata (Example: 150g Cake Flour — Formula 1: Fear/Doubt)
title: "Google Says 1.2 Cups for 150g Cake Flour — Here's Why That's Wrong for YOUR Recipe"
description: "150g cake flour = 1.36 cups (spoon & level). But sifted?
1.60 cups. Packed? 1.15 cups. A 28% variance. Get YOUR exact number
with our free interactive tool."



## C.4 Leaf Page Metadata (Example: 200g All-Purpose Flour — Formula 2: Precision)
title: "200g All-Purpose Flour to Cups: Exact Measurements for 3 Methods (Not 'Approximately')"
description: "200g AP flour = 1.60 cups (spoon & level), 1.36 cups
(dip & sweep), or 1.88 cups (sifted). Choose YOUR method for the
exact measurement. Free calculator."



## C.5 Leaf Page Metadata (Example: 113g Butter — Formula 3: Tool)
title: "113g Butter Converter: Solid vs Softened vs Melted — Interactive Calculator"
description: "113g butter = 0.50 cups solid, 0.53 cups softened,
0.57 cups melted. Switch between states instantly. Free baking tool
with recipe scaler."



## C.6 Blog Post Metadata (Example)
title: "The 20% Error: Why Your Cup Measurements Are Ruining Your Baking | BakingConverter"
description: "How you fill your measuring cup changes the weight by up to 20%.
Learn the three methods, see the math, and find out which one
professional bakers actually use."



---

# APPENDIX D: SITEMAP GENERATION LOGIC

## D.1 Sitemap Index (app/sitemap.ts)

The sitemap.ts file must generate a sitemap INDEX that points
to individual sitemaps per ingredient.

### Logic:
Read all ingredients from ingredients.json
Group by category or individual ingredient
For each ingredient: generate a sub-sitemap URL
Add static page sitemaps (pages, blog, hubs)
Return sitemap index XML


### Output Structure:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://bakingconverter.com/sitemap-pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://bakingconverter.com/sitemap-blog.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://bakingconverter.com/sitemap-hubs.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://bakingconverter.com/sitemap-all-purpose-flour.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://bakingconverter.com/sitemap-cake-flour.xml</loc>
  </sitemap>
  <!-- ... one per ingredient ... -->
</sitemapindex>
D.2 Per-Ingredient Sitemap
Each ingredient sitemap contains 1,000 URLs (weights 1g to 1000g).

Priority Assignment:

if weight is in ingredient.common_weights_g → priority 0.8
else if weight is divisible by 50 → priority 0.7
else if weight is divisible by 25 → priority 0.6
else if weight is divisible by 10 → priority 0.5
else → priority 0.4
D.3 Sitemap Limits
Maximum URLs per sitemap file: 5,000 (we use 1,000 per ingredient)
Maximum sitemap index entries: 500 (we use ~25 at launch)
Maximum total URLs: 500,000 (well within our growth plan)
APPENDIX E: TAILWIND CONFIG
E.1 Full Tailwind Configuration Reference

// tailwind.config.ts

theme:
  extend:
    colors:
      cream: "#FDF6E3"
      warm-white: "#FFFEF9"
      accent: 
        DEFAULT: "#F97316"  (Orange 500)
        hover: "#EA580C"    (Orange 600)
        light: "#FFEDD5"    (Orange 100)
      success:
        DEFAULT: "#22C55E"  (Green 500)
        light: "#DCFCE7"    (Green 100)
      warning:
        DEFAULT: "#F59E0B"  (Amber 500)
        light: "#FEF3C7"    (Amber 100)
      error:
        DEFAULT: "#EF4444"  (Red 500)
        light: "#FEE2E2"    (Red 100)
      info:
        DEFAULT: "#3B82F6"  (Blue 500)
        light: "#DBEAFE"    (Blue 100)

    fontFamily:
      sans: [system font stack as defined in Section 15.2]

    fontSize:
      result: ["4.5rem", { lineHeight: "1.1" }]  (72px)
      result-mobile: ["3rem", { lineHeight: "1.1" }]  (48px)

    borderRadius:
      card: "12px"
      button: "8px"

    boxShadow:
      card: "0 1px 3px rgba(0,0,0,0.08)"
      card-hover: "0 4px 12px rgba(0,0,0,0.1)"

    maxWidth:
      content: "800px"
      page: "1200px"

  screens:
    sm: "640px"
    md: "768px"
    lg: "1024px"
    xl: "1280px"
APPENDIX F: NEXT.JS CONFIG
F.1 next.config.ts Requirements

// Key configuration items:

images:
  formats: ["image/webp"]
  remotePatterns: [] (no remote images)

headers:
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: camera=(), microphone=(), geolocation=()
  - Content-Security-Policy: (as defined in Section 22.1)

trailingSlash: true (all URLs end with /)

output: undefined (use Vercel default, NOT "export")

experimental:
  optimizePackageImports: ["lucide-react"]
APPENDIX G: FULL INGREDIENT DATA TABLE
G.1 Complete Launch Ingredient Reference
#	ID	Name	Category	Density (g/ml)	Type	Has States	Calories/100g	Source
1	all-purpose-flour	All-Purpose Flour	flour	0.529	dry	No	364	USDA
2	bread-flour	Bread Flour	flour	0.550	dry	No	361	USDA
3	cake-flour	Cake Flour	flour	0.467	dry	No	362	USDA
4	whole-wheat-flour	Whole Wheat Flour	flour	0.512	dry	No	340	USDA
5	almond-flour	Almond Flour	flour	0.406	dry	No	571	KA
6	coconut-flour	Coconut Flour	flour	0.540	dry	No	443	KA
7	granulated-sugar	Granulated Sugar	sugar	0.845	dry	No	387	USDA
8	brown-sugar	Brown Sugar (packed)	sugar	0.930	dry	No	380	USDA
9	powdered-sugar	Powdered Sugar	sugar	0.508	dry	No	389	USDA
10	honey	Honey	sugar	1.420	liquid	No	304	USDA
11	butter	Butter	fat	0.959	fat	Yes: solid, softened, melted	717	USDA
12	coconut-oil	Coconut Oil	fat	0.924	fat	Yes: solid, melted	892	USDA
13	vegetable-oil	Vegetable Oil	fat	0.920	liquid	No	884	USDA
14	olive-oil	Olive Oil	fat	0.916	liquid	No	884	USDA
15	whole-milk	Whole Milk	dairy	1.030	liquid	No	61	USDA
16	heavy-cream	Heavy Cream	dairy	0.994	liquid	No	340	USDA
17	sour-cream	Sour Cream	dairy	1.013	liquid	No	198	USDA
18	cocoa-powder	Cocoa Powder	other	0.449	dry	No	228	USDA
19	rolled-oats	Rolled Oats	other	0.381	dry	No	379	USDA
20	cornstarch	Cornstarch	other	0.541	dry	No	381	USDA
G.2 Common Weights Per Ingredient
All ingredients share these base common_weights_g:


[25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 300, 350, 400, 500, 750, 1000]
Additionally, some ingredients have specific popular weights:

Ingredient	Additional Common Weights	Reason
butter	[14, 28, 57, 113, 227, 454]	Stick sizes (1 tbsp, 2 tbsp, ¼ cup, 1 stick, 2 sticks, 1 lb)
all-purpose-flour	[120, 130, 140, 160, 180, 240, 360, 480]	Common recipe amounts
granulated-sugar	[12, 25, 50, 67, 100, 134, 150, 200, 268, 400]	Common recipe amounts
honey	[21, 42, 85, 170, 340]	1 tbsp, 2 tbsp, ¼ cup, ½ cup, 1 cup equivalents
APPENDIX H: RECIPE DATABASE (FULL)
H.1 All 15 Launch Recipes
Recipe 1: Basic Vanilla Cake

serves: 8
ingredients:
  - cake-flour: 240g (sifted)
  - granulated-sugar: 200g
  - butter: 115g (softened)
  - whole-milk: 180g (room temperature)
Recipe 2: Chocolate Chip Cookies

serves: 24
ingredients:
  - all-purpose-flour: 280g
  - brown-sugar: 165g (packed)
  - granulated-sugar: 100g
  - butter: 230g (softened)
Recipe 3: Banana Bread

serves: 10
ingredients:
  - all-purpose-flour: 250g
  - granulated-sugar: 150g
  - butter: 75g (melted)
  - sour-cream: 60g
Recipe 4: Pizza Dough

serves: 4
ingredients:
  - bread-flour: 500g
  - olive-oil: 30g
  - granulated-sugar: 10g
Recipe 5: Pancakes

serves: 8
ingredients:
  - all-purpose-flour: 190g
  - granulated-sugar: 25g
  - whole-milk: 240g
  - butter: 30g (melted)
Recipe 6: Simple White Bread

serves: 12
ingredients:
  - bread-flour: 450g
  - granulated-sugar: 25g
  - butter: 30g (softened)
  - whole-milk: 300g
Recipe 7: Blueberry Muffins

serves: 12
ingredients:
  - all-purpose-flour: 300g
  - granulated-sugar: 150g
  - butter: 80g (melted)
  - sour-cream: 120g
Recipe 8: Pie Crust (Single)

serves: 8
ingredients:
  - all-purpose-flour: 160g
  - butter: 115g (cold, solid)
  - granulated-sugar: 10g
Recipe 9: Brownies

serves: 16
ingredients:
  - all-purpose-flour: 60g
  - granulated-sugar: 200g
  - butter: 115g (melted)
  - cocoa-powder: 50g
Recipe 10: Sugar Cookies

serves: 30
ingredients:
  - all-purpose-flour: 375g
  - granulated-sugar: 200g
  - butter: 230g (softened)
  - powdered-sugar: 60g
Recipe 11: Biscuits

serves: 8
ingredients:
  - all-purpose-flour: 300g
  - butter: 85g (cold, solid)
  - whole-milk: 180g
Recipe 12: Cornbread

serves: 9
ingredients:
  - all-purpose-flour: 125g
  - cornstarch: 15g
  - granulated-sugar: 65g
  - butter: 60g (melted)
  - whole-milk: 240g
Recipe 13: Crepes

serves: 8
ingredients:
  - all-purpose-flour: 125g
  - whole-milk: 300g
  - butter: 30g (melted)
  - granulated-sugar: 25g
Recipe 14: Scones

serves: 8
ingredients:
  - all-purpose-flour: 250g
  - granulated-sugar: 50g
  - butter: 75g (cold, solid)
  - heavy-cream: 120g
Recipe 15: Cinnamon Rolls

serves: 12
ingredients:
  - bread-flour: 400g
  - granulated-sugar: 50g
  - butter: 60g (softened)
  - whole-milk: 240g
  - brown-sugar: 165g (packed, for filling)
APPENDIX I: FAQ TEMPLATES PER INGREDIENT TYPE
I.1 Flour FAQ Template

Q1: "How many cups is [X]g of [flour type]?"
A1: "Using the Spoon & Level method, [X]g of [flour type] equals [Y] cups. 
    With Dip & Sweep (packed), it's [Z] cups."

Q2: "Does sifting [flour type] change the measurement?"
A2: "Yes. Sifted [flour type] is lighter and takes up more volume. 
    [X]g sifted = [Y] cups vs [Z] cups unsifted — a [N]% difference."

Q3: "What's the difference between [flour type] and all-purpose flour by weight?"
A3: "[flour type] has a density of [D1] g/ml compared to all-purpose flour's 
    0.529 g/ml. This means [X]g of [flour type] = [Y1] cups, while [X]g 
    of all-purpose = [Y2] cups."
I.2 Fat FAQ Template

Q1: "How many cups is [X]g of [fat] ([state])?"
A1: "[X]g of [state] [fat] equals [Y] cups. Note: [melted/solid] [fat] 
    measures [Z] cups — a [N]% difference."

Q2: "Does melting [fat] change its volume?"
A2: "Yes. Melted [fat] takes up less volume than solid. [X]g solid = [Y1] cups, 
    but [X]g melted = [Y2] cups. Always check your recipe to see which state is needed."

Q3: "How many sticks of [fat] is [X]g?"
A3: "One standard US stick of [fat] is 113g (½ cup). So [X]g is approximately 
    [X/113] sticks."
I.3 Liquid FAQ Template

Q1: "How many cups is [X]g of [liquid]?"
A1: "[X]g of [liquid] equals [Y] cups. Unlike dry ingredients, liquids 
    don't vary by measurement method."

Q2: "Is [X]g of [liquid] the same as [X]ml?"
A2: "Not exactly. [liquid] has a density of [D] g/ml, so [X]g = [X/D] ml. 
    Water is the only liquid where grams ≈ milliliters."

Q3: "Can I measure [liquid] by weight instead of volume?"
A3: "Yes, and it's more accurate. [X]g on a kitchen scale is more precise 
    than [Y] cups in a measuring cup."
I.4 Sugar FAQ Template

Q1: "How many cups is [X]g of [sugar type]?"
A1: "Using the Spoon & Level method, [X]g of [sugar type] equals [Y] cups."

Q2: "Should I pack [sugar type] when measuring?"
A2 (for brown sugar): "Yes. Brown sugar is traditionally packed firmly 
    into the measuring cup. [X]g packed = [Y] cups."
A2 (for other sugars): "No. [sugar type] should be spooned into the 
    cup and leveled, not packed."

Q3: "How does [sugar type] compare to granulated sugar by weight?"
A3: "[sugar type] has a density of [D1] g/ml vs granulated sugar's 0.845 g/ml. 
    [X]g of [sugar type] = [Y1] cups, while [X]g granulated = [Y2] cups."
APPENDIX J: ERROR MESSAGE TEMPLATES
J.1 User-Facing Error Messages
Scenario	Message	Style
Invalid weight (404)	"We couldn't find this conversion. Try a weight between 1g and 1000g."	Error box (red)
Invalid ingredient (404)	"This ingredient isn't in our database yet. Check our full ingredient list."	Error box (red)
Calculation error	"Something went wrong with the calculation. Please refresh the page."	Warning box (amber)
Image save failed	"Couldn't save the image. Try using the Print button instead."	Warning box (amber)
No recipe match	"We don't have a recipe using exactly this amount, but here's the closest match."	Info box (blue)
Clipboard copy success	"Link copied to clipboard!"	Toast (3 seconds)
Clipboard copy failed	"Couldn't copy the link. The URL is in your address bar."	Warning box (amber)
Print initiated	"Opening print preview..."	Toast (2 seconds)
Image saved	"Image saved! Share it on Pinterest 📌"	Toast (3 seconds)
APPENDIX K: CONTENT WORD COUNT TARGETS
K.1 Per Page Type
Page Type	Minimum Words	Target Words	Maximum Words
Homepage	400	500	700
Ingredient Hub	600	800	1,000
Leaf Page	800	1,000	1,200
Blog Post	800	1,200	2,000
About Page	300	500	700
Disclaimer	200	400	500
Privacy Policy	600	1,000	1,500
Terms of Service	400	700	1,000
K.2 Content Sources on Leaf Pages
Section	Approximate Words	Content Type
Result Hero + Method descriptions	50-80	Template + dynamic
Comparison Matrix (table)	30-50	Data
Visual Measurement Guide	30-50	Template + dynamic
Nearby Values (table)	20-30	Data
Recipe Context	50-80	Template + dynamic
Recipe Scaler	30-50	Template + dynamic
Nutrition Block	30-40	Data
Pro Tips	80-120	From database
Why Accuracy Matters	100-150	Template + dynamic
FAQ Section	200-300	Template + dynamic
Related Conversions	30-50	Template + links
Total	650-1,000	Mixed
Plus static elements (breadcrumbs, headings, labels): ~100-200 words

Grand total per leaf page: 800-1,200 words

This exceeds Google's threshold for "thin content" which is
generally considered to be pages with fewer than 300 words.

END OF DOCUMENT
Document Statistics
Total sections: 27 main + 11 appendices
Total page types defined: 7 (home, hub, leaf, blog, blog post, legal, 404)
Total components defined: 30+
Total ingredient data: 20 ingredients with full schema
Total recipes: 15 with full ingredient lists
Total launch checklist items: 100+
Total growth phases: 5 (spanning 12 months)
How to Use This Document
Save as requirements.md in project root
Use as the single source of truth for all development
When coding a component, reference its section and appendix
When making design decisions, reference Section 15
When writing content, reference Appendix K for word counts
When testing, reference Section 21
When launching, follow Section 24 checklist step by step
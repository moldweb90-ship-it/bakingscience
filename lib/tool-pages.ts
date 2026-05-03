export type ToolPageKind =
  | "buttermilk"
  | "egg-brownies"
  | "butter-oil"
  | "pan-size"
  | "sourdough"
  | "recipe-scaler"
  | "cake-serving";

export type ToolTable = {
  title: string;
  headers: string[];
  rows: string[][];
};

export type ToolFaq = {
  question: string;
  answer: string;
};

export type ToolPage = {
  slug: string;
  kind: ToolPageKind;
  keyword: string;
  title: string;
  description: string;
  h1: string;
  shortAnswer: string;
  searchVolume: 50 | 500 | 5000 | 50000;
  competitionIndex: number;
  angle: string;
  calculatorTitle: string;
  calculatorNote: string;
  tables: ToolTable[];
  tips: string[];
  mistakes: string[];
  recipeIdeas: string[];
  faqs: ToolFaq[];
  relatedSlugs: string[];
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function cupAmountFromKeyword(keyword: string): string {
  if (keyword.includes("1 4") || keyword.includes("1/4")) return "1/4 cup";
  if (keyword.includes("1 2") || keyword.includes("1/2")) return "1/2 cup";
  if (keyword.includes("3 4") || keyword.includes("3/4")) return "3/4 cup";
  if (keyword.includes("1 cup")) return "1 cup";
  return "1 cup";
}

function acidForButtermilk(amount: string): string {
  if (amount === "1/4 cup") return "3/4 teaspoon lemon juice or vinegar";
  if (amount === "1/2 cup") return "1 1/2 teaspoons lemon juice or vinegar";
  if (amount === "3/4 cup") return "2 1/4 teaspoons lemon juice or vinegar";
  return "1 tablespoon lemon juice or vinegar";
}

const buttermilkKeywords = [
  ["buttermilk substitute", 50000, 26, "core substitute"],
  ["making buttermilk", 50000, 34, "make at home"],
  ["non dairy buttermilk substitute", 500, 9, "dairy free"],
  ["almond milk buttermilk substitute", 500, 4, "almond milk"],
  ["buttermilk using almond milk", 500, 5, "almond milk"],
  ["make buttermilk from almond milk", 500, 5, "almond milk"],
  ["milk for buttermilk substitute", 500, 1, "milk acid method"],
  ["diy buttermilk substitute", 500, 2, "quick method"],
  ["homemade buttermilk substitute", 500, 7, "quick method"],
  ["make buttermilk substitute", 500, 8, "quick method"],
  ["1 4 cup buttermilk substitute", 500, 2, "amount"],
  ["1 2 cup buttermilk substitute", 500, 6, "amount"],
  ["3 4 cup buttermilk substitute", 500, 5, "amount"],
  ["buttermilk substitute for ranch dressing", 500, 2, "ranch"],
  ["buttermilk greek yogurt substitute", 500, 8, "greek yogurt"],
  ["buttermilk substitute greek yogurt", 500, 8, "greek yogurt"],
  ["buttermilk substitute with greek yogurt", 500, 8, "greek yogurt"],
  ["kefir buttermilk substitute", 500, 5, "kefir"],
  ["buttermilk substitute half and half", 500, 4, "half and half"],
  ["buttermilk instead of heavy cream", 500, 0, "heavy cream"],
  ["use buttermilk instead of milk", 500, 1, "swap direction"],
  ["buttermilk instead of milk", 500, 3, "swap direction"],
  ["milk instead of buttermilk", 500, 3, "reverse swap"],
  ["sour cream buttermilk", 500, 3, "sour cream"],
  ["sour cream and buttermilk", 500, 3, "sour cream"],
] as const;

const eggBrownieKeywords = [
  ["egg substitute for brownies", 5000, 21, "core"],
  ["egg substitutes for brownie mix", 500, 4, "box mix"],
  ["substitute for 2 eggs in brownies", 500, 8, "two eggs"],
  ["betty crocker brownie mix egg substitute", 50, 0, "box brand"],
  ["ghirardelli brownie mix egg substitute", 50, 4, "box brand"],
  ["pillsbury brownie mix without eggs", 50, 0, "box brand"],
  ["brownie mix vegan substitute for eggs", 50, 2, "vegan"],
  ["brownie mix with yogurt instead of eggs", 50, 0, "yogurt"],
  ["brownies with yogurt instead of eggs", 50, 0, "yogurt"],
  ["brownie recipe with applesauce instead of eggs", 50, 0, "applesauce"],
  ["brownies with applesauce instead of egg", 50, 1, "applesauce"],
  ["flax egg brownies", 50, 0, "flax"],
  ["flaxseed egg substitute brownies", 50, 0, "flax"],
  ["egg substitute for gluten free brownies", 50, 0, "gluten free"],
  ["egg replacement for box brownies", 50, 11, "box mix"],
  ["substitute for eggs in brownie batter", 50, 5, "batter"],
  ["substitute for eggs when baking brownies", 50, 4, "baking"],
  ["vegan egg substitute for baking brownies", 50, 0, "vegan"],
] as const;

const butterOilKeywords = [
  ["butter to oil converter", 5000, 1, "core"],
  ["butter to oil conversion baking", 500, 0, "baking"],
  ["oil to butter conversion calculator", 500, 0, "reverse"],
  ["olive oil to butter conversion", 500, 0, "olive oil"],
  ["1 cup oil to butter conversion", 50, 0, "amount"],
  ["250g butter to oil conversion", 50, 0, "grams"],
  ["butter conversion to oil", 50, 0, "core"],
  ["butter to canola oil conversion", 50, 0, "canola"],
  ["butter to oil conversion grams", 50, 0, "grams"],
  ["butter to vegetable oil conversion grams", 50, 0, "vegetable oil"],
  ["conversion oil to butter", 50, 0, "reverse"],
  ["oil to butter conversion grams", 50, 0, "reverse grams"],
] as const;

const panKeywords = [
  ["pan size converter", 50, 2, "core"],
  ["baking pan conversion calculator", 500, 0, "calculator"],
  ["cake pan conversion", 500, 0, "cake"],
  ["cake pan conversion chart", 500, 0, "chart"],
  ["baking pan conversion", 500, 1, "baking"],
  ["baking pan conversion chart", 500, 1, "chart"],
  ["cake pan converter calculator", 50, 0, "calculator"],
  ["cake pan size conversion", 50, 0, "cake"],
  ["cake pan volume conversion", 50, 0, "volume"],
  ["conversion chart for baking pan sizes", 50, 0, "chart"],
  ["converting cake recipes for different size pans", 50, 0, "recipe"],
  ["baking dish conversion chart", 50, 0, "dish"],
  ["baking pan time conversion chart", 50, 0, "time"],
  ["baking time conversion pan size", 50, 0, "time"],
  ["6 inch cake pan conversion", 50, 0, "exact"],
  ["8 inch cake pan conversion", 50, 0, "exact"],
  ["9 inch cake pan conversion", 50, 0, "exact"],
  ["8 inch round cake pan volume", 50, 1, "volume"],
  ["cake pan volume", 50, 1, "volume"],
  ["round pan to square pan conversion", 50, 0, "shape"],
  ["square pan to round pan conversion", 50, 0, "shape"],
  ["pan conversion chart", 50, 0, "chart"],
  ["loaf pan conversion", 50, 0, "loaf"],
  ["bundt cake to loaf pan conversion", 50, 0, "bundt"],
  ["23cm square cake tin convert to round", 50, 0, "metric"],
  ["8 inch to 10 inch cake conversion", 50, 0, "exact"],
  ["8 inch to 6 inch cake conversion", 50, 0, "exact"],
  ["baking tin size conversion calculator", 50, 0, "tin"],
  ["cake size conversion", 50, 0, "cake"],
  ["cake size conversion chart", 50, 0, "chart"],
  ["cake tin conversion", 50, 0, "tin"],
  ["cake tin conversion calculator", 50, 0, "tin"],
  ["cake tin conversion chart", 50, 0, "chart"],
  ["cake tin size conversion chart", 50, 0, "tin"],
  ["convert 6 inch cake recipe to 8 inch", 50, 0, "exact"],
  ["convert 8 inch cake recipe to 6 inch", 50, 0, "exact"],
  ["convert 8 inch cake recipe to 9 inch", 50, 0, "exact"],
  ["convert 8 inch cake to 6 inch", 50, 0, "exact"],
  ["convert 9 inch cake to 6 inch", 50, 0, "exact"],
  ["convert 9x13 recipe to 11x15", 50, 0, "rectangle"],
  ["convert baking time 8x8 to 9x13", 50, 0, "rectangle"],
  ["convert pie recipe to 9x13", 50, 0, "pie"],
  ["convert round cake tin to rectangle", 50, 0, "shape"],
  ["converting round cake tins to square", 50, 0, "shape"],
  ["loaf tin to round tin conversion", 50, 0, "shape"],
  ["round cake tin to loaf tin conversion", 50, 0, "shape"],
  ["square cake tin to round conversion", 50, 0, "shape"],
] as const;

const sourdoughKeywords = [
  ["sourdough hydration calculator", 5000, 0, "core"],
  ["sourdough bread hydration calculator", 50, 0, "bread"],
  ["sourdough starter hydration calculator", 50, 0, "starter"],
  ["sourdough hydration formula", 50, 1, "formula"],
  ["sourdough flour water ratio", 50, 0, "ratio"],
] as const;

const scaleKeywords = [
  ["recipe scaler", 500, 1, "core"],
  ["recipe scaler online", 50, 5, "online"],
  ["scale recipe calculator", 50, 2, "calculator"],
  ["double recipe calculator", 50, 1, "double"],
  ["halve recipe calculator", 50, 1, "halve"],
] as const;

const servingKeywords = [
  ["cake serving calculator", 50, 0, "core"],
  ["cake serving size calculator", 50, 0, "slice size"],
  ["wedding cake servings calculator", 50, 0, "wedding"],
] as const;

function buttermilkPage([keyword, volume, comp, angle]: (typeof buttermilkKeywords)[number]): ToolPage {
  const amount = cupAmountFromKeyword(keyword);
  const acid = acidForButtermilk(amount);
  const nonDairy = /almond|non dairy|vegan|dairy/.test(keyword);
  const dairySwap = /greek|yogurt|sour cream|kefir|half and half|heavy cream/.test(keyword);
  const h1 = keyword.replace(/\b\w/g, (m) => m.toUpperCase());
  return {
    slug: slugify(keyword),
    kind: "buttermilk",
    keyword,
    title: `${h1}: Exact Substitute Ratios for Baking`,
    description: `Make a reliable ${keyword} with measured ratios, dairy and non-dairy options, baking notes, and quick troubleshooting.`,
    h1,
    shortAnswer: nonDairy
      ? `For a non-dairy buttermilk substitute, use ${amount} unsweetened almond, soy, or oat milk with ${acid}. Stir, wait 5 to 10 minutes, then use it in pancakes, muffins, quick breads, or cakes.`
      : dairySwap
        ? `For most baking, replace ${amount} buttermilk with thinned yogurt, kefir, sour cream, or milk soured with ${acid}. Match the thickness to your batter before baking.`
        : `To make ${amount} buttermilk substitute, add ${acid} to a measuring cup, then add milk to reach ${amount}. Let it stand until slightly thickened.`,
    searchVolume: volume,
    competitionIndex: comp,
    angle,
    calculatorTitle: `${h1} Ratio`,
    calculatorNote: `The dependable home formula is 1 tablespoon acid per 1 cup milk. Scale it down for 1/4, 1/2, or 3/4 cup amounts.`,
    tables: [
      {
        title: "Buttermilk Substitute Ratio",
        headers: ["Needed", "Acid", "Liquid", "Rest time"],
        rows: [
          ["1/4 cup", "3/4 tsp lemon juice or vinegar", "Milk to the 1/4 cup line", "5-10 min"],
          ["1/2 cup", "1 1/2 tsp lemon juice or vinegar", "Milk to the 1/2 cup line", "5-10 min"],
          ["3/4 cup", "2 1/4 tsp lemon juice or vinegar", "Milk to the 3/4 cup line", "5-10 min"],
          ["1 cup", "1 tbsp lemon juice or vinegar", "Milk to the 1 cup line", "5-10 min"],
        ],
      },
      {
        title: "Best Option by Recipe",
        headers: ["Recipe", "Best substitute", "Why it works"],
        rows: [
          ["Pancakes", "Milk + lemon juice", "Enough acidity for tenderness and browning"],
          ["Ranch dressing", "Kefir or thinned yogurt", "Closer tang and body than plain milk"],
          ["Chocolate cake", "Milk + vinegar", "Acid reacts cleanly with baking soda"],
          ["Biscuits", "Thin yogurt or sour cream", "More body, less watery dough"],
        ],
      },
    ],
    tips: [
      "Use unsweetened milk for baking; vanilla or sweetened plant milk changes the recipe.",
      "Do not expect homemade buttermilk to curdle dramatically. Slight thickening is enough.",
      "If the batter already contains baking powder only, the substitute still helps tenderness but may not change rise much.",
    ],
    mistakes: [
      "Adding acid after the milk is measured; this makes the total liquid too high.",
      "Using thick Greek yogurt without thinning it first.",
      "Using strongly flavored vinegar in delicate vanilla cakes.",
    ],
    recipeIdeas: ["pancakes", "cornbread", "red velvet cake", "ranch dressing", "banana bread"],
    faqs: [
      { question: `Can I use ${keyword} in cake?`, answer: "Yes, if the substitute has both liquid and acidity. For cakes, milk plus lemon juice or vinegar is usually the cleanest option." },
      { question: "Is lemon juice or vinegar better?", answer: "Lemon juice tastes softer; white vinegar is more neutral after baking. Both work at the same ratio." },
      { question: "Can I make it dairy free?", answer: "Yes. Unsweetened soy milk gives the closest body, almond milk is lighter, and oat milk gives a mild sweetness." },
    ],
    relatedSlugs: ["buttermilk-substitute", "1-2-cup-buttermilk-substitute", "non-dairy-buttermilk-substitute"],
  };
}

function eggPage([keyword, volume, comp, angle]: (typeof eggBrownieKeywords)[number]): ToolPage {
  const h1 = keyword.replace(/\b\w/g, (m) => m.toUpperCase());
  const twoEggs = keyword.includes("2 eggs");
  const brand = /betty|ghirardelli|pillsbury/.test(keyword);
  return {
    slug: slugify(keyword),
    kind: "egg-brownies",
    keyword,
    title: `${h1}: Best Egg Replacements That Still Set`,
    description: `Use the right egg substitute for brownies, boxed brownie mix, fudgy centers, vegan baking, and gluten-free brownie batter.`,
    h1,
    shortAnswer: twoEggs
      ? "For 2 eggs in brownies, use 1/2 cup unsweetened applesauce, 1/2 cup yogurt, or 2 flax eggs. For the fudgiest result, applesauce or yogurt usually beats banana."
      : brand
        ? "For boxed brownie mix, replace each egg with 1/4 cup applesauce or yogurt for a fudgy pan, or 1 flax egg for a firmer vegan brownie."
        : "The best egg substitute for brownies is usually 1/4 cup unsweetened applesauce or yogurt per egg. Use flax egg when you need a vegan binder.",
    searchVolume: volume,
    competitionIndex: comp,
    angle,
    calculatorTitle: "Brownie Egg Replacement Calculator",
    calculatorNote: "Brownies tolerate egg substitutes better than cakes because they are dense, moist, and chocolate-forward.",
    tables: [
      {
        title: "Egg Substitute Amounts for Brownies",
        headers: ["Eggs replaced", "Applesauce", "Yogurt", "Flax egg"],
        rows: [
          ["1 egg", "1/4 cup", "1/4 cup", "1 tbsp flax + 3 tbsp water"],
          ["2 eggs", "1/2 cup", "1/2 cup", "2 tbsp flax + 6 tbsp water"],
          ["3 eggs", "3/4 cup", "3/4 cup", "3 tbsp flax + 9 tbsp water"],
        ],
      },
      {
        title: "Texture Results",
        headers: ["Substitute", "Texture", "Best use"],
        rows: [
          ["Applesauce", "Fudgy and moist", "Box brownies, low-fat brownies"],
          ["Yogurt", "Rich and tender", "Thicker batter, cakey brownies"],
          ["Flax egg", "Dense with a slight chew", "Vegan brownies"],
          ["Commercial replacer", "Neutral and predictable", "Gluten-free mixes"],
        ],
      },
    ],
    tips: [
      "Let flax eggs gel for 5 minutes before adding them to the batter.",
      "Use unsweetened applesauce so the brownie mix does not become too sweet.",
      "If the batter looks loose after replacing eggs, rest it for 5 minutes before baking.",
    ],
    mistakes: [
      "Using too much banana; it can make brownies taste like banana bread.",
      "Replacing three or more eggs in a cakey brownie recipe without adding structure.",
      "Overbaking egg-free brownies; they set more as they cool.",
    ],
    recipeIdeas: ["boxed brownies", "vegan brownies", "gluten-free brownies", "fudgy brownies"],
    faqs: [
      { question: "What is the best egg substitute for fudgy brownies?", answer: "Unsweetened applesauce is usually the easiest choice because it adds moisture without making the brownie too bready." },
      { question: "Can I make boxed brownies without eggs?", answer: "Yes. Use 1/4 cup applesauce or yogurt per egg and expect a slightly softer center." },
      { question: "Do flax eggs work in brownies?", answer: "Yes, especially in vegan brownies. They bind well but make the texture denser than real eggs." },
    ],
    relatedSlugs: ["egg-substitute-for-brownies", "egg-substitutes-for-brownie-mix", "substitute-for-2-eggs-in-brownies"],
  };
}

function butterOilPage([keyword, volume, comp, angle]: (typeof butterOilKeywords)[number]): ToolPage {
  const h1 = keyword.replace(/\b\w/g, (m) => m.toUpperCase());
  const reverse = keyword.includes("oil to butter") || keyword.startsWith("conversion oil");
  return {
    slug: slugify(keyword),
    kind: "butter-oil",
    keyword,
    title: `${h1}: Baking Conversion Chart and Formula`,
    description: `Convert butter to oil or oil to butter for cakes, muffins, quick breads, and brownies with cup, tablespoon, and gram ratios.`,
    h1,
    shortAnswer: reverse
      ? "To replace oil with butter, use about 1 1/3 times as much melted butter by volume. For 1/2 cup oil, use about 2/3 cup melted butter."
      : "To replace butter with oil in baking, use about 3/4 as much oil as butter. For 1 cup butter, use 3/4 cup oil.",
    searchVolume: volume,
    competitionIndex: comp,
    angle,
    calculatorTitle: reverse ? "Oil to Butter Formula" : "Butter to Oil Formula",
    calculatorNote: "This works best in cakes, muffins, quick breads, and brownies. It is not ideal for laminated dough, pie crust, or cookies that rely on creamed butter.",
    tables: [
      {
        title: "Butter to Oil Conversion",
        headers: ["Butter", "Oil", "Best for"],
        rows: [
          ["1/4 cup butter", "3 tbsp oil", "Small muffins, snack cakes"],
          ["1/2 cup butter", "6 tbsp oil", "Quick breads, brownies"],
          ["2/3 cup butter", "1/2 cup oil", "Layer cakes"],
          ["1 cup butter", "3/4 cup oil", "Large cakes"],
        ],
      },
      {
        title: "Oil Choice by Flavor",
        headers: ["Oil", "Flavor", "Use it for"],
        rows: [
          ["Canola", "Neutral", "Vanilla cake, muffins"],
          ["Vegetable oil", "Neutral", "Box cake, brownies"],
          ["Olive oil", "Fruity", "Citrus cake, chocolate cake"],
          ["Coconut oil", "Coconut note", "Banana bread, loaf cakes"],
        ],
      },
    ],
    tips: [
      "Use melted butter when converting oil back to butter.",
      "Reduce salt slightly if you use salted butter.",
      "Oil makes cakes moist but does not cream with sugar, so texture changes in cookies.",
    ],
    mistakes: [
      "Using oil in pie crust where solid fat is needed for flakes.",
      "Replacing butter one-for-one with oil; that usually makes the batter greasy.",
      "Using strong olive oil in delicate vanilla recipes.",
    ],
    recipeIdeas: ["chocolate cake", "banana bread", "brownies", "muffins", "quick breads"],
    faqs: [
      { question: "Can I replace butter with oil in cookies?", answer: "Sometimes, but cookies spread differently because oil cannot trap air like creamed butter." },
      { question: "What oil is best for replacing butter?", answer: "Canola or vegetable oil is best when you want neutral flavor. Olive oil works when its flavor fits the recipe." },
      { question: "Is the conversion by weight or volume?", answer: "For home baking, the practical rule is by volume: use 3/4 as much oil as butter." },
    ],
    relatedSlugs: ["butter-to-oil-converter", "oil-to-butter-conversion-calculator", "butter-to-oil-conversion-grams"],
  };
}

function panPage([keyword, volume, comp, angle]: (typeof panKeywords)[number]): ToolPage {
  const h1 = keyword.replace(/\b\w/g, (m) => m.toUpperCase());
  return {
    slug: slugify(keyword),
    kind: "pan-size",
    keyword,
    title: `${h1}: Pan Area, Batter, and Baking Time Guide`,
    description: `Convert cake pan sizes by area and batter volume, with timing notes for round, square, loaf, bundt, and rectangular pans.`,
    h1,
    shortAnswer: "To convert pan sizes, compare pan surface area first. If the new pan area is 25% larger, scale batter by 1.25 or expect a thinner cake and shorter bake.",
    searchVolume: volume,
    competitionIndex: comp,
    angle,
    calculatorTitle: "Pan Size Conversion Formula",
    calculatorNote: "Round pan area = radius x radius x 3.14. Square or rectangle area = length x width. Scale batter by new area divided by original area.",
    tables: [
      {
        title: "Common Cake Pan Areas",
        headers: ["Pan", "Approx. area", "Useful comparison"],
        rows: [
          ["6 inch round", "28 sq in", "About 56% of an 8 inch round"],
          ["8 inch round", "50 sq in", "Standard small layer"],
          ["9 inch round", "64 sq in", "About 28% larger than 8 inch"],
          ["8 inch square", "64 sq in", "Close to 9 inch round"],
          ["9 x 13 inch", "117 sq in", "About 2.3 x an 8 inch round"],
        ],
      },
      {
        title: "Bake Time Adjustment",
        headers: ["Change", "What happens", "Adjustment"],
        rows: [
          ["Wider pan", "Batter is thinner", "Start checking 15-25% earlier"],
          ["Smaller pan", "Batter is deeper", "Lower oven 25F if very deep"],
          ["Bundt pan", "More edge contact", "Check center and inner ring"],
          ["Loaf pan", "Deep batter", "Expect longer bake time"],
        ],
      },
    ],
    tips: [
      "Keep batter depth similar when possible; area alone does not solve very deep pans.",
      "Fill cake pans about 1/2 to 2/3 full unless the recipe says otherwise.",
      "Use parchment when scaling layer cakes; thinner cakes release more easily.",
    ],
    mistakes: [
      "Changing pan size without checking area.",
      "Assuming an 8 inch square equals an 8 inch round; it is about 27% larger.",
      "Keeping the same bake time after making a cake thinner.",
    ],
    recipeIdeas: ["layer cake", "sheet cake", "brownies", "quick bread", "cheesecake"],
    faqs: [
      { question: "How do I convert an 8 inch cake to 6 inch?", answer: "A 6 inch round is about 56% of an 8 inch round, so use about 0.56 times the batter for the same depth." },
      { question: "Can I use a square pan instead of a round pan?", answer: "Yes, if the area is close. An 8 inch square is close to a 9 inch round, not an 8 inch round." },
      { question: "Should I change oven temperature?", answer: "Usually keep the same temperature. Lower it only when the batter is much deeper than the original pan." },
    ],
    relatedSlugs: ["pan-size-converter", "baking-pan-conversion-calculator", "round-pan-to-square-pan-conversion"],
  };
}

function sourdoughPage([keyword, volume, comp, angle]: (typeof sourdoughKeywords)[number]): ToolPage {
  const h1 = keyword.replace(/\b\w/g, (m) => m.toUpperCase());
  return {
    slug: slugify(keyword),
    kind: "sourdough",
    keyword,
    title: `${h1}: Flour, Water, Starter, and Hydration Formula`,
    description: `Calculate sourdough hydration by weight, adjust starter hydration, and understand flour-to-water ratios for bread dough.`,
    h1,
    shortAnswer: "Sourdough hydration is water weight divided by flour weight, then multiplied by 100. A dough with 350g water and 500g flour is 70% hydration.",
    searchVolume: volume,
    competitionIndex: comp,
    angle,
    calculatorTitle: "Sourdough Hydration Formula",
    calculatorNote: "Always calculate hydration by weight, not cups. One cup of water and one cup of flour are not equal weights.",
    tables: [
      {
        title: "Hydration Examples",
        headers: ["Flour", "Water", "Hydration", "Dough feel"],
        rows: [
          ["500g", "300g", "60%", "Stiff, easier to shape"],
          ["500g", "350g", "70%", "Balanced country loaf"],
          ["500g", "375g", "75%", "Open crumb, stickier"],
          ["500g", "400g", "80%", "Wet dough, advanced handling"],
        ],
      },
      {
        title: "Starter Feeding Ratios",
        headers: ["Ratio", "Example", "Use"],
        rows: [
          ["1:1:1", "50g starter + 50g water + 50g flour", "Daily maintenance"],
          ["1:2:2", "25g starter + 50g water + 50g flour", "Longer rise window"],
          ["1:5:5", "10g starter + 50g water + 50g flour", "Warm kitchen or overnight"],
        ],
      },
    ],
    tips: [
      "Include flour and water from the starter when calculating total dough hydration.",
      "Whole wheat flour absorbs more water than white bread flour.",
      "Higher hydration is not automatically better; it requires stronger gluten handling.",
    ],
    mistakes: [
      "Calculating hydration with cup measurements.",
      "Ignoring the starter's flour and water contribution.",
      "Jumping from 65% to 85% hydration before learning dough handling.",
    ],
    recipeIdeas: ["country sourdough", "pizza dough", "starter feeding", "sandwich loaf"],
    faqs: [
      { question: "What is 100% hydration starter?", answer: "It means equal weights of flour and water, such as 50g flour and 50g water." },
      { question: "Is 75% hydration good for beginners?", answer: "It can work, but 65-70% is easier for a first sourdough loaf." },
      { question: "Do I include starter in hydration?", answer: "Yes. For exact dough hydration, include the flour and water inside the starter." },
    ],
    relatedSlugs: ["sourdough-hydration-calculator", "sourdough-starter-hydration-calculator", "sourdough-hydration-formula"],
  };
}

function scalePage([keyword, volume, comp, angle]: (typeof scaleKeywords)[number]): ToolPage {
  const h1 = keyword.replace(/\b\w/g, (m) => m.toUpperCase());
  return {
    slug: slugify(keyword),
    kind: "recipe-scaler",
    keyword,
    title: `${h1}: Scale Ingredients by Servings, Pan, or Batch Size`,
    description: `Scale a recipe up or down with multiplier math, ingredient rounding, egg handling, spices, leavening, and baking notes.`,
    h1,
    shortAnswer: "To scale a recipe, divide the desired yield by the original yield. Multiply every ingredient by that number, then round practical ingredients like eggs and spices carefully.",
    searchVolume: volume,
    competitionIndex: comp,
    angle,
    calculatorTitle: "Recipe Scaling Formula",
    calculatorNote: "Multiplier = new yield / original yield. A recipe for 8 servings scaled to 12 servings uses a 1.5x multiplier.",
    tables: [
      {
        title: "Common Scaling Multipliers",
        headers: ["Original", "New", "Multiplier", "Example"],
        rows: [
          ["8 servings", "4 servings", "0.5x", "Halve every ingredient"],
          ["8 servings", "12 servings", "1.5x", "Use 1.5 times each amount"],
          ["8 servings", "16 servings", "2x", "Double every ingredient"],
          ["9 inch pan", "6 inch pan", "0.44x", "Scale by pan area"],
        ],
      },
      {
        title: "Ingredients That Need Judgment",
        headers: ["Ingredient", "Scaling note", "Why"],
        rows: [
          ["Eggs", "Round or beat and measure by weight", "Half eggs are awkward"],
          ["Salt", "Scale, then taste if savory", "Perception is not perfectly linear"],
          ["Baking powder", "Scale accurately", "Too much causes collapse"],
          ["Spices", "Start slightly low", "Flavor can become harsh"],
        ],
      },
    ],
    tips: [
      "Use grams when possible; scaling cups creates awkward fractions.",
      "For cakes, scale pan area as well as servings.",
      "Write the scaled recipe down before you start mixing.",
    ],
    mistakes: [
      "Doubling oven temperature when doubling a recipe.",
      "Rounding leavening too aggressively.",
      "Forgetting that pan depth changes baking time.",
    ],
    recipeIdeas: ["cookies", "cakes", "pancakes", "muffins", "meal prep"],
    faqs: [
      { question: "Can I double every ingredient exactly?", answer: "Usually yes for weight-based baking, but watch eggs, spices, salt, and pan size." },
      { question: "Does bake time double?", answer: "No. Bake time depends on batter depth and pan size, not just ingredient quantity." },
      { question: "How do I halve one egg?", answer: "Beat the egg, weigh it, and use half by weight. A large egg without shell is about 50g." },
    ],
    relatedSlugs: ["recipe-scaler", "double-recipe-calculator", "halve-recipe-calculator"],
  };
}

function servingPage([keyword, volume, comp, angle]: (typeof servingKeywords)[number]): ToolPage {
  const h1 = keyword.replace(/\b\w/g, (m) => m.toUpperCase());
  return {
    slug: slugify(keyword),
    kind: "cake-serving",
    keyword,
    title: `${h1}: Cake Size, Slice Count, and Party Portions`,
    description: `Estimate cake servings by pan size, cake shape, slice style, and event type with practical portion charts.`,
    h1,
    shortAnswer: "Cake servings depend on slice size. Party slices are larger; wedding slices are smaller. An 8 inch round cake usually serves about 12 party slices or 20 wedding slices.",
    searchVolume: volume,
    competitionIndex: comp,
    angle,
    calculatorTitle: "Cake Serving Estimate",
    calculatorNote: "Use party servings for birthdays and family events. Use wedding servings for narrow, venue-style slices.",
    tables: [
      {
        title: "Round Cake Serving Guide",
        headers: ["Cake size", "Party servings", "Wedding servings"],
        rows: [
          ["6 inch round", "6-8", "10-12"],
          ["8 inch round", "10-12", "18-20"],
          ["9 inch round", "12-16", "22-24"],
          ["10 inch round", "20-24", "28-30"],
        ],
      },
      {
        title: "Serving Variables",
        headers: ["Factor", "Effect", "Practical note"],
        rows: [
          ["Tall cake", "More servings", "Cut thinner slices"],
          ["Single layer", "Fewer servings", "Use party estimates"],
          ["Dessert table", "Fewer needed", "Guests take smaller portions"],
          ["Only dessert", "More needed", "Plan larger slices"],
        ],
      },
    ],
    tips: [
      "For weddings, use narrow slices and a cutting guide.",
      "For children's parties, plan smaller pieces plus a few extras.",
      "Round up when the cake is the only dessert.",
    ],
    mistakes: [
      "Using wedding servings for a casual birthday party.",
      "Ignoring cake height.",
      "Forgetting that sheet cakes cut more predictably than round cakes.",
    ],
    recipeIdeas: ["birthday cake", "wedding cake", "sheet cake", "layer cake"],
    faqs: [
      { question: "How many people does an 8 inch cake serve?", answer: "Usually 10-12 party servings or about 18-20 wedding-style servings." },
      { question: "Why do serving charts disagree?", answer: "They assume different slice sizes and cake heights." },
      { question: "Should I bake extra cake?", answer: "For casual parties, yes. A small buffer is safer than slicing too thin." },
    ],
    relatedSlugs: ["cake-serving-calculator", "cake-serving-size-calculator", "wedding-cake-servings-calculator"],
  };
}

export const toolPages: ToolPage[] = [
  ...buttermilkKeywords.map(buttermilkPage),
  ...eggBrownieKeywords.map(eggPage),
  ...butterOilKeywords.map(butterOilPage),
  ...panKeywords.map(panPage),
  ...sourdoughKeywords.map(sourdoughPage),
  ...scaleKeywords.map(scalePage),
  ...servingKeywords.map(servingPage),
];

export function getToolPage(slug: string): ToolPage | undefined {
  return toolPages.find((page) => page.slug === slug);
}

export const toolCategories: Record<ToolPageKind, { label: string; description: string }> = {
  buttermilk: {
    label: "Buttermilk Substitutes",
    description: "Measured dairy and non-dairy buttermilk swaps for cakes, pancakes, biscuits, and dressings.",
  },
  "egg-brownies": {
    label: "Brownie Egg Substitutes",
    description: "Egg-free brownie ratios for box mixes, vegan brownies, applesauce, yogurt, and flax eggs.",
  },
  "butter-oil": {
    label: "Butter and Oil Converters",
    description: "Butter-to-oil and oil-to-butter conversions for cakes, muffins, brownies, and quick breads.",
  },
  "pan-size": {
    label: "Pan Size Converters",
    description: "Cake pan, tin, rectangle, round, square, loaf, and baking time conversion guides.",
  },
  sourdough: {
    label: "Sourdough Calculators",
    description: "Hydration, flour-water ratios, starter feeding, and dough percentage references.",
  },
  "recipe-scaler": {
    label: "Recipe Scalers",
    description: "Scale recipes up or down by servings, batch size, eggs, leavening, and pan area.",
  },
  "cake-serving": {
    label: "Cake Serving Calculators",
    description: "Estimate party and wedding cake servings by cake size, height, and slice style.",
  },
};

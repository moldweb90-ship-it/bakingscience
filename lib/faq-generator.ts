import { convert, ingredients } from "@/lib/converter";

function decimalToFraction(cups: number): string {
  const base = Math.floor(cups);
  const remainder = cups - base;

  const fractions: [number, string][] = [
    [0, ""],
    [0.125, "\u215B"],
    [0.25, "\u00BC"],
    [0.333, "\u2153"],
    [0.375, "\u215C"],
    [0.5, "\u00BD"],
    [0.625, "\u215D"],
    [0.667, "\u2154"],
    [0.75, "\u00BE"],
    [0.875, "\u215E"],
    [1.0, ""],
  ];

  let bestLabel = "";
  let bestDiff = Infinity;
  let bestWhole = base;

  for (const [val, label] of fractions) {
    const diff = Math.abs(remainder - val);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestLabel = label;
      if (val >= 1.0) bestWhole = base + 1;
    }
  }

  if (bestWhole === 0 && bestLabel) return bestLabel;
  if (bestWhole === 0) return cups.toFixed(2);
  if (!bestLabel) return `${bestWhole}`;
  return `${bestWhole}${bestLabel}`;
}

function cupWord(cups: number): string {
  return cups <= 1 ? "cup" : "cups";
}

function cupPhrase(cups: number): string {
  return `${decimalToFraction(cups)} ${cupWord(cups)}`;
}

function wholeCupPhrase(cups: number): string {
  return `${cups} ${cups === 1 ? "cup" : "cups"}`;
}

function sub(template: string, vars: Record<string, string | number>): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, "g"), String(value));
  }
  return result;
}

export function generateFAQ(
  ingredientId: string,
  weightG: number,
): { question: string; answer: string }[] {
  const ing = ingredients[ingredientId];
  if (!ing) return [];

  const n = ing.nutrition_per_100g;
  const slCups = convert(weightG, ingredientId, "spoon_level");
  const dsCups = convert(weightG, ingredientId, "dip_sweep");
  const sfCups = convert(weightG, ingredientId, "sifted");

  const slFraction = decimalToFraction(slCups.cups);
  const dsFraction = decimalToFraction(dsCups.cups);
  const sfFraction = decimalToFraction(sfCups.cups);

  const gramsPerCup = Math.round(ing.base_density_g_per_ml * 236.588);
  const nearestCups = Math.round(weightG / gramsPerCup);
  const nearestWeight = nearestCups * gramsPerCup;
  const diff = weightG - nearestWeight;
  const moreLess = diff > 0 ? "more" : "less";

  const caloriesPerCup = Math.round((n.calories * gramsPerCup) / 100);
  const totalCalories = Math.round((n.calories * weightG) / 100);
  const totalCarbs = Math.round((n.carbs_g * weightG) / 100 * 10) / 10;
  const totalProtein = Math.round((n.protein_g * weightG) / 100 * 10) / 10;
  const totalFat = Math.round((n.fat_g * weightG) / 100 * 10) / 10;

  const vars = {
    grams: weightG,
    ingredient: ing.name,
    cups: slFraction,
    dsCups: dsFraction,
    sfCups: sfFraction,
    cupPhrase: cupPhrase(slCups.cups),
    dsCupPhrase: cupPhrase(dsCups.cups),
    sfCupPhrase: cupPhrase(sfCups.cups),
    gpc: gramsPerCup,
    calories: totalCalories,
    carbs: totalCarbs,
    protein: totalProtein,
    fat: totalFat,
    caloriesPerCup,
    nearestCups,
    nearestCupPhrase: wholeCupPhrase(nearestCups),
    nearestWeight,
    diff: Math.abs(diff),
    moreLess,
  };

  const faqs: { question: string; answer: string }[] = [];

  // Q1
  faqs.push({
    question: `How many cups is ${weightG}g of ${ing.name.toLowerCase()}?`,
    answer: sub(
      "Using the Spoon & Level method (recommended), {grams}g of {ingredient} equals {cupPhrase}. With the Dip & Sweep method, it's {dsCupPhrase}, and when sifted it measures {sfCupPhrase}. We recommend weighing ingredients for best results, but if you're using measuring cups, the Spoon & Level method is the most accurate.",
      vars,
    ),
  });

  // Q2
  faqs.push({
    question: `Does the measurement method matter for ${ing.name.toLowerCase()}?`,
    answer: sub(
      "Yes, significantly. The same {grams}g of {ingredient} can measure anywhere from {dsCupPhrase} (dip & sweep) to {sfCupPhrase} (sifted) - that's a {variance}% difference. This happens because dip & sweep compresses the ingredient, fitting more into each cup, while sifting aerates it. For consistent baking results, always use the same method your recipe specifies.",
      { ...vars, variance: Math.round(((sfCups.cups - dsCups.cups) / slCups.cups) * 100) },
    ),
  });

  // Q3
  faqs.push({
    question: `How do I measure ${ing.name.toLowerCase()} without a scale?`,
    answer: sub(
      "Use the Spoon & Level method: fluff the {ingredient} in its container first, then lightly spoon it into your measuring cup until slightly overflowing. Level off the top with the flat edge of a knife. Never scoop directly from the bag - this compresses the ingredient and you'll end up with up to 20% more than intended.",
      vars,
    ),
  });

  // Q4
  faqs.push({
    question: `How many grams is 1 cup of ${ing.name.toLowerCase()}?`,
    answer: sub(
      "It depends on how you measure. Using the Spoon & Level method, 1 cup of {ingredient} weighs approximately {gpc}g. With Dip & Sweep, it's heavier at about {dipWeight}g per cup. Sifted {ingredient} is lighter - about {siftedWeight}g per cup. This is why professional bakers prefer weighing ingredients in grams.",
      {
        ...vars,
        dipWeight: Math.round(ing.base_density_g_per_ml * 236.588 * 1.18),
        siftedWeight: Math.round(ing.base_density_g_per_ml * 236.588 * 0.85),
      },
    ),
  });

  // Q5 - depends on grams
  if (diff === 0) {
    faqs.push({
      question: `Is ${weightG}g of ${ing.name.toLowerCase()} the same as ${wholeCupPhrase(nearestCups)}?`,
      answer: sub(
        "Yes! {grams}g of {ingredient} is exactly {nearestCupPhrase} when measured with the Spoon & Level method. This is a common weight used in many baking recipes.",
        vars,
      ),
    });
  } else {
    faqs.push({
      question: `Is ${weightG}g of ${ing.name.toLowerCase()} the same as ${wholeCupPhrase(nearestCups)}?`,
      answer: sub(
        "Not exactly. {nearestCupPhrase} of {ingredient} weighs approximately {nearestWeight}g. {grams}g equals about {cupPhrase} - roughly {diff}g {moreLess} than {nearestCupPhrase}. For precision in baking, it's worth measuring the exact amount rather than rounding to the nearest cup.",
        vars,
      ),
    });
  }

  // Q6 - depends on ingredient type
  if (ing.type === "dry") {
    faqs.push({
      question: `Does sifting ${ing.name.toLowerCase()} change the measurement?`,
      answer: sub(
        "Yes. Sifting introduces air into the {ingredient}, making it lighter and fluffier. One cup of sifted {ingredient} weighs only about {siftedWeight}g, compared to {gpc}g for spoon & level and {dipWeight}g for dip & sweep. If your recipe calls for '1 cup sifted {ingredient},' you need less by weight than '1 cup {ingredient}, sifted.'",
        {
          ...vars,
          dipWeight: Math.round(ing.base_density_g_per_ml * 236.588 * 1.18),
          siftedWeight: Math.round(ing.base_density_g_per_ml * 236.588 * 0.85),
        },
      ),
    });
  } else if (ing.type === "fat") {
    faqs.push({
      question: `Does melted ${ing.name.toLowerCase()} measure differently than solid?`,
      answer: sub(
        "Yes, significantly. When {ingredient} melts, its density changes. {grams}g of solid {ingredient} measures about {cupPhrase}, but when melted it takes up about {meltedCupPhrase} - a {meltedDiff}% difference. Always measure {ingredient} in the state your recipe specifies for accurate results.",
        {
          ...vars,
          meltedCups: decimalToFraction(
            weightG / (ing.base_density_g_per_ml * 236.588 * (ing.states?.melted ?? 0.88)),
          ),
          meltedCupPhrase: cupPhrase(
            weightG / (ing.base_density_g_per_ml * 236.588 * (ing.states?.melted ?? 0.88)),
          ),
          meltedDiff: Math.round(
            ((1 / (ing.states?.melted ?? 0.88) - 1) * 100),
          ),
        },
      ),
    });
  } else {
    faqs.push({
      question: `Does temperature affect ${ing.name.toLowerCase()} measurement?`,
      answer: sub(
        "Slightly. Cold {ingredient} is slightly denser than room temperature {ingredient}, but the difference is small enough that most recipes don't account for it. For the most consistent results, use {ingredient} at the temperature specified in your recipe. One cup of {ingredient} weighs approximately {gpc}g regardless of temperature.",
        vars,
      ),
    });
  }

  // Q7 - ingredient specific
  const specificFAQ = getIngredientSpecificFAQ(ingredientId, vars);
  if (specificFAQ.q7) faqs.push(specificFAQ.q7);

  // Q8 - calories (same template for all)
  faqs.push({
    question: `How many calories are in ${weightG}g of ${ing.name.toLowerCase()}?`,
    answer: sub(
      "{grams}g of {ingredient} contains approximately {calories} calories, {carbs}g carbohydrates, {protein}g protein, and {fat}g fat. Per cup (spoon & level), that's about {caloriesPerCup} calories. Values based on USDA nutritional data.",
      vars,
    ),
  });

  // Q9 - ingredient specific
  if (specificFAQ.q9) faqs.push(specificFAQ.q9);

  return faqs;
}

function getIngredientSpecificFAQ(
  id: string,
  v: Record<string, string | number>,
): { q7?: { question: string; answer: string }; q9?: { question: string; answer: string } } {
  const faqs: Record<string, { q7?: { question: string; answer: string }; q9?: { question: string; answer: string } }> = {
    "all-purpose-flour": {
      q7: {
        question: "What's the difference between all-purpose flour and bread flour by weight?",
        answer: sub(
          "All-purpose flour and bread flour have similar weights per cup (about {gpc}g for spoon & level), but bread flour has higher protein content (12-14% vs 10-12%). This means they measure the same by volume but behave differently in recipes. Bread flour absorbs more water and creates more gluten, so substituting may require adjustments.",
          v,
        ),
      },
      q9: {
        question: "Can I substitute cake flour for all-purpose flour?",
        answer: sub(
          "You can, but measurements change. Cake flour is lighter with lower protein (7-9% vs 10-12%), so 1 cup of cake flour weighs about 110g compared to {gpc}g for all-purpose. To substitute: use 1 cup plus 2 tablespoons of cake flour for every 1 cup of all-purpose flour.",
          v,
        ),
      },
    },
    "bread-flour": {
      q7: {
        question: "Why does bread flour weigh more per cup than all-purpose flour?",
        answer: sub(
          "Bread flour is milled from hard wheat with higher protein content, making it denser. One cup of bread flour weighs about {gpc}g vs 125g for all-purpose flour. The higher protein (12-14%) creates stronger gluten networks, which is ideal for chewy breads and pizza dough.",
          v,
        ),
      },
      q9: {
        question: "Can I substitute all-purpose flour for bread flour?",
        answer: sub(
          "Yes, but your bread will have less chew and structure. For every cup of bread flour, substitute 1 cup minus 1 tablespoon of all-purpose flour plus 1 tablespoon of vital wheat gluten. By weight, use the same amount - {grams}g of all-purpose flour instead of {grams}g of bread flour.",
          v,
        ),
      },
    },
    "cake-flour": {
      q7: {
        question: "Why is cake flour lighter than all-purpose flour?",
        answer: sub(
          "Cake flour has lower protein (7-9%) and is more finely milled, creating a lighter, more airy texture. One cup of cake flour weighs about {gpc}g vs 125g for all-purpose flour. This means you need more cups of cake flour to reach the same weight.",
          v,
        ),
      },
      q9: {
        question: "Can I make cake flour from all-purpose flour at home?",
        answer: sub(
          "Yes. For every cup of cake flour needed, take 1 cup of all-purpose flour, remove 2 tablespoons, and add 2 tablespoons of cornstarch. Sift together 5-6 times. The weight per cup will be similar to commercial cake flour at about {gpc}g.",
          v,
        ),
      },
    },
    "whole-wheat-flour": {
      q7: {
        question: "Is whole wheat flour heavier than all-purpose flour?",
        answer: sub(
          "Whole wheat flour is actually slightly lighter per cup than all-purpose flour - about {gpc}g vs 125g. This is because the bran particles create air pockets. However, whole wheat absorbs more liquid, so recipes often need extra moisture when substituting.",
          v,
        ),
      },
      q9: {
        question: "Can I substitute whole wheat flour for all-purpose flour?",
        answer: sub(
          "You can substitute up to 50% whole wheat flour in most recipes. For 100% substitution, increase liquid by 2 tablespoons per cup and expect a denser result. By weight, use the same amount - {grams}g of whole wheat instead of {grams}g of all-purpose.",
          v,
        ),
      },
    },
    "almond-flour": {
      q7: {
        question: "Is almond flour the same as almond meal?",
        answer: sub(
          "No. Almond flour is made from blanched (skinless) almonds and is finely ground. Almond meal includes the skins and is coarser. They have similar weights per cup (about {gpc}g), but almond flour produces finer, more tender results in baking.",
          v,
        ),
      },
      q9: {
        question: "Can I substitute almond flour for all-purpose flour?",
        answer: sub(
          "Not directly. Almond flour has no gluten, so it can't replace all-purpose flour 1:1. Use about 25% less almond flour by weight. For {grams}g of all-purpose flour, use about {almondGrams}g of almond flour and add an extra egg as a binder.",
          { ...v, almondGrams: Math.round((v.grams as number) * 0.75) },
        ),
      },
    },
    "coconut-flour": {
      q7: {
        question: "Why does coconut flour absorb so much liquid?",
        answer: sub(
          "Coconut flour is made from dried, ground coconut meat that's had most of its oil removed. The remaining fiber is extremely absorbent - it can soak up 4-6 times its weight in liquid. One cup of coconut flour weighs about {gpc}g but behaves very differently from wheat flour.",
          v,
        ),
      },
      q9: {
        question: "Can I substitute coconut flour for all-purpose flour?",
        answer: sub(
          "Not 1:1. Use only about 25% of the all-purpose flour amount in coconut flour. For {grams}g of all-purpose flour, use about {coconutGrams}g of coconut flour. You'll also need to add extra eggs (usually 1 extra egg per 1/4 cup of coconut flour).",
          { ...v, coconutGrams: Math.round((v.grams as number) * 0.25) },
        ),
      },
    },
    "granulated-sugar": {
      q7: {
        question: "Does brown sugar weigh the same as white sugar per cup?",
        answer: sub(
          "No. Packed brown sugar weighs about 220g per cup, while granulated white sugar weighs about {gpc}g per cup. Brown sugar is denser due to moisture from molasses. Always pack brown sugar firmly when measuring by volume.",
          v,
        ),
      },
      q9: {
        question: "Can I substitute honey for granulated sugar by weight?",
        answer: sub(
          "Not 1:1. Honey is about 25% water, so use 75% of the sugar weight in honey. For {grams}g of sugar, use about {honeyGrams}g of honey. Also reduce other liquids in the recipe by about 25% and lower oven temperature by 25\u00b0F.",
          { ...v, honeyGrams: Math.round((v.grams as number) * 0.75) },
        ),
      },
    },
    "brown-sugar": {
      q7: {
        question: "Should I pack brown sugar when measuring?",
        answer: sub(
          "Yes. Brown sugar should be packed firmly into the measuring cup unless the recipe says otherwise. Packed brown sugar weighs about 220g per cup. If you don't pack it, you'll get about 15% less sugar than the recipe expects, which can affect texture and sweetness.",
          v,
        ),
      },
      q9: {
        question: "What can I substitute for brown sugar?",
        answer: sub(
          "Mix {grams}g of granulated sugar with 1-2 tablespoons of molasses. For light brown sugar, use 1 tablespoon molasses. For dark brown sugar, use 2 tablespoons. Alternatively, you can use an equal weight of coconut sugar, which has a similar flavor profile.",
          v,
        ),
      },
    },
    "powdered-sugar": {
      q7: {
        question: "Is powdered sugar the same as confectioners sugar?",
        answer: sub(
          "Yes, powdered sugar and confectioners sugar (also called icing sugar) are the same product. One cup weighs about {gpc}g. It contains about 3% cornstarch to prevent clumping, which can slightly affect thickening in recipes.",
          v,
        ),
      },
      q9: {
        question: "Can I make powdered sugar from granulated sugar?",
        answer: sub(
          "Yes. Blend granulated sugar in a high-speed blender or food processor for 30-60 seconds until it reaches a fine powder. Add 1 teaspoon of cornstarch per cup to prevent clumping. The weight stays the same - {grams}g of granulated sugar makes {grams}g of powdered sugar.",
          v,
        ),
      },
    },
    "honey": {
      q7: {
        question: "Does honey weigh more than sugar per cup?",
        answer: sub(
          "Yes, significantly. One cup of honey weighs about 337g, while one cup of granulated sugar weighs about 200g. Honey is denser because it's a liquid with no air pockets. When substituting honey for sugar by volume, you're adding much more sweetener by weight.",
          v,
        ),
      },
      q9: {
        question: "Can I substitute honey for granulated sugar in baking?",
        answer: sub(
          "Use about 75% of the sugar weight in honey. For {grams}g of sugar, use about {honeyGrams}g of honey. Reduce other liquids by 25% and lower oven temperature by 25\u00b0F. Honey also browns faster, so watch your baked goods carefully.",
          { ...v, honeyGrams: Math.round((v.grams as number) * 0.75) },
        ),
      },
    },
    "butter": {
      q7: {
        question: "Does salted butter weigh the same as unsalted butter?",
        answer: sub(
          "Yes, salted and unsalted butter weigh the same - about {gpc}g per cup. The only difference is roughly 1.5-2g of salt per stick (113g). For baking, unsalted is preferred so you can control the salt content precisely.",
          v,
        ),
      },
      q9: {
        question: "Can I substitute oil for butter by weight?",
        answer: sub(
          "Not directly. Butter is about 80% fat and 20% water/milk solids, while oil is 100% fat. Use about 80% of the butter weight in oil. For {grams}g of butter, use about {oilGrams}g of oil.",
          { ...v, oilGrams: Math.round((v.grams as number) * 0.8) },
        ),
      },
    },
    "coconut-oil": {
      q7: {
        question: "Does coconut oil weigh the same as butter?",
        answer: sub(
          "Close but not exactly. One cup of coconut oil weighs about {gpc}g, while one cup of butter weighs about 227g. Coconut oil is 100% fat, while butter is about 80% fat. When substituting, use about 80% of the butter weight in coconut oil.",
          v,
        ),
      },
      q9: {
        question: "Can I substitute coconut oil for butter in baking?",
        answer: sub(
          "Yes, at about 80% of the butter weight. For {grams}g of butter, use about {coconutGrams}g of coconut oil. Coconut oil is solid below 76\u00b0F, so use it in the same state (solid or melted) that the recipe specifies for butter.",
          { ...v, coconutGrams: Math.round((v.grams as number) * 0.8) },
        ),
      },
    },
    "vegetable-oil": {
      q7: {
        question: "Does vegetable oil weigh the same as butter?",
        answer: sub(
          "No. One cup of vegetable oil weighs about {gpc}g, while one cup of butter weighs about 227g. Oil is 100% fat, while butter is about 80% fat with water and milk solids. This affects both weight and baking behavior.",
          v,
        ),
      },
      q9: {
        question: "Can I substitute vegetable oil for butter?",
        answer: sub(
          "Use about 80% of the butter weight in oil. For {grams}g of butter, use about {oilGrams}g of vegetable oil. Oil will make baked goods more moist but less flavorful. It works best in cakes and muffins, less well in cookies.",
          { ...v, oilGrams: Math.round((v.grams as number) * 0.8) },
        ),
      },
    },
    "olive-oil": {
      q7: {
        question: "Can I use olive oil instead of vegetable oil in baking?",
        answer: sub(
          "Yes, they weigh about the same per cup (olive oil: {gpc}g, vegetable oil: 218g). Extra virgin olive oil adds a fruity flavor that works well in focaccia, olive oil cakes, and some breads. For neutral flavor, use light or refined olive oil.",
          v,
        ),
      },
      q9: {
        question: "Can I substitute olive oil for butter?",
        answer: sub(
          "Use about 80% of the butter weight in olive oil. For {grams}g of butter, use about {oilGrams}g of olive oil. Extra virgin olive oil adds a distinct flavor - great for savory breads and Mediterranean-style cakes.",
          { ...v, oilGrams: Math.round((v.grams as number) * 0.8) },
        ),
      },
    },
    "whole-milk": {
      q7: {
        question: "Does whole milk weigh the same as water?",
        answer: sub(
          "Close but not exactly. One cup of whole milk weighs about {gpc}g, while one cup of water weighs 236.6g. Milk is slightly denser due to dissolved solids (fat, protein, sugar). For most baking purposes, the difference is negligible.",
          v,
        ),
      },
      q9: {
        question: "Can I substitute buttermilk for whole milk?",
        answer: sub(
          "Yes, 1:1 by weight. {grams}g of buttermilk can replace {grams}g of whole milk. Buttermilk is slightly more acidic, which activates baking soda and creates a tender crumb. It's an excellent substitute in cakes, muffins, and pancakes.",
          v,
        ),
      },
    },
    "heavy-cream": {
      q7: {
        question: "Does heavy cream weigh the same as milk?",
        answer: sub(
          "Close. One cup of heavy cream weighs about {gpc}g, while whole milk weighs about 244g per cup. Heavy cream has more fat (36%+) and less water, making it slightly less dense. Both can be substituted in many recipes with texture differences.",
          v,
        ),
      },
      q9: {
        question: "Can I thin heavy cream to make a milk substitute?",
        answer: sub(
          "Yes. Mix heavy cream with water or milk in a 1:1 ratio to approximate whole milk. For {grams}g of whole milk, use about {creamGrams}g of heavy cream plus {waterGrams}g of water. The fat content will be slightly higher but close enough for most baking.",
          { ...v, creamGrams: Math.round((v.grams as number) * 0.5), waterGrams: Math.round((v.grams as number) * 0.5) },
        ),
      },
    },
    "sour-cream": {
      q7: {
        question: "Does sour cream weigh the same as yogurt?",
        answer: sub(
          "Close. One cup of sour cream weighs about {gpc}g, while plain yogurt weighs about 245g per cup. They can often be substituted 1:1 by weight in baking. Both add moisture, acidity, and tenderness to cakes and muffins.",
          v,
        ),
      },
      q9: {
        question: "Can I substitute Greek yogurt for sour cream?",
        answer: sub(
          "Yes, 1:1 by weight. {grams}g of Greek yogurt can replace {grams}g of sour cream in most baking recipes. Greek yogurt has slightly more protein and less fat, but the results are very similar in cakes, muffins, and quick breads.",
          v,
        ),
      },
    },
    "cocoa-powder": {
      q7: {
        question: "Does cocoa powder weigh the same after sifting?",
        answer: sub(
          "No. Sifted cocoa powder is about 15% lighter per cup. One cup of unsifted cocoa weighs about {gpc}g, while sifted cocoa weighs about {siftedWeight}g. Always sift cocoa powder before measuring for the most accurate results, as it tends to clump.",
          { ...v, siftedWeight: Math.round(ingredients[id]?.base_density_g_per_ml * 236.588 * 0.85) },
        ),
      },
      q9: {
        question: "What's the difference between natural and Dutch-processed cocoa?",
        answer: sub(
          "They weigh the same per cup (about {gpc}g), but have different pH levels. Natural cocoa is acidic (pH 5-6) and pairs with baking soda. Dutch-processed cocoa is alkalized (pH 7-8) and pairs with baking powder. They're not always interchangeable in recipes.",
          v,
        ),
      },
    },
    "rolled-oats": {
      q7: {
        question: "Are rolled oats the same as instant oats by weight?",
        answer: sub(
          "They weigh the same per cup (about {gpc}g), but instant oats are more finely cut and absorb liquid faster. In baking, rolled oats (old-fashioned) provide better texture. Instant oats can make baked goods gummy if substituted 1:1.",
          v,
        ),
      },
      q9: {
        question: "Can I make oat flour from rolled oats?",
        answer: sub(
          "Yes. Pulse rolled oats in a food processor until finely ground. 1 cup of rolled oats makes about 3/4 cup of oat flour. By weight, {grams}g of rolled oats makes {grams}g of oat flour. Oat flour has no gluten, so it works best combined with other flours.",
          v,
        ),
      },
    },
    "cornstarch": {
      q7: {
        question: "Is cornstarch the same as corn flour?",
        answer: sub(
          "No. Cornstarch is pure starch extracted from corn, while corn flour is finely ground whole corn. One cup of cornstarch weighs about {gpc}g. They're not interchangeable - cornstarch is a thickener, while corn flour is used for baking.",
          v,
        ),
      },
      q9: {
        question: "How much cornstarch do I need to thicken a recipe?",
        answer: sub(
          "Use 1 tablespoon of cornstarch per cup of liquid for medium thickness. By weight, that's about 8g of cornstarch per 240ml of liquid. Mix cornstarch with cold liquid first to prevent lumps, then add to the hot mixture.",
          v,
        ),
      },
    },
  };

  return faqs[id] || {};
}

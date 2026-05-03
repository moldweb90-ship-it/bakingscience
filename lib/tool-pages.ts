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

type KeywordTuple = readonly [string, 50 | 500 | 5000 | 50000, number, string];

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

function titleCase(value: string): string {
  return value.replace(/\b\w/g, (m) => m.toUpperCase());
}

function buttermilkDescription(keyword: string, amount: string, nonDairy: boolean, dairySwap: boolean): string {
  if (keyword.includes("fried chicken")) {
    return "Use a practical buttermilk swap for fried chicken marinades, with acidity, thickness, and timing notes that still tenderize well.";
  }
  if (keyword.includes("ranch") || keyword.includes("dressing") || keyword.includes("coleslaw")) {
    return "Mix a tangy buttermilk-style dressing base with the right dairy, acid, and thickness for ranch, slaw, and salad dressings.";
  }
  if (keyword.includes("red velvet")) {
    return "Choose a buttermilk replacement for red velvet cake that keeps the crumb tender and preserves the recipe's mild acidity.";
  }
  if (keyword.includes("biscuit") || keyword.includes("pancake") || keyword.includes("waffle")) {
    return `Make ${amount} of buttermilk-style liquid for tender biscuits, pancakes, or waffles without throwing off the batter.`;
  }
  if (nonDairy) {
    return "Make a dairy-free buttermilk substitute with unsweetened plant milk, measured acid, resting time, and baking notes.";
  }
  if (dairySwap) {
    return "Compare yogurt, kefir, sour cream, half-and-half, and soured milk so the substitute matches the recipe's texture.";
  }
  return `Make ${amount} of buttermilk substitute with a measured acid-to-milk ratio, resting time, and recipe-specific cautions.`;
}

function eggDescription(keyword: string): string {
  if (/betty|ghirardelli|pillsbury/.test(keyword)) {
    return "Adjust boxed brownie mix without eggs while keeping the center moist, the edges set, and the chocolate flavor clean.";
  }
  if (keyword.includes("flax")) {
    return "Use flax eggs in brownies with the right water ratio, gel time, and texture expectations for a denser vegan pan.";
  }
  if (keyword.includes("applesauce")) {
    return "Use unsweetened applesauce as a brownie egg replacement when you want a soft, fudgy center without banana flavor.";
  }
  if (keyword.includes("yogurt")) {
    return "Use yogurt instead of eggs in brownies when you want moisture, a slightly cakier bite, and a simple cup-for-egg ratio.";
  }
  if (keyword.includes("gluten")) {
    return "Pick an egg replacement for gluten-free brownies that adds moisture without making the batter fragile or gummy.";
  }
  if (keyword.includes("2 eggs")) {
    return "Replace two eggs in brownies with measured applesauce, yogurt, or flax eggs and adjust for a reliable boxed-mix texture.";
  }
  return "Choose the right brownie egg substitute by texture: fudgy applesauce, richer yogurt, or flax egg for vegan binding.";
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

const lowTailExpansionLines = `
1 cup oil to butter conversion|0
23cm square cake tin convert to round|0
250g butter to oil conversion|0
6 inch cake pan conversion|0
8 inch cake pan conversion|0
8 inch to 10 inch cake conversion|0
8 inch to 6 inch cake conversion|0
9 inch cake pan conversion|0
almond milk buttermilk recipe|0
baking dish conversion chart|0
baking pan time conversion chart|0
baking time conversion pan size|0
baking tin size conversion calculator|0
betty crocker brownie mix egg substitute|0
bob's red mill egg replacer in brownies|0
brownie mix with yogurt instead of eggs|0
brownie recipe with applesauce instead of eggs|0
brownies with yogurt instead of eggs|0
bundt cake to loaf pan conversion|0
butter conversion to oil|0
butter to canola oil conversion|0
butter to oil conversion grams|0
butter to vegetable oil conversion grams|0
buttermilk alternative almond milk|0
buttermilk as milk substitute|0
buttermilk biscuit mix substitute|0
buttermilk dill seasoning substitute|0
buttermilk egg replacement|0
buttermilk egg substitute|0
buttermilk for egg substitute|0
buttermilk for milk substitute|0
buttermilk powder replacement|0
buttermilk substitute evaporated milk|0
buttermilk substitute oat milk|0
buttermilk substitute powdered milk|0
cake pan converter calculator|0
cake pan size conversion|0
cake pan volume conversion|0
cake serving calculator|0
cake serving size calculator|0
cake size conversion|0
cake size conversion chart|0
cake tin conversion|0
cake tin conversion calculator|0
cake tin conversion chart|0
cake tin size conversion chart|0
chickpea flour brownies with eggs|0
conversion chart for baking pan sizes|0
conversion oil to butter|0
convert 6 inch cake recipe to 8 inch|0
convert 8 inch cake recipe to 6 inch|0
convert 8 inch cake recipe to 9 inch|0
convert 8 inch cake to 6 inch|0
convert 9 inch cake to 6 inch|0
convert 9x13 recipe to 11x15|0
convert baking time 8x8 to 9x13|0
convert pie recipe to 9x13|0
convert round cake tin to rectangle|0
converting cake recipes for different size pans|0
converting round cake tins to square|0
cultured buttermilk blend powder substitute|0
dairy free substitute buttermilk|0
egg substitute buttermilk|0
egg substitute for gluten free brownies|0
flax egg brownies|0
flaxseed egg substitute brownies|0
fried chicken with milk instead of buttermilk|0
homemade sour cream with buttermilk|0
irish soda bread with yogurt instead of buttermilk|0
just egg vegan brownies|0
keikos cake pan conversion|0
keto buttermilk substitute|0
loaf pan conversion|0
loaf tin to round tin conversion|0
making vegan buttermilk|0
oat milk instead of buttermilk|0
oil to butter conversion grams|0
pan conversion chart|0
pillsbury brownie mix without eggs|0
red velvet cake with yogurt instead of buttermilk|0
replacement for buttermilk powder|0
rice milk buttermilk|0
round cake tin to loaf tin conversion|0
round pan to square pan conversion|0
sourdough bread hydration calculator|0
sourdough starter hydration calculator|0
square cake tin to round conversion|0
square pan to round pan conversion|0
square to round cake tin conversion|0
substitute buttermilk powder for dry milk|0
substitute for buttermilk powder in baking|0
substitute for vinegar in red velvet cake|0
substitute sourdough starter for buttermilk|0
substitution for buttermilk powder|0
using buttermilk instead of milk in cake|0
vegan alternative buttermilk|0
vegan brownies with egg replacer|0
vegan egg substitute for baking brownies|0
wedding cake servings calculator|0
8 inch round cake pan volume|1
brownies with applesauce instead of egg|1
brownies with egg replacer|1
buttermilk substitute kefir|1
buttermilk substitute lactose free|1
buttermilk substitute with lactose free milk|1
cake batter conversion chart|1
cake pan volume|1
dried buttermilk substitute|1
greek yogurt instead of buttermilk|1
kefir as buttermilk substitute|1
non dairy buttermilk substitute for fried chicken|1
plant based buttermilk substitute|1
soda bread using yogurt instead of buttermilk|1
sour cream to buttermilk conversion|1
sourdough hydration formula|1
sub buttermilk for milk|1
brownie egg replacement|2
brownie mix vegan substitute for eggs|2
buttermilk as egg substitute|2
buttermilk instead of sour cream|2
buttermilk substitute without milk|2
evaporated milk and vinegar for buttermilk|2
keto substitute for buttermilk|2
oat milk substitute for buttermilk|2
pan size converter|2
replace milk with buttermilk|2
sour cream instead of buttermilk|2
sub kefir for buttermilk|2
substitute buttermilk for whole milk|2
substitute sour milk for buttermilk|2
vegan sub for buttermilk|2
buttermilk substitute biscuits|3
buttermilk substitute cream of tartar|3
whole milk substitute for buttermilk|3
buttermilk replacement fried chicken|4
buttermilk substitute for frying|4
buttermilk substitute for red velvet cake|4
ghirardelli brownie mix egg substitute|4
lactose free alternative to buttermilk|4
substitute for buttermilk in red velvet cake|4
substitute for eggs when baking brownies|4
use yogurt instead of buttermilk|4
vegan buttermilk almond milk|4
yogurt instead of buttermilk|4
yogurt sub for buttermilk|4
buttermilk powder substitute dairy free|5
buttermilk substitute for chicken marinade|5
buttermilk substitute with oat milk|5
cant find buttermilk|5
cream instead of buttermilk|5
dairy free sub for buttermilk|5
fried chicken buttermilk substitute|5
low carb buttermilk substitute|5
recipe scaler online|5
substitute for buttermilk in cupcakes|5
substitute for eggs in brownie batter|5
yogurt in place of buttermilk|5
3 4 buttermilk substitute|6
alternative for buttermilk for fried chicken|6
buttermilk substitute using sour cream|6
oat milk buttermilk substitute|6
vegan substitute for buttermilk powder|6
yogurt and milk substitute for buttermilk|6
1 4 buttermilk substitute|7
alternative for buttermilk for baking|7
buttermilk marinade substitute|7
buttermilk substitute for lactose intolerance|7
dairy free buttermilk substitute for baking|7
healthy buttermilk substitute|7
buttermilk using sour cream|8
making buttermilk from yogurt|8
vegan buttermilk powder substitute|8
alternative to buttermilk for fried chicken|9
buttermilk substitute for chicken|9
replace buttermilk with|9
replace buttermilk with sour cream|9
substitute sour cream for buttermilk in baking|9
buttermilk cream of tartar|10
buttermilk substitute cream|10
buttermilk substitute using almond milk|10
substitute for buttermilk fried chicken|10
substitute oat milk for buttermilk|10
almond milk to buttermilk|11
alternative to eggs in brownies|11
butter milk substitute for heavy cream|11
buttermilk in cake instead of milk|11
cultured buttermilk substitute|11
egg replacement for box brownies|11
evaporated milk substitute for buttermilk|11
goat milk buttermilk|11
substitute for eggs in betty crocker brownies|11
vegan substitute for buttermilk in baking|11
2 cups buttermilk substitute|12
buttermilk substitute for coleslaw|12
egg substitute for box brownies|12
make buttermilk with sour cream|12
non dairy buttermilk substitute baking|12
non dairy substitute for buttermilk in fried chicken|12
1 cup milk to buttermilk|13
buttermilk non dairy alternative|13
buttermilk substitute 1 cup|13
egg substitute for vegan brownies|13
replace buttermilk with milk|13
sub greek yogurt for buttermilk|13
substitute yogurt for buttermilk in baking|13
vegan brownie egg substitute|13
vegan brownies egg replacer|13
vegan egg replacement for brownies|13
best vegan substitute for buttermilk|14
buttermilk keto substitute|14
buttermilk replacement for pancakes|14
egg and oil substitute in brownies|14
full fat buttermilk substitute|14
loaf pan size conversion|14
substitute for buttermilk dairy free|14
substitute for buttermilk in ranch dressing|14
substitute for buttermilk without milk|14
substitute for egg in box brownies|14
best sub for buttermilk|15
buttermilk replacement for fried chicken|15
buttermilk substitute for marinade|15
dried buttermilk powder substitute|15
instead of buttermilk|15
sub sour cream for buttermilk|15
buttermilk substitute how to make buttermilk|16
out of buttermilk what can i use|16
replacement for buttermilk in fried chicken|16
substitute evaporated milk for buttermilk|16
1 2 buttermilk substitute|17
alternative for eggs in brownie mix|17
buttermilk replacement for cake|17
egg substitute for boxed brownie mix|17
milk plus vinegar buttermilk|17
one cup buttermilk substitute|17
substitute for buttermilk in waffles|17
substitute yogurt for buttermilk in pancakes|17
best substitute for egg in brownies|18
brownie mix substitute for eggs|18
closest thing to buttermilk|18
nonfat buttermilk substitute|18
buttermilk substitute lemon|50|19
don t have buttermilk|50|19
keto buttermilk alternative|50|19
brownie mix egg replacement|50|20
buttermilk white vinegar|50|20
casserole dish size conversion|50|21
substitute for buttermilk ranch dressing|50|21
egg substitute for brownie box mix|50|22
egg substitute for brownies box mix|50|22
in place of buttermilk|50|22
substitute for one egg in brownies|50|22
quick buttermilk substitute|50|23
sub for buttermilk in biscuits|50|23
substitute for buttermilk in cornbread recipe|50|23
substitute for whole buttermilk|50|23
if a recipe calls for buttermilk what can i substitute|50|24
if you don t have buttermilk|50|24
replacement to buttermilk|50|24
sub for egg in brownies|50|24
use instead of buttermilk|50|24
best vegan egg substitute for brownies|50|25
good buttermilk substitute|50|25
a replacement for buttermilk|50|26
a substitute for buttermilk|50|26
baking pan conversion sizes|50|26
i don t have buttermilk what can i substitute|50|27
buttermilk baking mix substitute|50|28
buttermilk equivalent|50|28
best buttermilk substitute for cake|50|29
buttermilk baking blend|50|29
buttermilk substitute chicken|50|29
substitute for buttermilk in salad dressing|50|30
buttermilk equivalent to milk|50|31
buttermilk substitute white vinegar|50|31
if no buttermilk what can i use|50|32
baking pan conversion calculator|500|0
butter to oil conversion baking|500|0
buttermilk instead of heavy cream|500|0
cake pan conversion|500|0
cake pan conversion chart|500|0
oil to butter conversion calculator|500|0
olive oil to butter conversion|500|0
baking pan conversion|500|1
baking pan conversion chart|500|1
milk for buttermilk substitute|500|1
recipe scaler|500|1
use buttermilk instead of milk|500|1
1 4 cup buttermilk substitute|500|2
buttermilk substitute for ranch dressing|500|2
diy buttermilk substitute|500|2
buttermilk instead of milk|500|3
milk instead of buttermilk|500|3
sour cream and buttermilk|500|3
sour cream buttermilk|500|3
almond milk buttermilk substitute|500|4
buttermilk substitute half and half|500|4
egg substitutes for brownie mix|500|4
3 4 cup buttermilk substitute|500|5
almond milk buttermilk|500|5
buttermilk using almond milk|500|5
kefir buttermilk substitute|500|5
make buttermilk from almond milk|500|5
1 2 cup buttermilk substitute|500|6
homemade buttermilk substitute|500|7
low fat buttermilk substitute|500|7
low fat substitute for buttermilk|500|7
buttermilk greek yogurt substitute|500|8
buttermilk substitute greek yogurt|500|8
buttermilk substitute with greek yogurt|500|8
make buttermilk substitute|500|8
substitute for 2 eggs in brownies|500|8
buttermilk replacement yogurt|500|9
buttermilk substitute with yogurt|500|9
non dairy alternative to buttermilk|500|9
non dairy buttermilk replacement|500|9
non dairy buttermilk substitute|500|9
non dairy sub for buttermilk|500|9
sub yogurt for buttermilk|500|9
substitute for buttermilk non dairy|500|9
yogurt milk buttermilk substitute|500|9
buttermilk substitute for soda bread|500|10
substitute for buttermilk in soda bread|500|10
1 cup buttermilk substitute|500|13
i don t have buttermilk|500|13
buttermilk powder alternative|500|14
buttermilk powder substitute|500|14
buttermilk substitute milk and vinegar|500|14
buttermilk substitute vinegar|500|14
substitute for buttermilk powdered milk|500|14
buttermilk substitute no milk|500|15
no buttermilk substitute|500|15
buttermilk substitute for cornbread|500|16
buttermilk substitute for pancakes|500|16
cornbread buttermilk substitute|500|16
egg substitute baking brownies|500|16
brownie mix egg substitute|500|17
egg replacement brownie mix|500|17
egg replacement for brownie mix|500|17
non dairy butter milk|500|17
replacement for buttermilk in cake|500|18
sub for buttermilk in cake|500|18
alternative for buttermilk in cake|500|20
best buttermilk substitute|500|20
buttermilk substitute cake|500|20
if i don t have buttermilk what can i use|500|20
if i dont have buttermilk what can i use|500|20
best egg replacement for brownies|500|23
best egg substitute for brownies|500|23
buttermilk substitute for biscuits|500|23
buttermilk substitute in biscuits|500|23
if you don t have buttermilk what can you use|500|24
lemon milk buttermilk|500|27
milk and lemon juice buttermilk|500|28
buttermilk conversion|500|30
milk to buttermilk conversion|500|30
sourdough hydration calculator|5000|0
butter for oil conversion|5000|1
butter to oil converter|5000|1
buttermilk substitute lemon juice|5000|1
`.trim();

function lowTailExpansionKeywords(): KeywordTuple[] {
  return lowTailExpansionLines.split("\n").map((line) => {
    const parts = line.split("|");
    const keyword = parts[0];
    const volume = parts.length === 3 ? Number(parts[1]) : 50;
    const comp = parts.length === 3 ? Number(parts[2]) : Number(parts[1]);
    return [keyword, volume as 50 | 500 | 5000 | 50000, comp, "low-tail expansion"] as const;
  });
}

function buttermilkPage([keyword, volume, comp, angle]: KeywordTuple): ToolPage {
  const amount = cupAmountFromKeyword(keyword);
  const acid = acidForButtermilk(amount);
  const nonDairy = /almond|non dairy|vegan|dairy/.test(keyword);
  const dairySwap = /greek|yogurt|sour cream|kefir|half and half|heavy cream/.test(keyword);
  const h1 = titleCase(keyword);
  return {
    slug: slugify(keyword),
    kind: "buttermilk",
    keyword,
    title: `${h1}: Exact Substitute Ratios for Baking`,
    description: buttermilkDescription(keyword, amount, nonDairy, dairySwap),
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

function eggPage([keyword, volume, comp, angle]: KeywordTuple): ToolPage {
  const h1 = titleCase(keyword);
  const twoEggs = keyword.includes("2 eggs");
  const brand = /betty|ghirardelli|pillsbury/.test(keyword);
  return {
    slug: slugify(keyword),
    kind: "egg-brownies",
    keyword,
    title: `${h1}: Best Egg Replacements That Still Set`,
    description: eggDescription(keyword),
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

function butterOilPage([keyword, volume, comp, angle]: KeywordTuple): ToolPage {
  const h1 = titleCase(keyword);
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

function panPage([keyword, volume, comp, angle]: KeywordTuple): ToolPage {
  const h1 = titleCase(keyword);
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

function sourdoughPage([keyword, volume, comp, angle]: KeywordTuple): ToolPage {
  const h1 = titleCase(keyword);
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

function scalePage([keyword, volume, comp, angle]: KeywordTuple): ToolPage {
  const h1 = titleCase(keyword);
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

function servingPage([keyword, volume, comp, angle]: KeywordTuple): ToolPage {
  const h1 = titleCase(keyword);
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
  ...new Map(
    [
      ...buttermilkKeywords.map(buttermilkPage),
      ...eggBrownieKeywords.map(eggPage),
      ...butterOilKeywords.map(butterOilPage),
      ...panKeywords.map(panPage),
      ...sourdoughKeywords.map(sourdoughPage),
      ...scaleKeywords.map(scalePage),
      ...servingKeywords.map(servingPage),
      ...lowTailExpansionKeywords().map((tuple) => {
        const keyword = tuple[0].toLowerCase();
        if (keyword.includes("sourdough")) return sourdoughPage(tuple);
        if (keyword.includes("serving") || keyword.includes("wedding cake")) return servingPage(tuple);
        if (keyword.includes("recipe scaler") || keyword.includes("double recipe") || keyword.includes("halve recipe")) {
          return scalePage(tuple);
        }
        if (
          keyword.includes("pan") ||
          keyword.includes("tin") ||
          keyword.includes("dish") ||
          keyword.includes("9x13") ||
          keyword.includes("inch") ||
          keyword.includes("round") ||
          keyword.includes("square") ||
          keyword.includes("loaf") ||
          keyword.includes("bundt") ||
          keyword.includes("cake size") ||
          keyword.includes("cake batter")
        ) {
          return panPage(tuple);
        }
        if (keyword.includes("oil") || keyword.includes("butter conversion to oil")) return butterOilPage(tuple);
        if (keyword.includes("brownie") || keyword.includes("egg replacer") || keyword.includes("egg replacement")) {
          return eggPage(tuple);
        }
        return buttermilkPage(tuple);
      }),
    ].map((page) => [page.slug, page]),
  ).values(),
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

import json

posts_data = []

# ============================================================
# ARTICLES 11-16: FLOURS
# ============================================================
flours = [
    {
        "id": "all-purpose-flour", "name": "All-Purpose Flour", "density": 0.529,
        "cup_grams": 125, "cup_sifted": 106, "cup_dip": 148,
        "tips": "AP flour is the workhorse of baking. 10-12% protein. Works for almost everything.",
        "storage": "Store in an airtight container in a cool, dry place. AP flour lasts 6-8 months at room temperature, up to a year in the freezer.",
        "recipes": [(300, "chocolate chip cookies"), (250, "banana bread"), (190, "pancakes"), (160, "pie crust")],
        "related": ["bread-flour", "cake-flour", "whole-wheat-flour"],
    },
    {
        "id": "bread-flour", "name": "Bread Flour", "density": 0.550,
        "cup_grams": 130, "cup_sifted": 111, "cup_dip": 154,
        "tips": "Higher protein (12-14%) means stronger gluten. Essential for chewy bread and pizza dough.",
        "storage": "Bread flour has slightly more oil than AP flour due to higher protein. Store in the fridge for最长 shelf life - up to a year.",
        "recipes": [(500, "pizza dough"), (450, "simple white bread"), (400, "cinnamon rolls")],
        "related": ["all-purpose-flour", "cake-flour", "whole-wheat-flour"],
    },
    {
        "id": "cake-flour", "name": "Cake Flour", "density": 0.467,
        "cup_grams": 111, "cup_sifted": 94, "cup_dip": 131,
        "tips": "Low protein (7-8%) = tender crumb. Always sift before measuring for best results.",
        "storage": "Cake flour is finely milled and can absorb moisture from the air. Keep it sealed tight. Lasts 8-10 months.",
        "recipes": [(240, "basic vanilla cake")],
        "related": ["all-purpose-flour", "bread-flour", "cornstarch"],
    },
    {
        "id": "whole-wheat-flour", "name": "Whole Wheat Flour", "density": 0.512,
        "cup_grams": 121, "cup_sifted": 103, "cup_dip": 143,
        "tips": "Contains the bran and germ. More fiber, more flavor, but heavier results. Try 50/50 with AP flour.",
        "storage": "The natural oils in the bran go rancid quickly. Store whole wheat flour in the fridge (6 months) or freezer (1 year).",
        "recipes": [],
        "related": ["all-purpose-flour", "bread-flour", "almond-flour"],
    },
    {
        "id": "almond-flour", "name": "Almond Flour", "density": 0.406,
        "cup_grams": 96, "cup_sifted": 82, "cup_dip": 113,
        "tips": "Gluten-free, high protein, high fat. Not a 1:1 substitute for wheat flour. Needs extra binding agents.",
        "storage": "High fat content means it goes rancid fast. Refrigerate (3 months) or freeze (6 months). Always bring to room temp before baking.",
        "recipes": [],
        "related": ["coconut-flour", "all-purpose-flour"],
    },
    {
        "id": "coconut-flour", "name": "Coconut Flour", "density": 0.540,
        "cup_grams": 128, "cup_sifted": 109, "cup_dip": 151,
        "tips": "Absorbs 4-6x its weight in liquid. Use 1/4 the amount of regular flour. Needs extra eggs.",
        "storage": "Very stable due to low moisture content. Store in a sealed container at room temperature for up to 2 years.",
        "recipes": [],
        "related": ["almond-flour", "all-purpose-flour", "cornstarch"],
    },
]

for i, f in enumerate(flours):
    date = f"2025-02-{5 + i * 3:02d}"
    content = f"""<p>If you've ever followed a recipe exactly and still ended up with a dense cake or tough bread, the problem might not be your technique. It might be how you measured your {f["name"].lower()}.</p>

<p>Let me show you the exact gram-to-cup conversions for {f["name"].lower()} - for every method, every common weight, and every state.</p>

<h2>The Quick Answer</h2>

<p>For {f["name"].lower()} (density: {f["density"]} g/ml):</p>

<table>
<tr><th>Weight</th><th>Spoon &amp; Level</th><th>Dip &amp; Sweep</th><th>Sifted</th></tr>
<tr><td>50g</td><td>{round(50 / (f["density"] * 236.588), 2)} cups</td><td>{round(50 / (f["density"] * 236.588 * 1.18), 2)} cups</td><td>{round(50 / (f["density"] * 236.588 * 0.85), 2)} cups</td></tr>
<tr><td>100g</td><td>{round(100 / (f["density"] * 236.588), 2)} cups</td><td>{round(100 / (f["density"] * 236.588 * 1.18), 2)} cups</td><td>{round(100 / (f["density"] * 236.588 * 0.85), 2)} cups</td></tr>
<tr><td>125g</td><td>{round(125 / (f["density"] * 236.588), 2)} cups</td><td>{round(125 / (f["density"] * 236.588 * 1.18), 2)} cups</td><td>{round(125 / (f["density"] * 236.588 * 0.85), 2)} cups</td></tr>
<tr><td>150g</td><td>{round(150 / (f["density"] * 236.588), 2)} cups</td><td>{round(150 / (f["density"] * 236.588 * 1.18), 2)} cups</td><td>{round(150 / (f["density"] * 236.588 * 0.85), 2)} cups</td></tr>
<tr><td>200g</td><td>{round(200 / (f["density"] * 236.588), 2)} cups</td><td>{round(200 / (f["density"] * 236.588 * 1.18), 2)} cups</td><td>{round(200 / (f["density"] * 236.588 * 0.85), 2)} cups</td></tr>
<tr><td>250g</td><td>{round(250 / (f["density"] * 236.588), 2)} cups</td><td>{round(250 / (f["density"] * 236.588 * 1.18), 2)} cups</td><td>{round(250 / (f["density"] * 236.588 * 0.85), 2)} cups</td></tr>
<tr><td>500g</td><td>{round(500 / (f["density"] * 236.588), 2)} cups</td><td>{round(500 / (f["density"] * 236.588 * 1.18), 2)} cups</td><td>{round(500 / (f["density"] * 236.588 * 0.85), 2)} cups</td></tr>
</table>

<p>Need a weight that's not listed? Use our <a href="/{f["id"]}/">{f["name"].lower()} converter</a> for any weight from 1g to 1000g.</p>

<h2>1 Cup of {f["name"]} = How Many Grams?</h2>

<p>One cup of {f["name"].lower()}, measured with the spoon and level method, weighs approximately <strong>{f["cup_grams"]}g</strong>. With dip and sweep, it's about <strong>{f["cup_dip"]}g</strong>. Sifted, it's about <strong>{f["cup_sifted"]}g</strong>.</p>

<p>That's a difference of {f["cup_dip"] - f["cup_sifted"]}g between the heaviest and lightest method. In a recipe that calls for 3 cups, that's {3 * (f["cup_dip"] - f["cup_sifted"])}g of difference. No wonder your results vary.</p>

<h2>Common Recipe Amounts</h2>"""

    for weight, recipe in f["recipes"]:
        cups = round(weight / (f["density"] * 236.588), 2)
        content += f'\n<p><strong>{recipe}</strong>: {weight}g = {cups} cups (spoon &amp; level). <a href="/{f["id"]}/{weight}-grams-to-cups/">See full breakdown</a>.</p>'

    if not f["recipes"]:
        content += f'\n<p>Common amounts: 100g = {round(100 / (f["density"] * 236.588), 2)} cups, 200g = {round(200 / (f["density"] * 236.588), 2)} cups, 250g = {round(250 / (f["density"] * 236.588), 2)} cups. Try our <a href="/{f["id"]}/">converter</a> for any weight.</p>'

    content += f"""

<h2>Storage Tips for Accurate Measurements</h2>

<p>{f["storage"]}</p>

<p>Old or improperly stored {f["name"].lower()} can absorb moisture from the air, which changes its density. If your flour has been sitting open, it might weigh more per cup than fresh flour. Always store it sealed.</p>

<h2>Pro Tips</h2>

<p>{f["tips"]}</p>

<p>For the most accurate results, always use the same measurement method that the recipe developer used. Most professional recipe developers use the spoon and level method and weigh their ingredients.</p>

<h2>Bottom Line</h2>

<p>{f["name"]} has a density of {f["density"]} g/ml. One cup (spoon &amp; level) = {f["cup_grams"]}g. If precision matters for your recipe, use a scale. If you only have cups, use the spoon and level method consistently.</p>

<p>Convert any weight with our <a href="/{f["id"]}/">{f["name"].lower()} grams to cups converter</a>.</p>"""

    posts_data.append({
        "slug": f"{f['id']}-grams-to-cups-guide",
        "title": f"How to Convert {f['name']} from Grams to Cups (Complete Guide)",
        "description": f"Complete guide to converting {f['name'].lower()} from grams to cups. {f['cup_grams']}g per cup (spoon & level), plus dip & sweep and sifted methods. Free converter.",
        "date": date,
        "category": "ingredients",
        "emoji": "\U0001f33e" if "flour" in f["id"] else "\U0001f963",
        "readTime": 5,
        "keywords": [f"{f['id'].replace('-', ' ')} grams to cups", f"{f['id'].replace('-', ' ')} cup measurement", f"how much is 1 cup of {f['id'].replace('-', ' ')}"],
        "content": content,
        "relatedIngredients": [f["id"]] + f["related"],
        "relatedPosts": ["why-cup-measurements-fail", "how-to-measure-flour-correctly", "what-is-spoon-and-level-method"],
    })

# ============================================================
# ARTICLES 17-20: SUGARS
# ============================================================
sugars = [
    {
        "id": "granulated-sugar", "name": "Granulated Sugar", "density": 0.845,
        "cup_grams": 200, "cup_sifted": 170, "cup_dip": 236,
        "tips": "Granulated sugar doesn't compress like brown sugar. Spoon and level - don't pack.",
        "storage": "Sugar lasts indefinitely if kept dry. Store in an airtight container. It's hygroscopic and will clump if exposed to humidity.",
        "recipes": [(200, "basic vanilla cake"), (100, "chocolate chip cookies"), (150, "banana bread")],
        "related": ["brown-sugar", "powdered-sugar", "honey"],
    },
    {
        "id": "brown-sugar", "name": "Brown Sugar", "density": 0.930,
        "cup_grams": 220, "cup_sifted": 187, "cup_dip": 260,
        "tips": "Brown sugar should be packed firmly into the cup unless the recipe says otherwise. It holds the shape of the cup when properly packed.",
        "storage": "Brown sugar hardens when it loses moisture. Keep a slice of bread in the container to keep it soft. Or microwave with a damp paper towel for 20 seconds.",
        "recipes": [(165, "chocolate chip cookies"), (165, "cinnamon rolls")],
        "related": ["granulated-sugar", "powdered-sugar", "honey"],
    },
    {
        "id": "powdered-sugar", "name": "Powdered Sugar", "density": 0.508,
        "cup_grams": 120, "cup_sifted": 102, "cup_dip": 142,
        "tips": "Powdered sugar is the lightest sugar by volume. Sift before making frosting to remove lumps.",
        "storage": "Store in an airtight container. Powdered sugar absorbs moisture quickly and will form hard lumps if exposed to humidity.",
        "recipes": [(60, "sugar cookies")],
        "related": ["granulated-sugar", "brown-sugar", "cornstarch"],
    },
    {
        "id": "honey", "name": "Honey", "density": 1.420,
        "cup_grams": 337, "cup_sifted": 337, "cup_dip": 337,
        "tips": "Honey is a liquid - measurement method doesn't matter. 1 cup of honey weighs about 337g. Coat your measuring cup with oil first for easy pouring.",
        "storage": "Honey never spoils. Store at room temperature. If it crystallizes, gently warm it in a water bath to restore liquid form.",
        "recipes": [],
        "related": ["granulated-sugar", "brown-sugar", "whole-milk"],
    },
]

for i, s in enumerate(sugars):
    date = f"2025-02-{19 + i * 3:02d}"
    is_liquid = s["id"] == "honey"
    content = f"""<p>Sugar seems simple. But the difference between granulated, brown, powdered, and liquid sweeteners like honey is massive when it comes to cup measurements.</p>

<p>Here's exactly how to convert {s["name"].lower()} from grams to cups - and why the method matters (or doesn't).</p>

<h2>The Quick Answer</h2>

<p>For {s["name"].lower()} (density: {s["density"]} g/ml):</p>

<table>
<tr><th>Weight</th><th>Cups</th></tr>
<tr><td>50g</td><td>{round(50 / (s["density"] * 236.588), 2)} cups</td></tr>
<tr><td>100g</td><td>{round(100 / (s["density"] * 236.588), 2)} cups</td></tr>
<tr><td>150g</td><td>{round(150 / (s["density"] * 236.588), 2)} cups</td></tr>
<tr><td>200g</td><td>{round(200 / (s["density"] * 236.588), 2)} cups</td></tr>
<tr><td>250g</td><td>{round(250 / (s["density"] * 236.588), 2)} cups</td></tr>
<tr><td>500g</td><td>{round(500 / (s["density"] * 236.588), 2)} cups</td></tr>
</table>

<p>Need a different weight? Use our <a href="/{s['id']}/">{s["name"].lower()} converter</a> for any weight from 1g to 1000g.</p>

<h2>1 Cup of {s["name"]} = How Many Grams?</h2>

<p>One cup of {s["name"].lower()} weighs approximately <strong>{s["cup_grams"]}g</strong>. {f'For {s["name"].lower()}, the measurement method doesn\'t change the result since it\'s a liquid.' if is_liquid else f'With dip and sweep (packed), it\'s about <strong>{s["cup_dip"]}g</strong>. Sifted, it\'s about <strong>{s["cup_sifted"]}g</strong>.'}</p>

<h2>Common Recipe Amounts</h2>"""

    for weight, recipe in s["recipes"]:
        cups = round(weight / (s["density"] * 236.588), 2)
        content += f'\n<p><strong>{recipe}</strong>: {weight}g = {cups} cups. <a href="/{s["id"]}/{weight}-grams-to-cups/">See full breakdown</a>.</p>'

    if not s["recipes"]:
        content += f'\n<p>Common amounts: 100g = {round(100 / (s["density"] * 236.588), 2)} cups, 200g = {round(200 / (s["density"] * 236.588), 2)} cups. Try our <a href="/{s["id"]}/">converter</a> for any weight.</p>'

    content += f"""

<h2>Storage Tips for Accurate Measurements</h2>

<p>{s["storage"]}</p>

<h2>Pro Tips</h2>

<p>{s["tips"]}</p>

<h2>Bottom Line</h2>

<p>{s["name"]} has a density of {s["density"]} g/ml. One cup = {s["cup_grams"]}g. {f'Since it\'s a liquid, the measurement method doesn\'t matter - 1 cup always weighs the same.' if is_liquid else 'Use the spoon and level method for dry sugars, and pack firmly for brown sugar.'}</p>

<p>Convert any weight with our <a href="/{s['id']}/">{s["name"].lower()} grams to cups converter</a>.</p>"""

    posts_data.append({
        "slug": f"{s['id']}-grams-to-cups-guide",
        "title": f"How to Convert {s['name']} from Grams to Cups (Complete Guide)",
        "description": f"Complete guide to converting {s['name'].lower()} from grams to cups. {s['cup_grams']}g per cup. Free converter for any weight.",
        "date": date,
        "category": "ingredients",
        "emoji": "\U0001f36c",
        "readTime": 4,
        "keywords": [f"{s['id'].replace('-', ' ')} grams to cups", f"{s['id'].replace('-', ' ')} cup measurement", f"how much is 1 cup of {s['id'].replace('-', ' ')}"],
        "content": content,
        "relatedIngredients": [s["id"]] + s["related"],
        "relatedPosts": ["why-cup-measurements-fail", "grams-vs-cups-which-is-better", "baking-measurement-mistakes"],
    })

# Load existing posts and append
with open('data/blog-posts.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the end of the array
idx = content.rfind('];')
if idx == -1:
    print("ERROR: Could not find end of blogPosts array")
    exit(1)

# Build new entries
new_entries = []
for p in posts_data:
    new_entries.append(json.dumps(p, indent=2, ensure_ascii=False))

new_content = content[:idx] + ',\n' + ',\n'.join(new_entries) + '\n];\n'

with open('data/blog-posts.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Added {len(posts_data)} articles (Articles 11-20: Ingredients)")
print(f"Total articles now: {10 + len(posts_data)}")

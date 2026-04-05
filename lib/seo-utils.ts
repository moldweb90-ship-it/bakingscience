import { SITE_URL, SITE_NAME } from './constants';
import { convert, gramsToCups, getMethodModifier, getStateModifier, ingredients, Ingredient } from './converter';

/**
 * Generate meta description for a leaf page (Section 9.2)
 * Must be 150-160 characters with specific numbers.
 */
export function generateLeafDescription(
  value: number,
  ingredientName: string,
  ingredientId: string,
): string {
  const spoonLevel = convert(value, ingredientId, 'spoon_level');
  const sifted = convert(value, ingredientId, 'sifted');
  const dipSweep = convert(value, ingredientId, 'dip_sweep');

  const variance = Math.round(
    ((sifted.cups - dipSweep.cups) / spoonLevel.cups) * 100,
  );

  const desc = `${value}g ${ingredientName.toLowerCase()} = ${spoonLevel.cups} cups (spoon & level). But sifted? ${sifted.cups} cups. Packed? ${dipSweep.cups} cups. That's ${variance}% variance. Get YOUR exact number. Free tool.`;

  return desc.length > 160 ? desc.slice(0, 157) + '...' : desc;
}

/**
 * Generate hub page description with aliases
 */
export function generateHubDescription(
  ingredientName: string,
  ingredient: Ingredient,
): string {
  const aliasesText = ingredient.aliases.length > 0 ? ` (${ingredient.aliases[0]})` : '';
  return `Convert ${ingredientName.toLowerCase()}${aliasesText} from grams to cups with precision. ${ingredient.common_weights_g.length} weights with 3 methods compared. USDA density data. Free calculator.`;
}

/**
 * Generate canonical URL for a leaf page
 */
export function generateCanonicalLeaf(ingredientId: string, weightG: number): string {
  return `${SITE_URL}/${ingredientId}/${weightG}-grams-to-cups/`;
}

/**
 * Generate canonical URL for a hub page
 */
export function generateCanonicalHub(ingredientId: string): string {
  return `${SITE_URL}/${ingredientId}/`;
}

/**
 * Generate FAQPage JSON-LD schema (Section 9.3, Schema 1)
 */
export function generateFAQSchema(
  value: number,
  ingredientName: string,
  ingredientId: string,
  faq: { question: string; answer: string }[],
) {
  // Deduplicate by question text
  const uniqueFaqs = [...new Map(faq.map((f) => [f.question, f])).values()];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: uniqueFaqs.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList JSON-LD schema (Section 9.3, Schema 2)
 */
export function generateBreadcrumbSchema(
  items: { name: string; item?: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.item ? { item: item.item } : {}),
    })),
  };
}

/**
 * Generate SoftwareApplication JSON-LD schema (Section 9.3, Schema 3)
 */
export function generateSoftwareAppSchema(ingredientName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${ingredientName} Grams to Cups Calculator`,
    description: `Interactive converter for ${ingredientName.toLowerCase()} with method comparison (sifted vs packed vs spooned)`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

/**
 * Generate HowTo JSON-LD schema (Section 9.3, Schema 4)
 */
export function generateHowToSchema(
  value: number,
  ingredientName: string,
  cups: number,
) {
  const fraction = decimalToFraction(cups);

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Measure ${value}g of ${ingredientName} in Cups`,
    description: `Step-by-step guide to accurately measure ${ingredientName.toLowerCase()} using the Spoon & Level method`,
    step: [
      {
        '@type': 'HowToStep',
        text: 'Place your measuring cup on a flat, clean surface.',
      },
      {
        '@type': 'HowToStep',
        text: `Using a spoon, lightly scoop ${ingredientName.toLowerCase()} into the measuring cup until it overflows.`,
      },
      {
        '@type': 'HowToStep',
        text: `Take a straight knife or spatula and level off the top - you need ${cups} cups (about ${fraction}).`,
      },
      {
        '@type': 'HowToStep',
        text: 'Do not tap or shake the cup, as this compresses the ingredient and changes the measurement.',
      },
    ],
  };
}

/**
 * Generate Open Graph tags (Section 9.4)
 */
export function generateOpenGraph(
  title: string,
  description: string,
  url: string,
  imageUrl?: string,
) {
  return {
    title,
    description,
    url,
    siteName: SITE_NAME,
    type: 'website' as const,
    ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 630 }] } : {}),
  };
}

/**
 * Generate Twitter Card tags (Section 9.4)
 */
export function generateTwitterCard(
  title: string,
  description: string,
  imageUrl?: string,
) {
  return {
    card: 'summary_large_image' as const,
    title,
    description,
    ...(imageUrl ? { images: [imageUrl] } : {}),
  };
}

/**
 * Convert decimal cups to a human-readable fraction string
 */
function decimalToFraction(cups: number): string {
  const whole = Math.floor(cups);
  const remainder = cups - whole;

  const fractions: [number, string][] = [
    [0, ''],
    [0.125, '1/8'],
    [0.25, '1/4'],
    [0.33, '1/3'],
    [0.375, '3/8'],
    [0.5, '1/2'],
    [0.625, '5/8'],
    [0.67, '2/3'],
    [0.75, '3/4'],
    [0.875, '7/8'],
  ];

  let closest = '';
  let minDiff = Infinity;
  for (const [val, label] of fractions) {
    const diff = Math.abs(remainder - val);
    if (diff < minDiff) {
      minDiff = diff;
      closest = label;
    }
  }

  if (whole === 0 && closest) return closest;
  if (whole === 0) return cups.toFixed(2);
  if (!closest) return `${whole}`;
  return `${whole} and ${closest}`;
}

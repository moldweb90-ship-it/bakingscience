/**
 * Measurement constants per NIST standards (Section 5.1)
 */
export const US_CUP_ML = 236.588;
export const US_TABLESPOON_ML = 14.787;
export const US_TEASPOON_ML = 4.929;
export const US_FL_OZ_ML = 29.574;

/**
 * Default measurement method modifiers (Section 5.2)
 */
export const MEASUREMENT_METHODS: Record<
  string,
  { id: string; modifier: number; label: string; badge: string; description: string }
> = {
  spoon_level: {
    id: 'spoon_level',
    modifier: 1.0,
    label: 'Spoon & Level',
    badge: '✅ Recommended',
    description:
      'Spoon the ingredient into the measuring cup, then level off with a straight knife.',
  },
  dip_sweep: {
    id: 'dip_sweep',
    modifier: 1.18,
    label: 'Dip & Sweep',
    badge: '⚠️ Heavy (+18%)',
    description:
      'Dip the measuring cup directly into the container, then sweep off the excess. This packs the ingredient and adds ~18% more weight.',
  },
  sifted: {
    id: 'sifted',
    modifier: 0.85,
    label: 'Sifted',
    badge: '🪶 Light (-15%)',
    description:
      'Sift the ingredient through a fine mesh sieve into the measuring cup. This aerates the ingredient and reduces weight by ~15%.',
  },
};

/**
 * State modifiers for fats (Section 5.3)
 */
export const STATE_MODIFIERS: Record<string, { id: string; modifier: number; label: string }> = {
  solid: {
    id: 'solid',
    modifier: 1.0,
    label: 'Solid (cold)',
  },
  softened: {
    id: 'softened',
    modifier: 0.95,
    label: 'Softened (room temp)',
  },
  melted: {
    id: 'melted',
    modifier: 0.88,
    label: 'Melted',
  },
};

/**
 * Valid weight range (Section 7.2)
 */
export const MIN_WEIGHT_G = 1;
export const MAX_WEIGHT_G = 1000;

/**
 * ISR revalidation period (Section 7.2) — 7 days
 */
export const ISR_REVALIDATE_SECONDS = 604800;

/**
 * Recipe matching tolerance (Section 6.2) — ±20%
 */
export const RECIPE_MATCH_TOLERANCE = 0.2;

/**
 * Site base URL
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bakingconverter.com';

/**
 * Site name
 */
export const SITE_NAME = 'BakingConverter';

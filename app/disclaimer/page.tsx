import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Disclaimer — BakingScience',
  description: 'Important disclaimer about the accuracy and limitations of BakingScience.io conversion tools.',
};

export default function DisclaimerPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Disclaimer' },
  ];

  return (
    <div className="py-8 sm:py-12 max-w-3xl">
      <Breadcrumbs items={breadcrumbItems} />

      <article className="space-y-6 text-slate-700 leading-relaxed">
        <header>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Disclaimer</h1>
          <p className="text-sm text-slate-400">Last updated: January 1, 2025</p>
        </header>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Conversion Accuracy</h2>
          <p>
            All conversion results provided by BakingScience.io are approximate estimates based on published ingredient
            density data. The actual volume of any ingredient can vary by &plusmn;5% or more depending on factors including
            but not limited to: the specific brand, batch variation, humidity, temperature, altitude, particle size,
            moisture content, and the measurement technique used.
          </p>
          <p>
            Our calculations are based on the formula: cups = weight_g / (density &times; 236.588) &times; method_modifier &times; state_modifier.
            While this formula is mathematically sound, the input data (density values) are averages and may not reflect
            the exact density of the specific ingredient you are using.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Not a Substitute for a Kitchen Scale</h2>
          <p>
            BakingScience.io is not a substitute for a digital kitchen scale. For professional or commercial baking,
            we strongly recommend always weighing ingredients. Weight measurements are inherently more accurate than
            volume measurements because they are not affected by how the ingredient is packed, the shape of the
            measuring cup, or environmental factors.
          </p>
          <p>
            Our tools are designed to help you when you only have volume measurements available (e.g., when following a
            recipe that lists ingredients in cups) or when you need to understand the relationship between weight and
            volume for a specific ingredient.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Data Sources</h2>
          <p>
            Ingredient density data is sourced from:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>USDA FoodData Central</strong> (fdc.nal.usda.gov) — Primary source for most ingredients.</li>
            <li><strong>King Arthur Baking Ingredient Weight Chart</strong> (kingarthurbaking.com) — Used for almond flour and coconut flour.</li>
          </ul>
          <p className="mt-3">
            We cross-reference values where possible and use USDA as the primary source when discrepancies exist.
            All density values in our database include a source attribution.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">No Warranty</h2>
          <p>
            BakingScience.io is provided &ldquo;as is&rdquo; without any warranties, express or implied. We do not warrant that
            the conversion results will be accurate, complete, reliable, or suitable for any particular purpose. We
            are not responsible for any recipe outcomes, baking failures, food safety issues, or other consequences
            resulting from the use of our conversion tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">External Links</h2>
          <p>
            Our website may contain links to external websites (USDA, King Arthur Baking, etc.). We have no control
            over the content of these sites and accept no responsibility for them. Links are provided for reference
            and attribution purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Contact</h2>
          <p>
            If you believe any of our data is incorrect, please contact us at{' '}
            <a href="mailto:contact@bakingscience.io" className="text-accent hover:text-accent-hover">
              contact@bakingscience.io
            </a>{' '}
            with the specific ingredient, the value in question, and your source. We review and update our data quarterly.
          </p>
        </section>
      </article>
    </div>
  );
}

import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About BakingScience — Precision Baking Measurements for Everyone',
  description: 'Learn why BakingScience.io was created, our data sources, and our mission to bring precision to baking measurements.',
};

export default function AboutPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us' },
  ];

  return (
    <div className="py-8 sm:py-12 max-w-3xl">
      <Breadcrumbs items={breadcrumbItems} />

      <article className="space-y-6 text-slate-700 leading-relaxed">
        <header>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">About BakingScience</h1>
        </header>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">What Is BakingScience?</h2>
          <p>
            BakingScience.io is a free online baking conversion tool that converts ingredient weights (grams) to volume
            measurements (cups, tablespoons, teaspoons) with scientific precision. Unlike simple calculators that give
            you a single number, we account for measurement methods (Spoon &amp; Level, Dip &amp; Sweep, Sifted), ingredient
            states (solid, softened, melted for fats), and even high-altitude adjustments.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Why We Created It</h2>
          <p>
            Because &ldquo;roughly 0.8 cups&rdquo; isn&apos;t good enough. If you&apos;ve ever followed a recipe exactly and still
            ended up with a dry cake, flat cookies, or dense bread, you know the frustration. The problem is almost
            always measurement error. A 10% difference in flour can mean the difference between a tender crumb and a
            brick.
          </p>
          <p>
            Google&apos;s AI Overview tells you &ldquo;approximately 0.72 to 0.8 cups&rdquo; for 100g of flour. That range represents
            a 10% difference — enough to ruin a delicate recipe. We built BakingScience to give you one exact number
            based on your specific inputs: the ingredient, the weight, the measurement method, and the state.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Our Data Sources</h2>
          <p>
            All ingredient density data is sourced from two authoritative references:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>USDA FoodData Central</strong> — The United States Department of Agriculture&apos;s comprehensive food composition database. This is the gold standard for nutritional and density data.</li>
            <li><strong>King Arthur Baking Ingredient Weight Chart</strong> — A widely respected reference from one of America&apos;s most trusted baking authorities, providing real-world cup-to-weight conversions.</li>
          </ul>
          <p className="mt-3">
            When USDA and King Arthur data differ, we use USDA as the primary source and note the discrepancy. All
            density values are documented in our ingredient database with their source attribution.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Our Mission</h2>
          <p>
            <strong>Precision baking measurements for everyone.</strong> Whether you&apos;re a home baker who has ruined a
            recipe due to bad measurement, a professional who needs exactness, or a recipe blogger who needs reliable
            conversions for your content — BakingScience is built for you.
          </p>
          <p>
            We believe that understanding the science behind baking measurements makes everyone a better baker. Our
            interactive tools, comparison tables, and educational content are designed to help you not just convert
            numbers, but understand why those numbers matter.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Get in Touch</h2>
          <p>
            Have a question, suggestion, or found an error? We&apos;d love to hear from you. Contact us at{' '}
            <a href="mailto:contact@bakingscience.io" className="text-accent hover:text-accent-hover">
              contact@bakingscience.io
            </a>{' '}
            or visit our <Link href="/contact/" className="text-accent hover:text-accent-hover">Contact page</Link>.
          </p>
        </section>
      </article>
    </div>
  );
}

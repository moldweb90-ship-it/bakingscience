import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service — BakingScience',
  description: 'Terms and conditions for using BakingScience.io baking conversion tools.',
};

export default function TermsPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Terms of Service' },
  ];

  return (
    <div className="py-8 sm:py-12 max-w-3xl">
      <Breadcrumbs items={breadcrumbItems} />

      <article className="space-y-6 text-slate-700 leading-relaxed">
        <header>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-slate-400">Last updated: January 1, 2025</p>
        </header>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using BakingScience.io (&ldquo;the Site&rdquo;), you accept and agree to be bound by these
            Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please do not use the Site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">2. Description of Service</h2>
          <p>
            BakingScience.io provides free baking ingredient conversion tools that convert weights (grams) to volume
            measurements (cups, tablespoons, teaspoons). The service also includes recipe scaling, measurement method
            comparisons, and educational content about baking science. All conversions are based on density data sourced
            from the USDA FoodData Central database and the King Arthur Baking Ingredient Weight Chart.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">3. Accuracy Disclaimer</h2>
          <p>
            All conversion results provided by this Site are estimates based on published density data. Actual volumes
            may vary by &plusmn;5% depending on the specific brand, batch, humidity, temperature, and measurement technique
            used. The results should not be used as a substitute for a digital kitchen scale, especially in professional
            or commercial baking contexts. We recommend weighing ingredients for the most accurate results.
          </p>
          <p>
            BakingScience.io is not responsible for any recipe outcomes, baking failures, or other consequences resulting
            from the use of our conversion tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">4. Intellectual Property</h2>
          <p>
            The content, design, layout, graphics, and code of this Site are the property of BakingScience.io and are
            protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, or
            create derivative works from any content on this Site without prior written permission.
          </p>
          <p>
            Ingredient density data is sourced from public databases (USDA FoodData Central) and is not proprietary.
            However, the presentation, organization, and calculation methodology are original works.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">5. Acceptable Use</h2>
          <p>
            You agree to use this Site only for lawful purposes. You may not:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Use the Site in any way that violates applicable laws or regulations.</li>
            <li>Attempt to gain unauthorized access to any portion of the Site or any other systems or networks.</li>
            <li>Use any automated means (bots, scrapers, spiders) to access the Site without prior written permission.</li>
            <li>Interfere with or disrupt the integrity or performance of the Site.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">6. Third-Party Links and Services</h2>
          <p>
            The Site may contain links to third-party websites or services that are not owned or controlled by
            BakingScience.io. We have no control over, and assume no responsibility for, the content, privacy policies,
            or practices of any third-party websites or services. You acknowledge and agree that we shall not be
            responsible or liable for any damage or loss caused by or in connection with the use of any such content,
            goods, or services available on or through any such websites or services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, BakingScience.io and its operators shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of
            profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of (or
            inability to access or use) the Site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify users of any material changes by
            posting a notice on the Site. Your continued use of the Site after any such changes constitutes your
            acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">9. Contact</h2>
          <p>
            If you have any questions about these Terms, please contact us at{' '}
            <a href="mailto:contact@bakingscience.io" className="text-accent hover:text-accent-hover">
              contact@bakingscience.io
            </a>.
          </p>
        </section>
      </article>
    </div>
  );
}

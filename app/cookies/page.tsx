import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy - BakingConverter',
  description: 'Learn about the cookies used on BakingConverter.io and how to manage your cookie preferences.',
};

export default function CookiesPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Cookie Policy' },
  ];

  return (
    <div className="py-8 sm:py-12 max-w-3xl">
      <Breadcrumbs items={breadcrumbItems} />

      <article className="space-y-6 text-slate-700 leading-relaxed">
        <header>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Cookie Policy</h1>
          <p className="text-sm text-slate-400">Last updated: January 1, 2025</p>
        </header>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device when you visit a website. They help the website
            function properly, remember your preferences, and provide analytics data to the site owners. Cookies can be
            &ldquo;persistent&rdquo; (remaining on your device after you close your browser) or &ldquo;session&rdquo; (deleted when you close
            your browser).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Cookies We Use</h2>

          <h3 className="font-semibold text-slate-800 mt-6 mb-2">1. Necessary Cookies</h3>
          <p>
            These cookies are essential for the website to function properly. They enable core functionality such as
            remembering your cookie consent preferences. Without these cookies, the website cannot function as intended.
          </p>
          <div className="bg-slate-50 rounded-card p-4 text-sm">
            <p><strong>Cookie name:</strong> cookie_consent</p>
            <p><strong>Purpose:</strong> Stores your cookie consent preferences</p>
            <p><strong>Duration:</strong> Persistent (until you clear browser data)</p>
            <p><strong>Can be disabled:</strong> No (required for site functionality)</p>
          </div>

          <h3 className="font-semibold text-slate-800 mt-6 mb-2">2. Analytics Cookies</h3>
          <p>
            We use Google Analytics 4 to understand how visitors interact with our website. This helps us improve the
            user experience and content. Google Analytics sets the following cookies:
          </p>
          <div className="bg-slate-50 rounded-card p-4 text-sm space-y-2">
            <p><strong>_ga, _ga_*</strong> - Distinguish unique users. Duration: 2 years.</p>
            <p><strong>_gid</strong> - Distinguish users. Duration: 24 hours.</p>
            <p><strong>_gat</strong> - Throttle request rate. Duration: 1 minute.</p>
          </div>
          <p className="mt-3">
            You can opt out of Google Analytics by installing the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" className="text-accent hover:text-accent-hover" target="_blank" rel="noopener noreferrer">
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>

          <h3 className="font-semibold text-slate-800 mt-6 mb-2">3. Advertising Cookies</h3>
          <p>
            We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads
            based on your prior visits to our website or other websites. These cookies may include:
          </p>
          <div className="bg-slate-50 rounded-card p-4 text-sm space-y-2">
            <p><strong>__gads</strong> - Google advertising cookie. Duration: 13 months.</p>
            <p><strong>__gpi</strong> - Google advertising cookie. Duration: 13 months.</p>
            <p><strong>_fbp</strong> - Facebook pixel (if applicable). Duration: 3 months.</p>
          </div>
          <p className="mt-3">
            You can opt out of personalized advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" className="text-accent hover:text-accent-hover" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">How to Manage Cookies</h2>
          <p>
            You can control and manage cookies in several ways:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Cookie Consent Banner:</strong> On your first visit, you can choose to Accept All, Reject Non-Essential, or Customize your cookie preferences.</li>
            <li><strong>Cookie Settings Link:</strong> You can change your preferences at any time by clicking the &ldquo;Cookie Settings&rdquo; link in the footer of our website.</li>
            <li><strong>Browser Settings:</strong> Most web browsers allow you to control cookies through their settings. You can typically find these settings in the &ldquo;Options&rdquo; or &ldquo;Preferences&rdquo; menu of your browser.</li>
            <li><strong>Opt-Out Links:</strong> Use the Google Analytics and Google Ads opt-out links provided above.</li>
          </ul>
          <p className="mt-3">
            Please note that blocking or deleting cookies may affect the functionality of our website and your user experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Third-Party Cookies</h2>
          <p>
            Some cookies are placed by third-party services that appear on our pages. We do not control these cookies
            and cannot access the data they collect. Please refer to the privacy policies of these third parties for
            more information:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><a href="https://policies.google.com/privacy" className="text-accent hover:text-accent-hover" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
            <li><a href="https://policies.google.com/technologies/ads" className="text-accent hover:text-accent-hover" target="_blank" rel="noopener noreferrer">Google Ads Privacy Policy</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new
            Cookie Policy on this page and updating the &ldquo;Last updated&rdquo; date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Contact</h2>
          <p>
            If you have any questions about our use of cookies, please contact us at{' '}
            <a href="mailto:privacy@bakingconverter.com" className="text-accent hover:text-accent-hover">
              privacy@bakingconverter.com
            </a>{' '}
            or visit our <Link href="/contact/" className="text-accent hover:text-accent-hover">Contact page</Link>.
          </p>
        </section>
      </article>
    </div>
  );
}

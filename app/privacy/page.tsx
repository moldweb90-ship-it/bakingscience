import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy - BakingConverter',
  description: 'Learn how BakingConverter.io collects, uses, and protects your data. GDPR and CCPA compliant privacy policy.',
};

export default function PrivacyPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy' },
  ];

  return (
    <div className="py-8 sm:py-12 max-w-3xl">
      <Breadcrumbs items={breadcrumbItems} />

      <article className="space-y-6 text-slate-700 leading-relaxed">
        <header>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-slate-400">Last updated: January 1, 2025</p>
        </header>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">1. Introduction</h2>
          <p>
            BakingConverter.io (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website
            bakingconverter.com. We do not collect personal information directly. Our site is a static baking conversion tool that
            performs calculations in your browser.
          </p>
          <p>
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not
            access the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">2. Information We Collect</h2>
          <p>
            <strong>Automatically Collected Information.</strong> When you visit our website, certain information is collected
            automatically through cookies and similar technologies. This includes your IP address, browser type, device type,
            operating system, referring URLs, pages viewed, and the dates/times of your visits. This information is used for
            analytics purposes and to improve the performance of our website.
          </p>
          <p>
            <strong>No Personal Information.</strong> We do not collect names, email addresses, phone numbers, or any other
            personally identifiable information through our website. Our conversion calculator performs all calculations locally
            in your browser and does not transmit any data to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">3. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and improve our services.
            Cookies are files with a small amount of data that may include an anonymous unique identifier.
          </p>
          <p>
            <strong>Necessary Cookies.</strong> These cookies are essential for the website to function properly. They enable
            core functionality such as remembering your cookie consent preferences. These cookies cannot be disabled.
          </p>
          <p>
            <strong>Analytics Cookies (Google Analytics 4).</strong> We use Google Analytics 4 to understand how visitors
            interact with our website. This helps us improve the user experience and content. Google Analytics collects
            information such as pages visited, time spent on pages, and traffic sources. Google may use this data to
            contextualize and personalize ads within its own advertising network. You can opt out of Google Analytics by
            installing the Google Analytics Opt-out Browser Add-on.
          </p>
          <p>
            <strong>Advertising Cookies (Google AdSense).</strong> We use Google AdSense to display advertisements on our
            website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites.
            Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your browsing patterns
            across the web. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-accent hover:text-accent-hover" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
          </p>
          <p>
            You can control cookies through your browser settings and by using our cookie consent banner, which appears on
            your first visit. You can change your preferences at any time by clicking the &ldquo;Cookie Settings&rdquo; link
            in the footer of our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">4. Third-Party Services</h2>
          <p>
            We use the following third-party services that may collect information:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Google Analytics 4</strong> - Web analytics service. <a href="https://policies.google.com/privacy" className="text-accent hover:text-accent-hover" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
            <li><strong>Google AdSense</strong> - Advertising service. <a href="https://policies.google.com/technologies/ads" className="text-accent hover:text-accent-hover" target="_blank" rel="noopener noreferrer">Ads Privacy Policy</a></li>
            <li><strong>Vercel</strong> - Hosting provider. <a href="https://vercel.com/legal/privacy-policy" className="text-accent hover:text-accent-hover" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
          </ul>
          <p className="mt-3">
            These third-party services have their own privacy policies addressing how they use such information. We recommend
            reviewing their respective privacy policies for more information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">5. Your Rights Under GDPR (EU Visitors)</h2>
          <p>
            If you are a resident of the European Economic Area (EEA), you have certain data protection rights under the
            General Data Protection Regulation (GDPR). These include:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Right of access</strong> - You have the right to request copies of your personal data.</li>
            <li><strong>Right to rectification</strong> - You have the right to request correction of inaccurate data.</li>
            <li><strong>Right to erasure</strong> - You have the right to request deletion of your personal data.</li>
            <li><strong>Right to restrict processing</strong> - You have the right to request restriction of processing.</li>
            <li><strong>Right to data portability</strong> - You have the right to request transfer of your data.</li>
            <li><strong>Right to object</strong> - You have the right to object to our processing of your personal data.</li>
            <li><strong>Right to withdraw consent</strong> - You may withdraw your cookie consent at any time via our Cookie Settings link.</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, please contact us at <a href="mailto:privacy@bakingconverter.com" className="text-accent hover:text-accent-hover">privacy@bakingconverter.com</a>.
            We will respond to your request within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">6. Your Rights Under CCPA (California Visitors)</h2>
          <p>
            If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Right to know</strong> - You can request information about the categories and sources of personal information we collect.</li>
            <li><strong>Right to delete</strong> - You can request deletion of your personal information.</li>
            <li><strong>Right to opt out</strong> - You can opt out of the sale of your personal information. We do not sell personal information.</li>
            <li><strong>Right to non-discrimination</strong> - We will not discriminate against you for exercising your CCPA rights.</li>
          </ul>
          <p className="mt-3">
            To exercise your CCPA rights, please contact us at <a href="mailto:privacy@bakingconverter.com" className="text-accent hover:text-accent-hover">privacy@bakingconverter.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">7. Data Retention</h2>
          <p>
            We retain analytics data for up to 14 months (Google Analytics default retention period). Cookie consent
            preferences are stored in your browser&apos;s localStorage indefinitely until you clear your browser data or
            change your preferences via our Cookie Settings link.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">8. Children&apos;s Privacy</h2>
          <p>
            Our website is not directed to children under the age of 13. We do not knowingly collect personal information
            from children under 13. If we become aware that we have inadvertently collected personal information from a
            child under 13, we will take steps to delete such information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">9. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date. You are advised to review this
            Privacy Policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:privacy@bakingconverter.com" className="text-accent hover:text-accent-hover">
              privacy@bakingconverter.com
            </a>.
          </p>
        </section>
      </article>
    </div>
  );
}

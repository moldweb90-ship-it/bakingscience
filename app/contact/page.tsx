import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact BakingScience — Get in Touch',
  description: 'Have a question or suggestion? Contact the BakingScience team.',
};

export default function ContactPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact' },
  ];

  return (
    <div className="py-8 sm:py-12 max-w-2xl">
      <Breadcrumbs items={breadcrumbItems} />

      <article className="space-y-6 text-slate-700 leading-relaxed">
        <header>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Contact Us</h1>
        </header>

        <p>
          Have a question about our conversion tools, found an error in our data, or have a suggestion for a new
          ingredient? We&apos;d love to hear from you.
        </p>

        <div className="card p-6 space-y-4">
          <div>
            <h2 className="font-semibold text-slate-900 mb-1">General Inquiries</h2>
            <p>
              <a href="mailto:contact@bakingscience.io" className="text-accent hover:text-accent-hover font-medium">
                contact@bakingscience.io
              </a>
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-slate-900 mb-1">Privacy &amp; Data</h2>
            <p>
              <a href="mailto:privacy@bakingscience.io" className="text-accent hover:text-accent-hover font-medium">
                privacy@bakingscience.io
              </a>
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-slate-900 mb-1">Advertising Inquiries</h2>
            <p>
              <a href="mailto:ads@bakingscience.io" className="text-accent hover:text-accent-hover font-medium">
                ads@bakingscience.io
              </a>
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-500">
          We aim to respond to all inquiries within 2-3 business days. For data deletion requests under GDPR or CCPA,
          please email privacy@bakingscience.io with &ldquo;Data Deletion Request&rdquo; in the subject line.
        </p>
      </article>
    </div>
  );
}

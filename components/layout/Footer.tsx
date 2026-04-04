"use client";

import Link from 'next/link';

const popularIngredients = [
  { name: 'All-Purpose Flour', href: '/all-purpose-flour/' },
  { name: 'Cake Flour', href: '/cake-flour/' },
  { name: 'Butter', href: '/butter/' },
  { name: 'Granulated Sugar', href: '/granulated-sugar/' },
  { name: 'Whole Milk', href: '/whole-milk/' },
  { name: 'Cocoa Powder', href: '/cocoa-powder/' },
];

const resourceLinks = [
  { label: 'Blog', href: '/blog/' },
  { label: 'About Us', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Terms of Service', href: '/terms/' },
  { label: 'Disclaimer', href: '/disclaimer/' },
  { label: 'Cookie Policy', href: '/cookies/' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 mt-16">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wide">
              Popular Ingredients
            </h3>
            <ul className="space-y-2">
              {popularIngredients.map((ing) => (
                <li key={ing.href}>
                  <Link href={ing.href} className="text-slate-600 hover:text-accent transition-colors text-sm">
                    {ing.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wide">
              Resources
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-600 hover:text-accent transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wide">
              Legal
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-600 hover:text-accent transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} BakingScience.io &mdash; Precision baking measurements for everyone.
          </p>
          <button
            className="text-slate-500 hover:text-accent text-sm transition-colors min-h-[44px] flex items-center"
            onClick={() => {
              localStorage.removeItem('cookie_consent');
              window.location.reload();
            }}
          >
            Cookie Settings
          </button>
        </div>
      </div>
    </footer>
  );
}

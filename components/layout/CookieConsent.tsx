'use client';

import { useState, useEffect } from 'react';

type ConsentChoice = 'all' | 'essential' | null;

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent');
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({ all: true, analytics: true, advertising: true }));
    setVisible(false);
    window.dispatchEvent(new CustomEvent('cookie_consent', { detail: { all: true, analytics: true, advertising: true } }));
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({ all: false, analytics: false, advertising: false }));
    setVisible(false);
    window.dispatchEvent(new CustomEvent('cookie_consent', { detail: { all: false, analytics: false, advertising: false } }));
  };

  const handleCustomize = () => {
    setCustomizeOpen(true);
  };

  const handleSaveCustomize = () => {
    const choice = { all: false, analytics, advertising };
    localStorage.setItem('cookie_consent', JSON.stringify(choice));
    setVisible(false);
    setCustomizeOpen(false);
    window.dispatchEvent(new CustomEvent('cookie_consent', { detail: choice }));
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] bg-cream border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] max-h-[30vh] overflow-y-auto"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8 py-4">
        {!customizeOpen ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-slate-700 flex-1">
              We use cookies to improve your experience, analyze traffic, and show relevant ads.
              You can accept all, reject non-essential, or customize your preferences.
            </p>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button onClick={handleAcceptAll} className="btn-primary text-sm px-4 py-2">
                Accept All
              </button>
              <button onClick={handleRejectNonEssential} className="btn-secondary text-sm px-4 py-2">
                Reject Non-Essential
              </button>
              <button onClick={handleCustomize} className="btn-secondary text-sm px-4 py-2">
                Customize
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Cookie Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked disabled className="rounded border-slate-300 text-accent focus:ring-accent" />
                <div>
                  <span className="font-medium text-slate-800 text-sm">Necessary</span>
                  <p className="text-xs text-slate-500">Required for the site to function properly. Cannot be disabled.</p>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="rounded border-slate-300 text-accent focus:ring-accent"
                />
                <div>
                  <span className="font-medium text-slate-800 text-sm">Analytics</span>
                  <p className="text-xs text-slate-500">Google Analytics — helps us understand how visitors use the site.</p>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={advertising}
                  onChange={(e) => setAdvertising(e.target.checked)}
                  className="rounded border-slate-300 text-accent focus:ring-accent"
                />
                <div>
                  <span className="font-medium text-slate-800 text-sm">Advertising</span>
                  <p className="text-xs text-slate-500">Google AdSense — shows relevant ads to support the site.</p>
                </div>
              </label>
            </div>
            <div className="flex gap-2">
              <button onClick={handleSaveCustomize} className="btn-primary text-sm px-4 py-2">
                Save Preferences
              </button>
              <button onClick={() => setCustomizeOpen(false)} className="btn-secondary text-sm px-4 py-2">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

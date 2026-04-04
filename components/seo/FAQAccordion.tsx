"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQAccordionProps {
  faqs: { question: string; answer: string }[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-0">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-slate-200">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between py-4 px-1 text-left min-h-[44px] group"
            aria-expanded={openIndex === index}
          >
            <span className="font-medium text-slate-800 group-hover:text-accent transition-colors pr-4">
              {faq.question}
            </span>
            <ChevronDown
              size={20}
              className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96 pb-4" : "max-h-0"}`}
          >
            <p className="text-slate-600 px-1 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";

type FaqItem = {
  answer: string;
  question: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const answerId = `faq-answer-${index}`;

        return (
          <article className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.question}>
            <button
              aria-controls={answerId}
              aria-expanded={isOpen}
              className="faq-question"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              type="button"
            >
              <span>{item.question}</span>
              <span aria-hidden="true" className="faq-arrow">↓</span>
            </button>
            <div className="faq-answer" id={answerId}>
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

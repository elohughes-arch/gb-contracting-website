"use client";

import { useState } from "react";
import { testimonials } from "../data/testimonials";

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const active = testimonials[activeIndex];
  const goToPrevious = () => setActiveIndex((index) => (index - 1 + testimonials.length) % testimonials.length);
  const goToNext = () => setActiveIndex((index) => (index + 1) % testimonials.length);

  return (
    <div className="testimonial-carousel" aria-label="Customer testimonials">
      <button
        aria-label="Previous testimonial"
        className="testimonial-arrow testimonial-arrow-prev"
        onClick={goToPrevious}
        type="button"
      >
        ←
      </button>
      <article className="card testimonial" key={`${active.name}-${active.job}`}>
        <p>“{active.quote}”</p>
        <p><strong>{active.name}{active.town ? `, ${active.town}` : ""}</strong><br />{active.job}</p>
      </article>
      <button
        aria-label="Next testimonial"
        className="testimonial-arrow testimonial-arrow-next"
        onClick={goToNext}
        type="button"
      >
        →
      </button>
    </div>
  );
}

import type { Metadata } from "next";
import { Testimonials } from "../components/Testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "A customer reference for GB Contracting tree work in Somerset.",
};

export default function TestimonialsPage() {
  return (
    <section className="section testimonials-only">
      <div className="container">
        <Testimonials />
      </div>
    </section>
  );
}

import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Mungo, founder of GB Contracting in Kingston St Mary, Somerset.",
};

export default function AboutPage() {
  return (
    <section className="section founder-section">
      <div className="container founder-panel">
        <div className="founder-image">
          <Image
            alt="Mungo, founder of GB Contracting, beside a vehicle on a tree work site"
            fill
            priority
            sizes="(min-width: 1025px) 48vw, 100vw"
            src="/images/founder/mungo-founder.jpg"
          />
        </div>
        <div className="founder-copy">
          <p className="eyebrow">Meet the founder</p>
          <h1>Mungo.</h1>
          <p className="lead">Mungo founded GB Contracting through a genuine passion for agriculture, land management, and practical outdoor work.</p>
          <p>With a pragmatic approach and strong attention to detail, he takes pride in delivering reliable, high-quality results. Client-oriented at every stage, Mungo focuses on understanding each job properly and completing the work safely, efficiently, and to a high standard.</p>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { QuoteForm } from "../components/QuoteForm";
import { TrustStrip } from "../components/TrustStrip";
import { contact } from "../data/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Request a careful quote from GB Contracting for tree surgery, land clearing, hedge cutting or firewood work in Somerset.",
};

export default function QuotePage() {
  return (
    <>
      <section className="section section-mist">
        <div className="container section-head">
          <h1>Get your free quote</h1>
          <p className="lead">Send the details for pricing. We will review the access, site conditions, waste handling and finish required before confirming the scope.</p>
          <TrustStrip items={["Free", "No obligation", "Assessed properly"]} />
        </div>
      </section>
      <section className="section">
        <div className="container form-shell">
          <QuoteForm />
          <aside className="form-panel stack" aria-label="Quote reassurance">
            <h2>Why people choose us</h2>
            <ul className="feature-list" style={{ color: "var(--bark)" }}>
              <li>Site visits before the work is agreed</li>
              <li>Clear method, access and waste plan</li>
              <li>A tidy handover agreed before the first cut</li>
            </ul>
            <p><strong>Prefer to talk?</strong><br /><a href={contact.phoneHref}>{contact.phone}</a></p>
            <p><strong>Ready to set a visit?</strong><br /><a href="/book">Book a site visit</a></p>
          </aside>
        </div>
      </section>
    </>
  );
}

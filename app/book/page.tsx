import type { Metadata } from "next";
import { QuoteForm } from "../components/QuoteForm";
import { TrustStrip } from "../components/TrustStrip";
import { contact } from "../data/site";

export const metadata: Metadata = {
  title: "Book a Site Visit",
  description: "Book a GB Contracting site visit for tree surgery, land clearance, hedge work or timber handling in Somerset.",
};

export default function BookPage() {
  return (
    <>
      <section className="section section-mist">
        <div className="container section-head">
          <h1>Book a site visit</h1>
          <p className="lead">If the work is ready to move, start here. We will look at the tree, hedge, ground or timber in context, then agree a practical scope before any work goes ahead.</p>
          <TrustStrip items={["Site assessed", "Method agreed", "Finish clear"]} />
        </div>
      </section>
      <section className="section">
        <div className="container form-shell">
          <QuoteForm mode="booking" />
          <aside className="form-panel stack" aria-label="Booking reassurance">
            <h2>What happens next</h2>
            <ul className="feature-list" style={{ color: "var(--bark)" }}>
              <li>We confirm what needs attention and where the access points are.</li>
              <li>We arrange a practical visit or call-back time.</li>
              <li>You know what will be cut, cleared, stacked or removed before work is agreed.</li>
            </ul>
            <p><strong>Need urgent help?</strong><br /><a href={contact.phoneHref}>{contact.phone}</a></p>
          </aside>
        </div>
      </section>
    </>
  );
}

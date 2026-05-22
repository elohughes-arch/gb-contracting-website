import type { Metadata } from "next";
import { Button } from "../../components/Button";
import { contact } from "../../data/site";

export const metadata: Metadata = {
  title: "Quote Enquiry Received",
  description: "Thank you for requesting a quote from GB Contracting.",
};

export default function ThankYouPage() {
  return (
    <section className="section">
      <div className="container stack" style={{ maxWidth: 760 }}>
        <p className="eyebrow">Enquiry received</p>
        <h1>Thanks. We’ll respond within 24 hours.</h1>
        <p className="lead">If the job is urgent or there is a safety risk, call GB Contracting now.</p>
        <div className="hero-actions">
          <Button href={contact.phoneHref}>Call {contact.phone}</Button>
          <Button href="/our-work" variant="secondary">See our work</Button>
        </div>
      </div>
    </section>
  );
}

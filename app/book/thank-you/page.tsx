import type { Metadata } from "next";
import { Button } from "../../components/Button";
import { contact } from "../../data/site";

export const metadata: Metadata = {
  title: "Site Visit Request Received",
  description: "Thank you for booking a site visit with GB Contracting.",
};

export default function BookThankYouPage() {
  return (
    <section className="section">
      <div className="container stack" style={{ maxWidth: 760 }}>
        <p className="eyebrow">Request received</p>
        <h1>Thanks. We’ll confirm the visit shortly.</h1>
        <p className="lead">If the job is urgent, unsafe or blocking access, call GB Contracting now.</p>
        <div className="hero-actions">
          <Button href={contact.phoneHref}>Call {contact.phone}</Button>
          <Button href="/our-work" variant="secondary">See our work</Button>
        </div>
      </div>
    </section>
  );
}

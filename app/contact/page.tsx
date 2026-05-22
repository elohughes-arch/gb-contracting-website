import type { Metadata } from "next";
import { Button } from "../components/Button";
import { contact, towns } from "../data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact GB Contracting for tree surgery, land clearance and agricultural contracting around Taunton and Somerset.",
};

export default function ContactPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h1>Contact GB Contracting</h1>
            <p className="lead">Call, email, book a site visit or send a short message. If a tree, hedge, access route or overgrown area is already causing a problem, a site visit is usually the cleanest way to move it forward.</p>
          </div>
          <div className="form-shell">
            <div className="form-panel stack">
              <h2>Details</h2>
              <p><strong>Phone</strong><br /><a href={contact.phoneHref}>{contact.phone}</a></p>
              <p><strong>Email</strong><br /><a href={contact.emailHref}>{contact.email}</a></p>
              <p><strong>Service area</strong><br />{towns.join(" · ")}</p>
              <p><strong>Visits</strong><br />Site visits and call-backs arranged by appointment, with the scope agreed before work begins.</p>
              <div className="hero-actions">
                <Button href="/book">Book now</Button>
                <Button href="/quote" variant="secondary">Get a quote</Button>
              </div>
            </div>
            <form className="form-panel form-grid" action={`mailto:${contact.email}`} method="post">
              <h2>Short message</h2>
              <div className="field"><label htmlFor="name">Name*</label><input id="name" name="name" required /></div>
              <div className="field"><label htmlFor="phone">Phone*</label><input id="phone" inputMode="tel" name="phone" required type="tel" /></div>
              <div className="field"><label htmlFor="email">Email*</label><input id="email" name="email" required type="email" /></div>
              <div className="field"><label htmlFor="message">Message*</label><textarea id="message" name="message" required /></div>
              <button className="button button-primary" type="submit">Send message</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

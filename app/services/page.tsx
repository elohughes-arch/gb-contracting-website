import type { Metadata } from "next";
import { ServiceCard } from "../components/ServiceCard";
import { services } from "../data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Tree surgery, land clearance, hedge cutting and timber handling across Taunton and Somerset, assessed carefully before work starts.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="compact-hero" style={{ "--hero-image": "url('/images/work/cleared-1-real.jpg')" } as React.CSSProperties}>
        <div className="container stack">
          <p className="eyebrow">Services</p>
          <h1>The right work, done with the site in mind.</h1>
          <p className="lead">Trees, hedges, scrub and timber all behave differently from one property to the next. We look at the site, the access, the risks and the finish you want before recommending the method.</p>
        </div>
      </section>
      <section className="section">
        <div className="container grid grid-4">
          {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
        </div>
      </section>
    </>
  );
}

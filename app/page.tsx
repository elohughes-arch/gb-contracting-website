import Image from "next/image";
import Link from "next/link";
import { BeforeAfter } from "./components/BeforeAfter";
import { Button } from "./components/Button";
import { FaqAccordion } from "./components/FaqAccordion";
import { ServiceCard } from "./components/ServiceCard";
import { projects } from "./data/projects";
import { services } from "./data/services";

const benefits = [
  ["A love for nature and wildlife", "We care about the land we work on and the habitats within it, so timing, method and disturbance are always considered."],
  ["Respect for clients and their property", "Access, boundaries, lawns, drives, livestock and gardens are treated as part of the job, not an inconvenience around it."],
  ["A positive attitude at all times", "The work can be heavy, awkward and weather dependent. We still show up with good energy, clear communication and zero fuss."],
];

const heroMetrics = [
  { value: 25, suffix: "", label: "jobs completed" },
  { value: 100, suffix: "%", label: "client satisfaction" },
  { value: 4, suffix: "", label: "years experience" },
  { value: 24, suffix: "hr", label: "response time" },
];

const faqs = [
  {
    question: "Do you visit before quoting?",
    answer: "Yes. Most tree and clearance work needs a proper look at access, risk, waste, ground conditions and the finish you want before a sensible price can be given.",
  },
  {
    question: "Can you remove all waste from site?",
    answer: "Yes. Arisings can be chipped, removed, stacked or left as agreed. We decide that with you before the job starts so the handover is clear.",
  },
  {
    question: "Do you work around homes, paddocks and farms?",
    answer: "Yes. We work across gardens, smallholdings, farms and managed land, with care for boundaries, lawns, livestock, access routes and neighbouring property.",
  },
  {
    question: "What if I am not sure what service I need?",
    answer: "That is normal. Send a few details or book a visit. We will assess the site and recommend the practical route, whether that is tree work, hedge cutting, clearance or timber processing.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero" style={{ "--hero-image": "url('/images/work/hero-log-splitting-real.jpg')" } as React.CSSProperties}>
        <div className="hero-frame container">
          <div className="hero-content">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">Tree work · land care · Somerset</p>
              <h1>Your land, cleared and cared for.</h1>
            </div>
          </div>
          <div className="hero-lower-actions" data-reveal>
            <Button href="/quote" variant="secondary">Get a Quote</Button>
            <Button href="/book">Book Now</Button>
          </div>
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="container">
          <div className="services-metrics metrics-shell" data-reveal aria-label="GB Contracting in numbers">
            {heroMetrics.map((metric) => (
              <article className="metric-item" key={metric.label}>
                <h2><span data-count-to={metric.value}>1</span>{metric.suffix}</h2>
                <p>{metric.label}</p>
              </article>
            ))}
          </div>
          <div className="section-kicker">Services</div>
          <div className="service-marquee">
            {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </div>
      </section>

      <section className="proof-split" id="benefits">
        <div className="proof-image" data-reveal>
          <Image
            alt="Split logs neatly stacked beside a stone wall by GB Contracting"
            fill
            sizes="(min-width: 1025px) 50vw, 100vw"
            src="/images/work/log-stack-real.jpg"
          />
        </div>
        <div className="proof-copy">
          <p className="eyebrow">Our ethos</p>
          <div className="benefit-list">
            {benefits.map(([title, copy]) => (
              <article data-reveal key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="container">
          <div className="section-kicker">Work</div>
          <div className="section-head wide-head" data-reveal>
            <h2>Real sites. Real equipment. Real handover.</h2>
          </div>
          <div className="grid grid-3">
            {projects.map((project) => <BeforeAfter key={`${project.title}-${project.location}`} project={project} />)}
          </div>
          <p className="work-link"><Link className="button button-work" href="/our-work">See more work →</Link></p>
        </div>
      </section>

      <section className="section faq-section" id="faqs">
        <div className="container faq-shell" data-reveal>
          <p className="eyebrow">FAQ&apos;s</p>
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}

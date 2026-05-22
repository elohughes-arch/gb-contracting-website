import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BeforeAfter } from "../../components/BeforeAfter";
import { Button } from "../../components/Button";
import { ServiceCard } from "../../components/ServiceCard";
import { projects } from "../../data/projects";
import { getService, services } from "../../data/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: `${service.description} Free quotes across Taunton and Somerset.`,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    areaServed: "Taunton and Somerset",
    provider: { "@type": "LocalBusiness", name: "GB Contracting" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <section className="compact-hero" style={{ "--hero-image": `url('${service.hero}')` } as React.CSSProperties}>
        <div className="container stack">
          <p className="eyebrow">Home / Services / {service.shortTitle}</p>
          <h1>{service.title}</h1>
          <p className="lead">{service.description}</p>
          <div className="hero-actions">
            <Button href="/book">Book Now</Button>
            <Button href="/quote" variant="secondary">Get a Quote</Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="stack">
            <p className="eyebrow">What’s included</p>
            <h2>Assessed first, then carried out properly.</h2>
            <p className="lead">The work, access, constraints and waste route are agreed before starting. That keeps the job controlled and the handover clear.</p>
          </div>
          <ul className="card feature-list">
            {service.included.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Before & after</p>
            <h2>Judge the finish before you book.</h2>
          </div>
          <div className="grid grid-3">
            {projects.slice(0, 3).map((project) => <BeforeAfter key={`${project.title}-${project.location}`} project={project} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><h2>Questions worth asking before work starts.</h2></div>
          <div className="grid grid-2">
            {service.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="container">
          <div className="section-head"><h2>Related services</h2></div>
          <div className="grid grid-3">
            {related.map((item) => <ServiceCard key={item.slug} service={item} />)}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

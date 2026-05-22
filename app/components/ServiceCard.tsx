import Link from "next/link";
import type { Service } from "../data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card service-card" data-reveal data-tilt>
      <h3>{service.shortTitle}</h3>
      <p>{service.description}</p>
      <Link className="service-card-link" href="/book">Book now <span aria-hidden="true">→</span></Link>
    </article>
  );
}

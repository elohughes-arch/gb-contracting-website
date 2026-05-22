import type { Metadata } from "next";
import { BeforeAfter } from "../components/BeforeAfter";
import { projects } from "../data/projects";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Real project evidence from GB Contracting tree work, land clearance and timber handling across Taunton and Somerset.",
};

const filters = ["All", "Tree Surgery", "Land Clearing", "Hedges", "Logs"];

const coverageAreas = [
  { town: "Kingston St Mary", detail: "Base" },
  { town: "Taunton", detail: "Local work" },
  { town: "Wellington", detail: "West Somerset" },
  { town: "Bridgwater", detail: "North Somerset" },
  { town: "Wiveliscombe", detail: "Hills & lanes" },
  { town: "Ilminster", detail: "South Somerset" },
  { town: "Langport", detail: "Levels & farms" },
  { town: "Surrounding Somerset", detail: "By assessment" },
];

export default function OurWorkPage() {
  return (
    <>
      <section className="compact-hero" style={{ "--hero-image": "url('/images/work/log-stack-real.jpg')" } as React.CSSProperties}>
        <div className="container stack">
          <p className="eyebrow">Our Work</p>
          <h1>Areas we cover and case studies.</h1>
        </div>
      </section>
      <section className="section areas-section" id="areas-covered">
        <div className="container areas-panel" data-reveal>
          <div className="areas-copy">
            <p className="eyebrow">Areas we cover</p>
            <h2>Based in Kingston St Mary. Working across Taunton and Somerset.</h2>
            <p>Most jobs begin with a site visit, because access, ground conditions and the finish matter. If you are nearby and the work suits our kit, we will take a look.</p>
          </div>
          <div className="coverage-map" aria-label="GB Contracting coverage areas">
            <div className="coverage-hub">
              <span>GB</span>
              <strong>Kingston St Mary</strong>
            </div>
            <div className="coverage-ring">
              {coverageAreas.map((area, index) => (
                <article className={`coverage-node coverage-node-${index + 1}`} key={area.town}>
                  <strong>{area.town}</strong>
                  <span>{area.detail}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="filters" aria-label="Project filters">
            {filters.map((filter) => <span className="filter-pill" key={filter}>{filter}</span>)}
          </div>
          <div className="grid grid-3">
            {projects.map((project) => <BeforeAfter key={`${project.title}-${project.location}`} project={project} />)}
          </div>
        </div>
      </section>
    </>
  );
}

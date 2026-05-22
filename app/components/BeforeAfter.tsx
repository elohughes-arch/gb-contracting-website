import Image from "next/image";
import type { Project } from "../data/projects";

export function BeforeAfter({ project }: { project: Project }) {
  return (
    <article className="card before-after" data-reveal data-tilt>
      <div className="ba-images">
        <div className="image-frame">
          <Image src={project.before} alt={`${project.title} before`} fill sizes="(max-width: 640px) 45vw, 280px" />
          <span className="ba-label">Before</span>
        </div>
        <div className="image-frame">
          <Image src={project.after} alt={`${project.title} after`} fill sizes="(max-width: 640px) 45vw, 280px" />
          <span className="ba-label">After</span>
        </div>
      </div>
      <p className="eyebrow">{project.category} · {project.location}</p>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
    </article>
  );
}

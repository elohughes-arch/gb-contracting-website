export type Project = {
  title: string;
  category: "Tree Surgery" | "Land Clearing" | "Hedges" | "Logs";
  location: string;
  summary: string;
  before: string;
  after: string;
};

export const projects: Project[] = [
  {
    title: "Woodland edge brought back under control",
    category: "Land Clearing",
    location: "Taunton",
    summary: "Rough ground cut back and opened up for easier access and ongoing maintenance.",
    before: "/images/work/woodland-edge-before-new.jpeg",
    after: "/images/work/woodland-edge-after-new.jpeg",
  },
  {
    title: "Steep bank cleared with tracked machinery",
    category: "Land Clearing",
    location: "Somerset",
    summary: "Dense growth cut back on a sloped site with machinery chosen for access, grip and control.",
    before: "/images/work/bank-flail-in-progress.jpg",
    after: "/images/work/steep-bank-after.jpg",
  },
  {
    title: "Timber processed and stacked on site",
    category: "Logs",
    location: "Somerset",
    summary: "Felled timber split, handled and stacked neatly so the site keeps working.",
    before: "/images/work/hero-log-splitting-real.jpg",
    after: "/images/work/log-stack-real.jpg",
  },
];

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  hero: string;
  included: string[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "tree-surgery",
    title: "Tree Surgery in Somerset",
    shortTitle: "Tree Surgery",
    description: "Tree work carried out with the health of the tree, the safety of the site and the finish around it considered before we cut.",
    hero: "/images/work/hero-log-splitting-real.jpg",
    included: [
      "Controlled felling, sectional dismantling and removal where access is tight",
      "Crown reduction, crown lifting, pruning and deadwood removal",
      "Unsafe, storm-damaged or obstructive trees assessed before work starts",
      "Surrounding gardens, boundaries and access routes considered in the method",
      "Brash, timber and arisings chipped, removed or stacked as agreed",
      "TPO and conservation-area checks flagged before protected work is agreed",
    ],
    faqs: [
      { question: "Do you remove the waste?", answer: "Yes. Brash, logs, wood chip and arisings can be removed, chipped or stacked neatly depending on the agreed finish." },
      { question: "Are you insured?", answer: "Yes. Insurance details can be provided before work starts." },
      { question: "Can you visit before quoting?", answer: "Yes. Most tree work is assessed individually so the access, tree condition, method and clean-down are priced properly." },
      { question: "What about protected trees?", answer: "If a tree may be covered by a TPO or conservation-area rules, we will flag it before work is agreed so the right permission route can be followed." },
    ],
  },
  {
    slug: "land-clearing",
    title: "Land Clearing in Somerset",
    shortTitle: "Land Clearing",
    description: "Overgrown ground brought back into use, with access, boundaries, wildlife timing and waste handling planned before tools arrive.",
    hero: "/images/work/cleared-1-real.jpg",
    included: [
      "Scrub, bramble, sapling and rough vegetation clearance",
      "Paddock, plot, garden, smallholding and estate clearance",
      "Fence line, gateway, track and sightline clearance",
      "Vegetation cut back for safe access and future maintenance",
      "Cut material chipped, removed, mulched or stacked on site by agreement",
      "Scope planned around machinery access, boundaries and the finish required",
    ],
    faqs: [
      { question: "Can you clear a whole paddock?", answer: "Yes. We assess the size, access, vegetation type, boundaries and intended finish before confirming the scope." },
      { question: "Will the site be left tidy?", answer: "Yes. Waste handling and clean-down are agreed before work starts so the handover is clear." },
      { question: "Do you work on farms and estates?", answer: "Yes. We support one-off clearances and recurring land-management work across rural sites." },
      { question: "Can you price from photos?", answer: "Photos are useful for first advice, but larger clearances usually need a site visit before a firm quote." },
    ],
  },
  {
    slug: "hedge-cutting",
    title: "Hedge Cutting in Somerset",
    shortTitle: "Hedge Cutting",
    description: "Hedges reduced, reshaped or maintained with clean lines, responsible timing and care for gardens, gateways and boundaries.",
    hero: "/images/work/cleared-2-real.jpg",
    included: [
      "Domestic, field-boundary, driveway and farm hedge maintenance",
      "Height reductions and reshaping for overgrown hedges",
      "Access, sightline and gateway clearance",
      "Responsible timing around nesting birds and site conditions",
      "Cut material cleared, removed or stacked as agreed",
      "One-off cuts or recurring maintenance for managed land",
    ],
    faqs: [
      { question: "Do you take the cuttings away?", answer: "Yes, if required. Cuttings can be removed or left neatly stacked by agreement." },
      { question: "Can you cut tall hedges?", answer: "Yes. Tell us the approximate height and access so we can plan the right equipment and safe method." },
      { question: "Do you do regular maintenance?", answer: "Yes. We can arrange recurring hedge cutting for landowners and farms." },
      { question: "What about nesting birds?", answer: "We work responsibly and will advise if timing or inspection is needed before cutting." },
    ],
  },
  {
    slug: "firewood-logs",
    title: "Firewood & Logs in Somerset",
    shortTitle: "Firewood & Logs",
    description: "Felled or stored timber processed into useful logs, then split, moved and stacked so the site stays clean and workable.",
    hero: "/images/work/log-stack-real.jpg",
    included: [
      "Log splitting, processing and timber handling",
      "Neat stacking and storage support",
      "Timber handled after tree work or clearance",
      "Usable wood separated from waste where practical",
      "Local firewood supply details to be confirmed",
    ],
    faqs: [
      { question: "Can you split logs already on my property?", answer: "Yes. Send photos of the timber pile and access so we can advise." },
      { question: "Do you supply firewood?", answer: "Firewood availability depends on current stock and timber from recent work. Contact us for current supply details." },
      { question: "Can logs be stacked?", answer: "Yes. Splitting and tidy stacking can be included in the quote." },
      { question: "Can timber from tree work be kept?", answer: "Yes. If you want to keep usable timber, say so before the job is priced." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

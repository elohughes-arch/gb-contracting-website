import { trustItems } from "../data/site";

export function TrustStrip({ items = trustItems }: { items?: string[] }) {
  return (
    <div className="pill-row" aria-label="Trust signals">
      {items.map((item) => <span className="pill" key={item}>✓ {item}</span>)}
    </div>
  );
}

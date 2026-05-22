import { provisionalStats } from "../data/site";

export function Stats() {
  return (
    <div className="stats">
      {provisionalStats.map((stat) => (
        <div className="stat" key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

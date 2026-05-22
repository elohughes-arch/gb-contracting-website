"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function StickyActionBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/quote") || pathname.startsWith("/book")) return null;

  return (
    <div className="sticky-actions" aria-label="Booking action">
      <Link className="button button-primary" href="/book">Book Now</Link>
    </div>
  );
}

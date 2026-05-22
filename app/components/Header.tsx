"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact } from "../data/site";
import { Button } from "./Button";

export function Header({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isQuoteFlow = pathname.startsWith("/quote") || pathname.startsWith("/book");
  const lowDistraction = compact || isQuoteFlow;

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    setOpen(false);
    document.body.classList.remove("menu-open");
  }, [pathname]);

  const nav = lowDistraction ? [] : [
    { href: "/our-work", label: "Work" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="nav-shell">
          <Link className="logo" href="/" onClick={() => setOpen(false)}>
            <span>GB</span> Contracting
          </Link>
          <nav className="nav" aria-label="Primary navigation">
            {nav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          </nav>
          <div className="nav-actions">
            <Link className="nav-phone" href={contact.phoneHref}>{contact.phone}</Link>
            {!lowDistraction && <Button href="/book">Bookings</Button>}
          </div>
        </div>
        <Link aria-label="Call GB Contracting" className="icon-button" href={contact.phoneHref}>Call</Link>
        {!lowDistraction && (
          <button
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="icon-button menu-toggle"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? "Close" : "Menu"}
          </button>
        )}
      </div>
      {!lowDistraction && (
        <div className={`mobile-menu ${open ? "is-open" : ""}`} id="mobile-menu">
          <div className="mobile-menu-panel">
            <button
              aria-label="Close menu"
              className="mobile-menu-close"
              onClick={() => setOpen(false)}
              type="button"
            >
              ×
            </button>
            <p className="eyebrow">GB Contracting</p>
            <nav aria-label="Mobile navigation">
              {nav.map((item) => <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
            </nav>
            <div className="mobile-menu-actions">
              <Button href="/book" onClick={() => setOpen(false)}>Bookings</Button>
              <Button href="/quote" onClick={() => setOpen(false)} variant="secondary">Get a Quote</Button>
              <Link className="mobile-phone" href={contact.phoneHref} onClick={() => setOpen(false)}>{contact.phone}</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

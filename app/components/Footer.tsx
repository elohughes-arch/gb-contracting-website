import Link from "next/link";
import { contact } from "../data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-grid">
          <section className="footer-column">
            <h3>Contact</h3>
            <p>Kingston St Mary</p>
            <Link href={contact.emailHref}>{contact.email}</Link>
            <Link href={contact.phoneHref}>{contact.phone}</Link>
          </section>

          <section className="footer-column">
            <h3>Useful</h3>
            <span>Insurance</span>
            <span>Legal</span>
            <Link href="/our-work">Gallery</Link>
            <Link href="/contact">Contact</Link>
          </section>

          <section className="footer-column">
            <h3>Social</h3>
            <a href="https://www.instagram.com/" rel="noreferrer" target="_blank">Instagram</a>
            <a href="https://www.tiktok.com/" rel="noreferrer" target="_blank">TikTok</a>
          </section>
        </div>
      </div>

      <div className="container footer-bottom">
        <Link className="footer-wordmark" href="/">
          <span>GB</span>
          <strong>Contracting</strong>
        </Link>
        <div className="footer-smallprint">
          <p>© GB Contracting · Somerset</p>
          <p>Tree surgery · land clearance · hedge cutting · timber handling</p>
        </div>
      </div>
    </footer>
  );
}

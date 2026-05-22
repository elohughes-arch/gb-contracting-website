import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { InteractionLayer } from "./components/InteractionLayer";
import { SplashScreen } from "./components/SplashScreen";
import { StickyActionBar } from "./components/StickyActionBar";
import { contact, towns } from "./data/site";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "GB Contracting | Tree Surgery & Land Clearing in Somerset",
    template: "%s | GB Contracting",
  },
  description:
    "Tree surgery, land clearing, hedge cutting and timber handling across Taunton and Somerset. Book a site visit or request a clear written quote.",
  openGraph: {
    title: "GB Contracting | Land clearance, engineered",
    description:
      "Tree work, vegetation clearance, hedge maintenance and timber handling across Taunton and Somerset.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "GB Contracting",
    telephone: contact.phone,
    email: contact.email,
    areaServed: towns.join(", "),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kingston St Mary",
      addressRegion: "Somerset",
      addressCountry: "GB",
    },
  };

  return (
    <html lang="en-GB">
      <body className={`${display.variable} ${body.variable}`}>
        <SplashScreen />
        <Header />
        <InteractionLayer />
        <div className="site-scroll">
          <main>{children}</main>
          <Footer />
        </div>
        <StickyActionBar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}

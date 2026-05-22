import type { MetadataRoute } from "next";
import { services } from "./data/services";

const baseUrl = "https://www.gbcontracting.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/our-work", "/testimonials", "/about", "/book", "/book/thank-you", "/quote", "/quote/thank-you", "/contact"];
  return [
    ...routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(),
    })),
  ];
}

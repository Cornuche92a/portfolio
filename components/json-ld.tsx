import React from "react";
import { AUTHOR, SITE_NAME, SITE_URL, pathForLocale } from "@/lib/seo";
import { routing } from "@/i18n/routing";

type JsonLdProps = {
  locale: string;
  jobTitle: string;
  description: string;
};

export default function JsonLd({ locale, jobTitle, description }: JsonLdProps) {
  const pageUrl = pathForLocale(locale, "/");

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: AUTHOR.name,
    alternateName: "Anas Nanterre",
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    jobTitle,
    description,
    email: `mailto:${AUTHOR.email}`,
    sameAs: [AUTHOR.github, AUTHOR.linkedin],
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Cybersecurity",
      "Penetration Testing",
      "HackTheBox",
      "Web Development",
      "Full-Stack Development",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description,
    inLanguage: routing.locales,
    publisher: { "@id": `${SITE_URL}/#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: SITE_NAME,
    description,
    inLanguage: locale,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    primaryImageOfPage: `${SITE_URL}/opengraph-image`,
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: "Anas — Développement & Cybersécurité",
    description,
    url: SITE_URL,
    provider: { "@id": `${SITE_URL}/#person` },
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "Place", name: "Remote / Worldwide" },
    ],
    serviceType: [
      "Full-Stack Web Development",
      "Next.js Development",
      "React Development",
      "Cybersecurity Consulting",
      "Penetration Testing",
      "Web Application Security",
    ],
    priceRange: "€€",
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [person, website, webpage, professionalService],
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

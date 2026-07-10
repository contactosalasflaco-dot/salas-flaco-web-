import type { MetadataRoute } from "next";
import { commerce } from "@/lib/commerce";
import { ONLY_HOME, SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const home: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // De momento solo existe la home.
  if (ONLY_HOME) return home;

  const products = await commerce.getProducts();

  return [
    ...home,
    {
      url: `${SITE.url}/shows`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/merch`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...products.map((p) => ({
      url: `${SITE.url}/merch/${p.handle}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

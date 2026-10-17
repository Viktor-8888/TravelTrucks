import CatalogClient from "./CatalogClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog | TravelTrucks",
  description: "Explore and find your perfect camper with TravelTrucks.",

  openGraph: {
    title: "Catalog | TravelTrucks",
    description: "Explore and find your perfect camper with TravelTrucks.",
    url: "/catalog",
    siteName: "TravelTrucks",
    type: "website",
    images: [
      {
        url: "/travel-trucks.jpg",
        width: 1200,
        height: 630,
        alt: "TravelTrucks — find your perfect camper",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catalog | TravelTrucks",
    description: "Explore and find your perfect camper with TravelTrucks.",
    images: ["/travel-trucks.jpg"],
  },
};

export default function CatalogPage() {
  return <CatalogClient />;
}

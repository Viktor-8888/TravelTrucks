import Link from "next/link";
import type { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "TravelTrucks | Campers of your dreams",
  description:
    "Rent a camper for your next road trip. Browse campervans by location, type, engine and transmission, and book in a few clicks.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TravelTrucks | Campers of your dreams",
    description:
      "Rent a camper for your next road trip. Browse campervans by location, type, engine and transmission, and book in a few clicks.",
    url: "/",
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
    title: "TravelTrucks | Campers of your dreams",
    description:
      "Rent a camper for your next road trip. Browse campervans by location, type, engine and transmission, and book in a few clicks.",
    images: ["/travel-trucks.jpg"],
  },
};

export default function Home() {
  return (
    <main>
      <section className={css.hero}>
        <div className={`container ${css.heroContainer}`}>
          <div className={css.heroContent}>
            <h1>Campers of your dreams</h1>
            <p>You can find everything you want in our catalog</p>
            <Link href="/catalog" className={css.heroButton}>
              View Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

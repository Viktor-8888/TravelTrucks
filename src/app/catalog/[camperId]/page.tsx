import { getCamperById } from "@/lib/campers";
import { cache } from "react";
import CamperGallery from "@/components/CamperGallery/CamperGallery";
import CamperInfo from "@/components/CamperInfo/CamperInfo";
import VehicleDetails from "@/components/VehicleDetails/VehicleDetails";
import css from "./page.module.css";
import type { Metadata } from "next";

const getCachedCamperById = cache(getCamperById);

interface CamperPageProps {
  params: Promise<{ camperId: string }>;
}

export async function generateMetadata({
  params,
}: CamperPageProps): Promise<Metadata> {
  const { camperId } = await params;
  const camper = await getCachedCamperById(camperId);

  return {
    title: `${camper.name} | TravelTrucks`,
    description: camper.description,
    openGraph: {
      title: `${camper.name} | TravelTrucks`,
      description: camper.description,
      images: camper.gallery?.[0]?.original
        ? [camper.gallery[0].original]
        : ["/travel-trucks.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${camper.name} | TravelTrucks`,
      description: camper.description,
      images: camper.gallery?.[0]?.original
        ? [camper.gallery[0].original]
        : ["/travel-trucks.jpg"],
    },
  };
}

export default async function CamperPage({ params }: CamperPageProps) {
  const { camperId } = await params;
  const camper = await getCachedCamperById(camperId);

  return (
    <main className="container">
      <div className={css.details}>
        <div className={css.topSection}>
          <CamperGallery
            images={camper.gallery ?? []}
            camperName={camper.name}
          />

          <div className={css.infoColumn}>
            <CamperInfo camper={camper} />
            <VehicleDetails camper={camper} />
          </div>
        </div>

        <div className={css.bottomSection}>
          <section>
            <h2 className={css.sectionTitle}>Reviews</h2>

            {/* Тут додамо список відгуків */}
          </section>

          <section>
            <h2 className={css.sectionTitle}>Book your campervan now</h2>

            {/* Тут додамо форму бронювання */}
          </section>
        </div>
      </div>
    </main>
  );
}

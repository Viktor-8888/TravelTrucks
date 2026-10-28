import { getCamperById } from "@/lib/campers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaStar,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCommentDots,
  FaInfoCircle,
} from "react-icons/fa";
import {
  engineLabels,
  transmissionLabels,
  formLabels,
} from "@/lib/camper-labels";
import css from "./page.module.css";

const amenityLabels = {
  ac: "AC",
  bathroom: "Bathroom",
  kitchen: "Kitchen",
  tv: "TV",
  radio: "Radio",
  refrigerator: "Refrigerator",
  microwave: "Microwave",
  gas: "Gas",
  water: "Water",
};

interface BookingSuccessPageProps {
  searchParams: Promise<{ camperId?: string }>;
}

export default async function BookingSuccessPage({
  searchParams,
}: BookingSuccessPageProps) {
  const { camperId } = await searchParams;

  if (!camperId) {
    notFound();
  }

  const camper = await getCamperById(camperId);

  return (
    <main className={`container ${css.page}`}>
      <section className={css.intro}>
        <div className={css.successIcon} aria-hidden="true">
          ✓
        </div>

        <h1 className={css.title}>Booking request received</h1>

        <p className={css.subtitle}>
          Thanks for your interest in {camper.name}. Our team will follow up by
          email to discuss availability and the details of your trip.
        </p>
      </section>

      <div className={css.content}>
        <section className={css.camperCard}>
          <Image
            src={camper.gallery?.[0]?.original ?? ""}
            alt={camper.name}
            width={440}
            height={264}
            className={css.camperImage}
          />

          <div className={css.camperInfo}>
            <h2>{camper.name}</h2>

            <div className={css.camperMeta}>
              <span>
                <FaStar className={css.ratingIcon} aria-hidden="true" />
                {camper.rating} ({camper.totalReviews} Reviews)
              </span>

              <span>
                <FaMapMarkerAlt
                  className={css.locationIcon}
                  aria-hidden="true"
                />
                {camper.location.split(", ").reverse().join(", ")}
              </span>
            </div>

            <p>A compact panel truck for the open road.</p>

            <ul className={css.badges}>
              <li>{transmissionLabels[camper.transmission]}</li>
              <li>{engineLabels[camper.engine]}</li>
              {camper.amenities.map((amenity) => (
                <li key={amenity}>{amenityLabels[amenity]}</li>
              ))}
              <li>{formLabels[camper.form]}</li>
            </ul>
          </div>
        </section>
        <section className={css.nextSteps}>
          <div className={css.steps}>
            <h2>What happens next?</h2>

            <ul className={css.stepsList}>
              <li className={css.step}>
                <div className={css.stepIcon} aria-hidden="true">
                  <FaEnvelope className={css.stepIconSvg} />
                </div>

                <div className={css.stepContent}>
                  <h3>Keep an eye on your inbox</h3>
                  <p>
                    Our team will email you to discuss {camper.name}&apos;s
                    availability and learn more about your plans.
                  </p>
                </div>
              </li>

              <li className={css.step}>
                <div className={css.stepIcon} aria-hidden="true">
                  <FaCommentDots className={css.stepIconSvg} />
                </div>

                <div className={css.stepContent}>
                  <h3>Work out the details together</h3>
                  <p>
                    We&apos;ll answer your questions and talk through the next
                    steps before any reservation is confirmed.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className={css.notice}>
            <div className={css.noticeIcon} aria-hidden="true">
              <FaInfoCircle className={css.noticeIconSvg} />
            </div>

            <p>
              This is a booking request, not a confirmed reservation. No payment
              has been taken.
            </p>
          </div>
          <div className={css.divider} />

          <div className={css.bottom}>
            <p>Your next adventure is still out there. Keep exploring.</p>

            <Link href="/catalog" className={css.backToCatalog}>
              Back to catalog
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

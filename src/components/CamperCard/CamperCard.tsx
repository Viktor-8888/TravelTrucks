import Image from "next/image";
import Link from "next/link";
import {
  FaStar,
  FaMapMarkerAlt,
  FaGasPump,
  FaCogs,
  FaBus,
} from "react-icons/fa";
import type { Camper } from "@/types/camper";
import {
  engineLabels,
  transmissionLabels,
  formLabels,
} from "@/lib/camper-labels";
import css from "./CamperCard.module.css";

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  return (
    <article className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          className={css.image}
          src={camper.coverImage}
          alt={camper.name}
          width={219}
          height={240}
          loading="eager"
        />
      </div>

      <div className={css.content}>
        <div className={css.wrapper}>
          <h2 className={css.title}>{camper.name}</h2>
          <div className={css.price}>€{camper.price.toFixed(2)}</div>
        </div>

        <div className={css.meta}>
          <span className={css.metaItem}>
            <FaStar className={css.ratingIcon} aria-hidden="true" />
            {camper.rating} ({camper.totalReviews} Reviews)
          </span>

          <span className={css.metaItem}>
            <FaMapMarkerAlt aria-hidden="true" />
            {camper.location}
          </span>
        </div>

        <p className={css.description}>{camper.description}</p>

        <div className={css.features}>
          <span className={css.feature}>
            <FaGasPump className={css.iconsCard} aria-hidden="true" />{" "}
            {engineLabels[camper.engine]}
          </span>

          <span className={css.feature}>
            <FaCogs className={css.iconsCard} aria-hidden="true" />{" "}
            {transmissionLabels[camper.transmission]}
          </span>

          <span className={css.feature}>
            <FaBus className={css.iconsCard} aria-hidden="true" />{" "}
            {formLabels[camper.form]}
          </span>
        </div>

        <Link
          className={css.button}
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Show more
        </Link>
      </div>
    </article>
  );
}

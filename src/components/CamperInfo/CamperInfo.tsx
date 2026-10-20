import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import type { Camper } from "@/types/camper";
import css from "./CamperInfo.module.css";

interface CamperInfoProps {
  camper: Camper;
}

export default function CamperInfo({ camper }: CamperInfoProps) {
  return (
    <section className={css.info}>
      <h1 className={css.title}>{camper.name}</h1>

      <div className={css.meta}>
        <span className={css.rating}>
          <FaStar aria-hidden="true" />
          <span>
            {camper.rating} ({camper.totalReviews} Reviews)
          </span>
        </span>

        <span className={css.location}>
          <FaMapMarkerAlt aria-hidden="true" />
          <span>{camper.location}</span>
        </span>
      </div>

      <p className={css.price}>€{camper.price.toLocaleString("en-US")}</p>

      <p className={css.description}>{camper.description}</p>
    </section>
  );
}

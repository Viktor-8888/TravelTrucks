"use client";

import Image from "next/image";
import { IoClose } from "react-icons/io5";
import css from "./NoCampersFound.module.css";

interface NoCampersFoundProps {
  onClearFilters: () => void;
  onViewAllCampers: () => void;
}

export default function NoCampersFound({
  onClearFilters,
  onViewAllCampers,
}: NoCampersFoundProps) {
  return (
    <div className={css.wrapper}>
      <Image
        className={css.image}
        src="/no-campers-found.webp"
        alt=""
        width={488}
        height={463}
      />

      <h2 className={css.title}>No campers found</h2>
      <p className={css.text}>
        We couldn`t find any campers that match your filters.
        <br />
        Try adjusting your search or clearing some filters.
      </p>

      <div className={css.actions}>
        <button
          className={css.clearFiltersButton}
          type="button"
          onClick={onClearFilters}
        >
          <IoClose size={24} aria-hidden="true" />
          Clear filters
        </button>

        <button
          className={css.viewAllButton}
          type="button"
          onClick={onViewAllCampers}
        >
          View all campers
        </button>
      </div>
    </div>
  );
}

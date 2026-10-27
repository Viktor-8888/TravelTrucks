"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { getCampers, getCamperFilters } from "@/lib/campers";
import CamperCard from "@/components/CamperCard/CamperCard";
import css from "./page.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import type {
  CamperForm,
  CamperEngine,
  CamperTransmission,
} from "@/types/camper";
import { IoClose } from "react-icons/io5";
import LoadingTracks from "@/components/LoadingTracks/LoadingTracks";
import { SpinnerCircularFixed } from "spinners-react";

export default function CatalogClient() {
  const [location, setLocation] = useState("");
  const [activeFilterAction, setActiveFilterAction] = useState<
    "search" | "clear" | null
  >(null);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [form, setForm] = useState<CamperForm | "">("");
  const [engine, setEngine] = useState<CamperEngine | "">("");
  const [transmission, setTransmission] = useState<CamperTransmission | "">("");
  const [appliedFilters, setAppliedFilters] = useState({
    location: "",
    form: "" as CamperForm | "",
    engine: "" as CamperEngine | "",
    transmission: "" as CamperTransmission | "",
  });

  const campersListRef = useRef<HTMLDivElement | null>(null);
  const previousFetchingRef = useRef(false);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["campers", appliedFilters],
    queryFn: ({ pageParam }) =>
      getCampers(pageParam, 4, {
        location: appliedFilters.location.trim() || undefined,
        form: appliedFilters.form || undefined,
        transmission: appliedFilters.transmission || undefined,
        engine: appliedFilters.engine || undefined,
      }),
    placeholderData: (previousData) => previousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });

  useEffect(() => {
    if (previousFetchingRef.current && !isFetchingNextPage) {
      campersListRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    previousFetchingRef.current = isFetchingNextPage;
  }, [isFetchingNextPage]);

  const { data: filters } = useQuery({
    queryKey: ["camperFilters"],
    queryFn: getCamperFilters,
  });

  const camperForms = filters?.forms ?? [];
  const engineOptions = filters?.engines ?? [];

  const camperFormLabels: Record<CamperForm, string> = {
    alcove: "Alcove",
    panel_van: "Panel Van",
    integrated: "Integrated",
    semi_integrated: "Semi Integrated",
  };

  const engineLabels: Record<CamperEngine, string> = {
    diesel: "Diesel",
    petrol: "Petrol",
    hybrid: "Hybrid",
    electric: "Electric",
  };

  if (isLoading && !data) {
    return (
      <div className={css.initialLoadingContainer}>
        <LoadingTracks />
      </div>
    );
  }

  if (isError) {
    return (
      <main>
        <p>Failed to load campers.</p>
      </main>
    );
  }

  const isAnyFilterSelected = Boolean(form || engine || transmission);

  return (
    <main className={`container ${css.catalog}`}>
      <h1 className={css.visuallyHidden}>Catalog</h1>

      <div className={css.catalogLayout}>
        <aside className={css.filters}>
          <div className={css.locationField}>
            <label className={css.locationLabel} htmlFor="location">
              Location
            </label>

            <div
              className={`${css.locationInputWrapper} ${
                isAnyFilterSelected ? css.locationInputWrapperActive : ""
              }`}
            >
              <FaMapMarkerAlt className={css.locationIcon} aria-hidden="true" />
              <input
                className={css.locationInput}
                id="location"
                type="text"
                placeholder={isLocationFocused ? "" : "Kyiv"}
                value={location}
                onFocus={() => setIsLocationFocused(true)}
                onBlur={() => setIsLocationFocused(false)}
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>
          </div>

          <div className={css.filterGroup}>
            <h2 className={css.filterTitle}>Filters</h2>

            <fieldset className={css.filterFieldset}>
              <legend className={css.filterLegend}>Camper form</legend>

              {camperForms.map((formOption) => (
                <label key={formOption}>
                  <input
                    type="radio"
                    name="form"
                    value={formOption}
                    checked={form === formOption}
                    onChange={() => setForm(formOption)}
                  />
                  {camperFormLabels[formOption]}
                </label>
              ))}
            </fieldset>

            <fieldset className={css.filterFieldset}>
              <legend className={css.filterLegend}>Engine</legend>

              {engineOptions.map((engineOption) => (
                <label key={engineOption}>
                  <input
                    type="radio"
                    name="engine"
                    value={engineOption}
                    checked={engine === engineOption}
                    onChange={() => setEngine(engineOption)}
                  />
                  {engineLabels[engineOption]}
                </label>
              ))}
            </fieldset>
            <fieldset className={css.filterFieldset}>
              <legend className={css.filterLegend}>Transmission</legend>

              {filters?.transmissions.map((transmissionOption) => (
                <label key={transmissionOption}>
                  <input
                    type="radio"
                    name="transmission"
                    value={transmissionOption}
                    checked={transmission === transmissionOption}
                    onChange={() => setTransmission(transmissionOption)}
                  />
                  {transmissionOption === "automatic" ? "Automatic" : "Manual"}
                </label>
              ))}
            </fieldset>
          </div>
          <div className={css.filterActions}>
            <button
              className={css.searchButton}
              type="button"
              onClick={() => {
                setActiveFilterAction("search");
                setAppliedFilters({
                  location,
                  form,
                  engine,
                  transmission,
                });
              }}
            >
              {isFetching &&
              activeFilterAction === "search" &&
              !isFetchingNextPage ? (
                <SpinnerCircularFixed
                  size={32}
                  thickness={100}
                  speed={100}
                  color="#ffffff"
                  secondaryColor="rgba(255, 255, 255, 0.3)"
                />
              ) : (
                "Search"
              )}
            </button>

            <button
              className={css.clearFiltersButton}
              type="button"
              onClick={() => {
                setActiveFilterAction("clear");
                setLocation("");
                setForm("");
                setEngine("");
                setTransmission("");
                setAppliedFilters({
                  location: "",
                  form: "",
                  engine: "",
                  transmission: "",
                });
              }}
            >
              {isFetching &&
              activeFilterAction === "clear" &&
              !isFetchingNextPage ? (
                <SpinnerCircularFixed
                  size={32}
                  thickness={100}
                  speed={100}
                  color="#101828"
                  secondaryColor="rgba(16, 24, 40, 0.2)"
                />
              ) : (
                <>
                  <IoClose size={24} aria-hidden="true" />
                  Clear filters
                </>
              )}
            </button>
          </div>
        </aside>
        <section className={css.results}>
          <div className={css.resultsContent}>
            <div className={css.campersList}>
              {data?.pages.map((page, pageIndex) => (
                <div
                  key={page.page}
                  className={css.campersPage}
                  ref={
                    pageIndex === data.pages.length - 1 && pageIndex > 0
                      ? campersListRef
                      : null
                  }
                >
                  {page.campers.map((camper) => (
                    <CamperCard key={camper.id} camper={camper} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {hasNextPage && (
            <button
              className={css.loadMoreButton}
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                <>
                  <SpinnerCircularFixed
                    size={24}
                    thickness={100}
                    speed={100}
                    color="#101828"
                    secondaryColor="rgba(16, 24, 40, 0.2)"
                  />
                  Loading...
                </>
              ) : (
                "Load More"
              )}
            </button>
          )}
        </section>
      </div>
    </main>
  );
}

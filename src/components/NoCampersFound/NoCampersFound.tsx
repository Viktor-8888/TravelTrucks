"use client";

interface NoCampersFoundProps {
  onClearFilters: () => void;
  onViewAllCampers: () => void;
}

export default function NoCampersFound({
  onClearFilters,
  onViewAllCampers,
}: NoCampersFoundProps) {
  return (
    <div>
      <h2>No campers found</h2>
      <p>Sorry, no campers match your search criteria.</p>

      <button type="button" onClick={onClearFilters}>
        Clear filters
      </button>

      <button type="button" onClick={onViewAllCampers}>
        View all campers
      </button>
    </div>
  );
}

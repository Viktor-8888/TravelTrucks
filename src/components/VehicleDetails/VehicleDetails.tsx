import type { Camper, CamperAmenity, CamperForm } from "@/types/camper";
import css from "./VehicleDetails.module.css";

interface VehicleDetailsProps {
  camper: Camper;
}

export default function VehicleDetails({ camper }: VehicleDetailsProps) {
  const formLabels: Record<CamperForm, string> = {
    alcove: "Alcove",
    panel_van: "Panel Van",
    integrated: "Integrated",
    semi_integrated: "Semi Integrated",
  };

  const amenityLabels: Record<CamperAmenity, string> = {
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

  const features = [
    {
      label: "transmission",
      value: camper.transmission === "automatic" ? "Automatic" : "Manual",
    },
    ...camper.amenities.map((amenity) => ({
      label: amenity,
      value: amenityLabels[amenity],
    })),
    {
      label: "engine",
      value: camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1),
    },
    {
      label: "form",
      value: formLabels[camper.form],
    },
  ];

  return (
    <section className={css.details}>
      <h2 className={css.title}>Vehicle details</h2>

      <ul className={css.features}>
        {features.map((feature) => (
          <li className={css.feature} key={feature.label}>
            <span>{feature.value}</span>
          </li>
        ))}
      </ul>
      <hr className={css.divider} />
      <dl className={css.specifications}>
        <div>
          <dt>Form</dt>
          <dd>{formLabels[camper.form]}</dd>
        </div>
        <div>
          <dt>Length</dt>
          <dd>{camper.length}</dd>
        </div>
        <div>
          <dt>Width</dt>
          <dd>{camper.width}</dd>
        </div>
        <div>
          <dt>Height</dt>
          <dd>{camper.height}</dd>
        </div>
        <div>
          <dt>Tank</dt>
          <dd>{camper.tank}</dd>
        </div>
        <div>
          <dt>Consumption</dt>
          <dd>{camper.consumption}</dd>
        </div>
      </dl>
    </section>
  );
}

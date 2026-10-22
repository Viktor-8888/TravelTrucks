import css from "./LoadingTracks.module.css";
import { SpinnerCircularFixed } from "spinners-react";

export default function LoadingTracks() {
  return (
    <div className={css.spinnerWrapper}>
      <div>
        <SpinnerCircularFixed
          size={72}
          thickness={100}
          speed={100}
          color="rgba(109, 123, 117, 1)"
          secondaryColor="rgba(247, 247, 247, 1)"
        />
      </div>
      <ul className={css.spinnerList}>
        <li className={css.spinnerItemFirst}>
          <p>Loading tracks...</p>
        </li>
        <li className={css.spinnerItemSecond}>
          Please wait while we fetch the best travel trucks for you
        </li>
      </ul>
    </div>
  );
}

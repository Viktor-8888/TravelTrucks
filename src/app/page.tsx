import Link from "next/link";
import css from "./page.module.css";

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

"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import css from "./Header.module.css";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo} aria-label="TravelTrucks — Home">
          <Image src="/logo.svg" alt="TravelTrucks" width={136} height={16} />
        </Link>

        <nav className={css.navigation}>
          <Link href="/" className={pathname === "/" ? css.active : ""}>
            Home
          </Link>
          <Link
            href="/catalog"
            className={pathname.startsWith("/catalog") ? css.active : ""}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}

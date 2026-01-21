"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Frame.module.scss";

interface FrameProps {
  title?: string;
}

export default function Frame({ title }: FrameProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <section className={styles.frame}>
      <div className={styles.content}>
        {title && <h1 className={styles.title}>{title}</h1>}

        <nav className={styles.breadcrumbs}>
          <Link href="/" className={styles.link}>
            Home
          </Link>

          {segments.map((segment, index) => {
            const path = "/" + segments.slice(0, index + 1).join("/");
            const isLast = index === segments.length - 1;

            const label =
              segment.charAt(0).toUpperCase() + segment.slice(1);

            return (
              <span key={path} className={styles.separator}>
                {'>'}

                {isLast ? (
                  <span className={styles.active}>{label}</span>
                ) : (
                  <Link href={path} className={styles.link}>
                    {label}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </section>
  );
}

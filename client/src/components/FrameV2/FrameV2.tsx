"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./FrameV2.module.scss";
import { useAppSelector } from "@/redux/hooks";

interface FrameProps {
  title?: string;
}

export default function FrameV2({ title }: FrameProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const productId = segments[1];

  const product = useAppSelector((state) =>
    state.products.items?.find((item) => item._id === productId),
  );

  const titleName = product?.name || "Product Details";

  console.log("Title from Redux:", titleName);
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
              isLast && product
                ? titleName
                : segment.charAt(0).toUpperCase() + segment.slice(1);

            return (
              <span key={path} className={styles.separator}>
                {">"}
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

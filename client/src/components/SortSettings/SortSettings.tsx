"use client";

import styles from "./SortSettings.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProducts } from "@/redux/slices/productSlice";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SortSettings() {
  const dispatch = useAppDispatch();

  const [count, setCount] = useState(16);
  const [sort, setSort] = useState("date-desc");
  const [inputValue, setInputValue] = useState("16");
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [configuration, setConfiguration] = useState("");

  const { total, limit } = useAppSelector((state) => state.products);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const sortOptions = [
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "date-asc", label: "Date (Oldest First)" },
    { value: "date-desc", label: "Date (Newest First)" },
    { value: "price-asc", label: "Price (Low to High)" },
    { value: "price-desc", label: "Price (High to Low)" },
  ];

  const configurationOptions = [
    { value: "", label: "All Configurations" },
    { value: "L-Shaped", label: "L-Shaped" },
    { value: "1-Seater", label: "1-Seater" },
    { value: "2-Seater", label: "2-Seater" },
    { value: "3-Seater", label: "3-Seater" },
  ];

  useEffect(() => {
    dispatch(
      getProducts({ page: 1, limit: count, sort, search, configuration }),
    );
  }, [dispatch, count, sort, search, configuration]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSort(value);
  };

  const handleConfigChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setConfiguration(value);
  };

  return (
    <div className={styles.frame}>
      {/* HEADER */}
      <div className={styles.filter}>
        <div className={styles.filterContainer} onClick={toggleMenu}>
          <img src="filter.svg" alt="filter" />
          <h3 className={styles.title}>Filter</h3>
        </div>

        <div className={styles.line} />

        <h2 className={styles.title}>
          Showing 1–{limit} of {total} results
        </h2>
      </div>

      {/* SETTINGS */}
      <div className={styles.settings}>
        <div>
          <label>
            Show
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={() => setCount(Number(inputValue))}
              className={styles.input}
            />
          </label>
        </div>
        <div>
          <label>
            Sort by
            <select
              onChange={handleSortChange}
              value={sort}
              className={styles.select}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={toggleMenu}
      />

      {/* MOBILE MENU */}
      <nav className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.mobileMenuLabel}>
          {/* <input type="checkbox" /> <h1>Configuration</h1> */}
          <h3>Configuration:</h3>
          <select
            onChange={handleConfigChange}
            value={configuration}
            className={styles.selectConfig}
          >
            {configurationOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </nav>
    </div>
  );
}

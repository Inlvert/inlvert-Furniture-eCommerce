"use client";

import { useState, ReactNode } from "react";
import classNames from "classnames";
import styles from "./ProductTabs.module.scss";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type ProductTabsProps = {
  tabs: Tab[];
};

export default function ProductTabs({ tabs }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(
    tabs[0]?.id || ""
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.tab}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={classNames(styles.tablinks, {
              [styles.active]: activeTab === tab.id,
            })}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.tabcontent}>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

import React from "react";
import styles from "../../styles/TabsBar.module.css";
import { TABS } from "../../data/consts";
import { useNavigate, useParams } from "react-router-dom";

export default function TabsBar() {
  const navigate = useNavigate();
  const { section } = useParams();
  return (
    <div className={styles.tabsWrapper}>
      <div className={styles.tabGroup}>
        {TABS.map((tab, i) => (
          <div
            key={tab.id}
            className={styles.tab}
            style={
              section === tab.id
                ? { color: "#ffffff", backgroundColor: "#2A3958" }
                : {}
            }
            onClick={() => navigate(`/${tab.id}`)}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
}

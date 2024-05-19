import React from "react";
import { Outlet } from "react-router-dom";
import styles from "../../styles/Layout.module.css";
import TabsBar from "../molecules/TabsBar";

export default function Layout() {
  return (
    <div className={styles.viewport}>
      <div className={styles.header}>
        <div>
          <span className={styles.heading}>회원상세</span>
          <span className={styles.requiredItems}>
            <div className={styles.redDot} />
            필수항목
          </span>
        </div>
        <div>
          <TabsBar />
        </div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

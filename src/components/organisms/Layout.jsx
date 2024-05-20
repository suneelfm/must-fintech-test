import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "../../styles/Layout.module.css";
import TabsBar from "../molecules/TabsBar";

export default function Layout() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/investment_type");
  }, []);

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

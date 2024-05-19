import React from "react";
import styles from "../../styles/Atoms.module.css";

export default function ApprovalStatusTag({ tag }) {
  const tagProps = {
    승인대기: { backgroundColor: "#FFEDD5", color: "#9a3412" },
    승인거부: { backgroundColor: "#FEE2E2", color: "#991B1B" },
    승인완료: { backgroundColor: "#DCFCE7", color: "#166534" },
  };
  return (
    <span className={styles.approvalStatusTag} style={{ ...tagProps[tag] }}>
      {tag}
    </span>
  );
}

import React from "react";
import styles from "../../styles/Table.module.css";

export default function Table({
  columns,
  rows = [],
  selectedRows = [],
  onRowSelect,
}) {
  return (
    <div>
      <table>
        <thead>
          <tr className={styles.head}>
            <th>
              <input
                type="checkbox"
                style={{ backgroundColor: "#ffffff" }}
                className={styles.checkbox}
                checked={selectedRows.length === rows.length}
                onChange={(e) =>
                  onRowSelect(
                    e,
                    rows.map((row) => row.id)
                  )
                }
              />
            </th>
            {columns?.map(({ header, id, minWidth }) => (
              <th key={id} style={{ minWidth }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, i) => (
            <tr
              key={`row-${i + 1}`}
              className={styles.row}
              style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#F9F9FB" }}
            >
              <td>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={selectedRows?.includes(row.id)}
                  onChange={(e) => onRowSelect(e, row.id)}
                  style={
                    i % 3 === 0
                      ? { backgroundColor: "#ffffff" }
                      : { backgroundColor: "#DDE0E5" }
                  }
                />
              </td>
              {columns?.map(({ id }) => (
                <td
                  key={id}
                  style={{ textAlign: id === "reasonForReject" ? "left" : "" }}
                >
                  {row[id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!rows.length && (
        <div className={styles.noRecordsDisplay}>조회 결과가 없습니다.</div>
      )}
    </div>
  );
}

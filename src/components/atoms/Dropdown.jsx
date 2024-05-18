import React, { useState } from "react";
import styles from "../../styles/Atoms.module.css";

export default function Dropdown({ options, value, onDropdownChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={styles.dropdownInput}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
    >
      {value}
      {open && (
        <div className={styles.dropdownMenu}>
          {options?.map((option, i) => (
            <div
              key={`option-${i + 1}`}
              style={
                value === option
                  ? {
                      backgroundColor: "#2A3958",
                      color: "#ffffff",
                    }
                  : {}
              }
              className={styles.dropdownMenuItem}
              onClick={() => {
                onDropdownChange(option);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React from "react";
import styles from "../../styles/MessageDialogue.module.css";
import { Grid } from "@mui/material";
import Icon from "../atoms/Icon";
import Button from "../atoms/Button";

export default function MessageDialogue({
  messageType = "warn",
  message,
  cancelRequired = false,
  onClose,
  onAccept,
}) {
  const type = {
    warn: {
      styles: {
        backgroundColor: "#FEF0C7",
        borderColor: "#FFFAEB",
        color: "#D46B08",
        fontSize: "25px",
        fontWeight: "700",
      },
      icon: "!",
    },
    success: {
      styles: {
        backgroundColor: "#D1FADF",
        borderColor: "#ECFDF3",
        color: "#039855",
        fontSize: "30px",
      },
      icon: <Icon name={"check"} />,
    },
  };
  return (
    <Grid container className={styles.dialogueContainer}>
      <div className={styles.dialogueWrapper}>
        <Grid container p={3} alignItems={"center"}>
          <Grid item xs={6}>
            <div
              style={{ ...type[messageType].styles }}
              className={styles.dialogueTypeIconWrapper}
            >
              {type[messageType].icon}
            </div>
          </Grid>
          <Grid item xs={6} display={"flex"} justifyContent={"flex-end"}>
            <Icon
              name={"cancel"}
              className={styles.closeIcon}
              onClick={onClose}
            />
          </Grid>
        </Grid>
        <Grid container className={styles.message} px={3}>
          {message}
        </Grid>
        <Grid container px={3} pt={3} justifyContent={"center"} spacing={2}>
          <Grid item xs={6}>
            <Button size="flex" onClick={onAccept}>
              확인
            </Button>
          </Grid>
          {cancelRequired && (
            <Grid item xs={6}>
              <Button size="flex" variant="outlined" onClick={onClose}>
                취소
              </Button>
            </Grid>
          )}
        </Grid>
      </div>
    </Grid>
  );
}

import React from "react";
import { Container, Typography } from "@mui/material";
import styles from "./page.module.css";
import { morKhor } from "../assets/fonts";

export const Table = () => {
  const times: string[] = [
    "Day/Time",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
  ];

  const days: string[] = ["MON", "TUE", "WED", "THU", "FRI"];

  return (
    <Container
      maxWidth="lg"
      sx={{ paddingLeft: "24px", paddingRight: "24px", display: "block" }}
    >
      <div style={{ paddingTop: "32px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            marginBottom: "24px",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: morKhor.style.fontFamily,
              fontWeight: morKhor.style.fontWeight,
            }}
          >
            จัดตารางเรียน
          </Typography>
        </div>

        {/* Time Slots */}
        <div style={{ display: "block" }}>
          <div>
            <div style={{ width: "100%" }}></div>
            <div style={{ paddingTop: "12px" }}>
              <div
                style={{
                  position: "absolute",
                  width: "1170px",
                  height: "460px",
                }}
              >
                {times.map((time, index) => (
                  <div
                    key={index}
                    className={styles.timeHeader}
                    style={{
                      top: "0px",
                      left: `${90 * index}px`,
                      width: "90px",
                      height: "54px",
                    }}
                  >
                    <Typography variant="subtitle2">{time}</Typography>
                  </div>
                ))}
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={styles.timeHeader}
                    style={{
                      top: `${54 + 80 * index}px`,
                      left: "0px",
                      width: "90px",
                      height: "80px",
                    }}
                  >
                    <Typography variant="subtitle2">{day}</Typography>
                  </div>
                ))}
                {[...Array(times.length + 1)].map((value, index) => (
                  <span
                    key={index}
                    className={styles.line}
                    style={{
                      left: `${-0.5 + 90 * index}px`,
                      top: "-0.5px",
                      width: "1px",
                      height: "460px",
                    }}
                  ></span>
                ))}
                {days.map((value, index) => (
                  <span
                    key={index}
                    className={styles.line}
                    style={{
                      left: "-0.5px",
                      top: `${53.5 + 80 * index}px`,
                      width: "1170px",
                      height: "1px",
                    }}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};



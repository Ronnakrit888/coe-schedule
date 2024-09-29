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
    <Container maxWidth="lg">
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
        <div style={{ overflow : 'scroll', paddingTop : '18px' }}>
          <div style={{ width: "100%" }}></div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                // position: "absolute",
                width: "100%",
                height: "460px",
                top: "0px",
              }}
            >
              {times.map((time, index) => (
                <div
                  key={index}
                  className={styles.timeHeader}
                  style={{
                    top: "0px",
                    left: `${88 * index}px`,
                    width: "88px",
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
                    width: "88px",
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
                    left: `${-0.5 + 88 * index}px`,
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
                    width: "1152px",
                    height: "1px",
                  }}
                ></span>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: "24px",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex" }}>
            <Typography
              variant="h6"
              sx={{ fontFamily: morKhor.style.fontFamily }}
            >
              หน่วยกิตในตาราง
            </Typography>
          </div>
        </div>
      </div>
    </Container>
  );
};

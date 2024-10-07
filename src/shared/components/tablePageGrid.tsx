import React from "react";
import styles from "./page.module.css";
import { Container } from "@mui/material";
import { time } from "console";

export const TablePageGrid = () => {
  const times = [
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

  const days = ["MON", "TUE", "WED", "THU", "FRI"];

  return (
    <Container maxWidth="lg" sx={{ marginTop: "48px" }}>
      <div
        className={styles.wrapper}
        style={{
          gridTemplateColumns: `1fr repeat(${times.length - 1}, 2fr)`,
          gridTemplateRows: `50px repeat(${days.length}, 1fr)`,
        }}
      >
        {times.map((time, index) => (
          <div key={index} className={styles.timeHeader}>
            {time}
          </div>
        ))}
        {days.map((day, dayIndex) => (
          <React.Fragment key={dayIndex}>
            <div className={styles.timeHeader}>{day}</div>
            {times.slice(1).map((time, timeIndex) => (
              
                <div
                  key={`${dayIndex}-${timeIndex}`}
                  // style={{
                  //   display: "grid",
                  //   gridTemplateColumns: "subgrid",
                  //   borderRight: "0.5px solid rgb(227, 229, 248)",
                  //   borderBottom: "0.5px solid rgb(227, 229, 248)",
                  // }}
                ></div>

              
            ))}
          </React.Fragment>
        ))}
      </div>
    </Container>
  );
};

export default TablePageGrid;

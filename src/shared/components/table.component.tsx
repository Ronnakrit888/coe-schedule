"use client";
import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Alert,
} from "@mui/material";
import styles from "./page.module.css";
import { morKhor, poppins } from "../assets/fonts";

const timeToPixels = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = (hours - 9) * 60 + minutes; // เริ่มที่ 9:00 = 0 นาที
  return totalMinutes * (44 / 30); // 44px ต่อ 30 นาที
};

const getPosition = (day: string, startTime: string, endTime: string) => {
  const startPixel = timeToPixels(startTime);
  const endPixel = timeToPixels(endTime);

  const dayIndex = ["MON", "TUE", "WED", "THU", "FRI"].indexOf(day);
  const dayPixel = dayIndex * 80;

  return {
    left: startPixel,
    width: endPixel - startPixel,
    top: dayPixel,
    height: 80,
  };
};

const courseData = {
  course_name: "DISCRETE MATHEMATICS",
  sections: [
    {
      schedule: [
        {
          day_of_week: "WED",
          start_time: "10:30",
          end_time: "12:00",
          room_name: "EN16606",
        },
      ],
    },
  ],
};

export const Table = () => {
  const [courses, setCourses] = useState<any[]>([]); // เก็บข้อมูลวิชา
  const [selectedCourse, setSelectedCourse] = useState<any>(null); // เก็บวิชาที่เลือกสำหรับ modal
  const [courseColor, setCourseColor] = useState<string>("#e3f2fd"); // สีของรายวิชาในตาราง
  const [selectedColor, setSelectedColor] = useState<string>("blue"); // กำหนดค่าสีเริ่มต้น

  // ฟังก์ชันสำหรับการเพิ่มวิชาในตาราง
  const addCourse = (course: any) => {
    setCourses([...courses, course]);
  };

  // ฟังก์ชันสำหรับการลบวิชา
  const removeCourse = (course: any) => {
    setCourses(courses.filter((c) => c !== course));
    setSelectedCourse(null); // ปิด modal หลังลบ
  };

  const handleColorChange = (color: string) => {
    setCourseColor(color);
    setSelectedColor(color);
  };

  const colors = ["pink", "orange", "yellow", "green", "blue", "purple"];

  const times: string[] = [
    "Day/Time",
    "9:00-10.00",
    "10:00-11.00",
    "11:00-12.00",
    "12:00-13.00",
    "13:00-14.00",
    "14:00-15.00",
    "15:00-16.00",
    "16:00-17.00",
    "17:00-18.00",
    "18:00-19.00",
    "19:00-20.00",
    "20:00-21.00",
  ];

  const days: string[] = ["MON", "TUE", "WED", "THU", "FRI"];

  return (
    <Container maxWidth="lg">
      <div style={{ paddingTop: "32px" }}>
        <Button
          onClick={() => addCourse(courseData)}
          variant="contained"
          color="primary"
          style={{ marginBottom: "16px" }}
        >
          เพิ่มวิชา
        </Button>
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

        <div
          style={{
            overflow: "scroll",
            height: "500px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ width: `${44 * (times.length * 2 - 2)}px` }}></div>
          <div style={{ position: "relative" }}>
            {times.map((time, index) => (
              <div
                key={index}
                className={styles.timeHeader}
                style={{
                  position: "absolute",
                  left: `${index * 88}px`,
                  top: 0,
                  width: "88px",
                  height: "54px",
                  backgroundColor: "#fff",
                  borderBottom: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: morKhor.style.fontFamily,
                  fontWeight: morKhor.style.fontWeight,
                }}
              >
                <Typography variant="subtitle2" color="textSecondary">
                  {time}
                </Typography>
              </div>
            ))}

            {days.map((day, index) => (
              <div
                key={index}
                className={styles.timeHeader}
                style={{
                  position: "absolute",
                  left: 0,
                  top: `${54 + 80 * index}px`,
                  height: "80px",
                  width: "88px",
                  backgroundColor: "#fff",
                  borderRight: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: morKhor.style.fontFamily,
                  fontWeight: morKhor.style.fontWeight,
                }}
              >
                <Typography variant="subtitle2" color="textSecondary">
                  {day}
                </Typography>
              </div>
            ))}

            {courses.map((course) => {
              return course.sections.map((section: any) => {
                return section.schedule.map((slot: any) => {
                  const position = getPosition(
                    slot.day_of_week,
                    slot.start_time,
                    slot.end_time
                  );
                  return (
                    <div
                      key={`${slot.day_of_week}-${slot.start_time}`}
                      style={{
                        position: "absolute",
                        left: `${position.left + 88}px`,
                        top: `${position.top + 54}px`,
                        width: `${position.width}px`,
                        height: "72px",
                        backgroundColor: courseColor,
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: morKhor.style.fontFamily,
                        fontWeight: morKhor.style.fontWeight,
                        color: "#1565c0",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        padding: "4px",
                        border: "1px solid #90caf9",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedCourse(course)} // แสดง modal เมื่อคลิก
                    >
                      <Typography variant="subtitle2">
                        {course.course_name} ({slot.room_name})
                      </Typography>
                    </div>
                  );
                });
              });
            })}

            {/* Modal สำหรับเลือกสี */}
            {selectedCourse && (
              <Dialog
                open={Boolean(selectedCourse)}
                onClose={() => setSelectedCourse(null)}
              >
                <DialogTitle>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: "bold",
                    }}
                  >
                    {selectedCourse.course_code} {selectedCourse.course_name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{ fontFamily: poppins.style.fontFamily }}
                  >
                    {selectedCourse.course_name_english}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ fontFamily: poppins.style.fontFamily }}
                  >
                    [{selectedCourse.credits} หน่วยกิต]
                  </Typography>
                </DialogTitle>

                <DialogContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontFamily: poppins.style.fontFamily }}
                    >
                      Sec {selectedCourse.sections[0].section}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontFamily: poppins.style.fontFamily }}
                    >
                      หมวดวิชา: {selectedCourse.sections[0].level_name}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: poppins.style.fontFamily }}
                    >
                      สอบกลางภาค: {selectedCourse.sections[0].midterm || "TBA"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: poppins.style.fontFamily }}
                    >
                      สอบปลายภาค:{" "}
                      {selectedCourse.sections[0].final_exam || "TBA"}
                    </Typography>
                  </Box>

                  {/* เลือกสีในตาราง */}
                  <Typography
                    variant="subtitle1"
                    sx={{ mt: 3, fontFamily: poppins.style.fontFamily }}
                  >
                    เลือกสีในตาราง
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    {[
                      "pink",
                      "orange",
                      "yellow",
                      "green",
                      "blue",
                      "purple",
                    ].map((color) => (
                      <Box
                        key={color}
                        onClick={() => handleColorChange(color)}
                        sx={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: color,
                          cursor: "pointer",
                          border:
                            selectedColor === color
                              ? "3px solid black"
                              : "1px solid #ccc",
                        }}
                      />
                    ))}
                  </Box>
                </DialogContent>

                <DialogActions>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => removeCourse(selectedCourse)}
                    sx={{ fontFamily: poppins.style.fontFamily }}
                  >
                    นำออก
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => setSelectedCourse(null)}
                    sx={{ fontFamily: poppins.style.fontFamily }}
                  >
                    ปิด
                  </Button>
                </DialogActions>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

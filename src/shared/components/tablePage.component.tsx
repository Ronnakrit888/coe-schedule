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
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Slide,
} from "@mui/material";
import styles from "./page.module.css";
import { morKhor } from "../assets/fonts";
import { Course } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { removeCourse, updateCourseColor } from "../slices";
import { SelectedCourseAndSec } from "../types";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const timeToPixels = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = (hours - 9) * 60 + minutes; // เริ่มที่ 9:00 = 0 นาที
  return totalMinutes * (44 / 30); // 44px ต่อ 30 นาที
};

const getPosition = (day: string, startTime: string, endTime: string) => {
  const startPixel = timeToPixels(startTime);
  const endPixel = timeToPixels(endTime);

  const dayIndex = ["MON", "TUE", "WED", "THU", "FRI"].indexOf(
    day.toUpperCase()
  );
  const dayPixel = dayIndex * 80;

  return {
    left: startPixel,
    width: endPixel - startPixel,
    top: dayPixel,
    height: 80,
  };
};

const secNumberToSecIndex = (secNumber: number, course: Course): number => {
  if (course.sections) {
    return course.sections.findIndex((sec) => sec.section === secNumber);
  } else return 0;
};

const darkenColor = (color: string) => {
  const amount = 0.2;
  let usePound = false;
  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);
  let r = (num >> 16) - amount * 255;
  let g = ((num >> 8) & 0x00ff) - amount * 255;
  let b = (num & 0x0000ff) - amount * 255;

  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  return (
    (usePound ? "#" : "") +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  );
};

const moreDarkenColor = (color: string) => {
  // ฟังก์ชันนี้จะลดความสว่างของสีเดิมมากกว่า darkenColor
  const amount = 0.6; // เพิ่มค่าความเข้มให้มากขึ้น
  let usePound = false;

  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);
  let r = (num >> 16) - amount * 255;
  let g = ((num >> 8) & 0x00ff) - amount * 255;
  let b = (num & 0x0000ff) - amount * 255;

  // ตรวจสอบไม่ให้ค่าเกินขอบเขต 0-255
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  return (
    (usePound ? "#" : "") +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  );
};

const TablePage = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null); // เก็บวิชาที่เลือกสำหรับ modal
  const [selectedColor, setSelectedColor] = useState<string>("blue"); // กำหนดค่าสีเริ่มต้น
  const dispatch = useDispatch();
  const selectedCoursesRedux = useSelector((state: RootState) => state.courses);

  // ฟังก์ชันสำหรับการลบวิชาออกจาก Redux
  const removeCourseFromTable = (course: Course) => {
    dispatch(removeCourse(course.course_id)); // Pass course_id instead of course
    setSelectedCourse(null); // Close modal after removal
  };

  const handleColorChange = (color: string) => {
    const colorObject = {
      backgroundColor: color,
      borderColor: darkenColor(color),
      textColor: moreDarkenColor(color),
    };

    // Find the specific course to update the color
    if (selectedCourse) {
      dispatch(
        updateCourseColor({
          course_id: selectedCourse.course_id,
          color: colorObject,
        }) // Dispatch the correct action with course_id and color
      );
    }
  };

  const colors = [
    "#FFB3BA",
    "#FFDFBA",
    "#FFFFBA",
    "#BAFFC9",
    "#BAE1FF",
    "#D1BAFF",
  ];

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

  const secNumber = 1;


  return (
    <Container maxWidth="lg">
      {/**TABLE */}
      <div style={{ paddingTop: "32px" }}>
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
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  fontWeight={"700"}
                >
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
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  fontWeight={"700"}
                >
                  {day}
                </Typography>
              </div>
            ))}

            {selectedCoursesRedux.map((courseWithSec: SelectedCourseAndSec) => {
              const course = courseWithSec.course;
              const sectionIndex = secNumberToSecIndex(
                courseWithSec.section,
                course
              );

              return course.sections[sectionIndex].schedule.map((slot: any) => {
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
                      backgroundColor:
                        courseWithSec.courseColor.backgroundColor, // พื้นหลัง
                      borderColor: courseWithSec.courseColor.borderColor, // กรอบ
                      color: courseWithSec.courseColor.textColor, // สีของตัวอักษร
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      padding: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedCourse(course)}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={"400"}
                      style={{
                        color: courseWithSec.courseColor.textColor,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                        textAlign: "center",
                        direction: "rtl",
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          textOverflow: "ellipsis",
                          direction: "ltr",
                        }}
                      >
                        {course.course_code} {course.course_name}
                      </span>
                      <span
                        style={{
                          display: "block",
                          textOverflow: "ellipsis",
                          direction: "ltr",
                        }}
                      >
                        {slot.room_name || "ห้องไม่ระบุ"} / Sec{" "}
                        {courseWithSec.section}
                      </span>
                    </Typography>
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
      {/**MODAL */}
      <Container>
        {selectedCourse && (
          <Dialog
            open={Boolean(selectedCourse)}
            onClose={() => setSelectedCourse(null)}
            maxWidth="md"
            fullWidth
            PaperProps={{
              style: {
                margin: 0,
              },
            }}
          >
            <DialogContent sx={{ padding: 0 ,margin: 0}}>
              <Container>
                <Box padding={"24px"} display={"flex"} flexDirection={"column"}>
                  <Box display={"flex"} flexDirection={"column"}>
                    <Box fontSize={"22.5px"} fontWeight={"700"}>
                      {selectedCourse.course_code}{" "}
                      {selectedCourse.course_name_english}
                    </Box>
                    <Box
                      color={"156,159,186"}
                      display={"block"}
                      fontSize={"15.75px"}
                      fontWeight={"500"}
                      letterSpacing={"0.15px"}
                      lineHeight={"27px"}
                    >
                      [{selectedCourse.credits} หน่วยกิต]
                    </Box>
                    <Box
                      fontSize={"15.75px"}
                      fontWeight={"500"}
                      marginTop={"8px"}
                      boxSizing={"border-box"}
                      display={"block"}
                      letterSpacing={"0.15px"}
                      lineHeight={"27px"}
                    >
                      {selectedCourse.course_name}
                    </Box>
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    marginTop={"32px"}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{ padding: "0", borderCollapse: "collapse" }}
                          >
                            <Typography
                              boxSizing={"border-box"}
                              color="#9c9fba"
                              fontSize={"11.25px"}
                              fontWeight={"400"}
                              letterSpacing={"0.4px"}
                              lineHeight={"27px"}
                            >
                              ผู้สอน
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ padding: "0", borderCollapse: "collapse" }}
                          >
                            <Typography
                              boxSizing={"border-box"}
                              color="#9c9fba"
                              fontSize={"11.25px"}
                              fontWeight={"400"}
                              letterSpacing={"0.4px"}
                              lineHeight={"27px"}
                            >
                              เวลา
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ padding: "0", borderCollapse: "collapse" }}
                          >
                            <Typography
                              boxSizing={"border-box"}
                              color="#9c9fba"
                              fontSize={"11.25px"}
                              fontWeight={"400"}
                              letterSpacing={"0.4px"}
                              lineHeight={"27px"}
                            >
                              ห้องเรียน
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            sx={{ padding: "0", borderCollapse: "collapse" }}
                          >
                            <Typography
                              lineHeight={"27px"}
                              letterSpacing={"0.15px"}
                              color="#2a2d48"
                              fontSize={"15.75px"}
                              fontWeight={"500"}
                              display={"block"}
                              boxSizing={"border-box"}
                            >
                              {selectedCourse.sections[
                                secNumberToSecIndex(secNumber, selectedCourse)
                              ]?.instructors.join(", ") || "ไม่มีข้อมูลผู้สอน"}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ padding: "0", borderCollapse: "collapse" }}
                          >
                            <Typography
                              lineHeight={"27px"}
                              letterSpacing={"0.15px"}
                              color="#2a2d48"
                              fontSize={"15.75px"}
                              fontWeight={"500"}
                              display={"block"}
                              boxSizing={"border-box"}
                            >
                              {
                                selectedCourse.sections[
                                  secNumberToSecIndex(secNumber, selectedCourse)
                                ]?.schedule[0].day_of_week
                              }{" "}
                              {
                                selectedCourse.sections[
                                  secNumberToSecIndex(secNumber, selectedCourse)
                                ]?.schedule[0].start_time
                              }{" "}
                              -{" "}
                              {
                                selectedCourse.sections[
                                  secNumberToSecIndex(secNumber, selectedCourse)
                                ]?.schedule[0].end_time
                              }
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ padding: "0", borderCollapse: "collapse" }}
                          >
                            <Typography
                              lineHeight={"27px"}
                              letterSpacing={"0.15px"}
                              color="#2a2d48"
                              fontSize={"15.75px"}
                              fontWeight={"500"}
                              display={"block"}
                              boxSizing={"border-box"}
                            >
                              {selectedCourse.sections[
                                secNumberToSecIndex(secNumber, selectedCourse)
                              ]?.schedule[0].room_name ||
                                "ไม่มีข้อมูลห้องเรียน"}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                  <Box marginTop={"32px"}>
                    <Typography variant="subtitle1" gutterBottom>
                      เลือกสีของรายวิชา:
                    </Typography>
                    <Box display={"flex"} gap={"16px"}>
                      {colors.map((color) => (
                        <Button
                          key={color}
                          onClick={() => {
                            handleColorChange(color);
                            setSelectedCourse(null);
                          }}
                          sx={{
                            backgroundColor: color,
                            width: "40px",
                            height: "40px",
                            minWidth: "40px",
                            borderColor: darkenColor(color),
                            borderWidth: "2px",
                            borderStyle: "solid",
                            borderRadius: "50%",
                          }}
                        />
                      ))}
                    </Box>
                    <Box
                      marginTop={"32px"}
                      boxSizing={"border-box"}
                      display={"flex"}
                      flexDirection={"row"}
                      letterSpacing={"0.5px"}
                      fontSize={"13.5px"}
                      fontWeight={"400"}
                      lineHeight={"22.5px"}
                      textAlign={"left"}
                    >
                      <Button
                        onClick={() => removeCourseFromTable(selectedCourse)}
                        variant="outlined"
                        color="primary"
                        sx={{ flex: 1, marginRight: "1px" }} // เพิ่ม flex: 1 เพื่อให้ปุ่มขยายเต็มที่ และเพิ่ม marginRight เพื่อเพิ่มระยะห่าง
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          lineHeight={"20px"}
                          letterSpacing={"1.25px"}
                          paddingBlockEnd={"5px"}
                          paddingBlockStart={"5px"}
                          paddingBottom={"5px"}
                          paddingInlineEnd={"15px"}
                          paddingInlineStart={"15px"}
                          paddingTop={"5px"}
                          textAlign={"center"}
                          color="#2a2d48"
                          borderColor={"#2a2d48"}
                        >
                          <VisibilityOffIcon style={{ marginRight: "5px" }} />
                          ซ่อนจากตาราง
                        </Box>
                      </Button>
                      <Button
                        onClick={() => setSelectedCourse(null)}
                        variant="outlined"
                        color="primary"
                        sx={{ flex: 1, marginLeft: "8px" }} // เพิ่ม flex: 1 เพื่อให้ปุ่มขยายเต็มที่
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          lineHeight={"20px"}
                          letterSpacing={"1.25px"}
                          paddingBlockEnd={"5px"}
                          paddingBlockStart={"5px"}
                          paddingBottom={"5px"}
                          paddingInlineEnd={"15px"}
                          paddingInlineStart={"15px"}
                          paddingTop={"5px"}
                          textAlign={"center"}
                          border={"none"}
                        >
                          ปิด
                        </Box>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Container>
            </DialogContent>
          </Dialog>
        )}
      </Container>
    </Container>
  );
};

export default TablePage;

"use client";
import React, { useEffect, useState } from "react";
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
  Modal,
  rgbToHex,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import styles from "./page.module.css";
import { morKhor, poppins, Lamoon } from "../assets/fonts";
import { Course } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { removeCourse } from "../slices";
import { SelectedCourseAndSec } from "../types";

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

// const courseData = {
//   course_id: 3613666209,
//   academic_year: 2567,
//   semester: 1,
//   course_code: "EN001205",
//   course_name: "การพัฒนาทักษะทางวิศวกรรม",
//   course_name_english: "ENGINEERING SKILLS DEVELOPMENT",
//   faculty_name: "คณะวิศวกรรมศาสตร์",
//   department_name: "- คณะ / ไม่ระบุภาค -",
//   credits: "1 (0-3-2)",
//   prerequisite: "-",
//   sections: [
//     {
//       section: 1,
//       instructors: ["ผศ.ดร.วรพงษ์ โล่ห์ไพศาลกฤช"],
//       midterm: "-",
//       final_exam: "-",
//       schedule: [
//         {
//           day_of_week: "MON",
//           start_time: "14:30",
//           end_time: "17:30",
//           room_name: "EN17204",
//           study_type: "L",
//         },
//       ],
//     },
//     {
//       section: 6,
//       instructors: ["ผศ.ดร.วรพงษ์ โล่ห์ไพศาลกฤช"],
//       midterm: "-",
//       final_exam: "-",
//       schedule: [
//         {
//           day_of_week: "FRI",
//           start_time: "14:30",
//           end_time: "17:30",
//           room_name: "EN17204",
//           study_type: "L",
//         },
//       ],
//     },
//   ],
// };

const secNumberToSecIndex = (secNumber: number, course: Course): number => {
  if (course.sections) {
    return course.sections.findIndex((sec) => sec.section == secNumber);
  } else return 0;
};

const TablePage = () => {
  const [courses, setCourses] = useState<any[]>([]); // เก็บข้อมูลวิชา
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null); // เก็บวิชาที่เลือกสำหรับ modal
  const [selectedCourses, setSelectedCourses] = useState<
    SelectedCourseAndSec[]
  >([]);
  const [courseColor, setCourseColor] = useState<string>("#e3f2fd"); // สีของรายวิชาในตาราง
  const [selectedColor, setSelectedColor] = useState<string>("blue"); // กำหนดค่าสีเริ่มต้น

  const dispatch = useDispatch();
  const selectedCoursesRedux = useSelector((state: RootState) => state.courses);

  // ฟังก์ชันสำหรับการเพิ่มวิชาในตาราง
  // const addCourse = (course: any) => {
  //   setCourses([...courses, course]);
  // };

  // ฟังก์ชันสำหรับการลบวิชา
  const removeCourse = (course: Course) => {
    setCourses(courses.filter((c) => c !== course));
    setSelectedCourse(null); // ปิด modal หลังลบ
  };

  const handleColorChange = (color: string) => {
    setCourseColor(color);
    setSelectedColor(color);
  };

  const colors = [
    "#FFB3BA",
    "#FFDFBA",
    "#FFFFBA",
    "#BAFFC9",
    "#BAE1FF",
    "#D1BAFF",
  ];

  // useEffect(() => {
  //   dispatch(removeCourse(selectedCourse))
  // }, [removeCourse])

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

  const secNumber = 1;

  return (
    <Container maxWidth="lg">
      <div style={{ paddingTop: "32px" }}>
        {/* <Button
          onClick={() => addCourse(courseData)}
          variant="contained"
          color="primary"
          style={{ marginBottom: "16px" }}
        >
          เพิ่มวิชา
        </Button> */}
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
            overflowX: "scroll",
            height: "454px",
            // borderRadius: "16px",
            // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            // width: "1144px",
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
                  // backgroundColor: "#fff",
                  // borderBottom: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // fontFamily: Lamoon.style.fontFamily,
                  // fontWeight: Lamoon.style.fontWeight,
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
                  // borderRight: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // fontFamily: morKhor.style.fontFamily,
                  // fontWeight: morKhor.style.fontWeight,
                }}
              >
                <Typography variant="subtitle2" color="textSecondary">
                  {day}
                </Typography>
              </div>
            ))}

            {/* Create Lines */}
            {times.map((time, timeIndex) => (
              <span
                key={timeIndex}
                className={styles.line}
                style={{
                  left: `${-0.5 + timeIndex * 88}px`,
                  top: "-0.5px",
                  width: "1px",
                  height: "454px",
                }}
              ></span>
            ))}
            <span
              className={styles.line}
              style={{
                left: `${-0.5 + times.length * 88}px`,
                top: "-0.5px",
                width: "1px",
                height: "454px",
              }}
            ></span>

            <span
              className={styles.line}
              style={{
                left: "-0.5px",
                top: "0px",
                width: "1144px",
                height: "1px",
              }}
            ></span>
            <span
              className={styles.line}
              style={{
                left: "-0.5px",
                top: "53.5px",
                width: "1144px",
                height: "1px",
              }}
            ></span>
            {days.map((day, dayIndex) => (
              <span
                key={dayIndex}
                className={styles.line}
                style={{
                  left: "-0.5px",
                  top: `${53.5 + dayIndex * 80}px`,
                  width: "1144px",
                  height: "1px",
                }}
              ></span>
            ))}
            <span
              className={styles.line}
              style={{
                left: "-0.5px",
                top: `${53.5 + days.length * 80}px`,
                width: "1144px",
                height: "1px",
              }}
            ></span>

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
                      height: "79px",
                      backgroundColor: courseColor,
                      borderRadius: "4px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "left",
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
                    <Typography className={styles.textWrap} sx={{ fontSize : '18px'}}>
                      {course.course_name_english}
                    </Typography>
                    <Typography className={styles.textWrap} sx={{ fontSize : '18px'}}>
                      {slot.room_name}
                    </Typography>
                  </div>
                );
              });
            })}

            {selectedCourse && (
              <Dialog
                open={Boolean(selectedCourse)}
                onClose={() => setSelectedCourse(null)}
                fullWidth
                maxWidth="md"
              >
                <Container>
                  <Box
                    padding={"32px"}
                    boxSizing={"border-box"}
                    color={"42,45,72"}
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <Box
                      color={"42,45,72"}
                      display={"flex"}
                      flexDirection={"column"}
                    >
                      <Box
                        // fontFamily={Lamoon.style.fontFamily}
                        // fontWeight={Lamoon.style.fontWeight}
                        fontSize={"13.5px"}
                        letterSpacing={"0.5px"}
                        lineHeight={"22.5px"}
                        textAlign={"left"}
                        color={"42,45,72"}
                        display={"flex"}
                        flexDirection={"row"}
                        flexWrap={"wrap"}
                        alignItems={"center"}
                      >
                        <Box
                          fontWeight={"700"}
                          fontSize={"22.5px"}
                          letterSpacing={"normal"}
                          lineHeight={"40.5px"}
                          textAlign={"left"}
                          color={"42,45,72"}
                        >
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
                          marginLeft={"16px"}
                        >
                          {selectedCourse.credits} หน่วยกิต
                        </Box>
                      </Box>
                      <Box
                        display={"flex"}
                        fontSize={"13.5px"}
                        fontWeight={"400"}
                        // fontFamily={Lamoon.style.fontFamily}
                        letterSpacing={"0.5px"}
                        lineHeight={"22.5px"}
                        marginTop={"8px"}
                      >
                        {selectedCourse.course_name}
                      </Box>
                    </Box>
                    <Box
                      boxSizing={"border-box"}
                      color={"42,45,72"}
                      display={"flex"}
                      flexDirection={"column"}
                      fontSize={"13.5px"}
                      fontWeight={"400"}
                      letterSpacing={"0.5px"}
                      lineHeight={"22.5px"}
                      marginTop={"32px"}
                    >
                      <Box
                        alignItems={"center"}
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                      >
                        <Box flexWrap={"wrap"} rowGap={"16px"}>
                          <Typography
                            alignItems={"center"}
                            border={"4px"}
                            display={"flex"}
                            fontWeight={"500"}
                            fontSize={"13.5px"}
                            letterSpacing={"0.15px"}
                            lineHeight={"27px"}
                            position={"relative"}
                            // fontFamily={Lamoon.style.fontFamily}
                          >
                            Section: {secNumber}
                          </Typography>
                        </Box>
                      </Box>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography>ผู้สอน</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>เวลา</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>ห้องเรียน</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <Typography>
                                {selectedCourse.sections[
                                  secNumberToSecIndex(secNumber, selectedCourse)
                                ]?.instructors
                                  ? selectedCourse.sections[
                                      secNumberToSecIndex(
                                        secNumber,
                                        selectedCourse
                                      )
                                    ].instructors.join(", ")
                                  : "ไม่มีข้อมูลผู้สอน"}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>
                                {selectedCourse.sections[
                                  secNumberToSecIndex(secNumber, selectedCourse)
                                ].schedule
                                  .map(
                                    (slot: any) =>
                                      `${slot.start_time} - ${slot.end_time} (${slot.day_of_week})`
                                  )
                                  .join(", ")}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>
                                {selectedCourse.sections[
                                  secNumberToSecIndex(secNumber, selectedCourse)
                                ].schedule[0]?.room_name ||
                                  "ไม่มีข้อมูลห้องเรียน"}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Box>
                    {/* <Box>4</Box>
                    <Box>5</Box> */}
                  </Box>
                  <DialogTitle>เลือกสีในตาราง</DialogTitle>
                  <DialogContent>
                    {colors.map((color) => (
                      <Button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        style={{
                          backgroundColor: color,
                          width: "40px",
                          height: "40px",
                          margin: "4px",
                        }}
                      />
                    ))}
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => removeCourse(selectedCourse)}
                      color="error"
                      variant="contained"
                    >
                      <Typography fontSize={"15px"}>นำออกจากตาราง</Typography>
                    </Button>
                    <Button
                      onClick={() => setSelectedCourse(null)}
                      color="primary"
                    >
                      <Typography fontSize={"15px"}>ปิด</Typography>
                    </Button>
                  </DialogActions>
                </Container>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TablePage;

"use client";

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/redux";
import { CourseMock } from "@/shared/mocks/";
import { CourseBox, CoursesDialog } from "@/shared/components/";
import { SelectedCourseAndSec } from "@/shared/types";
import {
  Button,
  Snackbar,
  SnackbarContent,
  TextField,
  Typography,
} from "@mui/material";
import { Course } from "@/shared/interfaces";
import { addCourse, removeCourse } from "@/shared/slices";

type Props = {};

const Page = (props: Props) => {
  const dispatch = useDispatch();
  const selectedCourseRedux = useSelector((root: RootState) => {
    root.courses;
  });

  const [searchCourse, setSearchCourse] = useState<string>("");
  // const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const [selectedCourseAndSec, setSelectedCourseAndSec] = useState<
    SelectedCourseAndSec[]
  >([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const filteredCourse = useMemo(() => {
    return CourseMock.filter((course) =>
      (course.course_code + course.course_name_english)
        .toLowerCase()
        .includes(searchCourse.toLowerCase())
    );
  }, [searchCourse]);

  const removeSelectedCourseAndSec = useCallback(
    (selectedCourseAndSec: SelectedCourseAndSec) => {
      setSelectedCourseAndSec((prevCourses) =>
        prevCourses.filter(
          (item) =>
            !(
              item.course.course_code ===
                selectedCourseAndSec.course.course_code &&
              item.section === selectedCourseAndSec.section
            )
        )
      );
    },
    []
  );

  // useEffect(() => {
  //   if (selectedCourseAndSec) {

  //     dispatch(removeCourse(selectedCourseAndSec))
  //   }
  // }, [removeSelectedCourseAndSec])

  // Function to add course to selected list
  const addSelectedCourseAndSec = useCallback(
    (selectedCourseAndSec: SelectedCourseAndSec) => {
      setSelectedCourseAndSec((prevCourses) => {
        const filteredCourses = prevCourses.filter(
          (item) =>
            item.course.course_code !==
              selectedCourseAndSec.course.course_code ||
            item.section !== selectedCourseAndSec.section
        );
        if (
          !filteredCourses.some(
            (item) =>
              item.course.course_code ===
                selectedCourseAndSec.course.course_code &&
              item.section === selectedCourseAndSec.section
          )
        ) {
          console.log(selectedCourseAndSec)
          return [...filteredCourses, selectedCourseAndSec];
        }
        return filteredCourses;
      });
    },
    []
  );

  useEffect(() => {
    if (selectedCourseAndSec) {
      selectedCourseAndSec.forEach((selectedItem) => {
        const { course, section } = selectedItem;
        dispatch(addCourse({ course, section }));
      });
    }
  }, [selectedCourseAndSec]);

  // Calculate total credits
  const totalCredits = useCallback((): number => {
    return selectedCourseAndSec.reduce(
      (total, item) => total + parseInt(item.course.credits),
      0
    );
  }, [selectedCourseAndSec]);

  const [selectedCoursesDialogOpen, setSelectedCoursesDialogOpen] =
    useState<boolean>(false);
  const handleSelectedCoursesDialogOpen = () => {
    setSelectedCoursesDialogOpen(true);
  };
  const handleSelectedCoursesDialogClose = () => {
    setSelectedCoursesDialogOpen(false);
  };

  const courses = useMemo(() => {
    return filteredCourse.map((course, index) => (
      <CourseBox
        key={index}
        course={course}
        addSelectedCourseAndSec={addSelectedCourseAndSec}
        removeSelectedCourseAndSec={removeSelectedCourseAndSec}
        selectedCourseAndSec={selectedCourseAndSec}
        totalCredits={totalCredits}
      />
    ));
  }, [filteredCourse, selectedCourseAndSec]);

  const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
  const handleSnackBarOpen = (addOrRemoveCourse: string) => {
    console.log(addOrRemoveCourse);
    if (
      addOrRemoveCourse == "add" &&
      selectedCourseAndSec.some(
        (course, index) =>
          course.section !== prevSelectedCoursesRef.current[index]?.section
      )
    ) {
      setSnackbarMessage(`เพิ่มวิชาสำเร็จ`);
    }
    if (addOrRemoveCourse == "remove") {
      setSnackbarMessage(`ลบวิชาสำเร็จ`);
    }
    setSnackBarOpen(true);
  };

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  const prevSelectedCoursesRef = useRef(selectedCourseAndSec);

  useEffect(() => {
    if (selectedCourseAndSec.length !== prevSelectedCoursesRef.current.length) {
      const addOrRemoveCourse =
        selectedCourseAndSec.length > prevSelectedCoursesRef.current.length
          ? "add"
          : "remove";
      handleSnackBarOpen(addOrRemoveCourse);
      prevSelectedCoursesRef.current = [...selectedCourseAndSec];
    }
  }, [selectedCourseAndSec]);

  return (
    <main style={{ padding: "16px" }}>
      <TextField
        fullWidth
        id="outlined-basic"
        label="ค้นหารายวิชา"
        variant="outlined"
        value={searchCourse}
        onChange={(e) => setSearchCourse(e.target.value)}
      />

      {/* Conditionally render either the courses or the "ไม่พบรายวิชา" message */}
      {filteredCourse.length > 0 ? (
        <div>{courses}</div>
      ) : (
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          sx={{ mt: 2 }}
        >
          ไม่พบรายวิชา
        </Typography>
      )}
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <SnackbarContent
          sx={{ bgcolor: "white", color: "black" }}
          message={snackbarMessage}
          action={
            <Button
              color="success"
              size="small"
              onClick={handleSelectedCoursesDialogOpen}
            >
              ดูวิชาที่เลือกทั้งหมด
            </Button>
          }
        />
      </Snackbar>
      <CoursesDialog
        open={selectedCoursesDialogOpen}
        onClose={handleSelectedCoursesDialogClose}
        selectedCourseAndSec={selectedCourseAndSec}
        totalCredits={totalCredits()}
      />
    </main>
  );
};

export default Page;

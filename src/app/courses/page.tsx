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
  Stack,
} from "@mui/material";
import { addCourse, removeCourse } from "@/shared/slices";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

type Props = {};

const Page = (props: Props) => {
  const dispatch = useDispatch();
  const selectedCourseRedux = useSelector((root: RootState) => root.courses);

  const [searchCourse, setSearchCourse] = useState<string>("");
  const [selectedCourseAndSec, setSelectedCourseAndSec] = useState<
    SelectedCourseAndSec[]
  >([]);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
  const [selectedCoursesDialogOpen, setSelectedCoursesDialogOpen] =
    useState<boolean>(false);

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
          console.log(selectedCourseAndSec);
          return [...filteredCourses, selectedCourseAndSec];
        }
        return filteredCourses;
      });
    },
    []
  );


  // Dispatch addCourse เมื่อมีการ selected
  useEffect(() => {
    if (selectedCourseAndSec) {
      selectedCourseAndSec.forEach((selectedItem) => {
        const { course, section } = selectedItem;
        dispatch(addCourse({ course, section }));
      });
    }
  }, [selectedCourseAndSec]);


  useEffect(() => {
    if (selectedCourseRedux) {
      setSelectedCourseAndSec(selectedCourseRedux);
    } 

  }, [selectedCourseRedux])

  // Calculate total credits
  const totalCredits = useCallback((): number => {
    if (selectedCourseRedux) {
      return selectedCourseRedux.reduce(
        (total, item) => total + parseInt(item.course.credits),
        0
      );
    }
    return 0
  }, [selectedCourseAndSec]);

  const handleSelectedCoursesDialogOpen = () => {
    setSelectedCoursesDialogOpen(true);
    console.log(selectedCourseRedux)
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
      <Stack sx={{ position: "sticky", zIndex: "1100", marginTop: "100px" }}>
        <Stack direction="row" style={{ width: "100%", marginBottom: "16px" }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="ค้นหารายวิชา"
            variant="outlined"
            value={searchCourse}
            onChange={(e) => setSearchCourse(e.target.value)}
          />
          <Button
            variant="outlined"
            style={{ marginLeft: "16px", position: "relative" }}
            onClick={handleSelectedCoursesDialogOpen}
          >
            <ShoppingBasketIcon fontSize="large"></ShoppingBasketIcon>
            <Typography
              sx={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                backgroundColor: "yellow",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "16px",
              }}
            >
              {selectedCourseRedux.length}
            </Typography>
          </Button>
        </Stack>
      </Stack>

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
        selectedCourseAndSec={selectedCourseRedux}
        totalCredits={totalCredits()}
      />
    </main>
  );
};

export default Page;

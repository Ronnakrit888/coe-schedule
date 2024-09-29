"use client"
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { CourseMock } from '@/shared/mocks/'
import { CourseBox, CoursesDialog } from '@/shared/components/'
import { Button, Snackbar, SnackbarContent, TextField } from '@mui/material';
import { Course } from '@/shared/interfaces';
type Props = {};

const Page = (props: Props) => {
  const [searchCourse, setSearchCourse] = useState<string>("");
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]); // List of selected courses
  const [selectedCourseAndSec, setSelectedCourseAndSec] = useState<[Course, number][]>([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const filteredCourse = CourseMock.filter((course) => {
    return (course.course_code + course.course_name_english).toLowerCase().includes(searchCourse.toLowerCase())
  })

  const removeSelectedCourseAndSec = (course: Course, sec: number) => {
    setSelectedCourseAndSec(prevCourses => 
      prevCourses.filter(item => !(item[0].course_code === course.course_code && item[1] === sec))
    );
  };
  // Function to add course to selected list
  const addSelectedCourseAndSec = (course: Course, sec: number) => {
    setSelectedCourseAndSec(prevCourses => {
      // Remove any entry with the same course but a different section
      const filteredCourses = prevCourses.filter(item => item[0].course_code !== course.course_code || item[1] === sec);
  
      // Add the new course and section combination
      if (!filteredCourses.some(item => item[0] === course && item[1] === sec)) {
        return [...filteredCourses, [course, sec]];
      }
      return filteredCourses;
    });
  };

  // Calculate total credits
  const totalCredits = (): number => {
    return selectedCourseAndSec.reduce((total, item) => total + parseInt(item[0].credits), 0);
  }

  const [selectedCoursesDialogOpen, setSelectedCoursesDialogOpen] = useState(false);
  const handleSelectedCoursesDialogOpen = () => {
    setSelectedCoursesDialogOpen(true);
  };
  const handleSelectedCoursesDialogClose = () => {
    setSelectedCoursesDialogOpen(false);
  };

  const courses = filteredCourse.map((course, index) => (

    <CourseBox
      key={index}
      course={course}
      addSelectedCourseAndSec={addSelectedCourseAndSec}
      removeSelectedCourseAndSec={removeSelectedCourseAndSec}
      selectedCourseAndSec={selectedCourseAndSec}
      totalCredits={totalCredits}
    />
  ))

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const handleSnackBarOpen = () => {
    setSnackBarOpen(true);
  };

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };


  const prevSelectedCoursesRef = useRef(selectedCourseAndSec);
  
  useEffect(() => {
    // Check if a course has been add
    if (selectedCourseAndSec.length >= prevSelectedCoursesRef.current.length) {
      handleSnackBarOpen();
    }
  
    // Update the ref with the current selected courses
    prevSelectedCoursesRef.current = selectedCourseAndSec;
  }, [selectedCourseAndSec]);
  return (
    <main style={{ padding: '16px' }}>
      <TextField fullWidth id="outlined-basic" label="ค้นหารายวิชา" variant="outlined" value={searchCourse} onChange={e => setSearchCourse(e.target.value)} />
      <div>
        {courses}
      </div>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SnackbarContent
          message={"เลือกวิชานี้สำเร็จ"}
          action={
            <Button color='secondary' size='small' onClick={handleSelectedCoursesDialogOpen}>
              ดูวิชาที่เลือกทั้งหมด
            </Button>
          }
        />
      </Snackbar>
      <CoursesDialog open={selectedCoursesDialogOpen} onClose={handleSelectedCoursesDialogClose} selectedCourseAndSec={selectedCourseAndSec} totalCredits={totalCredits()}/>
    </main>

  )
}

export default Page;
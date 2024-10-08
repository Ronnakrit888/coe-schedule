import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../interfaces";

interface CourseWithSec {
  course: Course;
  section: number;
}

const initialState: CourseWithSec[] = [];

export const CoursesSlice = createSlice({
  name: "courseSelected",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<CourseWithSec>) => {
      const existingCourseIndex = state.findIndex(
        (item) => item.course.course_id === action.payload.course.course_id
      );
      if (existingCourseIndex === -1) {
        // state.push(action.payload);
        console.log("Course that add : ", action.payload);
        return [...state, action.payload];
      }
    },

    updateSection: (state, action: PayloadAction<CourseWithSec>) => {
      const courseIndex = state.findIndex(
        (item) => item.course.course_id === action.payload.course.course_id
      );
      if (courseIndex !== 1) {
        state[courseIndex].section = action.payload.section;
      }
    },

    removeCourse: (state, action: PayloadAction<CourseWithSec[]>) => {
      const courseIdsToRemove = action.payload.map((course) => (
        course.course.course_id
      ))

      // console.log("Course that remove : ", state)
      return state.filter(
        (course) => (!courseIdsToRemove.includes(course.course.course_id))
        
      )
    },
  },
});

export const { reducer: courseReducer } = CoursesSlice;
export const { addCourse, removeCourse, updateSection } = CoursesSlice.actions;

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
        console.log(action.payload);
        return [...state, action.payload];
      }
    },

    updateSection: (state, action: PayloadAction<CourseWithSec>) => {
      const courseIndex = state.findIndex(
        (item) => item.course.course_id === action.payload.course.course_id
      );
      if (courseIndex) {
        state[courseIndex].section = action.payload.section;
      }
    },

    removeCourse: (state, action: PayloadAction<number>) => {
      return state.filter(
        (course) => course.course.course_id != action.payload
      );
    },
  },
});

export const { reducer: courseReducer } = CoursesSlice;
export const { addCourse, removeCourse, updateSection } = CoursesSlice.actions;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../interfaces";

const initialState: Course[] = [];

export const CoursesSlice = createSlice({
  name: "courseSelected",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course | null>) => {
      if (action.payload != null) {
        state.push(action.payload);
      }
    },

    removeCourse: (state, action: PayloadAction<number>) => {
      return state.filter((course) => course.course_id != action.payload);
    },

    changeSection: (state, action: PayloadAction<Number>) => {
      return;
    },
  },
});

export const { reducer: courseReducer } = CoursesSlice;
export const { addCourse, removeCourse } = CoursesSlice.actions;

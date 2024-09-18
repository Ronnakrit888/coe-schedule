import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../interfaces";

const initialState : Course[] = []

export const CoursesSlice = createSlice({
    name: "courseSelected",
    initialState,
    reducers: {

        addCourse : (state, action : PayloadAction<Course[]>) => {
            state.push(...action.payload)
        },

        removeCourse : (state, action : PayloadAction<string | number>) => {
            return state.filter(course => course.course_id != action.payload)
        }
    }
})

export const { reducer : courseReducer } = CoursesSlice
export const { addCourse, removeCourse } = CoursesSlice.actions
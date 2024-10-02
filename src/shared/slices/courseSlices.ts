import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../interfaces";

interface CourseWithSec {
  course: Course;
  section: number;
  courseColor: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
  };
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
        // ตั้งค่า courseColor เป็นค่าเริ่มต้นถ้าไม่มีการระบุสีมา
        const newCourseWithColor = {
          ...action.payload,
          courseColor: action.payload.courseColor || {
            backgroundColor: "#d3d3d3", // สีพื้นหลัง
            borderColor: "#a0a0a0", // สีกรอบ
            textColor: "#3a3a3a", // สีตัวอักษร
          },
        };
        state.push(newCourseWithColor); // ใช้ push แทนการสร้าง array ใหม่
      }
    },

    updateSection: (state, action: PayloadAction<CourseWithSec>) => {
      const courseIndex = state.findIndex(
        (item) => item.course.course_id === action.payload.course.course_id
      );
      if (courseIndex !== -1) {
        state[courseIndex].section = action.payload.section;
      }
    },

    removeCourse: (state, action: PayloadAction<number>) => {
      return state.filter(
        (course) => course.course.course_id !== action.payload
      );
    },

    // อัปเดต action สำหรับการอัปเดตสี
    updateCourseColor: (state, action: PayloadAction<{ course_id: number; color: { backgroundColor: string; borderColor: string; textColor: string } }>) => {
      const courseIndex = state.findIndex(
        (item) => item.course.course_id === action.payload.course_id
      );
      if (courseIndex !== -1) {
        state[courseIndex].courseColor = action.payload.color;
      }
    },
  },
});

// Export reducer และ actions รวมถึง updateCourseColor ที่เพิ่มขึ้นมา
export const { addCourse, removeCourse, updateSection, updateCourseColor } = CoursesSlice.actions;
export const { reducer: courseReducer } = CoursesSlice;

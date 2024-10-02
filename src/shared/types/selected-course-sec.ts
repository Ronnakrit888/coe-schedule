import { Course } from "../interfaces"

export type SelectedCourseAndSec = {
    course: Course;
  section: number;
  courseColor: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
  };
};
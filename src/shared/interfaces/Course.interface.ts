import { Section } from "./Section.interface";

export interface Course {
  course_id: number;
  // faculty_id: number;
  academic_year: number;
  semester: number;
  course_code: string;
  course_name: string;
  course_name_english: string;
  faculty_name: string;
  department_name: string;
  credits: string;
  prerequisite: string;
  sections: Section[];  // Optional, if sections are included
  
}
export interface Color {
  color: string;
}
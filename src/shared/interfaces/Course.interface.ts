export interface Course {
  course_id: number,
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

export interface Section {
  section: number;
  instructors: string[];  // Array of instructor names
  midterm: string;
  final_exam: string;
  schedule: Schedule[];  // Array of schedule entries for the section
}

export interface Schedule {
  day_of_week: string;
  start_time: string,
  end_time: string,
  room_name: string,
  study_type: string
}

export interface Color {
  color: string;
}
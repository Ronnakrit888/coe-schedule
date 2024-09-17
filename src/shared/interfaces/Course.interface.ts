export interface Course {
  course_id: number;
  faculty_id: number;
  academic_year: number;
  semester: number;
  course_code: string;
  course_name: string;
  course_name_english: string;
  faculty_name: string;
  department_name: string;
  credits: string;
  prerequisite: string;
  study_days?: string[]; // Add this line to include study_days
  sections?: Section[];  // Optional, if sections are included
}

export interface Section {
  section: number;
  level_id: number;
  level_name: string;
  level_name_english: string;
  campus_name: string;
  instructors: string[];  // Array of instructor names
  reserved_for: string[]; // Reserved for certain groups (e.g., specific year levels)
  reserved_seats: string[]; // Reserved seat information
  total_seats: number;
  available_seats: number;
  status: string;  // Course status (e.g., W for waitlist)
  midterm: string;
  final_exam: string;
  remarks: string;
  is_closed: boolean;  // Indicates if the course is closed
  schedule: Schedule[];  // Array of schedule entries for the section

}

export interface Schedule {
  day_of_week: string;
  start_time: string,
  end_time: string,
  wba: boolean;
  command: number,
  campus_id: number,
  campus_name: string,
  room_id: number,
  room_name: string,
  building_name: string,
  building_code: string,
  study_type: string
}
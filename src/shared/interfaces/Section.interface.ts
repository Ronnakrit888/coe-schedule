import { Schedule } from "./Schedule.interface";

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
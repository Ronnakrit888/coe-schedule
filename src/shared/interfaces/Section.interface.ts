import { Schedule } from "./Schedule.interface";

export interface Section {
  section: number;
  instructors: string[];  // Array of instructor names
  midterm: string;
  final_exam: string;
  schedule: Schedule[];  // Array of schedule entries for the section
}
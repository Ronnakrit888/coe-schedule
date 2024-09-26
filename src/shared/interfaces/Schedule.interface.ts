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
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import { addCourse, removeCourse } from "@/shared/slices";
import { Course, Section, Schedule } from "@/shared/interfaces";
import { CourseMock } from "@/shared/mocks";
import {
  Container,
  Stack,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Autocomplete,
  TextField,
  SelectChangeEvent,
  Chip,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Paper,
  CardHeader,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const Courses = () => {
  const [courses] = useState<Course[]>(CourseMock);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.courses);

  // Filter courses based on search term
  const filteredCourses = useMemo(() => {
    return coursesList.filter(
      (course) =>
        course.course_name_english
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        course.course_code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [coursesList, searchTerm]);

  const handleSearchChange = (_: React.SyntheticEvent, value: string) => {
    setSearchTerm(value);
  };

  const handleCourseSelect = (
    event: React.SyntheticEvent,
    value: string | Course | null
  ) => {
    if (typeof value === "object" && value !== null) {
      setSelectedCourse(value);
      setSelectedSection(null); // Reset section when selecting a new course
    } else {
      setSelectedCourse(null);
    }
  };

  const handleSectionChange = (event: SelectChangeEvent<number>) => {
    setSelectedSection(Number(event.target.value));
  };

  const handleSelectCourse = () => {
    if (
      // selectedCourse &&
      !selectedCourses.some(
        (course) => course.course_id === selectedCourse!.course_id
      )
    ) {
      dispatch(addCourse(selectedCourse));
      setSelectedCourses([...selectedCourses, selectedCourse]);
    }
  };
  

  const handleRemoveCourse = (courseIDToRemove: number) => {
    dispatch(removeCourse(courseIDToRemove));
    setSelectedCourses(
      selectedCourses.filter((course) => course.course_id !== courseIDToRemove)
    );
  };

  useEffect(() => {
    if (selectedCourses) { console.log(selectedCourses); }
  }, [selectedCourses]);

  const selectedSectionDetails = selectedCourse?.sections.find(
    (sec) => sec.section === selectedSection
  );

  return (
      <Container>
        {/* Course Search and Selection */}
        <Stack sx={{ mt: 4 }}>
          <Autocomplete
            freeSolo
            options={filteredCourses as Array<Course | string>}
            getOptionLabel={(option: string | Course) =>
              typeof option === "string"
                ? option
                : `${option.course_code} - ${option.course_name_english}`
            }
            onInputChange={handleSearchChange}
            onChange={handleCourseSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                label="ค้นหารหัสวิชา / ชื่อวิชา"
                variant="outlined"
                fullWidth
                sx={{ mb: 4 }}
              />
            )}
          />

          {/* Message if no course found */}

          {filteredCourses.length === 0 && !selectedCourse && (
            <Typography variant="body1" color="textSecondary">
              ไม่พบวิชาที่คุณค้นหา
            </Typography>
          )}
        </Stack>

        {/* Message if no course found */}

        {filteredCourses.length === 0 && !selectedCourse && (
          <Typography variant="body1" color="textSecondary">
            ไม่พบวิชาที่คุณค้นหา
          </Typography>
        )}
      </Stack>

      <Stack spacing={4} sx={{ mt: 4 }}>
        {courses.map((course) => (
          <Card key={course.course_id}>
            <CardHeader title={course.course_code + " " + course.course_name_english} subheader={course.credits} />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                หน่วยกิต: {course.credits}
              </Typography>

              {course.sections.map((section) => (
                <Box key={section.section} sx={{ mt: 2 }}>
                  <Stack spacing={2}>

                    <Typography variant="subtitle2">
                      อาจารย์: {section.instructors.join(', ')}
                    </Typography>
                    <Typography variant="subtitle2">
                      วันสอบกลางภาค: {section.midterm}
                    </Typography>
                    <Typography variant="subtitle2">
                      วันสอบปลายภาค: {section.final_exam}
                    </Typography>
                  </Stack>

                  <FormControl fullWidth sx={{ mt: 2}}>
                    <InputLabel id="section-select-label">เลือก Section</InputLabel>
                    <Select
                      labelId="section-select-label"
                      id="section-select"
                      value={selectedSection || ""}
                      onChange={handleSectionChange}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>เลือก Section</MenuItem>
                      {course.sections.map((sec) => (
                        <MenuItem key={sec.section} value={sec.section}>
                          Section {sec.section}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Accordion sx={{ mt: 2 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel-${section.section}-content`}
                      id={`panel-${section.section}-header`}
                    >
                      <Typography>รายละเอียดวิชา</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {section.schedule.map((schedule, index) => (
                        <Box key={index} sx={{ mt: 1 }}>
                          <Typography variant="body2">
                            วันที่เรียน: {schedule.day_of_week}
                          </Typography>
                          <Typography variant="body2">
                            เวลา (Time): {schedule.start_time} - {schedule.end_time}
                          </Typography>
                          <Typography variant="body2">
                            ห้องเรียน (Room): {schedule.room_name}
                          </Typography>
                          <Typography variant="body2">
                            ประเภทการเรียน (Study Type): {schedule.study_type}
                          </Typography>
                        </Box>
                      ))}
                      <Typography variant="body1" sx={{ mt: 3 }}>
                        เงื่อนไขรายวิชา: {course.prerequisite}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                </Box>
              ))}

              <Button variant="contained" onClick={() => setSelectedCourse(course)}
                sx={{ mt: 2 }}
              >
                เลือก
              </Button>
            </CardContent>
          </Card>

        ))}

      </Stack>
    </Container>
  );
};

export default Courses;
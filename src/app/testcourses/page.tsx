"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import { addCourse, removeCourse } from "@/shared/slices";
import { Course, Section } from "@/shared/interfaces";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {};

const Courses = (props: Props) => {
  const [coursesList] = useState<Course[]>(CourseMock);
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
    if (selectedCourses) {
      console.log(selectedCourses);
    }
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

        {/* Selected Course Details */}
        {selectedCourse && (
          <Card variant="outlined" sx={{ mt: 4 }}>
            <CardContent>
              <Grid container spacing={2}>
                {/* Left side: Course details */}
                <Grid item xs={8}>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {selectedCourse.course_code}{" "}
                    {selectedCourse.course_name_english}
                  </Typography>
                  {/* <Typography variant="subtitle1" sx={{ color: 'textSecondary', mb: 2 }}>
                  {selectedCourse.credits} หน่วยกิต
                </Typography> */}
                  <Chip
                    label={selectedCourse.credits}
                    color="default"
                    variant="outlined"
                  />

                  {/* Days of Study */}
                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ mb: 1 }}>วันที่เรียน</Typography>
                    {selectedCourse.sections.flatMap((section) =>
                      section.schedule.map((schedule) => (
                        <Chip
                          key={schedule.day_of_week}
                          label={schedule.day_of_week}
                          sx={{ mr: 1 }}
                          color={
                            schedule.day_of_week === "WED"
                              ? "success"
                              : "warning"
                          }
                        />
                      ))
                    )}
                  </Box>

                  {/* Instructor and Room Schedule Table */}
                  {selectedSectionDetails && (
                    <Table sx={{ mt: 2 }}>
                      <TableBody>
                        {selectedSectionDetails.schedule.map(
                          (schedule, index) => (
                            <TableRow key={index}>
                              <TableCell>{schedule.day_of_week}</TableCell>
                              <TableCell>
                                {schedule.start_time} - {schedule.end_time}
                              </TableCell>
                              <TableCell>{schedule.room_name}</TableCell>
                              <TableCell>{schedule.study_type}</TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  )}
                </Grid>

                {/* Right side: Section selection and button */}
                <Grid
                  item
                  xs={4}
                  container
                  direction="column"
                  justifyContent="space-between"
                >
                  <FormControl fullWidth>
                    <InputLabel id="sec">Sec</InputLabel>
                    <Select
                      labelId="sec"
                      value={selectedSection || ""}
                      onChange={handleSectionChange}
                      label="Sec"
                    >
                      {selectedCourse.sections.map((section: Section) => (
                        <MenuItem key={section.section} value={section.section}>
                          Sec {section.section}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSelectCourse}
                    sx={{ mt: 4 }}
                    endIcon={<ExpandMoreIcon />}
                  >
                    เลือก
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Display Selected Courses */}
        {selectedCourses.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">รายชื่อวิชาที่เลือก</Typography>
            <Table sx={{ mt: 2 }}>
              <TableBody>
                {selectedCourses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell>{course.course_code}</TableCell>
                    <TableCell>{course.course_name_english}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleRemoveCourse(course.course_id)}
                      >
                        ลบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Container>
  );
};

export default Courses;

"use client";

import React, { useMemo, useState } from 'react';
import { Course, Section } from '@/shared/interfaces';
import { CourseMock } from '@/shared/mocks';
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
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Component สำหรับแสดงรายละเอียดของ course ที่เลือก
const CourseDetails: React.FC<{ course: Course }> = ({ course }) => {
  // รวมวันเรียนทั้งหมดจาก schedule ของแต่ละ section
  const studyDays = course.sections.flatMap(section =>
    section.schedule.map(schedule => schedule.day_of_week)
  );

  // เอาค่าที่ไม่ซ้ำกันและจัดเรียง
  const uniqueStudyDays = Array.from(new Set(studyDays)).join(', ');

  return (
    <Card variant="outlined" sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6">
          {course.course_code} - {course.course_name_english}
        </Typography>
        <Typography variant="body1">
          <strong>Credits:</strong> {course.credits}
        </Typography>
        <Typography variant="body1">
          <strong>วันเรียน:</strong> {uniqueStudyDays || 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Courses = () => {
  const [courses] = useState<Course[]>(CourseMock);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [courseToSelect, setCourseToSelect] = useState<Course | null>(null);

  const filteredCourses = useMemo(() => {
    return courses.filter(course =>
      course.course_name_english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [courses, searchTerm]);

  const handleSearchChange = (_: React.SyntheticEvent, value: string) => {
    setSearchTerm(value);
  };

  const handleCourseSelect = (
    event: React.SyntheticEvent,
    value: string | Course | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string | Course>
  ) => {
    if (typeof value === 'object' && value !== null) {
      setSelectedCourse(value);
      setCourseToSelect(null);
    } else {
      setSelectedCourse(null);
    }
  };

  const handleSectionChange = (event: SelectChangeEvent<number>) => {
    setSelectedSection(Number(event.target.value));
  };

  const handleSelectCourse = () => {
    if (selectedCourse) {
      setCourseToSelect(selectedCourse);
      setSelectedSection(null);
    }
  };

  const selectedSectionDetails = selectedCourse?.sections.find(sec => sec.section === selectedSection);

  return (
    <Container>
      <Stack sx={{ mt: 4 }}>
        <Autocomplete
          freeSolo
          options={filteredCourses as Array<Course | string>}
          getOptionLabel={(option: string | Course) =>
            typeof option === 'string' ? option : `${option.course_code} - ${option.course_name_english}`
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

        {filteredCourses.length === 0 && !selectedCourse && (
          <Typography variant="body1" color="textSecondary">
            ไม่พบวิชาที่คุณค้นหา
          </Typography>
        )}
      </Stack>

      {selectedCourse && (
        <Card variant="outlined" sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6">
              {selectedCourse.course_code} - {selectedCourse.course_name_english}
            </Typography>
            <Typography variant="body1">
              <strong>Credits:</strong> {selectedCourse.credits}
            </Typography>
            <Typography variant="body1">
              <strong>วันเรียน:</strong> {selectedCourse.sections.flatMap(section =>
                section.schedule.map(schedule => schedule.day_of_week)
              ).filter((value, index, self) => self.indexOf(value) === index).join(', ') || 'N/A'}
            </Typography>

            {selectedCourse.sections.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Sec</InputLabel>
                  <Select value={selectedSection || ''} onChange={handleSectionChange}>
                    {selectedCourse.sections.map((section: Section) => (
                      <MenuItem key={section.section} value={section.section}>
                        Sec {section.section}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}

            {selectedSectionDetails && (
              <Table sx={{ mt: 2 }}>
                <TableBody>
                  {selectedSectionDetails.schedule.map((schedule, index) => (
                    <TableRow key={index}>
                      <TableCell>{schedule.day_of_week}</TableCell>
                      <TableCell>{schedule.start_time} - {schedule.end_time}</TableCell>
                      <TableCell>{schedule.room_name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSelectCourse}
                startIcon={<ExpandMoreIcon />}
              >
                เลือก
              </Button>
            </Grid>
          </CardContent>
        </Card>
      )}

      {courseToSelect && <CourseDetails course={courseToSelect} />}
    </Container>
  );
};

export default Courses;
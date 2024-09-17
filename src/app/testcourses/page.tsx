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

const Courses: React.FC = () => {
  const [courses] = useState<Course[]>(CourseMock);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [courseToSelect, setCourseToSelect] = useState<Course | null>(null);

  // Filter courses based on search term
  const filteredCourses = useMemo(() => {
    return courses.filter(course =>
      course.course_name_english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_id.toString().includes(searchTerm)
    );
  }, [courses, searchTerm]);

  // Update search term
  const handleSearchChange = (_: React.SyntheticEvent, value: string) => {
    setSearchTerm(value);
  };

  // Handle course selection
  const handleCourseSelect = (
    event: React.SyntheticEvent,
    value: string | Course | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string | Course>
  ) => {
    if (typeof value === 'object' && value !== null) {
      setSelectedCourse(value); // If a course is selected, set it
      setCourseToSelect(null); // Clear any previously selected course
    } else {
      setSelectedCourse(null); // Clear the course if none is selected
    }
  };

  // Handle section selection
  const handleSectionChange = (event: SelectChangeEvent<number>) => {
    setSelectedSection(Number(event.target.value));
  };

  // Handle course confirmation
  const handleSelectCourse = () => {
    if (selectedCourse) {
      setCourseToSelect(selectedCourse);
      setSelectedSection(null);
    }
  };

  return (
    <Container>
      <Stack sx={{ mt: 4 }}>
        <Autocomplete
          freeSolo
          options={filteredCourses as (Course | string)[]}
          getOptionLabel={(option: string | Course) =>
            typeof option === 'string' ? option : `${option.course_code} - ${option.course_name_english}`
          }
          onInputChange={handleSearchChange}
          onChange={handleCourseSelect}  // Updated to accept the correct parameters
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
              <strong>วันเรียน:</strong> {selectedCourse.study_days?.join(', ') || 'N/A'}
            </Typography>

            {selectedCourse.sections && selectedCourse.sections.length > 0 && (
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

            {selectedSection !== null && selectedCourse.sections && (
              <Table sx={{ mt: 2 }}>
                <TableBody>
                  {selectedCourse.sections
                    .find((sec) => sec.section === selectedSection)
                    ?.schedule.map((schedule, index) => (
                      <TableRow key={index}>
                        <TableCell>{schedule.day_of_week}</TableCell>
                        <TableCell>{schedule.start_time} - {schedule.end_time}</TableCell>
                        <TableCell>{schedule.room_name}</TableCell>
                        <TableCell>{schedule.building_name}</TableCell>
                        <TableCell>{schedule.study_type}</TableCell>
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

      {courseToSelect && (
        <Card variant="outlined" sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6">
              วิชาที่เลือก: {courseToSelect.course_code} - {courseToSelect.course_name_english}
            </Typography>
            <Typography variant="body1">
              <strong>Credits:</strong> {courseToSelect.credits}
            </Typography>
            <Typography variant="body1">
              <strong>วันเรียน:</strong> {courseToSelect.study_days?.join(', ') || 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Courses;
"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Course, Section } from "../interfaces";
import { SelectedCourseAndSec } from "../types";
import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Import Add icon
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import CheckCircle icon
import DayChip from "./cayChip.component";

type Props = {
  course: Course;
  addSelectedCourseAndSec: (selectedCourseAndSec: SelectedCourseAndSec) => void;
  selectedCourseAndSec: SelectedCourseAndSec[];
  totalCredits: () => number;
  removeSelectedCourseAndSec: (
    selectedCourseAndSec: SelectedCourseAndSec
  ) => void;
};

const CourseBox = ({
  course,
  addSelectedCourseAndSec,
  selectedCourseAndSec,
  totalCredits,
  removeSelectedCourseAndSec,
}: Props) => {
  const [sec, setSec] = useState(0); // Default section is the first one
  const [courseIsSelect, setCourseIsSelect] = useState(false);

  // Memoize section info to avoid recalculating unless `sec` changes
  const secInfo = useMemo(() => course.sections[sec], [course.sections, sec]);

  const handleChange = useCallback((event: SelectChangeEvent) => {
    const selectedIndex = parseInt(event.target.value, 10);
    setSec(selectedIndex);
  }, []);

  const handleButtonClick = useCallback(() => {
    setCourseIsSelect((prev) => !prev);
  }, []);

  // Effect for managing course selection/deselection
  useEffect(() => {
    if (secInfo) {
      const selectedCourseAndSec = { course , section: secInfo.section };

      if (courseIsSelect) {
        addSelectedCourseAndSec(selectedCourseAndSec);
      } else {
        removeSelectedCourseAndSec(selectedCourseAndSec);
      }
    }
  }, [
    courseIsSelect,
    secInfo,
    addSelectedCourseAndSec,
    removeSelectedCourseAndSec,
    course,
  ]);

  return (
    <Paper
      variant="outlined"
      sx={{ mt: 2, p: { xs: 2, md: 3 }, borderRadius: 3 }}
    >
      <Grid container spacing={2}>
        {/* Course Title and Credits */}
        <Grid item xs={12} md={8}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: { xs: "1rem", md: "1.25rem" } }}
          >
            {course.course_code} {course.course_name_english}
          </Typography>
          <Typography sx={{ fontWeight: "bold", color: "#9CA9BA" }}>
            [{course.credits} หน่วยกิต]
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {/* Study Days */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            วันที่เรียน
          </Typography>
          {secInfo?.schedule.map((schedule, index) => (
            <div
              key={index}
              style={{ marginTop: "8px", display: "inline-flex", gap: "8px" }}
            >
              <DayChip day={schedule.day_of_week} />
            </div>
          ))}
        </Grid>

        {/* Section Dropdown */}
        <Grid item xs={12} md={4}>
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <InputLabel id="section-select-label">Sec</InputLabel>
            <Select
              labelId="section-select-label"
              id="section-select"
              value={sec.toString()}
              label="Section"
              onChange={handleChange}
              sx={{
                width: "auto",
                height: "auto",
                minWidth: "fit-content",
                borderRadius: 4,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.42)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.42)",
                },
                "& .MuiSelect-select": {
                  padding: "10px 12px",
                },
              }}
            >
              {course.sections.map((sec, index) => (
                <MenuItem key={index} value={index}>
                  Sec {sec.section}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {secInfo && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* Section Info */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              ผู้สอน
            </Typography>
            <Typography>{secInfo.instructors.join(", ")}</Typography>
          </Grid>

          {/* Section Schedule */}
          {secInfo.schedule.map((schedule, index) => (
            <Grid key={index} container spacing={2} sx={{ paddingLeft: 2 }}>
              <Grid item xs={4}>
                <Typography>
                  {schedule.start_time} - {schedule.end_time}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{schedule.room_name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{schedule.study_type}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Select Button */}
      <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
        <Grid item>
          <Button
            variant="outlined"
            sx={{ mr: 2, fontSize: { xs: "0.75rem", md: "1rem" } }}
            onClick={handleButtonClick}
            startIcon={courseIsSelect ? <CheckCircleIcon /> : <AddIcon />}
          >
            {courseIsSelect ? "ยกเลิก" : "เลือก"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CourseBox;

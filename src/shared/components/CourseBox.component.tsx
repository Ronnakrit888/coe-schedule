/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { use, useEffect, useState } from 'react'
import { Course, Section } from '../interfaces'
import { Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, Dialog, Snackbar, CircularProgress, SnackbarContent, Paper, ButtonBase, DialogContent, DialogActions, Checkbox, DialogTitle, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'; // Import Add icon
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import CheckCircle icon

import DayChip from './DayChip.component'

type Props = { course: Course, addSelectedCourseAndSec: (course: Course, sec: number) => void, selectedCourseAndSec: [Course, number][], totalCredits: () => number, removeSelectedCourseAndSec: (course: Course, sec: number) => void}

const CourseBox = ({ course, addSelectedCourseAndSec, selectedCourseAndSec, totalCredits, removeSelectedCourseAndSec}: Props) => {
    const [sec, setSec] = useState(0);  // Default to -1 to indicate no section selected
    const [secInfo, setSecInfo] = useState<Section | null>(course.sections[0])
    const [courseIsSelect, setCourseIsSelect] = useState(false)
    const handleChange = (event: SelectChangeEvent) => {
        const selectedIndex = parseInt(event.target.value);
        setSec(selectedIndex);
        setSecInfo(course.sections[selectedIndex])
    };
    
    const handleButtonClick = () => {
        setCourseIsSelect(prev => !prev);
    };

    useEffect(() => {
        if (courseIsSelect && secInfo) {
            addSelectedCourseAndSec(course, secInfo.section);
            console.log(course,secInfo.section)
        }
        if (!courseIsSelect && secInfo) {
            removeSelectedCourseAndSec(course, secInfo.section);
            console.log("removing", secInfo.section)
        }
    }, [courseIsSelect])

    useEffect(() => {
        setCourseIsSelect(false)
    }, [sec])
    

    return (
        <Paper variant="outlined" sx={{ mt: 2, p: { xs: 2, md: 3 }, borderRadius: 3 }}>
            <Grid container spacing={2}>
                {/* Course Title and Credits */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                        {course.course_code} {course.course_name_english}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold', color: '#9CA9BA' }}>
                        [{course.credits} หน่วยกิต]
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                {/* Study Days and Availability */}
                <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>วันที่เรียน</Typography>
                    {secInfo?.schedule.map((schedule, index) => (
                        <div key={index} style={{ marginTop: '8px', display: 'inline-flex', gap: '8px' }}>
                            <DayChip day={schedule.day_of_week} />
                        </div>
                    ))}
                </Grid>

                {/* Section Dropdown */}
                <Grid item xs={12} md={4}>
                    <FormControl sx={{ mt: 2, minWidth: 120 }} classes={{ root: 'custom-form-control' }}>
                        <InputLabel id="section-select-label">Sec</InputLabel>
                        <Select
                            labelId="section-select-label"
                            id="section-select"
                            value={sec.toString()}
                            label="Section"
                            onChange={handleChange}
                            className="MuiInputBase-formControl"
                            sx={{
                                width: "auto",
                                height: "auto",
                                minWidth: "fit-content",
                                borderRadius: 4,
                                alignItems: "center",
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(0, 0, 0, 0.23)',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(0, 0, 0, 0.42)',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(0, 0, 0, 0.42)',
                                },
                                '& .MuiSelect-select': {
                                    padding: '10px 12px',
                                },
                            }}
                        >
                            {course.sections.map((sec, index) => (
                                <MenuItem key={index} value={index}>Sec {sec.section}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {secInfo && (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {/* Headers for Instructor, Time, Room, Format */}
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>ผู้สอน</Typography>
                                <Typography>{secInfo.instructors.join(', ')}</Typography> {/* Corrected to access instructors directly from secInfo */}
                            </Grid>
                            <Grid />

                            {/* Headers for Time, Room, Study type */}
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>เวลา</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>ห้องเรียน</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>รูปแบบ</Typography>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>


                    {/* Section Info */}
                    {secInfo.schedule.map((schedule, index) => (
                        <Grid key={index} container spacing={2} sx={{ paddingLeft: 2 }}>
                            <Grid item xs={4}>
                                <Typography>{schedule.start_time} - {schedule.end_time}</Typography>
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
                        sx={{ mr: 2, fontSize: { xs: '0.75rem', md: '1rem' } }}
                        onClick={handleButtonClick} // Open snack bar when clicked
                        startIcon={courseIsSelect ? <CheckCircleIcon /> : <AddIcon />}
                    >
                        เลือก
                    </Button>
                </Grid>
            </Grid>

            {/* Snackbar for selection confirmation */}
            

            
        </Paper>
    )
}

export default CourseBox;
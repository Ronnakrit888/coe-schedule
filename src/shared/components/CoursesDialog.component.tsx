import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { Course } from '../interfaces'

type Props = {open: boolean, onClose: () => void, selectedCourseAndSec: [Course, number][], totalCredits: number}

const CoursesDialog = ({open, onClose, selectedCourseAndSec, totalCredits}: Props) => {

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md' sx={{ padding: '16px' }}>
    <DialogTitle>
        <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
            <Typography fontSize='1.4rem' fontWeight='700'>วิชาที่เลือก</Typography>
            <Typography variant="body1">รวม {totalCredits} หน่วยกิต</Typography>
        </Stack>
    </DialogTitle>
    <DialogContent sx={{ overflow: 'auto', height: '350px' }}>
        <Grid container spacing={2} sx={{ alignItems: 'center', mt: '6px' }}>
            {selectedCourseAndSec.map((item, index) => (
                <Grid container key={index} sx={{ alignItems: 'center' }}>
                    <Grid item xs={2}>
                        <Typography>{item[0].course_code}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{item[0].course_name_english}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>{item[0].credits} หน่วยกิต</Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Typography>{item[1]}</Typography>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    </DialogContent>
    <DialogActions>
        <Button onClick={onClose}>ปิด</Button>
    </DialogActions>
</Dialog>
)
}
export default CoursesDialog;
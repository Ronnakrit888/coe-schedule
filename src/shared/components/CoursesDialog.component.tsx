import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { Course } from '../interfaces';
import { useRouter } from 'next/navigation';

type Props = {
    open: boolean;
    onClose: () => void;
    selectedCourseAndSec: [Course, number][];
    totalCredits: number;
}
const CoursesDialog = ({ open, onClose, selectedCourseAndSec, totalCredits }: Props) => {
    const router = useRouter();

    const handleBackToMainPage = () => {

        router.push('/');  // Safely push route only if on the client

    };
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            sx={{ verticalAlign: 'center', alignItems: 'center', justifyContent: 'center', p: '32px' }}
        >
            <DialogTitle>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                    <Typography fontSize="1.4rem" fontWeight="700">วิชาที่เลือก</Typography>
                    <Typography variant="body1">รวม {totalCredits} หน่วยกิต</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent sx={{ overflow: 'auto', height: '350px', padding: '24px 24px 8px' }}>
                <Grid container direction='column' spacing={2} sx={{ alignItems: 'center', mt: '6px' }}>
                    {selectedCourseAndSec.length === 0 ? (
                        <Typography color="text.secondary" align="center" sx={{ mt: 2 }}>
                            ไม่พบรายวิชา
                        </Typography>
                    ) : (
                            selectedCourseAndSec.map(([course, sec]) => (
                                <Grid
                                    container
                                    key={`${course.course_code}-${sec}`}
                                    sx={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 2, 
                                        py: 1, 
                                        borderBottom: '1px solid #e0e0e0', 
                                        width: '100%'
                                    }}
                                >
                                    <Grid item xs={2}>
                                        <Typography variant="body2" fontWeight="500" color="text.secondary">{course.course_code}</Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Typography variant="body2" color="text.primary">{course.course_name_english}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="body2" fontWeight="500" color="text.secondary">{course.credits} หน่วยกิต</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="body2" fontWeight="500" color="text.secondary">เซค {sec}</Typography>
                                    </Grid>
                                </Grid>
                            ))
                        )}

                </Grid>
            </DialogContent>
            <DialogActions sx={{ padding: '16px 24px' }}>
                <Button
                    onClick={handleBackToMainPage}
                    variant="contained"
                    color="primary"
                    sx={{ padding: '8px 24px', fontWeight: 'bold' }}
                >
                    กลับไปหน้าหลัก
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CoursesDialog;
"use client";
import React, { useState } from "react";
import { Button, Modal, Typography, Box, Grid, FormControl, Select, MenuItem} from "@mui/material";

type Props = {};

const page = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("green");
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div>
        <button onClick={openModal}>show info</button>
      <Modal
        open={showModal}
        onClose={closeModal}
      >
        {/* รายละเอียดของวิชา */}
      <Box sx={{ p: 2, bgcolor:'white', border: '1px solid #ccc', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
        <Typography variant="h6">0201107 LRN STUD ACT [3 หน่วยกิต]</Typography>
        <Typography variant="subtitle1">การเรียนรู้ผ่านกิจกรรมนิสิต</Typography>
        <Typography variant="body2">LEARNING THROUGH STUDENT ACTIVITIES</Typography>



        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={4}><Typography>ผู้สอน</Typography></Grid>
          <Grid item xs={8}><Typography>STAFF</Typography></Grid>

          <Grid item xs={4}><Typography>เวลา</Typography></Grid>
          <Grid item xs={8}><Typography>WED 13:00 - 14:00</Typography></Grid>

          <Grid item xs={4}><Typography>ห้องเรียน</Typography></Grid>
          <Grid item xs={8}><Typography>CHALE 609</Typography></Grid>

          <Grid item xs={4}><Typography>รูปแบบ</Typography></Grid>
          <Grid item xs={8}><Typography>FWK</Typography></Grid>
        </Grid>

        {/* เลือกสีในตาราง */}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>เลือกสีในตาราง</Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          {['pink', 'orange', 'yellow', 'green', 'blue', 'purple'].map(color => (
            <Box
              key={color}
              onClick={() => handleColorChange(color)}
              sx={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: color,
                cursor: 'pointer',
                border: selectedColor === color ? '3px solid black' : '1px solid #ccc',
              }}
            />
          ))}
        </Box>

        {/* ปุ่ม */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined">ซ่อนจากตาราง</Button>
          <Button variant="contained" color="error">นำออกจากวิชาที่เลือก</Button>
        </Box>
      </Box>

      {/* Modal */}
      </Modal>
    </div>
  );
};

export default page;
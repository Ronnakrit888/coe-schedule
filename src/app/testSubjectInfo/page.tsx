"use client";
import { Modal, Typography, Box } from "@mui/material";
import React, { useState } from "react";

type Props = {};

const page = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <button onClick={openModal}>SubjectInfo</button>
      <Modal
        open={showModal}
        onClose={closeModal}
        aria-labelledby="subject-name"
        aria-describedby="subject-describe"
      >
        <Box sx={style}>
          <Typography id="subject-name" variant="h6" component="h2">
            0201107 LRN STUD ACT
          </Typography>
          <Typography id="subject-describe" sx={{ mt: 2 }}>
            การเรียนรู้ผ่านกิจกรรมนิสิต
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default page;

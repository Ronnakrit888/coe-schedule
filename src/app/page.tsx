'use client'

import { useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/redux";
import html2canvas from 'html2canvas';
import dynamic from "next/dynamic";
import TablePage from "@/shared/components/tablePage.component";
import TablePageGrid from "@/shared/components/tablePageGrid";
import { Button } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';


// const TablePage = dynamic(
//   () => import("../shared/components/tablePage.component"))

export default function Home() {

  const dispatch = useDispatch();
  const selectedCoursesRedux = useSelector((root: RootState) => {
    root.courses;
  });
  // Ref for the TablePage component to capture it
  const tablePageRef = useRef<HTMLDivElement | null>(null);

  // Function to capture the TablePage and download the image
  const captureImage = useCallback(() => {
    const tablePage = tablePageRef.current;
    if (tablePage) {
      html2canvas(tablePage).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'image.png'; // File name
        link.click();
      });
    }
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* Ref used to capture TablePage */}
      <div ref={tablePageRef}>
        <TablePage />
      </div>

      <div style={{ paddingLeft: "20%"}}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<DownloadIcon />}
        onClick={captureImage}
        style={{ marginTop: '20px' }}
      >
        PNG
      </Button>
      </div>
      
    </div>
  );
}



//test by nateeeeee
// export default function Home() {
//   return (
//     <div
//       style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
//     >
//       <Navbar locale={"th"}></Navbar>
//       <Table></Table>
//     </div>
//   );
// }
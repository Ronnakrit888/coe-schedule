import Image from "next/image";
import styles from "./page.module.css";
import { Stack, Container } from "@mui/material";
import { TablePage, Navbar } from "@/shared/components";import SubjectInfo from "@/shared/components/SubjectInfo";

export default function Home() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <TablePage/>
    </div>
  );
}

import Image from "next/image";
import styles from "./page.module.css";
import { Stack, Container } from "@mui/material";

import Navbar from "@/shared/components/navbar.component";
import Table from "@/shared/components/table.component";

export default function Home() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Table></Table>
    </div>
  );
}

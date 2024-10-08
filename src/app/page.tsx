'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/redux";
import TablePage from "@/shared/components/tablePage.component";

export default function Home() {

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <TablePage></TablePage>
    </div>
  );
}
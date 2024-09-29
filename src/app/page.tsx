import Image from "next/image";
import styles from "./page.module.css";
import { Stack, Container, Typography } from "@mui/material";
import { Table, Navbar } from "@/shared/components";

export default function Home() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Table></Table>
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
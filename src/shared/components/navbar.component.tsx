"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  SvgIcon,
  Button,
} from "@mui/material";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import CalendarViewMonthSharpIcon from "@mui/icons-material/CalendarViewMonthSharp";
import { morKhor } from "../assets/fonts";

type Props = {
  locale: string;
};

const Navbar = (props : Props) => {
  const { locale } = props;
  const router = useRouter();

  const handleBackToTablePage = () => {
    router.push('/');
  }

  const handleBackToCoursePage = () => {
    router.push('/courses');
  }

  // Sample text based on locale
  const navText = locale === 'th' ? 'ตารางเรียน' : 'Schedule';
  const searchText = locale === 'th' ? 'ค้นหารายวิชา' : 'Search Courses';


  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#f8f9fa", padding: "0" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo Section */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              color: "#333",
            }}
          >
            <Typography
              sx={{
                fontFamily: morKhor.style.fontFamily,
                fontWeight: morKhor.style.fontWeight,
                fontSize: "48px",
              }}
            >
              CoE SCHEDULE
            </Typography>

            {/* <Image src="/Images/KKU-logo.png" alt="logo" width={70} height={70} /> */}
          </Box>

          {/* Nav Items */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Search Icon and Text */}
            <Button
              onClick={handleBackToCoursePage}
              color="secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                paddingRight: "20px",
              }}
            >
              <SearchIcon color="disabled" />
              <Typography
                sx={{
                  marginLeft: "8px",
                  color: "#333",
                  fontFamily: morKhor.style.fontFamily,
                  fontWeight: morKhor.style.fontWeight,
                  fontSize: "28px",
                }}
              >
                {searchText}
              </Typography>
            </Button>

            {/* Schedule Icon and Text */}
            <Button
              onClick={handleBackToTablePage}
              color="secondary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <CalendarViewMonthSharpIcon color="disabled" />
              <Typography
                sx={{
                  marginLeft: "8px",
                  color: "#333",
                  fontFamily: morKhor.style.fontFamily,
                  fontWeight: morKhor.style.fontWeight,
                  fontSize: "28px",
                }}
              >
                {navText}
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar

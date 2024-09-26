// "use client"

// import React from 'react'
// import { Container, Typography } from '@mui/material'

// type Props = {
//   locale : string
// }

// export const Navbar = (props : Props) => {
//   return (
//     <Container maxWidth="lg">
      
//     </Container>
//   )
// }

"use client"

import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Box, Container, SvgIcon, Button } from '@mui/material'
import Image from "next/image"
import SearchIcon from '@mui/icons-material/Search';
import CalendarViewMonthSharpIcon from '@mui/icons-material/CalendarViewMonthSharp';


type Props = {
  locale: string;
}

export const Navbar = (props: Props) => {
  const { locale } = props;

  // Sample text based on locale
  const navText = locale === 'th' ? 'ตารางเรียน' : 'Schedule';
  const searchText = locale === 'th' ? 'ค้นหารายวิชา' : 'Search Courses';

  return (
    <AppBar position="static" sx={{ backgroundColor: '#f8f9fa', padding: '0' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo Section */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', color: '#333'}}>
            CoE SCHEDULE
            {/* <Image src="/Images/KKU-logo.png" alt="logo" width={70} height={70} /> */}
          </Box>

          {/* Nav Items */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Search Icon and Text */}
            <Button  href="/testcourses" color="secondary" sx={{ display: 'flex', alignItems: 'center', paddingRight: '20px' }}>
              <SearchIcon color="disabled" />
              <Typography sx={{ marginLeft: '8px', color: '#333' }}>{searchText}</Typography>
            </Button>

            {/* Schedule Icon and Text */}
            <Button  href="/src" color="secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarViewMonthSharpIcon color="disabled" />
              <Typography sx={{ marginLeft: '8px', color: '#333' }}>{navText}</Typography>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

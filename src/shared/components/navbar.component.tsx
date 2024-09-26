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
import { AppBar, Toolbar, Typography, IconButton, Box, Container } from '@mui/material'
import Image from "next/image"

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
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Image src="/Images/KKU-logo.png" alt="logo" width={70} height={70} />
          </Box>

          {/* Nav Items */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Search Icon and Text */}
            <IconButton href="/" color="inherit" sx={{ display: 'flex', alignItems: 'center', paddingRight: '20px' }}>
              <Image src="/Images/search-icon.png" alt="search-icon" width={30} height={30} />
              <Typography sx={{ marginLeft: '8px', color: '#333' }}>{searchText}</Typography>
            </IconButton>

            {/* Schedule Icon and Text */}
            <IconButton href="/" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
              <Image src="/Images/schedule-icon.png" alt="schedule-icon" width={30} height={30} />
              <Typography sx={{ marginLeft: '8px', color: '#333' }}>{navText}</Typography>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

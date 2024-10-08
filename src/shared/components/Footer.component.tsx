"use client"

import React from 'react'
import { Box, Container, Typography, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
type Props = {}

export const Footer = (props: Props) => {
    return (
        <Box
          component="footer"
          sx={{
            backgroundColor: '#f8f9fa',
            padding: '20px 0',
            borderTop: '1px solid #e7e7e7',
            marginTop: 'auto', // Pushes the footer to the bottom if using flex layout
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              {/* Left Section: Copyright */}
              <Typography variant="body2" color="textSecondary" align="left">
                © {new Date().getFullYear()} Kendo And Friends. All rights reserved.
              </Typography>
    
              {/* Middle Section: Links */}
              <Box>
                <Link href="/" color="inherit" underline="none" sx={{ margin: '0 10px' }}>
                  Home
                </Link>
                <Link href="/about" color="inherit" underline="none" sx={{ margin: '0 10px' }}>
                  About
                </Link>
                <Link href="/contact" color="inherit" underline="none" sx={{ margin: '0 10px' }}>
                  Contact
                </Link>
              </Box>
    
              {/* Right Section: Social Media Icons */}
              <Box>
                <IconButton color="primary" href="https://www.facebook.com/thiraphat.mon" target="_blank">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="primary" href="https://twitter.com" target="_blank">
                  <TwitterIcon />
                </IconButton>
                <IconButton color="primary" href="https://www.instagram.com" target="_blank">
                  <InstagramIcon />
                </IconButton>
                <IconButton color="primary" href="https://linkedin.com" target="_blank">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </Box>
      );
    };

export default Footer;
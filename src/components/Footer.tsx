import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

export default function Footer() {
  return (
    <Box
    component="footer"
    sx={{
      py: 5,
      textAlign: 'center',
      position: 'relative',
      bgcolor: 'background.default',
    }}
  >
    <Container>
      

      <Typography variant="caption" component="div">
        © All rights reserved
        <br /> made by &nbsp;
        <Link href=""> minimals.cc </Link>
      </Typography>
    </Container>
  </Box>
      
    
  );
}
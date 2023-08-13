import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80px',
        backgroundColor: '#222121',
        borderTop: '1px solid #ddd',
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2" color="white">
        &copy; Created by AJ - 2023
      </Typography>
    </Box>
  );
};

export default Footer;

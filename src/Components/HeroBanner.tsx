import { Box, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import hero1 from '../../public/hero1.png';
import { useTheme } from "@mui/material/styles";

const HeroBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Image src={hero1} alt='banner-discount' style={{width: isMobile ? '100%' : '80%'}} />
    </Box>
  )
}

export default HeroBanner
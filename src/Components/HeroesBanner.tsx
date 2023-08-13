import { Box, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import hero2 from '../../public/hero2.png';
import { useTheme } from "@mui/material/styles";

const HerosBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Image src={hero2} alt='banner-discount' style={{width: isMobile ? '100%' : '80%'}} />
    </Box>
  )
}

export default HerosBanner
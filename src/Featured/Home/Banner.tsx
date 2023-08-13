import { Box, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import React, { useContext } from 'react';
import hero1 from '../../../public/banner1.jpg'
import { useTheme } from "@mui/material/styles";
import { AppContext } from "@/Context/AppContext";

const Banner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { isCartOpen } = useContext(AppContext);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Image src={hero1} alt='banner-discount' style={{width: isMobile ? '100%' : '80%'}} />
    </Box>
  );
};

export default Banner;

import { Box, Typography, useMediaQuery } from "@mui/material";
import React from 'react'
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import pic1 from '../../public/pic1.png';
import pic2 from '../../public/pic2.png';
import pic3 from '../../public/pic3.png';
import pic4 from '../../public/pic4.png';
import pic5 from '../../public/pic5.png';
import pic6 from '../../public/pic6.png';
import pic7 from '../../public/pic7.png';
import pic8 from '../../public/pic8.png';

const data = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8]

const Brands = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box className='hidden md:block mb-10 mt-8'>
      <Typography variant='h1' sx={{fontSize: isMobile ? '25px' : '30px', fontWeight: '600', color: '#282828'}}>Brands</Typography>
      <div className="grid grid-cols-8 items-center mt-5 w-full">
        {data.map((brand, i) => (
          <Box key={i}>
            <Image src={brand} alt="brand-pic" width={140} style={{objectFit: 'cover'}} />
          </Box>
        ))}
      </div>
    </Box>
  )
}

export default Brands
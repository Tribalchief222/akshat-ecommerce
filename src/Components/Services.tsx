import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

const Services = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box className="mb-5 mt-3 grid grid-cols-2 p-2">
        <Box sx={{ width: isMobile ? "100%" : "50%" }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: isMobile ? "12px" : "30px",
              fontWeight: "600",
              color: "#282828",
              lineHeight: isMobile ? "14px" : "35px",
            }}
          >
            We provide best customer experience
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: isMobile ? "start" : "center",
            justifyContent: "x",
          }}
        >
          <Box
            sx={{
              width: "1.5px",
              height: isMobile ? "30px" : "60px",
              backgroundColor: "#708090",
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: isMobile ? "8px" : "14px",
              fontWeight: "500",
              color: "#595959",
              marginLeft: "10px",
              textAlign: isMobile ? "right" : "start",
            }}
          >
            We ensure our customers have the best shopping experience
          </Typography>
        </Box>
      </Box>
      {/* Services Box */}
      <div className="grid grid-cols-2 md:grid-cols-4 mb-5 gap-2">
        <Box
          sx={{
            width: isMobile ? "100%" : "100%",
            padding: "10px 12px",
          }}
        >
          <CurrencyExchangeIcon sx={{ fontSize: 20, marginBottom: "10px" }} />
          <Typography variant="h6" sx={{ fontSize: 14, fontWeight: "600" }}>
            Orignal Products
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: 10,
              fontWeight: "600",
              color: "#606060",
              marginTop: "10px",
              width: isMobile ? "100%" : "70%",
            }}
          >
            We provide money back guarantee if the products are not original
          </Typography>
        </Box>

        <Box
          sx={{
            width: isMobile ? "100%" : "100%",
            padding: "10px 12px",
          }}
        >
          <EmojiEmotionsOutlinedIcon sx={{ fontSize: 20, marginBottom: "10px" }} />
          <Typography variant="h6" sx={{ fontSize: 14, fontWeight: "600" }}>
            Satisfaction Guarantee
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: 10,
              fontWeight: "600",
              color: "#606060",
              marginTop: "10px",
              width: isMobile ? "100%" : "70%",
            }}
          >
            Exchange the products if you&apos;ve purchased if they don&apos;t fit on you
          </Typography>
        </Box>

        {/* Other service boxes remain unchanged */}
        
      </div>
    </>
  );
};

export default Services;

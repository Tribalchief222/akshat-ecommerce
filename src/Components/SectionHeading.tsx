import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

interface SectionHeadingProps {
  title: string;
}

const SectionHeading = ({ title }: SectionHeadingProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ marginTop: "46px", marginBottom: "30px"}}>
      <Typography
        variant="h1"
        sx={{
          fontSize: isMobile ? "18px" : "30px",
          fontWeight: "600",
          color: "#282828",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default SectionHeading;

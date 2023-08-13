import React from "react";
import { ICategory } from "../../Components/model";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";

interface TopCategoriesProps {
  categories: ICategory[];
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const TopCategories = ({ categories }: TopCategoriesProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box sx={{ marginTop: "46px", marginBottom: "30px" }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: isMobile ? "25px" : "30px",
            fontWeight: "600",
            color: "#282828",
          }}
        >
          Curated Picks
        </Typography>
      </Box>

      <Grid container spacing={1} sx={{ marginBottom: 5 }}>
        {categories?.map((category) => (
          <Grid
            key={category?.id}
            item
            xs={12}
            md={3}
            sx={{ position: "relative" }}
          >
            <Item>
              <TopCategoryCard category={category} />
            </Item>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TopCategories;

interface TopCategoryCardProps {
  category: ICategory;
}

const TopCategoryCard = ({ category }: TopCategoryCardProps) => (
  <div style={{ position: "relative", borderRadius: 5 }}>
    <Link href={`/categories/${category?.slug}`}>
      <Image
        src={category?.image}
        alt={category?.name}
        width={400}
        height={200}
      />
      <Typography
        variant="h5"
        sx={{
          position: "absolute",
          bottom: 10,
          backgroundColor: "white",
          color: "#002244",
          left: "50%",
          transform: "translate(-50%, -50%)",
          paddingY: "10px",
          paddingX: "36px",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        {category?.name}
      </Typography>
    </Link>
  </div>
);

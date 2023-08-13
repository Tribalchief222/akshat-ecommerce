'use client';

import { ICategory } from "@/Components/model";
import React from "react";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography, useMediaQuery } from "@mui/material";

interface AllCategoriesProps {
  categories: ICategory[];
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AllCategories = ({ categories }: AllCategoriesProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
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
            <CategoryCard category={category} />
          </Item>
        </Grid>
      ))}
    </Grid>
  );
};

export default AllCategories;

interface TopCategoryCardProps {
  category: ICategory;
}

const CategoryCard = ({ category }: TopCategoryCardProps) => (
  <Link href={`/categories/${category?.slug}`}>
    <div style={{ position: "relative", borderRadius: 5 }}>
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
    </div>
  </Link>
);

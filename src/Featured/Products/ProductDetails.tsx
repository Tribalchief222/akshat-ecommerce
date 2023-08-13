import React, { useState } from "react";
import { IBreadcrumbItem, IProduct } from "@/Components/model";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddToCartButton from "@/Components/AddToCartButton";
import Quantity from "@/Components/Quantity";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface ProductDetailsProps {
  product: IProduct;
}

const items: IBreadcrumbItem[] = [
  {
    name: "Products",
    link: "/products",
  },
  {
    name: "Categories",
    link: "/categories",
  },
];

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSetQuantity = (valueAsString: string, valueAsNumber: number) => {
    setQuantity(valueAsNumber);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Item>
            <Image
              src={product?.mainImage}
              alt={product?.name}
              width={700}
              height={100}
            />
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item sx={{ height: "100%" }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: 30,
                paddingX: 2,
                paddingY: 1,
                textAlign: "left",
                fontWeight: "600",
                color: "black",
              }}
            >
              {product?.name}
              <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 14, marginTop: 4 }}>
                {items.map((item, index) => (
                  <Link
                    key={index}
                    underline="hover"
                    color="inherit"
                    href={item.link}
                    sx={{ fontSize: 14 }}
                  >
                    {item.name}
                  </Link>
                ))}
                <Typography
                  color="text.primary"
                  sx={{ fontSize: 14, fontWeight: "600" }}
                >
                  {product?.name}
                </Typography>
              </Breadcrumbs>
            </Typography>
            <Typography
              sx={{
                marginTop: isMobile ? 1 : 2,
                marginBottom: isMobile ? 1 : 2,
                fontSize: "16px",
                fontWeight: "500",
                textAlign: "justify",
                color: "black",
                paddingX: 2,
                paddingY: 1,
              }}
            >
              {product?.description}
            </Typography>
            <Quantity setQuantity={handleSetQuantity} />
            <Typography
              sx={{
                textAlign: "left",
                marginTop: 2,
                paddingX: 2,
                paddingY: 1,
              }}
            >
              <AddToCartButton product={product} />
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;

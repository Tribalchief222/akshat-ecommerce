import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import cat3 from "../../public/cat3.jpg";
import { Box } from "@mui/material";
import Rating from "./Rating";
import AddToCartButton from "./AddToCartButton";
import { IProduct } from "./model";
import { getSubstring } from "./helper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card sx={{ maxWidth: 360, position: "relative", margin: "0.5rem", marginBottom: 5 }}>
      <Link href={`/products/${product.slug}`}>
        <CardMedia
          sx={{ height: 200 }}
          image={product?.mainImage}
          title="green iguana"
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontSize: isMobile ? 10 : 18, fontWeight: "600" }}
            >
              {product?.name}
            </Typography>
            <Typography variant="body2" color="#002244">
              $ {product?.price}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {getSubstring(product.description, 30)}
          </Typography>
          {/* <Rating rating={product?.rating} /> */}
        </CardContent>
      </Link>
      <CardActions>
        <AddToCartButton product={product} />
      </CardActions>
    </Card>
  );
}

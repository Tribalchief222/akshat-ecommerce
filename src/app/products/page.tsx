"use client";

import React from "react";
import AllProducts from "@/Featured/Products";
import {
  CircularProgress,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { client } from "@/utils/client";
import { IProduct } from "@/Components/model";
import SectionHeading from "@/Components/SectionHeading";

type Props = {
  params: {
    slug: string;
  };
};

const ProductsPage = ({ params: { slug } }: Props) => {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [sortBy, setSortBy] = React.useState("priceLowToHigh");

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await client.fetch(`
          *[_type == "product"] {
            ...,
            "id": _id,
            "slug": slug.current,
            "mainImage": mainImage.asset->url,
            category->{
              name,
              "id": _id,
              "image": image.asset->url
            },
            "gallery": gallery[].asset->url
          }
        `);
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  const sortedProducts = React.useMemo(() => {
    const copyProducts = [...products];
    if (sortBy === "priceLowToHigh") {
      copyProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighToLow") {
      copyProducts.sort((a, b) => b.price - a.price);
    }
    return copyProducts;
  }, [products, sortBy]);

  if (products.length === 0) {
    return (
      <div
        className="flex items-center justify-center m-8"
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <SectionHeading title="All Products" />
        <Select value={sortBy} onChange={handleSortChange}>
          <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
          <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
        </Select>
      </div>
      <AllProducts products={sortedProducts} />
    </div>
  );
};

export default ProductsPage;

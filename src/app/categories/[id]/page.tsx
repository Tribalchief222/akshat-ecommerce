'use client';

import React from "react";
import { client } from "@/utils/client";
import { IProduct } from "@/Components/model";
import CircularProgress from "@mui/material/CircularProgress";
import HeroBanner from "@/Components/HeroBanner";
import AllProducts from "@/Featured/Products";
import SectionHeading from "@/Components/SectionHeading";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

type Props = {
  params: {
    slug: string;
  };
};

const CategoryPage = ({ params: { slug } }: Props) => {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sortBy, setSortBy] = React.useState("priceLowToHigh");

  React.useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const categoryResponse = await client.fetch(
          `
          *[_type == "category" && slug.current == $slug][0] {
            ...,
            "id": _id,
            "name": title,
            "image": image.asset->url,
            "products": *[_type == "product" && references(^._id)] {
              ...,
              "id": _id,
              "slug": slug.current,
              "mainImage": mainImage.asset->url,
              category->{ name, "image": image.asset->url }
            }
          }`,
          { slug }
        );

        if (categoryResponse) {
          setProducts(categoryResponse.products);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching category products:", error);
        setLoading(false);
      }
    };

    if (slug) {
      fetchCategoryProducts();
    }
  }, [slug]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center m-8">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <HeroBanner />
      <div className="flex items-center justify-between">
        <SectionHeading title={`${slug.toUpperCase()}`} />
        <Select value={sortBy} onChange={handleSortChange}>
          <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
          <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
        </Select>
      </div>
      <AllProducts products={sortedProducts} />
    </div>
  );
};

export default CategoryPage;

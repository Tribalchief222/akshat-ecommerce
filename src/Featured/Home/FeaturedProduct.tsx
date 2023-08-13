"use client";

import ProductCard from "@/Components/ProductCard";
import SectionHeading from "@/Components/SectionHeading";
import { IProduct } from "@/Components/model";
import { Box, CircularProgress } from "@mui/material";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface FeaturedProductProps {
  title: string;
  products: IProduct[];
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const FeaturedProduct = ({ title, products }: FeaturedProductProps) => {
  if (!products) {
    return (
      <div className="flex items-center justify-center">
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <SectionHeading title={title} />
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Carousel>
    </>
  );
};

export default FeaturedProduct;

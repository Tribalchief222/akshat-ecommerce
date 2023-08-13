"use client";

import { useEffect, useState } from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Banner from "@/Featured/Home/Banner";
import { Box } from "@mui/material";
import TopCategories from "@/Featured/Home/TopCategories";
import FeaturedProduct from "@/Featured/Home/FeaturedProduct";
import HeroBanner from "@/Components/HeroBanner";
import HerosBanner from "@/Components/HeroesBanner";
import { IFeaturedItems } from "@/Components/model";
import { client } from "@/utils/client";
import Brands from "@/Components/Brands";
import Services from "@/Components/Services";

const getAllFeaturedItemsQueries = `
    *[_type == "featuredProductsAndCategories"]{
        "topCategories": topCategories[]->{
            "id": _id,
            name,
            "slug": slug.current,
            "image": image.asset->url,
        },
        "bestDeals": bestDeals[]->{
            "id": _id,
            name,
            description,
            price,
            "slug": slug.current,
            rating,
            "mainImage": mainImage.asset->url,
        },
        "trendingProducts": trendingProducts[]->{
            "id": _id,
            name,
            description,
            price,
            "slug": slug.current,
            rating,
            "mainImage": mainImage.asset->url,
        },
        "mostSellingProducts": mostSellingProducts[]->{
            "id": _id,
            name,
            description,
            price,
            "slug": slug.current,
            rating,
            "mainImage": mainImage.asset->url,
        }
    }
`;

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState<IFeaturedItems[]>([]);

  useEffect(() => {
    const getFeaturedItemsAsync = async () => {
      try {
        const items = await client.fetch(getAllFeaturedItemsQueries);
        setFeaturedItems(items);
      } catch (error) {
        console.error("Error fetching featured items:", error);
      }
    };

    getFeaturedItemsAsync();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <Banner />
      <Brands />
      <Services />
      <TopCategories categories={featuredItems[0]?.topCategories} />
      <FeaturedProduct
        title="Featured Products"
        products={featuredItems[0]?.mostSellingProducts}
      />
      <HeroBanner />
      <FeaturedProduct
        title="Best Selling Products"
        products={featuredItems[0]?.bestDeals}
      />
      <HerosBanner />
      <FeaturedProduct
        title="Trending Products"
        products={featuredItems[0]?.trendingProducts}
      />
    </div>
  );
}

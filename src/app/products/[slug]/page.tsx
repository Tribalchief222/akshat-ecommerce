"use client";

import React from "react";
import { client } from "@/utils/client";
import { IBreadcrumbItem, IProduct } from "@/Components/model";
import ProductDetails from "@/Featured/Products/ProductDetails";
import { CircularProgress } from "@mui/material";

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

type Props = {
  params: {
    slug: string;
  };
};

const ProductDetailsPage = ({ params: { slug } }: Props) => {
  const [product, setProduct] = React.useState<IProduct | null>(null);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await client.fetch(`
          *[_type == "product" && slug.current == "${slug}"][0] {
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
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto">
      {product ? (
        <ProductDetails product={product} />
      ) : (
        <div className="flex items-center justify-center m-8">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;

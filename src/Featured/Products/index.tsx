'use client';

import { IBreadcrumbItem, IProduct } from "@/Components/model";
import React from "react";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import ProductCard from "@/Components/ProductCard";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface AllProductsProps {
  products: IProduct[];
  breadcrumbItems?: IBreadcrumbItem[];
}

const AllProducts = ({ products, breadcrumbItems }: AllProductsProps) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const productsPerPage = 8;
  const totalPages = Math.ceil(products?.length / productsPerPage);

  // Calculate the index range of products to display on the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products?.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      {/* Your product listing */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        }}
      >
        {displayedProducts?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </Box>

      {/* Pagination component with primary color */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 2, marginTop: 2 }}>
        <Pagination
          count={totalPages}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </div>
  );
};

export default AllProducts;

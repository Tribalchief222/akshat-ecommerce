import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, useMediaQuery, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useTheme } from "@mui/material/styles";
import { IProduct } from "../model";
import { client } from "@/utils/client";
import Image from "next/image";
import Link from "next/link"; // Import the Link component

const Search = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearchOpen = () => {
    setShowSearch(true);
  };

  const handleSearchClose = () => {
    setShowSearch(false);
    setSearchText("");
    setProducts([]); // Clear the fetched products
  };

  const query = `
  *[_type == "product" && (name match $searchTextNoCase || description match $searchTextNoCase)] {
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
`;

const fetchProducts = async (searchText: string) => {
  setIsLoading(true);
  const products: IProduct[] = await client.fetch(query, {
    searchTextNoCase: `*${searchText.toLowerCase()}*`,
  });
  setProducts(products);
  setIsLoading(false);
};

useEffect(() => {
  const timeout = setTimeout(() => {
    if (searchText.trim().length >= 3) {
      fetchProducts(searchText);
    }
  }, 1000);

  return () => clearTimeout(timeout);
}, [searchText]);


  return (
    <>
      <SearchOutlinedIcon
        sx={{
          fontSize: isMobile ? "20px" : "20px",
          marginTop: "5px",
          color: "black",
          cursor: "pointer",
        }}
        onClick={handleSearchOpen}
      />
      {showSearch && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            pt: "60px",
          }}
        >
          <Box
            sx={{
              width: isMobile ? "100%" : "800px",
              p: "20px",
              borderRadius: "4px",
              backgroundColor: "white",
            }}
          >
            <TextField
              label="Search here"
              variant="outlined"
              size="small"
              fullWidth
              autoFocus
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                endAdornment: (
                  <CloseIcon
                    sx={{
                      color: "gray",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSearchText(""); // Clear the search text
                      setProducts([]); // Clear the fetched products
                    }}
                  />
                ),
              }}
            />

            <CloseIcon
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                color: "white",
              }}
              onClick={handleSearchClose}
            />
            <Box sx={{ mt: 2, maxHeight: "400px", overflow: "auto" }}>
              {isLoading ? (
                <Box sx={{display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
                  <CircularProgress />
                </Box>
              ) : (
                products.map((product) => (
                  <Link href={`/products/${product.slug}`} key={product.id} onClick={handleSearchClose}> {/* Add the Link component with onClick event handler */}
                    <Box
                      key={product.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid gray",
                        p: 2,
                      }}
                    >
                      <Box sx={{ flexShrink: 0, mr: 2 }}>
                        <Image
                          alt={product?.name}
                          src={product?.mainImage}
                          width={100}
                          height={100}
                        />
                      </Box>
                      <Typography>{product?.name}</Typography>
                      <Box sx={{ marginLeft: "auto" }}>
                        <Typography>{product?.category?.name}</Typography>
                      </Box>
                    </Box>
                  </Link>
                ))
              )}
              {products.length === 0 && !isLoading && (
                <Typography>No Products Found</Typography>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Search;

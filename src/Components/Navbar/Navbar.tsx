'use client';

import React from "react";
import { TextField, Typography, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import logo from "../../../public/logo.png";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { navItems } from "../helper";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import Search from "../Search/Search";
import { Cart } from "@/Featured/Cart/Cart";


const Navbar = () => {
  const [showBox, setShowBox] = React.useState(true);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleBoxClose = () => {
    setShowBox(false);
  };

  return (
    <div>
      {showBox && (
        <Box
          sx={{
            width: "100%",
            height: 30,
            backgroundColor: "#444C38",
            position: "relative",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "14px",
              color: "white",
              opacity: "0.7",
              textAlign: "center",
              paddingTop: "4px",
            }}
          >
            GET 20% OFF on your first order.
          </Typography>
          <CloseIcon
            sx={{
              fontSize: "15",
              opacity: "0.5",
              color: "white",
              position: "absolute",
              top: "50%",
              right: "20px",
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
            }}
            onClick={handleBoxClose}
          />
        </Box>
      )}
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 bg-white p-5 z-10 shadow-2xl">
        <div className="flex items-center justify-center space-x-2">
          <Link href='/'>
          <Image src={logo} alt="logo" width={100} height={100} />
          </Link>
          {navItems.map((item) => (
            <div key={item.label}>
              <Link href={item.href}>
                <Typography sx={{ fontSize: isMobile ? "9px" : "14px", gap: isMobile ? '1px' : '4px' }}>
                  {item.label}
                </Typography>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3">
          <Search />
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

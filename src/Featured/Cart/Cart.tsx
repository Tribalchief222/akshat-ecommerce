import React, { useContext, useRef, useState } from "react";
import { Box, Button, Typography, Modal, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { AppContext } from "@/Context/AppContext";
import CartItem from "./CartItem";
import { calculateItemsTotal } from "@/Components/helper";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useTheme } from "@mui/material/styles";

export const Cart = () => {
  const {
    state: { cart },
    resetItems,
    addItem,
  } = useContext(AppContext);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const btnRef = useRef(null);

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleCheckout = () => {
    resetItems("checkout");
    cart.forEach((cartItem) => {
      addItem("checkout", cartItem, cartItem.count);
    });

    handleCloseCart();
  };

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box ref={btnRef} onClick={handleOpenCart}>
        <ShoppingBagOutlinedIcon sx={{fontSize: 20, cursor: 'pointer'}} />
        {cart.length !== 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 50,
              right: isMobile ? 55 : 180,
              backgroundColor: "primary.light",
              borderRadius: "50%",
              width: "15px",
              height: "15px",
              color: "white",
              fontSize: "0.6rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: "100",
            }}
          >
            {cart.length}
          </Box>
        )}
      </Box>

      <Modal
        open={isCartOpen}
        onClose={handleCloseCart}
        aria-labelledby="cart-modal-title"
        aria-describedby="cart-modal-description"
      >
        <Box
          className="cart-modal"
          sx={{
            top: "64px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999,
          }}
        >
          <Box
            className="cart-modal-content"
            sx={{
              backgroundColor: "white",
              width: { xs: "100%", md: "50%" },
              maxWidth: "md",
              p: 4,
              borderRadius: "md",
            }}
          >
            <Box
              className="cart-modal-header"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                mt: 4,
              }}
            >
              <Typography variant="h6" color="primary">
                Cart ({cart.length} Items)
              </Typography>
              <Button variant="outlined" onClick={handleCloseCart}>
                Close
              </Button>
            </Box>
            <Box
              className="cart-modal-body"
              sx={{ overflowY: "auto", maxHeight: "400px" }}
            >
              {cart.length === 0 ? (
                <>Your Cart is Empty</>
              ) : (
                cart.map((item) => <CartItem key={item.id} item={item} />)
              )}
            </Box>
            {cart.length !== 0 && (
              <Box
                className="cart-modal-footer"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 4,
                }}
              >
                <Box sx={{ gap: 2, display: "inline-flex" }}>
                  <Button variant="outlined" onClick={() => resetItems("cart")}>
                    Clear
                  </Button>
                  <Link href="/checkout">
                    {/* <Button variant="outlined" onClick={handleCheckout}>
                      Checkout
                    </Button> */}
                  </Link>
                </Box>
                <Box>
                  <Typography sx={{fontSize: isMobile ? '14px' : '20px', fontWeight:'600'}}>Total: $ {calculateItemsTotal(cart)}</Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

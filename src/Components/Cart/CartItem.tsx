import React, { useContext } from "react";
import { Button, Grid, Input, Typography } from "@mui/material";
import Link from "next/link";
import DeleteIcon from '@mui/icons-material/Delete';
import { AppContext } from "../../Context/AppContext";
import { IItem } from '../model';
import Image from 'next/image';

interface CartItemProps {
  item: IItem;
}


const CartItem = ({ item }: CartItemProps) => {
  const { increaseCount, decreaseCount, removeItem } = useContext(AppContext);

  return (
    <Grid
      container
      alignItems="center"
      sx={{
        borderBottom: "1px solid #E2E8F0",
        marginY: "2",
      }}
    >
      <Grid item>
        <Link href={`/products/${item.slug}`}>
          <Image
            src={item.mainImage}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1px solid #CBD5E0",
            }}
            alt='pic'
          />
        </Link>
      </Grid>
      <Grid item xs={5} lg={3}>
        <Link href={`/products/${item.slug}`}>
          <Typography>{item.name}</Typography>
        </Link>
      </Grid>
      <Grid item xs={3} lg={2} sx={{ justifyContent: "flex-end" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "0.5rem",
          }}
        >
          <Button
            onClick={() => decreaseCount("cart", item.id)}
            sx={{ padding: 0 }}
          >
            -
          </Button>
          <Input
            type="number"
            value={item.count}
            readOnly={true}
            sx={{ minWidth: "52px", maxWidth: "55px" }}
            inputProps={{
              min: "1",
              max: "20",
              style: { textAlign: "center" },
            }}
          />
          <Button
            onClick={() => increaseCount("cart", item.id)}
            sx={{ padding: 0 }}
          >
            +
          </Button>
        </div>
      </Grid>
      <Grid item xs={2} lg={1} sx={{ textAlign: "right" }}>
        <Typography fontWeight="bold">
          $ {item.price * item.count}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => removeItem("cart", item.id)}
        >
          <DeleteIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default CartItem;

import React from "react";
import ReactStars from "react-stars";
import { IRating } from "./model";
import { Typography } from "@mui/material";

interface RatingProps {
  rating: IRating;
}

const Rating = ({ rating }: RatingProps) => {
  return (
    <div>
      <ReactStars
        count={5}
        value={rating?.rate}
        half={true}
        size={18}
        color2={"#ffd700"}
      />
      <Typography sx={{fontSize: '12px'}}>({rating?.count})</Typography>
    </div>
  );
};

export default Rating;

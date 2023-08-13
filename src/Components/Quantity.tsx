import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

interface IQuantityProps {
  step?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  setQuantity: (valueAsString: string, valueAsNumber: number) => void;
}

const Quantity = ({
  step = 1,
  defaultValue = 1,
  min = 1,
  max = 50,
  disabled = false,
  setQuantity,
}: IQuantityProps) => {
  const [quantity, setQuantityState] = useState(defaultValue);

  const handleIncrement = () => {
    if (quantity + step <= max) {
      const newQuantity = quantity + step;
      setQuantityState(newQuantity);
      setQuantity(newQuantity.toString(), newQuantity);
    }
  };

  const handleDecrement = () => {
    if (quantity - step >= min) {
      const newQuantity = quantity - step;
      setQuantityState(newQuantity);
      setQuantity(newQuantity.toString(), newQuantity);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <IconButton onClick={handleDecrement} disabled={disabled}>
        <RemoveIcon />
      </IconButton>
      <Typography sx={{color: 'black'}}>{quantity}</Typography>
      <IconButton onClick={handleIncrement} disabled={disabled}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default Quantity;

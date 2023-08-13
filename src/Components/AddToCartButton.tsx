import React, { useContext } from 'react';
import { IProduct } from './model';
import { AppContext } from '@/Context/AppContext';

interface IAddToCartButtonProps {
  product: IProduct;
  count?: number;
}

const AddToCartButton = ({ product, count }: IAddToCartButtonProps) => {
  const { addItem, removeItem, isAdded } = useContext(AppContext);

  return (
    <>
      {isAdded('cart', product.id) ? (
        <button onClick={() => removeItem('cart', product?.id)}>
          Remove from cart
        </button>
      ) : (
        <button onClick={() => addItem('cart', product, count)}>
          Add to cart
        </button>
      )}
    </>
  );
};

export default AddToCartButton;

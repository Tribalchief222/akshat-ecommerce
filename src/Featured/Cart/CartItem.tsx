import React, { useContext } from 'react';
import Link from 'next/link';
import { AppContext } from '@/Context/AppContext';
import { IItem } from '@/Components/model';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material';

interface CartItemProps {
  item: IItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { increaseCount, decreaseCount, removeItem } = useContext(AppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const updateCartItems = (quantity: number) => {
    // Implement the logic to update the cart item quantity
    if (quantity > item.count) {
      increaseCount('cart', item.id);
    } else if (quantity < item.count) {
      decreaseCount('cart', item.id);
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            {/* IMAGE */}
            <TableCell>
              <Image
                src={item?.mainImage}
                alt={item?.name}
                height={200}
                width={200}
                className="rounded-lg"
              />
            </TableCell>

            {/* NAME */}
            <TableCell>
              <Typography sx={{fontSize: isMobile ? '10px' : '20px'}}>{item?.name}</Typography>
            </TableCell>

            {/* QUANTITY */}
            <TableCell>
              <div className="flex items-center gap-1">
              <Typography sx={{fontSize: isMobile ? '10px' : '20px'}}>Quantity</Typography>
                <div className="flex items-center gap-4">
                  <button
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-blue-500 text-white"
                    onClick={() => updateCartItems(item.count - 1)}
                  >
                    -
                  </button>
                  <div className="px-4 py-1 border border-gray-300 rounded-md text-sm bg-gray-100">
                    {item.count}
                  </div>
                  <button
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-blue-500 text-white"
                    onClick={() => updateCartItems(item.count + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </TableCell>

            {/* DELETE ICON */}
            <TableCell>
              <DeleteIcon
                className="cursor-pointer text-gray-500 hover:text-gray-700 text-lg md:text-xl"
                onClick={() => removeItem('cart', item.id)}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartItem;

import React, { Dispatch, SetStateAction, useState } from "react";
import { CartType } from "../../types/global";
import { ProductType } from "../../types/global";

type Props = {
  data: ProductType;
  setOrderCart?: Dispatch<SetStateAction<any>>;
  setReservedCart?: Dispatch<SetStateAction<any>>;
  isStorageManagerView: boolean;
};

export const ProductCard: React.FC<Props> = ({ data, setOrderCart, setReservedCart, isStorageManagerView }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);

  const [availableQuantity] = useState(data.quantity - data.reservedQuantity);

  const handleReserveClick = () => {
    if (data && data.quantity !== 0) {
      const updatedQuantity = Math.min(quantity, availableQuantity);

      const newItem: CartType = {
        id: data.id,
        name: data.name,
        quantity: updatedQuantity,
      };

      setReservedCart &&
        setReservedCart((prevCart: CartType[]) => {
          const existingItemIndex = prevCart.findIndex((item) => item.id === data.id);
          if (existingItemIndex !== -1) {
            const updatedCart = [...prevCart];
            updatedCart[existingItemIndex].quantity = updatedQuantity;
            return updatedCart;
          } else {
            return [...prevCart, newItem];
          }
        });
    }
  };

  const handleOrderClick = () => {
    if (availableQuantity > 0 && data.id && data.name && data.brand) {
      const updatedQuantity = Math.min(quantity, availableQuantity);

      const newItem: CartType = {
        id: data.id,
        name: data.name,
        quantity: updatedQuantity,
      };

      setOrderCart &&
        setOrderCart((prevCart: CartType[]) => {
          const existingItemIndex = prevCart.findIndex((item) => item.id === data.id);
          if (existingItemIndex !== -1) {
            const updatedCart = [...prevCart];
            updatedCart[existingItemIndex].quantity = updatedQuantity;
            return updatedCart;
          } else {
            return [...prevCart, newItem];
          }
        });
    }
  };

  return (
    <>
      {data && (
        <div className="rounded-xl bg-maravilhas-white-100 shadow border flex flex-col justify-between">
          <div className="p-8 flex justify-center items-center">
            <img src={`${data?.image}`} alt="product image" className="max-h-80 " />
          </div>
          <div className="bg-maravilhas-black-100 w-full shadow p-6 rounded-b-xl text-maravilhas-white-100 ">
            <div className="flex flex-col">
              <span className="font-semibold uppercase">{data?.name}</span>
              <span className="font-normal text-sm mt-1">By {data?.brand}</span>
              {isStorageManagerView ? (
                <div className="flex flex-col mt-2">
                  <span> Stock : {data.quantity}</span>
                  <span> Reserved : {data.reservedQuantity}</span>
                </div>
              ) : (
                <span className="font-normal text-sm mt-1">{availableQuantity !== 0 ? `In Stock : ${availableQuantity}` : "No stock"}</span>
              )}
            </div>
            {isStorageManagerView ? (
              <></>
            ) : (
              <div className="flex justify-between mt-6 items-center w-full ">
                <input
                  type="number"
                  min="1"
                  max={availableQuantity !== 0 ? availableQuantity : 99}
                  value={quantity}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value);
                    const newMax = availableQuantity !== 0 ? availableQuantity : 99;
                    if (!isNaN(newValue) && newValue <= newMax) {
                      setQuantity(newValue);
                    }
                  }}
                  className="text-sm text-center px-3 py-2.5 text-maravilhas-black-100 rounded"
                />

                <div className="flex items-center text-sm">
                  <button
                    type="button"
                    className=" mr-3 bg-maravilhas-white-100 text-maravilhas-black-100 px-3 py-2.5 rounded hover:bg-opacity-90"
                    onClick={handleOrderClick}
                  >
                    <span>Order</span>
                  </button>
                  <button
                    type="button"
                    className={`${
                      availableQuantity === 0 ? "bg-opacity-60" : "bg-opacity-100 hover:bg-opacity-90"
                    } bg-maravilhas-white-100 text-maravilhas-black-100 px-3 py-2.5 rounded `}
                    onClick={handleReserveClick}
                    disabled={availableQuantity === 0 || availableQuantity < 0}
                  >
                    <span>Reserve</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

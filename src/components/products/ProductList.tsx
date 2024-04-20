import React, { Dispatch, SetStateAction } from "react";
import { ProductCard } from "./ProductCard";
import { ProductType } from "../../types/global";

type Props = {
  setOrderCart?: Dispatch<SetStateAction<any>>;
  setReservedCart?: Dispatch<SetStateAction<any>>;
  isStorageManagerView: boolean;
  data?: ProductType[];
};

export const ProductList: React.FC<Props> = ({ setOrderCart, setReservedCart, isStorageManagerView, data }: Props) => {
  return (
    <>
      {isStorageManagerView ? (
        <div className={`order-2 xl:order-1 col-span-6 lg:col-span-5 2xl:col-span-8`}>
          <div className={`grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-8 my-12 justify-center xl:justify-start`}>
            {data &&
              data.map((product: ProductType, index: number) => (
                <ProductCard
                  key={index}
                  data={product}
                  setOrderCart={setOrderCart}
                  setReservedCart={setReservedCart}
                  isStorageManagerView={isStorageManagerView}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className={`order-2 xl:order-1 col-span-6 lg:col-span-5 2xl:col-span-6`}>
          <div className={`grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 my-12 justify-center xl:justify-start`}>
            {data &&
              data.map((product: ProductType, index: number) => (
                <ProductCard
                  key={index}
                  data={product}
                  setOrderCart={setOrderCart}
                  setReservedCart={setReservedCart}
                  isStorageManagerView={isStorageManagerView}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

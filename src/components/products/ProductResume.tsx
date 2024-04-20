import React, { Dispatch, SetStateAction, useState } from "react";
import { FaCartPlus, FaTrash } from "react-icons/fa";
import { CartType, ProductType } from "../../types/global";
import { UserState, useUserStore } from "../../stores/useUserStore";
import api from "../../config/api";
import { useToast } from "../../hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type Props = {
  orderCart: CartType[];
  setOrderCart: Dispatch<SetStateAction<any>>;
  reservedCart: CartType[];
  setReservedCart: Dispatch<SetStateAction<any>>;
};

type FreeProducts = {
  name: string;
  quantity: number;
};

export const ProductResume: React.FC<Props> = ({ orderCart, setOrderCart, reservedCart, setReservedCart }: Props) => {
  const { token, id } = useUserStore((state: UserState) => ({ token: state.token, id: state.id }));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleToast } = useToast();
  const [isLoading, setIsLoading] = useState({
    order: false,
    reservation: false,
  });

  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [freeProducts, setFreeProducts] = useState<FreeProducts[]>([]);
  const [newProduct, setNewProduct] = useState<FreeProducts>({
    name: "",
    quantity: 0,
  });

  const handleOrderDelete = (index: number) => {
    const updatedOrderCart = [...orderCart];
    updatedOrderCart.splice(index, 1);
    setOrderCart(updatedOrderCart);
  };

  const handleReservedDelete = (index: number) => {
    const updatedReservedCart = [...reservedCart];
    updatedReservedCart.splice(index, 1);
    setReservedCart(updatedReservedCart);
  };

  const handleAddProduct = () => {
    setShowAddProductForm(true);
  };

  const handleAddProductSubmit = () => {
    if (newProduct.name.trim() === "" || newProduct.quantity <= 0) {
      handleToast({ type: "error", message: "Please fill all fields correctly.", visible: true });
      return;
    }
    const newProductAdded = {
      name: newProduct.name,
      quantity: newProduct.quantity,
    };
    setFreeProducts([...freeProducts, newProductAdded]);
    setNewProduct({
      name: "",
      quantity: 0,
    });
    handleToast({ type: "success", message: "Product added.", visible: true });
    setShowAddProductForm(false);
  };
  return (
    <div className="order-1 xl:order-2 col-span-6 xl:col-span-3 2xl:col-span-2 my-12 ">
      <div className="rounded-xl bg-maravilhas-white-100 text-maravilhas-black-100 shadow p-5 sticky overflow-y-auto">
        <div>
          <div className="flex items-center justify-between">
            <span>Reserved products</span>

            <button
              type="button"
              disabled={reservedCart.length === 0 || isLoading.reservation === true}
              className={`py-3 px-6 bg-maravilhas-black-100 text-maravilhas-white-100 text-sm rounded-lg ${
                reservedCart.length > 0 ? "bg-opacity-100" : "bg-opacity-15"
              } `}
              onClick={async () => {
                try {
                  setIsLoading({ ...isLoading, reservation: true });
                  const requestData = {
                    date: new Date(),
                    type: "RESERVATION",
                    userId: id,
                    products: reservedCart,
                  };

                  const response = await api.authorized(token).post("/create-request", requestData);
                  if (response.status === 200) {
                    handleToast({ type: "success", message: "Reservation created.", visible: true });
                    queryClient.invalidateQueries({ queryKey: ["getAllProductsData"] });
                    setReservedCart([]);
                    setIsLoading({ ...isLoading, reservation: false });
                    navigate("/requester/requests");
                  } else {
                    handleToast({ type: "error", message: "Reservation creation failed.", visible: true });
                    queryClient.invalidateQueries({ queryKey: ["getAllProductsData"] });
                    setIsLoading({ ...isLoading, reservation: false });
                  }
                } catch (error) {
                  handleToast({ type: "error", message: "Something wrong.", visible: true });
                  queryClient.invalidateQueries({ queryKey: ["getAllProductsData"] });
                  setIsLoading({ ...isLoading, reservation: false });

                  console.error(error);
                }
              }}
            >
              <span>Submit</span>
            </button>
          </div>
          <div className="content-[''] bg-maravilhas-black-100 w-full h-[1px] my-2.5" />
        </div>
        <div className="flex flex-col space-y-1">
          {reservedCart && reservedCart.length > 0 ? (
            reservedCart.map((product: CartType, index: number) => (
              <div key={index} className="border bg-maravilhas-black-100 text-maravilhas-white-100 rounded px-5 py-2.5 flex justify-between items-center">
                <span>
                  {product.name} x {product.quantity}
                </span>
                <button type="button" onClick={() => handleReservedDelete(index)}>
                  <FaTrash className="h-4 w-auto" />
                </button>
              </div>
            ))
          ) : (
            <div className="mt-4 text-sm">
              <span>No products added.</span>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-xl bg-maravilhas-white-100 text-maravilhas-black-100 shadow p-5 mt-12">
        <div>
          <div className="flex items-center justify-between">
            <span>Ordered products</span>
            <button
              type="button"
              disabled={orderCart.length === 0 || isLoading.order === true}
              className={`py-3 px-6 bg-maravilhas-black-100 text-maravilhas-white-100 text-sm rounded-lg ${
                orderCart.length > 0 ? "bg-opacity-100" : "bg-opacity-15"
              } `}
              onClick={async () => {
                try {
                  setIsLoading({ ...isLoading, order: true });

                  const requestData = {
                    date: new Date(),
                    type: "ORDER",
                    userId: id,
                    products: orderCart,
                    freeProducts: freeProducts,
                  };

                  const response = await api.authorized(token).post("/create-request", requestData);
                  if (response.status === 200) {
                    handleToast({ type: "success", message: "Order created.", visible: true });
                    queryClient.invalidateQueries({ queryKey: ["getAllProductsData"] });
                    setOrderCart([]);
                    setFreeProducts([]);
                    setIsLoading({ ...isLoading, order: false });

                    navigate("/requester/requests");
                  } else {
                    handleToast({ type: "error", message: "Order creation failed.", visible: true });
                    setIsLoading({ ...isLoading, order: false });
                    queryClient.invalidateQueries({ queryKey: ["getAllProductsData"] });
                  }
                } catch (error) {
                  handleToast({ type: "error", message: "Something wrong.", visible: true });
                  setIsLoading({ ...isLoading, order: false });
                  queryClient.invalidateQueries({ queryKey: ["getAllProductsData"] });
                  console.error(error);
                }
              }}
            >
              <span>Submit</span>
            </button>
          </div>

          <div className="content-[''] bg-maravilhas-black-100 w-full h-[1px] my-2.5" />
        </div>
        <div className="flex flex-col space-y-1">
          {orderCart && freeProducts && (orderCart.length > 0 || freeProducts.length > 0) ? (
            [...orderCart, ...freeProducts].map((product: FreeProducts | ProductType, index: number) => (
              <div key={index} className="border bg-maravilhas-black-100 text-maravilhas-white-100 rounded px-5 py-2.5 flex justify-between items-center">
                <span>
                  {product.name} {product.quantity > 1 && `x ${product.quantity}`}
                </span>
                <button type="button" onClick={() => handleOrderDelete(index)}>
                  <FaTrash className="h-4 w-auto" />
                </button>
              </div>
            ))
          ) : (
            <div className="my-4 text-sm">
              <span>No products added.</span>
            </div>
          )}
          <div className="w-full pt-5">
            {showAddProductForm ? (
              <div className="flex flex-col space-y-3 pt-3">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="px-3 py-2 border border-maravilhas-black-100 border-opacity-40 rounded-lg outline-none text-sm"
                />

                <input
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
                  className="px-3 py-2 border border-maravilhas-black-100 border-opacity-40 rounded-lg outline-none text-sm"
                />
                <button className="bg-maravilhas-black-100 text-maravilhas-white-100 rounded-lg px-4 py-3 text-sm" onClick={handleAddProductSubmit}>
                  Add Product
                </button>
              </div>
            ) : (
              <button
                className="border bg-maravilhas-black-100 text-maravilhas-white-100 rounded-lg shadow-lg px-5 py-3 flex justify-center items-center w-full space-x-4 uppercase font-semibold"
                onClick={handleAddProduct}
              >
                <span>Add</span>
                <FaCartPlus className="h-5 w-auto" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

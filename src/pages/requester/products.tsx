import { ProductList } from "../../components/products/ProductList";
import { HeaderPage } from "../../components/global/HeaderPage";
import { Layout } from "../../layouts/Layout";
import { ProductResume } from "../../components/products/ProductResume";
import { useState } from "react";
import { CartType, ProductType } from "../../types/global";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import api from "../../config/api";
import { UserState, useUserStore } from "../../stores/useUserStore";

type MyErrorType = Error;
type UseGetAllRequestsResult = UseQueryResult<ProductType[], MyErrorType>;

export const useGetAllProducts = (token: string): UseGetAllRequestsResult => {
  return useQuery({
    queryKey: ["getAllProductsData"],
    queryFn: async () => {
      try {
        const response = await api.authorized(token).get(`/product`);

        const data = await response.data;
        return data;
      } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch data");
      }
    },
  });
};

export default function Products() {
  const [orderCart, setOrderCart] = useState<CartType[]>([]);
  const [reservedCart, setReservedCart] = useState<CartType[]>([]);
  const { token } = useUserStore((state: UserState) => ({ token: state.token }));
  const { data: productData } = useGetAllProducts(token);

  return (
    <Layout>
      <div className="mt-24">
        <div className="container">
          <HeaderPage title="All Products" withFilters={false} />
          <div className="grid  xl:grid-cols-8 lg:gap-4 xl:gap-8">
            <ProductList data={productData} setOrderCart={setOrderCart} setReservedCart={setReservedCart} isStorageManagerView={false} />
            <ProductResume setOrderCart={setOrderCart} setReservedCart={setReservedCart} reservedCart={reservedCart} orderCart={orderCart} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

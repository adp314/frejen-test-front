import { ProductList } from "../../components/products/ProductList";
import { HeaderPage } from "../../components/global/HeaderPage";
import { Layout } from "../../layouts/Layout";
import { useGetAllProducts } from "../requester/products";
import { UserState, useUserStore } from "../../stores/useUserStore";

export default function StorageManagerProducts() {
  const { token } = useUserStore((state: UserState) => ({ token: state.token }));
  const { data: productData, isLoading, error } = useGetAllProducts(token);
  return (
    <Layout>
      <div className="mt-24">
        <div className="container">
          <HeaderPage title="All Products" withFilters={false} />
          <div className="grid xl:grid-cols-8 lg:gap-4 xl:gap-8">
            <ProductList data={productData} isStorageManagerView={true} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

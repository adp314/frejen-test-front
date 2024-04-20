import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Login from "./pages/login";
import { ToastContextProvider } from "./contexts/toast";
import Products from "./pages/requester/products";
import PrivateRoutes from "./utils/PrivateRoutes";
// Requester Routes
import Requests from "./pages/requester/requests";
import RequestDetails from "./pages/requester/request-details";
// Storage Manager Routes
import StorageManagerProducts from "./pages/storage-manager/sm-products";
import StorageManagerRequests from "./pages/storage-manager/sm-requests";
import StorageManagerRequestDetails from "./pages/storage-manager/sm-request-details";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/requester/*" element={<RequesterRoutes />} />
              <Route path="/storage-manager/*" element={<StorageManagerRoutes />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastContextProvider>
    </QueryClientProvider>
  );
}

const RequesterRoutes = () => (
  <Routes>
    <Route path="/products" element={<Products />} />
    <Route path="/requests" element={<Requests />} />
    <Route path="/requests/:id" element={<RequestDetails />} />
  </Routes>
);

const StorageManagerRoutes = () => (
  <Routes>
    <Route path="/products" element={<StorageManagerProducts />} />
    <Route path="/requests" element={<StorageManagerRequests />} />
    <Route path="/requests/:id" element={<StorageManagerRequestDetails />} />
  </Routes>
);

export default App;

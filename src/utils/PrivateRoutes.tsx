import { useUserStore } from "../stores/useUserStore";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { token, role } = useUserStore((state) => ({
    token: state.token,
    role: state.role,
  }));

  if (!token) {
    return <Navigate to="/" />;
  }

  const requesterRole = ["REQUESTER"];
  const storageManagerRole = ["STORAGE_MANAGER"];

  const isRequester = requesterRole.includes(role);
  const isStorageManager = storageManagerRole.includes(role);

  if (!isRequester && !isStorageManager) {
    return <Navigate to="/" />;
  }

  if (isStorageManager && window.location.pathname.startsWith("/requester")) {
    return <Navigate to="/storage-manager/products" />;
  } else if (isRequester && window.location.pathname.startsWith("/storage-manager")) {
    return <Navigate to="/requester/products" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;

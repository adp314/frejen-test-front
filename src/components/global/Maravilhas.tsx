import { LuLollipop } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";

export const Maravilhas = () => {
  const { role } = useUserStore((state) => ({
    role: state.role,
  }));

  return (
    <Link to={`${role === "REQUESTER" ? "/requester/products" : "/storage-manager/products"}`} className="flex items-center justify-center">
      <LuLollipop className="w-auto h-8 mx-2" />
      <h1 className="text-xl font-bold text-center uppercase hidden md:block ">Maravilhas, LDA.</h1>
    </Link>
  );
};

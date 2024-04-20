import { useUserStore } from "../../stores/useUserStore";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const User = () => {
  const { clear, accountNumber, role } = useUserStore((state) => ({
    clear: state.clear,
    accountNumber: state.accountNumber,
    role: state.role,
  }));

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-8">
      <button
        type="button"
        className="flex justify-center items-center font-medium text-maravilhas-black-100 border py-2 px-4 rounded-lg transition-all duration-200 border-maravilhas-black-100 hover:bg-maravilhas-black-100 hover:text-maravilhas-white-100"
        onClick={() => {
          if (role === "REQUESTER") {
            navigate("/requester/requests");
          } else if (role === "STORAGE_MANAGER") {
            navigate("/storage-manager/requests");
          }
        }}
      >
        <span>{accountNumber}</span>
        <FaRegUser className="h-4 w-auto ml-2 mb-0.5" />
      </button>
      <div className="content-[''] h-full w-[1px] rounded mx-3 bg-maravilhas-black-100" />
      <button
        className="text-lg text-maravilhas-black-100 underline-offset-4 text-opacity-80 font-medium hover:underline hover:text-opacity-100"
        onClick={() => {
          clear();
        }}
      >
        <span>Disconect</span>
      </button>
    </div>
  );
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { LuLollipop } from "react-icons/lu";
import { Input } from "../global/Input";
import { Button } from "../global/Button";
import { useUserStore } from "../../stores/useUserStore";
import { useToast } from "../../hooks/useToast";

export const Authentication: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { handleToast } = useToast();
  const { updateId, updateAccountNumber, updateToken, updateRole } = useUserStore((state) => ({
    updateId: state.updateId,
    updateToken: state.updateToken,
    updateAccountNumber: state.updateAccountNumber,
    updateRole: state.updateRole,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseJSON = await response.json();

      if (response.status === 200) {
        updateId(responseJSON.user.id);
        updateAccountNumber(responseJSON.user.accountNumber);
        updateToken(responseJSON.token);
        updateRole(responseJSON.user.role);
        if (responseJSON.user.role === "REQUESTER") {
          navigate("/requester/products");
        } else if (responseJSON.user.role === "STORAGE_MANAGER") {
          navigate("/storage-manager/products");
        }
        setIsLoading(false);
      } else {
        handleToast({ type: "error", message: "Account number or password wrong!", visible: true });
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      handleToast({ type: "error", message: "Account number or password wrong!", visible: true });
    }
  };

  return (
    <div className="bg-maravilhas-white-100 bg-opacity-80 py-10 px-16 lg:py-14 lg:px-28 rounded-3xl shadow-first w-max">
      <div className="flex items-center justify-center ">
        <LuLollipop className="w-auto h-9 lg:h-11 mr-6" />
        <h1 className="text-2xl md:text-3xl font-bold text-center uppercase lg:text-4xl text-neutral">Maravilhas, LDA.</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-full ">
        <div className="my-12 lg:my-16 w-full">
          <div className="w-full">
            <label htmlFor="accountNumber" className="ml-5">
              <span className=" text-maravilhas-black-100 text-lg lg:text-xl">Account number</span>
            </label>
            <Input type="text" inputName="accountNumber" register={register} placeholder="64236878" errors={errors} full className="mt-2 text-md lg:text-lg " />
          </div>

          <div className="w-full mt-4">
            <label htmlFor="password" className="ml-5">
              <span className=" text-maravilhas-black-100 text-lg lg:text-xl">Password</span>
            </label>
            <Input
              type="password"
              inputName="password"
              register={register}
              placeholder="SecurePassword123!"
              errors={errors}
              full
              className="mt-2 text-md lg:text-lg "
            />
          </div>
        </div>
        <Button
          type="submit"
          style="black"
          isRounded
          disabled={isLoading}
          className={`w-full shadow-second text-xl lg:text-2xl ${isLoading && "hover:bg-maravilhas-black-100 hover:text-maravilhas-white-100"}`}
        >
          {isLoading ? (
            <CgSpinnerTwoAlt className="animate-spin h-7 lg:h-8 w-auto" />
          ) : (
            <>
              <span>Login</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

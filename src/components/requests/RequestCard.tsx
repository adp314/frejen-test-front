import React from "react";
import { ProductType, RequestType } from "../../types/global";
import { Badge } from "../global/Badge";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import api from "../../config/api";
import { UserState, useUserStore } from "../../stores/useUserStore";
import { useToast } from "../../hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  data: RequestType;
  withDetails: boolean;
  isStorageManager: boolean;
};

export const RequestCard: React.FC<Props> = ({ data, withDetails, isStorageManager }: Props) => {
  const { token, id } = useUserStore((state: UserState) => ({ token: state.token, id: state.id }));
  const queryClient = useQueryClient();
  const allProducts: ProductType[] =
    data.type === "RESERVATION" ? data.productReserveds : data.productOrdereds.concat(JSON.parse(data.freeProducts) as ProductType[]);
  const { handleToast } = useToast();

  const handleValidateRequest = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await api.authorized(token).put(`/request-validation`, { requestId: data.id, userId: id });
      if (response.status === 200) {
        handleToast({ type: "success", message: "Request validated.", visible: true });
        queryClient.invalidateQueries({ queryKey: ["getAllRequestsData"] });
      } else {
        handleToast({ type: "error", message: "Request failed.", visible: true });
      }
    } catch (error) {
      console.error(error);
      handleToast({ type: "error", message: "Something wrong.", visible: true });
    }
  };

  const handleCancelRequest = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await api.authorized(token).put(`/cancel-request`, { requestId: data.id, userId: id });
      if (response.status === 200) {
        handleToast({ type: "success", message: "Request validated.", visible: true });
        queryClient.invalidateQueries({ queryKey: ["getAllRequestsData"] });
      } else {
        handleToast({ type: "error", message: "Request failed.", visible: true });
      }
    } catch (error) {
      console.error(error);
      handleToast({ type: "error", message: "Something wrong!", visible: true });
    }
  };

  return (
    <>
      {data ? (
        <div className="py-6 lg:py-8 px-6 lg:px-10 text-maravilhas-black-100 bg-maravilhas-white-100">
          <div className="flex justify-between items-start ">
            <div className="flex flex-col space-y-1">
              <span className="font-medium">REQ N° : {data.id}</span>
              <span>Type: {data.type}</span>
              <span>
                Creation:{" "}
                {new Date(data.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
              <span>
                Updated:{" "}
                {new Date(data.updatedAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </div>
            {isStorageManager ? (
              <div className="flex flex-col items-center lg:items-end space-y-4 text-maravilhas-black-100">
                <Badge status={data.status} />
                <span>Code: {data.code}</span>
                {data.status === "VALIDATED" || data.status === "CANCELED" ? (
                  <></>
                ) : (
                  <div className="flex flex-col lg:flex-row items-end  lg:items-center space-y-2 lg:space-y-0 lg:space-x-5 ">
                    <button
                      type="button"
                      className="bg-green-400 bg-opacity-40 px-4 py-2 w-full h-max text-maravilhas-black-100 text-sm rounded-xl shadow transition-all duration-200 hover:bg-opacity-60 uppercase font-medium"
                      onClick={handleValidateRequest}
                    >
                      <span>Validate</span>
                    </button>

                    <button
                      type="button"
                      className="bg-gray-400 bg-opacity-40 px-4 py-2 w-full h-max text-maravilhas-black-100 text-sm rounded-lg shadow transition-all duration-200 hover:bg-opacity-60 uppercase font-medium"
                      onClick={handleCancelRequest}
                    >
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <Badge status={data.status} />
                {withDetails && (data.type === "RESERVATION" || data.status === "VALIDATED") && <span>Code: {data.code}</span>}
              </div>
            )}
          </div>
          {withDetails && (
            <>
              <div className="content-[''] bg-maravilhas-black-100 bg-opacity-5 rounded w-full h-[1px] my-6" />
              <div>
                <span className="font-medium uppercase text-sm">Products :</span>
                {allProducts &&
                  allProducts.map((product: ProductType, index: number) => (
                    <div key={index} className="mt-2">
                      <span>
                        - {product.name} {data.type === "RESERVATION" ? `x ${product.reservedQuantity}` : product.quantity > 1 && `x ${product.quantity}`}
                      </span>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center my-8 lg:my-16">
          <CgSpinnerTwoAlt className="animate-spin h-8 lg:h-12 w-auto" />
        </div>
      )}
    </>
  );
};

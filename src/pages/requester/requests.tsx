import { Layout } from "../../layouts/Layout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserStore, UserState } from "../../stores/useUserStore";
import api from "../../config/api";
import { RequestCard } from "../../components/requests/RequestCard";
import { HeaderPage } from "../../components/global/HeaderPage";
import { RequestType } from "../../types/global";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

type MyErrorType = Error;
type UseGetAllRequestsResult = UseQueryResult<RequestType[], MyErrorType>;

const useGetAllRequests = (token: string, id: string): UseGetAllRequestsResult => {
  return useQuery({
    queryKey: ["getAllRequestsData"],
    queryFn: async () => {
      try {
        const response = await api.authorized(token).get(`/all-requests/${id}`);

        const data = await response.data;
        return data;
      } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch data");
      }
    },
  });
};

export default function Requests() {
  const { token, id } = useUserStore((state: UserState) => ({ token: state.token, id: state.id }));
  const { data: requestData } = useGetAllRequests(token, id);
  const [isToggleChecked, setIsToggleChecked] = useState<boolean>(false);
  const [isLatestClicked, setIsLatestClicked] = useState<boolean>(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const statusOptions = ["PENDING", "CANCELED", "VALIDATED"];

  useEffect(() => {
    const checkRequestTime = async () => {
      try {
        if (requestData) {
          for (let i = 0; i < requestData.length; i++) {
            const request = requestData[i];
            if (request.status === "PENDING") {
              const requestDate = new Date(request.createdAt);
              const currentTime = new Date();
              const timeDifference = currentTime.getTime() - requestDate.getTime();
              const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
              if (hoursDifference >= 1) {
                await api.authorized(token).post("/cancel-request", { requestId: request.id, userId: id });
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    checkRequestTime();
  }, [requestData]);

  const handleToggle = () => {
    setIsToggleChecked((prevChecked) => !prevChecked);
  };

  const handleLatest = () => {
    setIsLatestClicked((prevChecked) => !prevChecked);
  };

  const handleStatus = (status: string) => {
    setSelectedStatus(status === selectedStatus ? "" : status);
  };

  const compareRequestsById = (a: RequestType, b: RequestType) => {
    return isLatestClicked ? b.id - a.id : 0;
  };
  const filterByStatus = (request: RequestType) => {
    if (!selectedStatus) return true;
    return request.status === selectedStatus;
  };
  const filterByReservation = (request: RequestType) => {
    return isToggleChecked ? request.type === "RESERVATION" : true;
  };

  const filteredAndSortedRequests = requestData && requestData.filter(filterByStatus).filter(filterByReservation).sort(compareRequestsById);
  
  return (
    <Layout>
      <div className="my-24">
        <div className="container">
          <HeaderPage
            title="All Products"
            isToggleChecked={isToggleChecked}
            handleToggle={handleToggle}
            isLatestClicked={isLatestClicked}
            handleLatest={handleLatest}
            selectedStatus={selectedStatus}
            handleStatus={handleStatus}
            statusOptions={statusOptions}
            withFilters
          />
          <div className="flex flex-col rounded-xl bg-maravilhas-white-100 mt-14">
            {filteredAndSortedRequests && filteredAndSortedRequests.length > 0 ? (
              <>
                {filteredAndSortedRequests.map((item: RequestType, index: number) => (
                  <Link to={`/requester/requests/${item && item.id}`} key={index} className="bg-maravilhas-black-100 bg-opacity-0 hover:bg-opacity-5 ">
                    <RequestCard data={item && item} withDetails={false} isStorageManager={false} />
                    {index !== filteredAndSortedRequests.length - 1 && (
                      <div className="content-[''] bg-maravilhas-black-100 bg-opacity-20 rounded w-full h-[1px]" />
                    )}
                  </Link>
                ))}
              </>
            ) : (
              <div className="p-10 text-maravilhas-black-100 text-lg">
                <span>No requests.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

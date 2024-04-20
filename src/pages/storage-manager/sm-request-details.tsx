import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { ProductType, RequestType } from "../../types/global";
import api from "../../config/api";
import { UserState, useUserStore } from "../../stores/useUserStore";
import { Badge } from "../../components/global/Badge";
import { Layout } from "../../layouts/Layout";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { RequestCard } from "../../components/requests/RequestCard";

export default function StorageManagerRequestDetails() {
  const params = useParams();
  const [requestData, setRequestData] = useState<RequestType>();
  const { token } = useUserStore((state: UserState) => ({ token: state.token }));

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (params && params.id) {
          const response = await api.authorized(token).get(`/request/${params.id}`);
          setRequestData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRequests();
  }, [params]);

  return (
    <Layout>
      <div className="mt-24" style={{ height: `calc(100vh - 14.5rem)` }}>
        <div className="container">
          <Link to="/storage-manager/requests" className="mx-2 font-semibold flex items-center uppercase text-sm">
            <FaAngleLeft className="h-5 w-auto mr-1.5" />
            <span>Back to requests</span>
          </Link>
          {requestData && (
            <div className=" py-6 px-8 rounded-lg bg-maravilhas-white-100 shadow-lg mt-6">
              <RequestCard data={requestData} withDetails isStorageManager={true} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

import React from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

type Props = {
  title: string;
  handleToggle?: () => void;
  isToggleChecked?: boolean;
  handleLatest?: () => void;
  isLatestClicked?: boolean;
  handleStatus?: (status: string) => void;
  selectedStatus?: string;
  statusOptions?: string[];
  withFilters: boolean;
};

export const HeaderPage: React.FC<Props> = ({
  title,
  isToggleChecked,
  handleToggle,
  handleLatest,
  isLatestClicked,
  withFilters,
  selectedStatus,
  handleStatus,
  statusOptions,
}: Props) => {
  const handleClickStatus = (status: string) => {
    if (handleStatus) {
      handleStatus(status === selectedStatus ? "" : status);
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:justify-between w-full lg:items-center text-sm ml-1 font-medium uppercase text-maravilhas-black-100 px-1">
        <span className="font-semibold">{title}</span>
        {withFilters && (
          <div className="flex items-center justify-between lg:space-x-6 lg:justify-normal mt-4 lg:mt-0">
            <details className="dropdown">
              <summary className="m-1 btn bg-maravilhas-black-100 text-maravilhas-white-100 hover:text-maravilhas-black-100">Status</summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 mt-1">
                {statusOptions &&
                  statusOptions.map((status) => (
                    <li key={status} onClick={() => handleClickStatus(status)} className="">
                      <a
                        className={`flex items-center space-x-1 ${
                          status === selectedStatus ? "bg-maravilhas-black-100 text-maravilhas-white-100 hover:bg-maravilhas-black-100" : ""
                        }`}
                      >
                        <span>{status}</span>
                      </a>
                    </li>
                  ))}
              </ul>
            </details>
            <button className="mr-8 text-maravilhas-black-100 text-sm uppercase flex items-center space-x-1" onClick={handleLatest}>
              <span>Latest</span>
              {isLatestClicked ? <FaCaretUp className="h-6 w-auto" /> : <FaCaretDown className="h-6 w-auto" />}
            </button>

            <div className="flex items-center">
              <span className="mr-2 text-maravilhas-black-100 text-sm">Reservation only</span>
              <input type="checkbox" className="toggle" checked={isToggleChecked} onChange={handleToggle} />
            </div>
          </div>
        )}
      </div>
      <div className="content-[''] bg-maravilhas-black-100 bg-opacity-15 rounded w-full h-0.5 mt-4" />
    </div>
  );
};

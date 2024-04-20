import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-maravilhas-black-100 text-maravilhas-white-100 w-full mt-12">
      <div className="container">
        <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row justify-center items-center py-6">
          <div className="">
            <span className="text-sm uppercase">André Da Costa Pinto</span>
          </div>
          <div className="content-[' '] bg-maravilhas-white-100 bg-opacity-30 h-0.5 mx-6 rounded w-28"></div>
          <div className=" text-sm uppercase ">
            <span>andredp314@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

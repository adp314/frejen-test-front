import { Maravilhas } from "../components/global/Maravilhas";
import { User } from "../components/header/User";

export const Header = () => {
  return (
    <header className="bg-maravilhas-white-100 text-maravilhas-black-100 shadow w-full">
      <div className="container">
        <div className="flex justify-between items-center py-4 w-full ">
          <Maravilhas />
          <User />
        </div>
      </div>
    </header>
  );
};

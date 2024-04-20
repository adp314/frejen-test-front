import { NavLink } from "react-router-dom";

type Props = {
  to?: string;
  target?: string;
  type?: "submit" | "button" | "reset";
  onClick?: VoidFunction;
  children: React.ReactNode;
  style?: "black" | "outlined" | "white";
  className?: string;
  disabled?: boolean;
  isRounded?: boolean;
};

export const Button: React.FC<Props> = ({ to, target = "_self", type, onClick, children, style, className, disabled, isRounded = false }: Props) => {
  const btn = "flex justify-center items-center font-normal  text-center px-6 py-4 border border-transparent";
  const black =
    "bg-maravilhas-black-100 text-maravilhas-white-100 hover:bg-transparent hover:border hover:border-maravilhas-black-100 hover:text-maravilhas-black-100 transition-all hover:duration-200";
  const white =
    "bg-maravilhas-white-100 text-maravilhas-black-100 hover:bg-transparent hover:border hover:border-maravilhas-white-100 hover:text-maravilhas-white-100 transition-all hover:duration-200";
  const outlined = "bg-transparent border border-maravilhas-black-100";
  const rounded = "rounded-full";

  return (
    <>
      {to ? (
        <NavLink
          className={`${btn} ${style === "black" && black} ${style === "white" && white} ${style === "outlined" && outlined} ${isRounded ? rounded : ""}${
            className ? " " + className : ""
          }`}
          to={to}
          target={target}
          rel={target === "_blank" ? "noopener" : undefined}
        >
          {children}
        </NavLink>
      ) : (
        <button
          className={`${btn} ${style === "black" && black} ${style === "white" && white} ${style === "outlined" && outlined} ${isRounded ? rounded : ""}${
            className ? " " + className : ""
          }`}
          type={type ? type : "button"}
          onClick={onClick}
          disabled={disabled !== undefined ? disabled : false}
        >
          {children}
        </button>
      )}
    </>
  );
};

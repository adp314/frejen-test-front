import { UseFormRegister, FieldErrors } from "react-hook-form";

type Props = {
  label?: string;
  type: "email" | "password" | "number" | "text";
  inputName: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  className?: string;
  full?: boolean;
};

export const Input: React.FC<Props> = ({ type, label, full, register, inputName, placeholder, errors, className }: Props) => {
  const errorMessage = errors[inputName]?.message;

  return (
    <div className={`flex flex-col ${full ? "w-full" : "w-max"} `}>
      <label htmlFor={`${type}`} className="ml-1 text-sm font-semibold ">
        <span>{label}</span>
      </label>
      <input
        {...register(inputName)}
        id={`${type}`}
        type={`${type}`}
        className={
          ` rounded-full placeholder-neutral-400 border-maravilhas-black-100 outline-none border-2 border-opacity-30 py-3.5 px-6 text-sm bg-maravilhas-white-100` +
          ` ` +
          `${className}`
        }
        placeholder={placeholder ? `${placeholder}` : `${type}`}
      />
      {errors[inputName] && <span className="message error">{(errorMessage as string) || ""}</span>}
    </div>
  );
};

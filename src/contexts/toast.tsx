import ToastAlert from "../components/global/ToastAlert";
import { ToastType } from "../types/global";
import { ReactNode, createContext, useState } from "react";

const initialState = {
  type: undefined,
  message: "",
  visible: false,
  hide: () => {},
};

export const ToastContext = createContext<{
  toast: ToastType;
  handleToast: (state: ToastType) => void;
  hideToast: () => void;
}>({
  toast: initialState,
  handleToast: () => {},
  hideToast: () => {},
});

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastType>(initialState);

  const hideToast = () => {
    setToast((prevToast) => ({
      ...prevToast,
      visible: false,
    }));
  };

  const handleToast = (state: ToastType): void => {
    setToast(state);
    setTimeout(() => {
      hideToast();
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ toast, handleToast, hideToast }}>
      {children}
      {toast?.visible && <ToastAlert type={toast.type} message={toast.message} visible={toast.visible} />}
    </ToastContext.Provider>
  );
};

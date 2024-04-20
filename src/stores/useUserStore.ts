import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserState {
  id: string;
  accountNumber: number;
  role: string;
  token: string;
}

type UserAction = {
  updateId: (id: UserState["id"]) => void;
  updateAccountNumber: (accountNumber: UserState["accountNumber"]) => void;
  updateRole: (role: UserState["role"]) => void;
  updateToken: (token: UserState["token"]) => void;
  clear: () => void;
};

const useUserStore = create(
  persist<UserState & UserAction>(
    (set) => ({
      id: "",
      accountNumber: 0,
      token: "",
      role: "",
      updateId: (id) => set({ id: id }),
      updateAccountNumber: (accountNumber) => set({ accountNumber: accountNumber }),
      updateRole: (role) => set({ role: role }),
      updateToken: (token) => set({ token: token }),
      clear: () =>
        set(() => ({
          id: "",
          accountNumber: 0,
          token: "",
          role: "",
        })),
    }),
    { name: "UserDataStored", storage: createJSONStorage(() => localStorage) }
  )
);

export { useUserStore };

import { ReactNode, createContext, useContext, useState } from "react";

interface Store {
  userName: string;
  setUserName: (name: string) => void;
}

const StoreContext = createContext<Store>({} as Store);

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState("user" + Math.random() * 1000);

  return (
    <StoreContext.Provider value={{ userName, setUserName }}>
      {children}
    </StoreContext.Provider>
  );
};

"use client";
import { createContext, useContext, useState } from "react";

export interface IGlobalContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}
export const GlobalContext = createContext<IGlobalContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export function GlobalContextProvider({ children }: { children: any }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function setIsAuthenticatedHandler(_isAuthenticated: boolean) {
    setIsAuthenticated(_isAuthenticated);
  }

  const globalContext = {
    isAuthenticated,
    setIsAuthenticated: setIsAuthenticatedHandler,
  };

  return (
    <GlobalContext.Provider value={globalContext}>{}</GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);

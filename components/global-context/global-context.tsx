"use client"
import { createContext, useContext, useState } from "react";

export enum SelectedTab {
  home = "home",
  history = "history",
  login = "login",
}
export interface IGlobalContext {
  isAuthenticated: boolean;
  selectedTab: SelectedTab;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setSelectedTab: (selectedTab: SelectedTab) => void;
}
export const GlobalContext = createContext<IGlobalContext>({
  isAuthenticated: false,
  selectedTab: SelectedTab.home,
  setIsAuthenticated: () => {},
  setSelectedTab: () => {},
});

export function GlobalContextProvider({ children }: { children: any }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedTab, setSelectedTab] = useState(SelectedTab.home);

  function setIsAuthenticatedHandler(_isAuthenticated: boolean) {
    setIsAuthenticated(_isAuthenticated);
  }

  function setSelectedTabHandler(_selectedTab: SelectedTab) {
    setSelectedTab(_selectedTab);
  }

  const globalContext = {
    isAuthenticated,
    selectedTab,
    setIsAuthenticated: setIsAuthenticatedHandler,
    setSelectedTab: setSelectedTabHandler,
  };

  return (
    <GlobalContext.Provider value={globalContext}>{}</GlobalContext.Provider>
  );

}

export const useGlobalContext = () => useContext(GlobalContext);


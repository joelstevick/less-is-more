// contexts/GlobalContext.js
import { createContext, useState } from "react";

export enum SelectedTab {
  home = 'home',
  history = 'history',
  login = 'login'
}
export interface IGlobalContext {
  isAuthenticated: boolean;
  selectedTab: SelectedTab;
}
const GlobalContext = createContext({
  isAuthenticated: false,
  selectedTab: "home",
});

function GlobalContextProvider({children}: {children: any}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedTab, setSelectedTab] = useState(SelectedTab.home)

  const globalContext = {
    isAuthenticated,
    selectedTab
  }

  return (<GlobalContext.Provider value={globalContext}>{}</GlobalContext.Provider>)
}
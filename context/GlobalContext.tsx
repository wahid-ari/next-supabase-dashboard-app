'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type GlobalContextType = {
  showNav: boolean;
  setShowNav: Dispatch<SetStateAction<boolean>>;
};

export const GlobalContext = createContext<GlobalContextType>({
  showNav: false,
  setShowNav: () => {},
});

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [showNav, setShowNav] = useState(false);

  return <GlobalContext.Provider value={{ showNav, setShowNav }}>{children}</GlobalContext.Provider>;
}

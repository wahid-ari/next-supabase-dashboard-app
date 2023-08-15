'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { ThemeProvider } from 'next-themes';

type GlobalContextType = {
  showNav: boolean;
  setShowNav: Dispatch<SetStateAction<boolean>>;
};

export const GlobalContext = createContext<GlobalContextType>({
  showNav: false,
  setShowNav: () => {},
});

export function GlobalProvider({ children, ...props }: { children: ReactNode }) {
  const [showNav, setShowNav] = useState(false);

  return (
    <GlobalContext.Provider value={{ showNav, setShowNav }}>
      <ThemeProvider attribute='class' storageKey='theme' enableSystem={false} defaultTheme='light' {...props}>
        {children}
      </ThemeProvider>
    </GlobalContext.Provider>
  );
}

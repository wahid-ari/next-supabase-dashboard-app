'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
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

export function useShowNav() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useCounter must be used within a GlobalProvider');
  }
  return context;
}

'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getSession, SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

type GlobalContextType = {
  showNav: boolean;
  setShowNav: Dispatch<SetStateAction<boolean>>;
  token: string;
};

export const GlobalContext = createContext<GlobalContextType>({
  showNav: false,
  setShowNav: () => {},
  token: null,
});

export function GlobalProvider({ children, ...props }: { children: ReactNode }) {
  const [showNav, setShowNav] = useState(false);
  const [token, setToken] = useState(null);
  async function getSessionToken() {
    const session: any = await getSession();
    if (session) setToken(session?.session?.token);
  }

  useEffect(() => {
    getSessionToken();
  }, []);

  // can be set up here, or in page file like in pages/data.js
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // console.log('Axios Header Auth SET: ', token);
  } else {
    axios.defaults.headers.common['Authorization'] = '';
    // console.log('Axios Header Auth UNSET: ', token);
  }

  return (
    <GlobalContext.Provider value={{ showNav, setShowNav, token }}>
      <ThemeProvider attribute='class' storageKey='theme' enableSystem={false} defaultTheme='light' {...props}>
        <SessionProvider>{children}</SessionProvider>
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

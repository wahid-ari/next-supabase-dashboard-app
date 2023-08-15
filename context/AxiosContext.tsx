'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';

// import nookies from 'nookies';
// import axios from 'axios';
// import { getSession } from 'next-auth/react';

type AxiosContextType = {
  token: null;
};

export const AxiosContext = createContext<AxiosContextType>({ token: null });

export const AxiosProvider = ({ children }: { children: ReactNode }) => {
  // const token = nookies.get(null, 'token');
  const [token, setToken] = useState(null);
  // async function getSessionToken() {
  //   const session: any = await getSession();
  //   if (session) setToken(session?.token);
  // }

  // useEffect(() => {
  //   getSessionToken();
  // }, []);

  // // can be set up here, or in page file like in pages/data.js
  // if (token) {
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //   // console.log("Axios Header Auth SET: ", token.token)
  // } else {
  //   axios.defaults.headers.common['Authorization'] = '';
  //   // console.log("Axios Header Auth UNSET: ", token.token)
  // }

  return <AxiosContext.Provider value={{ token }}>{children}</AxiosContext.Provider>;
};

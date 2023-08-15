'use client';

import { useContext } from 'react';

import { GlobalContext } from '@/context/GlobalContext';
import FrontLayout from '@/components/front/FrontLayout';

export default function Home() {
  const { showNav, setShowNav } = useContext(GlobalContext);
  return (
    <FrontLayout>
      {showNav ? 'true' : 'false'} <button onClick={() => setShowNav(!showNav)}>theme</button>
    </FrontLayout>
  );
}

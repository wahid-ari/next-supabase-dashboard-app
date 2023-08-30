'use client';

import ErrorPage from '@/components/layout/ErrorPage';

// Error components must be Client Components
// Try to make error when fetching data in activuty page to activate this error
// import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error);
  // }, [error]);

  return <ErrorPage status='500' title='Server Error Activity Page' message={error.message} reset={reset} />;
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster as ReactHotToast } from 'react-hot-toast';

import { GlobalProvider } from '@/context/GlobalContext';

import '@/styles/globals.css';
import '@/styles/prism.css';

import { Toaster } from '@/components/ui/Toaster';

const inter = Inter({ subsets: ['latin'] });

const siteConfig = {
  url: process.env.NEXT_PUBLIC_API_ROUTE,
  title: 'Next.js App Router',
  description: 'Next.js App Router Description',
  ogImage: '/og.png',
  author: 'Wahid Ari',
  authorUsername: 'wahidari',
  authorWeb: 'https://wahidari.vercel.app',
  twitterUsername: '@wahiidari',
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  authors: [
    {
      name: siteConfig.authorUsername,
      url: siteConfig.authorWeb,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}${siteConfig.ogImage}`],
    creator: siteConfig.twitterUsername,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-icon-180x180.png',
  },
  manifest: `${siteConfig.url}/manifest.json`,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <GlobalProvider>
          <Toaster />
          <ReactHotToast
            gutter={4}
            toastOptions={{
              style: {
                maxWidth: 380,
                padding: '2px 4px',
              },
            }}
          />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}

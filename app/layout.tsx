import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster as ReactHotToast } from 'react-hot-toast';

import { GlobalProvider } from '@/context/GlobalContext';

import '@/styles/globals.css';
import '@/styles/prism.css';

import { siteConfig } from '@/config/site';

import { Toaster as SonnerToaster } from '@/components/ui/Sonner';
import { Toaster } from '@/components/ui/Toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  metadataBase: new URL(siteConfig.url),
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
    siteName: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/${siteConfig.ogImage}`,
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
    images: [`${siteConfig.url}/${siteConfig.ogImage}`],
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
          <SonnerToaster
            closeButton={false}
            visibleToasts={5}
            offset={'16px'}
            gap={10}
            richColors
            position='top-right'
          />
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

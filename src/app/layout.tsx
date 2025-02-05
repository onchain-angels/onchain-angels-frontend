import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';

import './global.css';
import '@coinbase/onchainkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';

const OnchainProviders = dynamic(
  () => import('src/components/OnchainProviders'),
  {
    ssr: false,
  },
);

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'Onchain Angels',
  description: 'Onchain Angels Platform',
  openGraph: {
    title: 'Onchain Angels',
    description: 'AI-powered financial coach that helps traders make smarter decisions by responding to on-chain actions with behavioral insights. Like an "angel on your shoulder", it provides timely nudges to keep you aligned with your financial goals.',
    images: [`${NEXT_PUBLIC_URL}/logo.png`],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
    ],
  },
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center">
        <OnchainProviders>{children}</OnchainProviders>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

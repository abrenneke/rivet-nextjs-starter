import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { RecoilRoot } from 'recoil';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rivet Simple Chatbot',
  description:
    'A simple chatbot interface that uses Rivet as the backend for running LLM calls.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body
        className={inter.className}
        style={{
          height: '100%',
        }}
      >
        {children}
      </body>
    </html>
  );
}

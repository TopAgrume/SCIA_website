'use client';

import NavigationBar from '@/components/NavigationBar';
import './globals.css';
// eslint-disable-next-line camelcase
import { JetBrains_Mono } from 'next/font/google';
import QueryProvider from '@/providers/QueryProvider';
import { DarkModeProvider } from '@/providers/DarkModeProvider';

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${jetbrainsMono.className} antialiased bg-gray-50 dark:bg-gray-800`}
      >
        <script>0</script>
        <DarkModeProvider>
          <QueryProvider>
            <NavigationBar />
            {children}
          </QueryProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}

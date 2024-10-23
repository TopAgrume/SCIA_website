import NavigationBar from '@/components/NavigationBar';
import './globals.css';
// eslint-disable-next-line camelcase
import { JetBrains_Mono } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${jetbrainsMono.className} antialiased bg-gray-200`}>
        <script>0</script>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}

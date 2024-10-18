import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import ClientLayout from "./ClientLayout";

const jetbrains_mono = JetBrains_Mono({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={`${jetbrains_mono.className} antialiased bg-primary`}>
      <ClientLayout>{children}</ClientLayout>
      <script>0</script>
      </body>
      </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yasir Alrawi",
  description: "Your next big idea starts here",
  icons: {
    icon: '/images/alrawiikon.png', // public klasöründeki yol
    shortcut: '/images/alrawiikon.png',
    apple: '/images/alrawiikon.png', // Opsiyonel: Apple cihazlar için
  },
};

export default function RootLayout({
  children,
    modal,
}: Readonly<{
  children: React.ReactNode;
    modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        {modal}
        </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { useRouter } from "next/router";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Demographfy-AI",
  description:
    "A website for forecasting, statistics, and data analysis of demographic processes in the Republic of Kazakhstan using Gemini AI.",
};
export default function RootLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  const { locale } = useRouter();

  return (
    <html lang={locale as string} suppressHydrationWarning={true}>
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

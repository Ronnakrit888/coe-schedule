import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { morKhor } from "@/shared/assets/fonts";
import { ReduxProvider } from "@/shared/providers";
import dynamic from "next/dynamic";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "CoE Schedule",
  description: "Generated by create next app",
};

const Navbar = dynamic(
  () => import("../shared/components/navbar.component")
)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${morKhor.variable}`}
      >
        <ReduxProvider>
          <Navbar locale="th"/>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}

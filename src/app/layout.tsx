import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { morKhor } from "@/shared/assets/fonts";
import { ReduxProvider } from "@/shared/providers";
import dynamic from "next/dynamic";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

// const Navbar = dynamic(
//   () => import("../shared/components/navbar.component")
// )

const CourseBox = dynamic(
  () => import("../shared/components/CourseBox.component")
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${morKhor.variable}`}
      >
        <ReduxProvider>
          
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}

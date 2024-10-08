"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient()

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleOAuthProvider clientId="611174461284-a5h5vv753m7o9eq0ri5c8hekkgeeo6cm.apps.googleusercontent.com">
          <QueryClientProvider client={queryClient}>
            {children}
             <ReactQueryDevtools />
          </QueryClientProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
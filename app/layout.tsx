import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'

import "./globals.css";
import { QueryProviders } from "@/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Banking Made Easy",
  description: "Manage your finances with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main>
            <QueryProviders>
              {children}
            </QueryProviders>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}

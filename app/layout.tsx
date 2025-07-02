"use client";

import { ReactNode } from "react";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./components/CartContext";  // importă corect în funcție de structura ta

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

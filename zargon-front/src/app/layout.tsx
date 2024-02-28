import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zargon's Domain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="flex flex-1 justify-between p-2">
          <p>Zargon's Domain</p>
          <Link href="/console" className="p-2 rounded bg-sand">
            Login
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}

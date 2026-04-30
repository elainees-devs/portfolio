import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio CMS",
  description: "Admin dashboard for portfolio management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {/* GLOBAL TOAST SYSTEM */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#111",
              color: "#fff",
              border: "1px solid #333",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#000",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#000",
              },
            },
          }}
        />

        {children}
      </body>
    </html>
  );
}
import { Footer } from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Navbar from "@/components/Navbar";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fashion Forward",
  description:
    "Fashion Forward is a cloth store that sells the latest fashion trends for men, women, and children",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ModalProvider />
          <Toaster />
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import AppContextProvider from "@/Context/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-commerce App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <AppContextProvider>
            <Navbar />
            {children}
            <Footer />
          </AppContextProvider>
        </body>
      </html>
  );
}

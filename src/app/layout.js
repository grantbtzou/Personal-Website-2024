import { Roboto_Condensed } from "next/font/google"
import "./globals.css";

import Header from "./components/header";

const rob_condensed = Roboto_Condensed({ subsets: ["latin"] });

export const metadata = {
  title: "Grant Zou",
  description: "Grant Zou's website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"flex flex-col h-screen " + rob_condensed.className}>
      <div className="mt-16 md:mr-16"><Header /></div>
        {children}
      </body>
    </html>
  );
}

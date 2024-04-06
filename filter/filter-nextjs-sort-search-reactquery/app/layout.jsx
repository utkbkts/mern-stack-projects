import { Inter } from "next/font/google";
import "./globals.css";
import QueryConnect from "@/connect/reactQuery/QueryConnect";
import Context from "@/context/Context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryConnect>
          <Context>{children}</Context>
        </QueryConnect>
      </body>
    </html>
  );
}

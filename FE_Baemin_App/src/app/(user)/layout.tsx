import type { ReactNode } from "react";
import Providers from "../provider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";


export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
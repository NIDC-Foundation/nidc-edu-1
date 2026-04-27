import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
      <div className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </div>
    );
};

export default RootLayout;

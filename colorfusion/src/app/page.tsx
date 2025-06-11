"use client";

import { Contact } from "@/components/Contact";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Home } from "@/components/Home";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";

export default function Page() {
  return (
    <>
      <main>
        <div className="min-h-screen overflow-x-hidden bg-[#FFFAFF]">
          <Header />
          <main>
            <Home />
            <Features />
            <Services />
            <Work />
            <Contact />
          </main>
          <Footer  />
        </div>
      </main>
    </>
  );
}

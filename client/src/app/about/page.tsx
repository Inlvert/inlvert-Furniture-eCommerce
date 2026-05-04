"use client";

import AboutInfo from "@/components/AboutInfo/AboutInfo";
import Feature from "@/components/Feature/Feature";
import Footer from "@/components/Footer/Footer";
import Frame from "@/components/Frame/Frame";
import Navbar from "@/components/Navbar/Navbar";


export default function AboutPage() {
  return (
    <div className="flex items-center  flex-col">
      <Navbar />
      <Frame title="About" />
      <AboutInfo />
      <Feature />
      <Footer />
    </div>
  );
}
"use client";

import ContactInfo from "@/components/ContactInfo/ContactInfo";
import Feature from "@/components/Feature/Feature";
import Footer from "@/components/Footer/Footer";
import Frame from "@/components/Frame/Frame";
import Navbar from "@/components/Navbar/Navbar";


export default function ContactPage() {
  return (
    <div className="flex items-center  flex-col">
      <Navbar />
      <Frame title="Contact" />
      <ContactInfo />
      <Feature />
      <Footer />
    </div>
  );
}
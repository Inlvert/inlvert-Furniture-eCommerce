"use client";

import Frame from "@/components/Frame/Frame";
import Navbar from "@/components/Navbar/Navbar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { getAllCompareProducts } from "@/redux/slices/compareSlice";
import CompareTable from "@/components/CompareTable/CompareTable";
import Footer from "@/components/Footer/Footer";
import Feature from "@/components/Feature/Feature";

export default function ComparePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCompareProducts());
  }, [dispatch]);
  return (
    <div className="flex items-center  flex-col">
      <Navbar />
      <Frame title="Compare" />
      <CompareTable />
      <Feature />
      <Footer />
    </div>
  );
}

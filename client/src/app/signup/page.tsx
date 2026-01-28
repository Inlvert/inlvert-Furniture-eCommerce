"use client";

import Footer from "@/components/Footer/Footer";
import Frame from "@/components/Frame/Frame";
import Greeting from "@/components/Greeting/Greeting";
import Navbar from "@/components/Navbar/Navbar";
import SignupForm from "@/components/SingupForm/SingupForm";
import { useAppDispatch } from "@/redux/hooks";
import { getProfile } from "@/redux/slices/authSlice";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function Signup() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) {
      return;
    } else {
      localStorage.setItem("accessToken", token);
      dispatch(getProfile());
    }
  }, [token, dispatch]);

  return (
    <div className="flex items-center  flex-col">
      <Navbar />
      <Frame title="Signup" />
      <Greeting />
      <SignupForm />
      <Footer />
    </div>
  );
}

export default Signup;
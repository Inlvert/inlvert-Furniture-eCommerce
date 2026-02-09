"use client";

import { useAppDispatch } from "@/redux/hooks";
import { getProfile } from "@/redux/slices/authSlice";
import { getProductsInCart } from "@/redux/slices/cartProductSlise";
import { useEffect } from "react";


export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if(accessToken) {
      console.log("TOKEN FOUND → fetching profile");
      dispatch(getProfile())
      dispatch(getProductsInCart())
    }
  }, [dispatch])

  return null
}


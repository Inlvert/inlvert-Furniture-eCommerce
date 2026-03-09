"use client"

import CheckoutForm from "@/components/CheckoutForm/CheckoutForm"
import Navbar from "@/components/Navbar/Navbar"

export default function CheckoutPage() {
  return (
    <div className="flex items-center  flex-col">
      <Navbar />
      <CheckoutForm />
      {/* Add your checkout form and logic here */}
    </div>
  )
}
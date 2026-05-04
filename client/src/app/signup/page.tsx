import SignupClient from "@/components/SignupClient/SignupClient";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupClient />
    </Suspense>
  );
}

import SignupClient from "@/components/SignupClient/SignupClient";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupClient />
    </Suspense>
  );
}

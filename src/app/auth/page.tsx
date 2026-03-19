"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default function AuthPage() {
  // const router = useRouter();

  return (
    <div className="flex min-h-screen justify-center items-center">
      <Authenticator />
    </div>
  );
}
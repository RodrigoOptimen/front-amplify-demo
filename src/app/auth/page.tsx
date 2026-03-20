"use client";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function RedirectHandler() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  useEffect(() => {
    if (authStatus === "authenticated") {
      router.push(redirectTo);
    }
  }, [authStatus, redirectTo, router]);

  return null;
}

export default function AuthPage() {
  return (
    <>
      <RedirectHandler />
      <div className="flex min-h-screen justify-center items-center">
        <Authenticator />
      </div>
    </>
  );
}

import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextRequest, NextResponse } from "next/server";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import outputs from "../amplify_outputs.json";

const { runWithAmplifyServerContext  } = createServerRunner({
  config: outputs
});

export async function middleware(request: NextRequest) {
  
  const response = NextResponse.next();

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation:async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        console.log('bbb')
        return session.tokens !== undefined;
      } catch {
        return false;
      }
    }
    
  });

  const isAuthPage = request.nextUrl.pathname === "/auth";

  if (!authenticated && !isAuthPage) {
    console.log('aaa', isAuthPage);
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (authenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth"],
};

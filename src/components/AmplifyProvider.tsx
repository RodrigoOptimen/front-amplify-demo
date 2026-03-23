"use client";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../../amplify_outputs.json";
import React from "react";

Amplify.configure(outputs, { ssr: true });

interface Props {
  children: React.ReactNode;
}

export default function AmplifyProvider({ children }: Props) {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}

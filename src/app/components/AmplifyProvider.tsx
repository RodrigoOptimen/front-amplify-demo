"use client";

import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import React from "react";

Amplify.configure(outputs);

interface Props {
  children: React.ReactNode;
}

export default function AmplifyProvider({ children }: Props) {
  return <>{children}</>;
}

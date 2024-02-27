"use client";

import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsExports from "@/aws-exports.js";

Amplify.configure(awsExports);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Authenticator>{children}</Authenticator>
    </div>
  );
}

"use client";

import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsExports from "@/aws-exports.js";

// This process is done to get configuration from aws-exports.js to the format we need to add the API manually
Amplify.configure(awsExports);
const exports = Amplify.getConfig();
Amplify.configure({
  ...exports,
  API: {
    REST: {
      SessionAPI: {
        endpoint: "https://v4rohqtdw7.execute-api.us-east-2.amazonaws.com",
        region: "us-east-2",
      },
    },
  },
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Authenticator>
        {({ signOut }) => (
          <>
            <nav className="flex flex-1 justify-between p-2">
              <p>Zargon's Domain</p>
              <button onClick={signOut} className="p-1 rounded bg-sand">
                Logout
              </button>
            </nav>
            {children}
          </>
        )}
      </Authenticator>
    </div>
  );
}

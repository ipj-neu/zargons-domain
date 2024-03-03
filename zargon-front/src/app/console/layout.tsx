"use client";

import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { IoIosLogOut } from "react-icons/io";
import awsExports from "@/aws-exports.js";
import { WebSocketProvider } from "@/contexts/WebSocket";

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
      WebSocketAPI: {
        endpoint: "https://dzfmotf3xe.execute-api.us-east-2.amazonaws.com",
        region: "us-east-2",
      },
    },
  },
});

export default function Layout({ children, manage }: { children: React.ReactNode; manage: React.ReactNode }) {
  return (
    <div className="">
      <Authenticator>
        {({ signOut }) => (
          <>
            <WebSocketProvider>
              <nav className="flex flex-1 justify-between p-2 bg-main-brown text-black font-bold">
                <p className="self-center">Zargon's Domain</p>
                <button onClick={signOut} className="p-2 rounded bg-main-gray text-black">
                  <IoIosLogOut size={25} />
                </button>
              </nav>
              {children}
              {manage}
            </WebSocketProvider>
          </>
        )}
      </Authenticator>
    </div>
  );
}

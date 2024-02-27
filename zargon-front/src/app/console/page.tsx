"use client";

import { fetchUserAttributes, FetchUserAttributesOutput } from "aws-amplify/auth";
import { useEffect, useState } from "react";

export default function Console() {
  const [userProps, setUserProps] = useState<FetchUserAttributesOutput | null>(null);

  useEffect(() => {
    fetchUserAttributes().then((user) => {
      setUserProps(user);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Console Screen</h1>
      <h2>{userProps?.email}</h2>
    </div>
  );
}

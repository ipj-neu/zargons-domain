"use client";

import { useEffect, useState, useCallback } from "react";
import { Session } from "@/types";
import { get } from "aws-amplify/api";

export default function Console() {
  const [userSessions, setUserSessions] = useState<Session[] | undefined>(undefined);

  const fetchUserSessions = useCallback(async () => {
    try {
      const res = await get({
        apiName: "SessionAPI",
        path: "/session",
      }).response;
      const data = (await res.body.json()) as Session[];
      console.log("User sessions", data);
      setUserSessions(data);
    } catch (error) {
      console.error("Error fetching user sessions", error);
    }
  }, []);

  useEffect(() => {
    fetchUserSessions();
  }, []);

  return <div className="flex flex-col justify-center items-center"></div>;
}

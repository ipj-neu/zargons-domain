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

  return (
    <div>
      <div className="flex justify-between p-4">
        <button className="rounded px-4 py-2 bg-sand">Join</button>
        <button className="rounded px-4 py-2 bg-sand">Create</button>
      </div>
    </div>
  );
}

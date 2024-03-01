"use client";

import { useEffect, useCallback, useState } from "react";
import { get } from "@aws-amplify/api";
import { Session } from "@/types";
import SessionItem from "./SessionItem";
import { useRouter } from "next/navigation";
import { IoMdRefresh } from "react-icons/io";

export default function SessionList() {
  const [userSessions, setUserSessions] = useState<Session[] | undefined>(undefined);
  const [selectedSession, setSelectedSession] = useState<Session | undefined>(undefined);
  const router = useRouter();

  const fetchUserSessions = useCallback(async () => {
    try {
      setUserSessions(undefined);
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

  const handleStartSession = useCallback(() => {
    console.log("Starting session", selectedSession);
    if (selectedSession == undefined) return;
    router.push(`/console/session/${selectedSession.sessionId}`);
  }, []);

  const handleSelectedSession = useCallback((session: Session) => {
    return () => {
      setSelectedSession((prev) => (prev && prev.sessionId == session.sessionId ? undefined : session));
    };
  }, []);

  const handleDeleteSession = useCallback((sessionId: string) => {
    return async () => {
      console.log("Confirm delete session", sessionId);
      router.push(`/console/delete/${sessionId}`);
    };
  }, []);

  useEffect(() => {
    fetchUserSessions();
  }, []);

  return (
    <>
      <div className="flex justify-between bg-slate-200 rounded-t-lg p-2">
        <button
          onClick={handleStartSession}
          className={`rounded px-3 py-1 bg-sand ${selectedSession == undefined ? "opacity-50" : "hover:opacity-90"}`}
          disabled={true}
        >
          Start
        </button>
        <button className="rounded px-3 py-1 bg-sand hover:opacity-90">
          <IoMdRefresh size={20} onClick={fetchUserSessions} />
        </button>
      </div>
      {userSessions ? (
        <div className="flex flex-col flex-1">
          {userSessions.map((session) => (
            <div onClick={handleSelectedSession(session)}>
              <SessionItem
                key={session.sessionId}
                session={session}
                selected={selectedSession ? selectedSession.sessionId == session.sessionId : false}
                onDelete={handleDeleteSession(session.sessionId)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 justify-center items-center">
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

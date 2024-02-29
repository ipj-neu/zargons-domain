import { useEffect, useCallback, useState } from "react";
import { get } from "@aws-amplify/api";
import { Session } from "@/types";
import SessionItem from "./SessionItem";
import { useRouter } from "next/router";

export default function SessionList() {
  const [userSessions, setUserSessions] = useState<Session[] | undefined>(undefined);
  const [selectedSession, setSelectedSession] = useState<Session | undefined>(undefined);
  const router = useRouter();

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

  const handleStartSession = useCallback(() => {
    console.log("Starting session", selectedSession);
    if (selectedSession == undefined) return;
    router.push(`/console/session/${selectedSession.sessionId}`);
  }, []);

  const handleSelectedSession = useCallback((session: Session) => {
    return () => {
      setSelectedSession(session);
    };
  }, []);

  useEffect(() => {
    fetchUserSessions();
  }, []);

  return (
    <div className="flex bg-slate-200 rounded-t-lg p-1">
      <button
        onClick={handleStartSession}
        className={`rounded px-5 py-3 bg-sand ${selectedSession == undefined ? "opacity-50" : "hover:opacity-90"}`}
        disabled={true}
      >
        Start
      </button>
      {userSessions ? (
        <div className="flex flex-col flex-1">
          {userSessions.map((session) => (
            <div onClick={handleSelectedSession(session)}>
              <SessionItem key={session.sessionId} session={session} selected={selectedSession ? selectedSession.sessionId == session.sessionId : false} />
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

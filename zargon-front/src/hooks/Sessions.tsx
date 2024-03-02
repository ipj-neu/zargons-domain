import { useState, useEffect, useCallback } from "react";
import { get } from "@aws-amplify/api";
import { Session } from "@/types";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = useCallback(async (sessionId: string) => {
    setLoading(true);
    try {
      const res = await get({
        apiName: "SessionAPI",
        path: `/session/${sessionId}`,
      }).response;
      if (res.statusCode !== 200) {
        throw new Error("Failed to fetch session");
      }
      const fetched_session = (await res.body.json()) as Session;
      setSession(fetched_session);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { session, setSession, loading, fetchSession };
}

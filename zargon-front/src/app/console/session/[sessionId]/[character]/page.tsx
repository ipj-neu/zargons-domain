"use client";

import { useEffect } from "react";
import { useSession } from "@/hooks/Sessions";
import HeroDisplay from "@/components/playerCharacter/PlayerCharacter";

export default function PlayerCharacter({ params }: { params: { sessionId: string; character: string } }) {
  const { session, fetchSession, loading } = useSession();

  useEffect(() => {
    fetchSession(params.sessionId);
  }, [params.sessionId]);

  if (loading) {
    return <div className="flex justify-center items-center h-52">Loading...</div>;
  }

  if (!session) {
    return <div className="flex justify-center items-center h-52">Session not found</div>;
  }

  return (
    <div>
      <HeroDisplay hero={session.heroes[params.character]} heroClass={params.character} sessionId={params.sessionId} />
    </div>
  );
}

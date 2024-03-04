"use client";

import React, { useCallback, useEffect, useState } from "react";
import HeroDisplay from "./hero_display";
import { put } from "aws-amplify/api";
import { Hero, Session } from "@/types";
import { useSession } from "@/hooks/Sessions";
import { useRouter } from "next/navigation";
import { useWebSocket } from "@/contexts/WebSocket";

export default function page({ params }: { params: { sessionId: string } }) {
  const [playerOne, setPlayerOne] = useState<Hero>();
  const [playerTwo, setPlayerTwo] = useState<Hero>();
  const [playerThree, setPlayerThree] = useState<Hero>();
  const [playerFour, setPlayerFour] = useState<Hero>();

  const playerOneImg = "/images/barbarian.png";
  const playerTwoImg = "/images/dwarf.png";
  const playerThreeImg = "/images/elf.png";
  const playerFourImg = "/images/wizard.png";

  const { session, fetchSession } = useSession();
  const router = useRouter();

  useEffect(() => {
    fetchSession(params.sessionId);
  }, [params.sessionId]);

  const handleUpdateHeroNotification = useCallback(({ action, sessionId, heroType, hero }: { action: string; [key: string]: any }) => {
    console.log("Hero Update Notification");
    if (sessionId === params.sessionId) {
      switch (heroType) {
        case "Barbarian":
          setPlayerOne(hero);
          break;
        case "Dwarf":
          setPlayerTwo(hero);
          break;
        case "Elf":
          setPlayerThree(hero);
          break;
        case "Wizard":
          setPlayerFour(hero);
          break;
      }
    } else {
      console.log("Session Id does not match");
    }
  }, []);

  useWebSocket("updateHero", handleUpdateHeroNotification);

  const handleCloseSession = useCallback(() => {
    const response = put({
      apiName: "SessionAPI",
      path: `/session/${params.sessionId}/close`,
    });
    router.push("/console");
  }, [params.sessionId]);

  useEffect(() => {
    if (session && session.heroes) {
      setPlayerOne(session.heroes["Barbarian"]);

      setPlayerTwo(session.heroes["Dwarf"]);

      setPlayerThree(session.heroes["Elf"]);

      setPlayerFour(session.heroes["Wizard"]);
    }
  }, [session]);

  return (
    <div className="bg-main-white flex flex-col h-screen">
      <div className="flex justify-between px-5 py-2">
        <p className="text-black text-2xl">Join Code: {session?.joinCode || "???"}</p>
        <button onClick={handleCloseSession} className="px-3 py-2 bg-sand rounded-xl">
          Close
        </button>
      </div>
      <div className="flex flex-wrap flex-grow bg-main-white">
        <div className="w-1/2 h-1/2 p-4 flex justify-center items-center">
          <HeroDisplay hero={playerOne} imgUrl={playerOneImg} />
        </div>
        <div className="w-1/2 h-1/2 p-4 flex justify-center items-center">
          <HeroDisplay hero={playerTwo} imgUrl={playerTwoImg} />
        </div>
        <div className="w-1/2 h-1/2 p-4 flex justify-center items-center">
          <HeroDisplay hero={playerThree} imgUrl={playerThreeImg} />
        </div>
        <div className="w-1/2 h-1/2 p-4 flex justify-center items-center">
          <HeroDisplay hero={playerFour} imgUrl={playerFourImg} />
        </div>
      </div>
    </div>
  );
}

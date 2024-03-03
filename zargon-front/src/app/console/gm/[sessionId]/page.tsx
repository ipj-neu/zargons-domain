"use client";

import React, { useCallback, useEffect, useState } from 'react';
import HeroDisplay from './hero_display';
import { get } from "aws-amplify/api";
import { Hero, Session } from '@/types';
import { json } from 'stream/consumers';
import { useSession } from '@/hooks/Sessions';

export default function page({params}: {params: { sessionId: string }}) {
    const [playerOne, setPlayerOne] = useState<Hero>();
    const [playerTwo, setPlayerTwo] = useState<Hero>();
    const [playerThree, setPlayerThree] = useState<Hero>();
    const [playerFour, setPlayerFour] = useState<Hero>();

    const playerOneImg = "/images/barbarian.png"
    const playerTwoImg = "/images/dwarf.png"
    const playerThreeImg = "/images/elf.png"
    const playerFourImg = "/images/wizard.png"

    const { session, fetchSession } = useSession();

    useEffect(() => {
        fetchSession(params.sessionId);
    }, [])

    useEffect(() => {
        if (session && session.heroes) {
            setPlayerOne(session.heroes["Barbarian"]);
    
            setPlayerTwo(session.heroes["Dwarf"]);
    
            setPlayerThree(session.heroes["Elf"]);
    
            setPlayerFour(session.heroes["Wizard"]);
        }
    }, [session])


    return (
        <div className="bg-main-white flex flex-col h-screen"> 
            <p className="absolute text-main-white text-2xl m-4 left-1/2 transform -translate-x-1/2">Join Code: {session?.joinCode || "???"}</p>
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
"use client";

import React, { useEffect, useState } from 'react';
import HeroDisplay from './hero_display';
import { Hero } from '@/types';

export default function page() {
    const [playerOne, setPlayerOne] = useState<Hero>();
    const [playerTwo, setPlayerTwo] = useState<Hero>();
    const [playerThree, setPlayerThree] = useState<Hero>();
    const [playerFour, setPlayerFour] = useState<Hero>();

    const playerOneImg = "/images/wise.jpg"
    const playerTwoImg = "/images/mug.jpg"
    const playerThreeImg = "/images/wise.jpg"
    const playerFourImg = "/images/mug.jpg"

    useEffect(() => {
        setPlayerOne({
            Armor: "Rags",
            Atk: "1",
            BodyPoints: "1",
            Def: "1",
            GoldCoins: "100",
            Items: "",
            Movement: "1",
            Name: "Coward",
            Potions: "",
            Spells: [
                "Cast Hunger",
                "Cast Hunger II",
                "Cast Hunger III",
                "Hunger Missile",
                "Starvation",
                "Voidal",
                "Cast Hunger II",
                "Cast Hunger III",
                "Hunger Missile",
                "Starvation",
                "Voidal",
                "Cast Hunger II",
                "Cast Hunger III",
                "Hunger Missile",
                "Starvation",
                "Voidal",
                "Cast Hunger II",
                "Cast Hunger III",
                "Hunger Missile",
                "Starvation",
                "Voidal",
                "Cast Hunger II",
                "Cast Hunger III",
                "Hunger Missile",
                "Starvation",
                "Voidal",
                "Cast Hunger II",
                "Cast Hunger III",
                "Hunger Missile",
                "Starvation",
                "Voidal"
            ],
            StartingBody: "1",
            StartingMind: "0",
            Weapons: "Rusty Dagger"
        });

        setPlayerTwo({
            Armor: "Rags",
            Atk: "1",
            BodyPoints: "1",
            Def: "1",
            GoldCoins: "100",
            Items: "",
            Movement: "1",
            Name: "Coward",
            Potions: "",
            Spells: [
                "Cast Hunger",
                "Cast Hunger II",
                "Cast Hunger III",
                "Hunger Missile",
                "Starvation",
                "Voidal"
            ],
            StartingBody: "1",
            StartingMind: "0",
            Weapons: "Rusty Dagger"
        });

        setPlayerThree({
            Armor: "Rags",
            Atk: "1",
            BodyPoints: "1",
            Def: "1",
            GoldCoins: "100",
            Items: "",
            Movement: "1",
            Name: "Coward",
            Potions: "",
            Spells: [
                "Cast Hunger",
                "Cast Hunger II",
                "Cast Hunger III",
                "Hunger Missile",
                "Starvation",
                "Voidal"
            ],
            StartingBody: "1",
            StartingMind: "0",
            Weapons: "Rusty Dagger"
        });

        setPlayerFour({
            Armor: "Rags",
            Atk: "1",
            BodyPoints: "1",
            Def: "1",
            GoldCoins: "100",
            Items: "",
            Movement: "1",
            Name: "Coward",
            Potions: "",
            StartingBody: "1",
            StartingMind: "0",
            Weapons: "Rusty Dagger"
        });
    }, []);

    return (
        <div>
            {/* Title Bar */}
            <div className="flex flex-row justify-evenly align-top p-2 bg-dark-brown text-main-white text-2xl/loose">
                <span className="px-4 rounded-lg bg-blue-700 text-main-white transition hover:bg-blue-900 cursor-pointer">
                    {"<"}
                </span>
                <p>name</p>
            </div>

            <div className="flex flex-wrap h-screen w-screen bg-slate-950">
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

            {/* Bottom Bar */}
            <div className="flex flex-row justify-evenly align-top p-2 bg-dark-brown text-main-white text-2xl/loose">
                <p>name</p>
            </div>
        </div>
    );
}
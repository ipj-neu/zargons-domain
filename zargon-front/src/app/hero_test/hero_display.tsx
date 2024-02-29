import React, { useEffect, useState } from 'react';
import HeroModal from './hero_modal';

interface HeroDisplayProps {
    hero?: Hero;
    imgUrl: String;
}

const HeroDisplay: React.FC<HeroDisplayProps> = ({ hero, imgUrl }) => {
    const [currentHero, setCurrentHero] = useState<Hero>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        setCurrentHero(hero);
    }, [hero]);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <div className="relative rounded-lg m-[1%] flex w-fit bg-black bg-cover bg-right bg-no-repeat overflow-hidden" onClick={toggleModal}>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 z-[80] bg-black transition opacity-0 hover:opacity-50"></div>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 z-[70] opacity-75 bg-gradient-to-r from-slate-900"></div>

            {/* Hero Image */}
            <div className="w-80 z-[60] bg-cover bg-center" style={{ backgroundImage: `url(${imgUrl})`}}></div>

            {/* Simple Hero Info */}
            <div className="text-right z-[60] p-5 w-fit flex flex-col text-3xl text-slate-200 bg-slate-700">
                {/* Title Bar */}
                <div className="bg-slate-900 -ml-5 -mr-5 -mt-5 mb-3 px-5 py-1">
                    <p className="text-4xl/loose text-center text-nowrap">Name: {currentHero?.Name || '???'}</p>
                </div>

                {/* Hero Stats */}
                <p>Attack: {currentHero?.Atk || '???'}</p>
                <p>Defense: {currentHero?.Def || '???'}</p>
                <p>Body: {currentHero?.BodyPoints || '???'}</p>
                <p>Mind: {currentHero?.StartingMind || '???'}</p>
                <p>Movement: {currentHero?.Movement || '???'}</p>
                <p>Gold: {currentHero?.GoldCoins || '???'}</p>
            </div>

            {/* Hero Modal With More Info */}
            <div>
                <HeroModal isOpen={isModalOpen} onClose={toggleModal}>
                    <div className="flex flex-col">
                        {/* Title Bar */}
                        <div className="flex flex-row justify-evenly p-2 rounded-tl-lg bg-slate-800 text-slate-200 text-2xl/loose">
                            <p>Name: {currentHero?.Name || '???'}</p>
                            <p>Gold: {currentHero?.GoldCoins || '???'}</p>
                        </div>

                        {/* First Row, Contains Weapons and Armor */}
                        <div className="flex flex-row mx-8 mt-8 mb-4">
                            {/* Weapons List */}
                            <div className="mr-4">
                                {/* Title Bar */}
                                <div className="flex justify-center p-1 rounded-t-lg bg-red-700 text-slate-200">
                                    <p className="text-2xl/loose">Weapons</p>
                                </div>

                                {/* List Items */}
                                <div className="flex flex-col overflow-auto max-h-48 min-w-80 bg-slate-700 rounded-b-lg text-slate-200 text-2xl/loose">
                                    <p className="px-3">Rusty Dagger</p>
                                    <p className="px-3 bg-slate-800">Rusty Dagger</p>
                                    <p className="px-3">Rusty Dagger</p>
                                    <p className="px-3 bg-slate-800">Rusty Dagger</p>
                                    <p className="px-3">Rusty Dagger</p>
                                    <p className="px-3 bg-slate-800">Rusty Dagger</p>
                                </div>
                            </div>

                            {/* Armor List */}
                            <div className="ml-4">
                                {/* Title Bar */}
                                <div className="flex justify-center p-1 rounded-t-lg bg-blue-700 text-slate-200">
                                    <p className="text-2xl/loose">Armor</p>
                                </div>

                                {/* List Items */}
                                <div className="flex flex-col overflow-auto max-h-48 min-w-80 bg-slate-700 rounded-b-lg text-slate-200 text-2xl/loose">
                                    <p className="px-3">Rags</p>
                                    <p className="px-3 bg-slate-800">Rags</p>
                                    <p className="px-3">Rags</p>
                                    <p className="px-3 bg-slate-800">Rags</p>
                                    <p className="px-3">Rags</p>
                                    <p className="px-3 bg-slate-800">Rags</p>
                                </div>
                            </div>
                        </div>

                        {/* Second Row, Contains Artifacts and Potions */}
                        <div className="flex flex-row mx-8 mt-4 mb-8">
                            {/* Artifacts List */}
                            <div className="mr-4">
                                {/* Title Bar */}
                                <div className="flex justify-center p-1 rounded-t-lg bg-purple-700 text-slate-200">
                                    <p className="text-2xl/loose">Artifacts</p>
                                </div>

                                {/* List Items */}
                                <div className="flex flex-col overflow-auto max-h-48 min-w-80 bg-slate-700 rounded-b-lg text-slate-200 text-2xl/loose">
                                    <p className="px-3">Hunger</p>
                                    <p className="px-3 bg-slate-800">Hunger</p>
                                    <p className="px-3">Hunger</p>
                                    <p className="px-3 bg-slate-800">Hunger</p>
                                    <p className="px-3">Hunger</p>
                                    <p className="px-3 bg-slate-800">Hunger</p>
                                </div>
                            </div>

                            {/* Potions List */}
                            <div className="ml-4">
                                {/* Title Bar */}
                                <div className="flex justify-center p-1 rounded-t-lg bg-green-700 text-slate-200">
                                    <p className="text-2xl/loose">Potions</p>
                                </div>

                                {/* List Items */}
                                <div className="flex flex-col overflow-auto max-h-48 min-w-80 bg-slate-700 rounded-b-lg text-slate-200 text-2xl/loose">
                                    <p className="px-3">Potion of Nothing</p>
                                    <p className="px-3 bg-slate-800">Potion of Nothing</p>
                                    <p className="px-3">Potion of Nothing</p>
                                    <p className="px-3 bg-slate-800">Potion of Nothing</p>
                                    <p className="px-3">Potion of Nothing</p>
                                    <p className="px-3 bg-slate-800">Potion of Nothing</p>
                                </div>
                            </div>
                        </div>

                        {/* Title Bar */}
                        <div className="flex flex-row justify-evenly p-2 rounded-bl-lg bg-slate-800 text-slate-200">
                            <p>Attack: {currentHero?.Atk || '???'}</p>
                            <p>Defense: {currentHero?.Def || '???'}</p>
                            <p>Body: {currentHero?.BodyPoints || '???'}</p>
                            <p>Mind: {currentHero?.StartingMind || '???'}</p>
                            <p>Movement: {currentHero?.Movement || '???'}</p>
                        </div>
                    </div>

                    { currentHero?.Spells ? (    
                        <div className="flex flex-col bg-slate-900">
                            {/* Title Bar */}
                            <div className="flex flex-row justify-evenly p-2 rounded-tr-lg bg-slate-950 text-slate-200 text-2xl/loose">
                                Spells
                            </div>

                            {/* Spells */}
                            <div className="overflow-auto">
                                {currentHero?.Spells?.map((spell, index) => (
                                    <p key={index} className={`${index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-900'} text-slate-200 py-2`}>
                                        {spell}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ) : (null)}
                </HeroModal>
            </div>
        </div>
    );
}

export default HeroDisplay;

// {/* First Row, Contains Weapons and Armor */}
// <div className="flex flex-row mx-8 mt-8 mb-4">
// {/* Weapons List */}
// <div className="mr-4">
//     {/* Title Bar */}
//     <div className="flex justify-center p-1 rounded-t-lg bg-red-700 text-slate-200">
//         <p className="text-2xl/loose">Weapons</p>
//     </div>

//     {/* List Items */}
//     <div className="flex flex-col overflow-auto max-h-48 min-w-80 bg-slate-700 rounded-b-lg text-slate-200 text-2xl/loose">
//         <p className="px-3">Rusty Dagger</p>
//         <p className="px-3 bg-slate-800">Rusty Dagger</p>
//         <p className="px-3">Rusty Dagger</p>
//         <p className="px-3 bg-slate-800">Rusty Dagger</p>
//         <p className="px-3">Rusty Dagger</p>
//         <p className="px-3 bg-slate-800">Rusty Dagger</p>
//     </div>
// </div>

// {/* Armor List */}
// <div className="ml-4">
//     {/* Title Bar */}
//     <div className="flex justify-center p-1 rounded-t-lg bg-blue-700 text-slate-200">
//         <p className="text-2xl/loose">Armor</p>
//     </div>

//     {/* List Items */}
//     <div className="flex flex-col overflow-auto max-h-48 min-w-80 bg-slate-700 rounded-b-lg text-slate-200 text-2xl/loose">
//         <p className="px-3">Rags</p>
//         <p className="px-3 bg-slate-800">Rags</p>
//         <p className="px-3">Rags</p>
//         <p className="px-3 bg-slate-800">Rags</p>
//         <p className="px-3">Rags</p>
//         <p className="px-3 bg-slate-800">Rags</p>
//     </div>
// </div>
// </div>

// {/* Second Row, Contains Artifacts and Potions */}
// <div className="flex flex-row mx-8 mt-4 mb-8">
// {/* Artifacts List */}
// <div className="mr-4">
//     {/* Title Bar */}
//     <div className="flex justify-center p-1 rounded-t-lg bg-purple-700 text-slate-200">
//         <p className="text-2xl/loose">Artifacts</p>
//     </div>

//     {/* List Items */}
//     <div className="flex flex-col overflow-auto max-h-48 min-w-80 bg-slate-700 rounded-b-lg text-slate-200 text-2xl/loose">
//         <p className="px-3">Hunger</p>
//         <p className="px-3 bg-slate-800">Hunger</p>
//         <p className="px-3">Hunger</p>
//         <p className="px-3 bg-slate-800">Hunger</p>
//         <p className="px-3">Hunger</p>
//         <p className="px-3 bg-slate-800">Hunger</p>
//     </div>
// </div>

// {/* Potions List */}
// <div className="ml-4">
//     {/* Title Bar */}
//     <div className="flex justify-center p-1 rounded-t-lg bg-green-700 text-slate-200">
//         <p className="text-2xl/loose">Potions</p>
//     </div>

//     {/* List Items */}
//     <div className="flex flex-col overflow-auto max-h-48 min-w-80 bg-slate-700 rounded-b-lg text-slate-200 text-2xl/loose">
//         <p className="px-3">Potion of Nothing</p>
//         <p className="px-3 bg-slate-800">Potion of Nothing</p>
//         <p className="px-3">Potion of Nothing</p>
//         <p className="px-3 bg-slate-800">Potion of Nothing</p>
//         <p className="px-3">Potion of Nothing</p>
//         <p className="px-3 bg-slate-800">Potion of Nothing</p>
//     </div>
// </div>
// </div>
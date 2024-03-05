import React, { useEffect, useState } from "react";
import HeroModal from "./hero_modal";
import { Hero } from "@/types";

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
    <div className="relative rounded-lg m-[1%] flex w-fit bg-main-gray bg-cover bg-right bg-no-repeat overflow-hidden" onClick={toggleModal}>
      {/* Hover effect overlay */}
      <div className="absolute inset-0 z-[20] bg-black transition opacity-0 hover:opacity-20"></div>

      {/* Gradient overlay */}
      {/* <div className="absolute inset-0 z-[70] opacity-75 bg-gradient-to-r from-slate-700 from-15%"></div> */}

      {/* Hero Image */}
      <div className="w-80 z-[10] bg-cover bg-center" style={{ backgroundImage: `url(${imgUrl})` }}></div>

      {/* Simple Hero Info */}
      <div className="text-right z-[10] p-5 w-fit flex flex-col text-3xl text-main-white bg-main-brown">
        {/* Title Bar */}
        <div className="bg-dark-brown -ml-5 -mr-5 -mt-5 mb-3 px-5 py-1">
          <p className="text-4xl/loose text-center text-nowrap">Name: {currentHero?.Name || "???"}</p>
        </div>

        {/* Hero Stats */}
        <p>Attack: {currentHero?.Atk || "???"}</p>
        <p>Defense: {currentHero?.Def || "???"}</p>
        <p>Body: {currentHero?.["Body Points"] || "???"}</p>
        <p>Mind: {currentHero?.["Starting Mind"] || "???"}</p>
        <p>Movement: {currentHero?.Movement || "???"}</p>
        <p>Gold: {currentHero?.["Gold Coins"] || "???"}</p>
      </div>

      {/* Hero Modal With More Info */}
      <div>
        <HeroModal isOpen={isModalOpen} onClose={toggleModal}>
          <div className={`grid grid-rows-1 ${currentHero?.Spells ? "grid-cols-3" : "grid-cols-2"} bg-main-brown rounded-lg overflow-hidden`}>
            <div className="flex flex-col col-span-2">
              {/* Title Bar */}
              <div className="flex flex-row justify-evenly align-top p-2 bg-dark-brown text-main-white text-2xl/loose">
                <p>Name: {currentHero?.Name || "???"}</p>
                <p>Gold: {currentHero?.["Gold Coins"] || "???"}</p>
              </div>

              <div className="grid grid-rows-2 grid-cols-2 items-center flex-grow justify-items-center gap-4 p-4">
                {/* Weapons List */}
                <div className="h-fit max-w-96 rounded-lg overflow-hidden">
                  {/* Title Bar */}
                  <div className="flex justify-center p-1 bg-red-800 text-main-white">
                    <p className="text-2xl/loose">Weapons</p>
                  </div>

                  {/* List Items */}
                  <div className="flex flex-col min-w-96 max-h-48 overflow-hidden rounded-b-lg text-main-white text-2xl/loose">
                    <textarea className="text-black bg-main-white text-lg p-2 min-h-48 rounded-b-lg overflow-hidden hover:overflow-auto resize-none" readOnly>
                      {currentHero?.Weapons}
                    </textarea>
                  </div>
                </div>

                {/* Armor List */}
                <div className="h-fit max-w-96 rounded-lg overflow-hidden">
                  {/* Title Bar */}
                  <div className="flex justify-center p-1 bg-blue-800 text-main-white">
                    <p className="text-2xl/loose">Armor</p>
                  </div>

                  {/* List Items */}
                  <div className="flex flex-col min-w-96 max-h-48 overflow-hidden rounded-b-lg text-main-white text-2xl/loose">
                    <textarea className="text-black bg-main-white text-lg p-2 min-h-48 rounded-b-lg overflow-hidden hover:overflow-auto resize-none" readOnly>
                      {currentHero?.Armor}
                    </textarea>
                  </div>
                </div>

                {/* Items List */}
                <div className="h-fit max-w-96 rounded-lg overflow-hidden">
                  {/* Title Bar */}
                  <div className="flex justify-center p-1 bg-stone-800 text-main-white">
                    <p className="text-2xl/loose">Items</p>
                  </div>

                  {/* List Items */}
                  <div className="flex flex-col min-w-96 max-h-48 overflow-hidden rounded-b-lg text-main-white text-2xl/loose">
                    <textarea className="text-black bg-main-white text-lg p-2 min-h-48 rounded-b-lg overflow-hidden hover:overflow-auto resize-none" readOnly>
                      {currentHero?.Items}
                    </textarea>
                  </div>
                </div>

                {/* Potions List */}
                <div className="h-fit max-w-96 rounded-lg overflow-hidden">
                  {/* Title Bar */}
                  <div className="flex justify-center p-1 bg-green-800 text-main-white">
                    <p className="text-2xl/loose">Potions</p>
                  </div>

                  {/* List Items */}
                  <div className="flex flex-col min-w-96 max-h-48 overflow-hidden rounded-b-lg text-main-white text-2xl/loose">
                    <textarea className="text-black bg-main-white text-lg p-2 min-h-48 rounded-b-lg overflow-hidden hover:overflow-auto resize-none" readOnly>
                      {currentHero?.Potions}
                    </textarea>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="flex flex-row justify-evenly align-bottom p-2 bg-slate-800 text-main-white">
                <p>Attack: {currentHero?.Atk || "???"}</p>
                <p>Defense: {currentHero?.Def || "???"}</p>
                <p>Body: {currentHero?.["Body Points"] || "???"}</p>
                <p>Mind: {currentHero?.["Starting Mind"] || "???"}</p>
                <p>Movement: {currentHero?.Movement || "???"}</p>
              </div>
            </div>

            {currentHero?.Spells ? (
              <div className="flex flex-col bg-zinc-700 min-w-64">
                {/* Title Bar */}
                <div className="flex flex-row justify-evenly p-2 bg-purple-800 text-main-white text-2xl/loose">Spells</div>

                {/* Spells */}
                <div className="overflow-auto">
                  {currentHero?.Spells?.map((spell, index) => (
                    <p key={index} className={`${index % 2 === 0 ? "" : "bg-zinc-800"} text-main-white border-black p-2`}>
                      {spell}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </HeroModal>
      </div>
    </div>
  );
};

export default HeroDisplay;

// {/* First Row, Contains Weapons and Armor */}
// <div className="flex flex-row mx-8 mt-8 mb-4">
//     {/* Weapons List */}
//     <div className="mr-4 rounded-lg overflow-hidden">
//         {/* Title Bar */}
//         <div className="flex justify-center p-1 bg-red-800 text-main-white">
//             <p className="text-2xl/loose">Weapons</p>
//         </div>

//         {/* List Items */}
//         <div className="flex flex-col min-w-96 overflow-hidden text-main-white text-2xl/loose">
//             <textarea className="text-black bg-main-white text-lg p-2 min-h-48 max-h-64 rounded-b-lg overflow-hidden hover:overflow-auto"/>
//         </div>
//     </div>

//     {/* Armor List */}
//     <div className="ml-4 rounded-lg overflow-hidden">
//         {/* Title Bar */}
//         <div className="flex justify-center p-1 bg-blue-800 text-main-white">
//             <p className="text-2xl/loose">Armor</p>
//         </div>

//         {/* List Items */}
//         <div className="flex flex-col min-w-96 overflow-hidden text-main-white text-2xl/loose">
//             <textarea className="text-black bg-main-white text-lg p-2 min-h-48 max-h-64 rounded-b-lg  overflow-hidden hover:overflow-auto"/>
//         </div>
//     </div>
// </div>

// {/* Second Row, Contains Artifacts and Potions */}
// <div className="flex flex-row mx-8 mt-4 mb-8">
//     {/* Artifacts List */}
//     <div className="mr-4 rounded-lg overflow-hidden">
//         {/* Title Bar */}
//         <div className="flex justify-center p-1 bg-stone-800 text-main-white">
//             <p className="text-2xl/loose">Artifacts</p>
//         </div>

//         {/* List Items */}
//         <div className="flex flex-col min-w-96 overflow-hidden text-main-white text-2xl/loose">
//             <textarea className="text-black bg-main-white text-lg p-2 min-h-48 max-h-64 rounded-b-lg overflow-hidden hover:overflow-auto"/>
//         </div>
//     </div>

//     {/* Potions List */}
//     <div className="ml-4 rounded-lg overflow-hidden">
//         {/* Title Bar */}
//         <div className="flex justify-center p-1 bg-green-800 text-main-white">
//             <p className="text-2xl/loose">Potions</p>
//         </div>

//         {/* List Items */}
//         <div className="flex flex-col min-w-96 overflow-hidden text-main-white text-2xl/loose">
//             <textarea className="text-black bg-main-white text-lg p-2 min-h-48 max-h-64 rounded-b-lg overflow-hidden hover:overflow-auto"/>
//         </div>
//     </div>
// </div>

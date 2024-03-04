import { useState, useCallback } from "react";
import { put } from "@aws-amplify/api";
import { Hero } from "@/types";
import CharacterInputs from "./CharacterInputs";
import { IoIosSave } from "react-icons/io";

export default function HeroDisplay({ hero, heroClass, sessionId }: { hero: Hero; heroClass: string; sessionId: string }) {
  const [currentHero, setCurrentHero] = useState<Hero>(hero);
  const [updating, setUpdating] = useState(false);

  const currentHeroUpdate = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentHero((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);

  const handleSaveHero = useCallback(async () => {
    setUpdating(true);
    const response = await put({
      apiName: "SessionAPI",
      path: `/session/${sessionId}/updateHero/${heroClass}`,
      options: {
        body: currentHero,
      },
    });
    setUpdating(false);
  }, [currentHero]);

  return (
    <div className="">
      {updating && <div className="fixed inset-0 bg-gray-500 opacity-50 z-50"></div>}
      <div className="flex justify-between mb-10 p-5">
        <div className="text-lg">
          <label className="m-1">Hero's Name:</label>
          <CharacterInputs type="input" name="Name" value={currentHero.Name} onChange={currentHeroUpdate} className="mr-5" />
          <label>Gold: </label>
          <CharacterInputs type="input" name="Gold Coins" value={currentHero["Gold Coins"]} onChange={currentHeroUpdate} className="w-16" />
          
        </div>
        <h1 className="absolute font-bold text-2xl left-1/2 transform -translate-x-1/2">{heroClass}</h1>
        <button className="px-4 py-1 bg-sand rounded hover:opacity-60" onClick={handleSaveHero}>
          <IoIosSave size={25} />
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-10 p-10">
        <div className="flex flex-col bg-red-800 rounded-lg">
          <label className="flex justify-center text-main-white text-2xl p-4">Weapons</label>
          <CharacterInputs type="textarea" name="Weapons" value={currentHero.Weapons} onChange={currentHeroUpdate} rows={8} />
        </div>
        <div className="flex flex-col bg-stone-800 rounded-lg">
          <label className="flex justify-center text-main-white text-2xl p-4">Items</label>
          <CharacterInputs type="textarea" name="Items" value={currentHero.Items} onChange={currentHeroUpdate} rows={8} />
        </div>
        <div className="flex flex-col bg-blue-800 rounded-lg">
          <label className="flex justify-center text-main-white text-2xl p-4">Armor</label>
          <CharacterInputs type="textarea" name="Armor" value={currentHero.Armor} onChange={currentHeroUpdate} rows={8} />
        </div>
        <div className="flex flex-col bg-green-800 rounded-lg">
          <label className="flex justify-center text-main-white text-2xl p-4">Potions</label>
          <CharacterInputs type="textarea" name="Potions" value={currentHero.Potions} onChange={currentHeroUpdate} rows={8} />
        </div>
      </div>

      <div className="fixed flex z-10 bg-slate-800 text-lg text-main-white justify-between inset-x-0 bottom-0 p-6">
        <div>
          <label>Attack: </label>
          <CharacterInputs type="input" name="Atk" value={currentHero.Atk} onChange={currentHeroUpdate} className="w-32" />
        </div>
        <div>
          <label>Defense: </label>
          <CharacterInputs type="input" name="Def" value={currentHero.Def} onChange={currentHeroUpdate} className="w-32" />
        </div>
        <div>
          <label>Body: </label>
          <CharacterInputs type="input" name="Body Points" value={currentHero["Body Points"]} onChange={currentHeroUpdate} className="w-32" />
        </div>
        <div>
          <label>Mind: </label>
          <CharacterInputs type="input" name="Starting Mind" value={currentHero["Starting Mind"]} onChange={currentHeroUpdate} className="w-32" />
        </div>
        <div>
          <label>Movement: </label>
          <CharacterInputs type="input" name="Movement" value={currentHero.Movement} onChange={currentHeroUpdate} className="w-32" />
        </div>
      </div>
    </div>
  );
}

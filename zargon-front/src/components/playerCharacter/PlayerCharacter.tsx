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
      <div className="flex justify-between border-b-2 border-black mb-10 p-5">
        <div>
          <label>Gold: </label>
          <CharacterInputs type="input" name="Gold Coins" value={currentHero["Gold Coins"]} onChange={currentHeroUpdate} className="w-16" />
          <label className="ml-5">Movement: {currentHero.Movement}</label>
        </div>
        <h1 className="font-bold text-2xl">{heroClass}</h1>
        <button className="px-4 py-1 bg-sand rounded hover:opacity-60" onClick={handleSaveHero}>
          <IoIosSave size={25} />
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <label className="mr-2">Hero Name </label>
        <CharacterInputs type="input" name="Name" value={currentHero.Name} onChange={currentHeroUpdate} />
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-10 p-10">
        <div className="flex flex-col">
          <label className="flex justify-center">Weapons </label>
          <CharacterInputs type="textarea" name="Weapons" value={currentHero.Weapons} onChange={currentHeroUpdate} rows={8} />
        </div>
        <div className="flex flex-col">
          <label className="flex justify-center">Items </label>
          <CharacterInputs type="textarea" name="Items" value={currentHero.Items} onChange={currentHeroUpdate} rows={8} />
        </div>
        <div className="flex flex-col">
          <label className="flex justify-center">Armor </label>
          <CharacterInputs type="textarea" name="Armor" value={currentHero.Armor} onChange={currentHeroUpdate} rows={8} />
        </div>
        <div className="flex flex-col">
          <label className="flex justify-center">Potions </label>
          <CharacterInputs type="textarea" name="Potions" value={currentHero.Potions} onChange={currentHeroUpdate} rows={8} />
        </div>
      </div>

      <div className="fixed flex justify-between inset-x-0 bottom-0 p-6 border-t-2 border-black">
        <div>
          <label>Attack </label>
          <CharacterInputs type="input" name="Atk" value={currentHero.Atk} onChange={currentHeroUpdate} className="w-32" />
        </div>
        <div>
          <label>Defense </label>
          <CharacterInputs type="input" name="Def" value={currentHero.Def} onChange={currentHeroUpdate} className="w-32" />
        </div>
        <div>
          <label>Body </label>
          <CharacterInputs type="input" name="Body Points" value={currentHero["Body Points"]} onChange={currentHeroUpdate} className="w-32" />
        </div>
        <div>
          <label>Mind </label>
          <CharacterInputs type="input" name="Starting Mind" value={currentHero["Starting Mind"]} onChange={currentHeroUpdate} className="w-32" />
        </div>
      </div>
    </div>
  );
}

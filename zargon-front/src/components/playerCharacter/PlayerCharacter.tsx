import { useState, useCallback } from "react";
import { Hero } from "@/types";
import CharacterInputs from "./CharacterInputs";
import { IoIosSave } from "react-icons/io";

export default function HeroDisplay({ hero, heroClass }: { hero: Hero; heroClass: string }) {
  const [currentHero, setCurrentHero] = useState<Hero>(hero);

  const currentHeroUpdate = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentHero({ ...currentHero, [name]: value });
  }, []);

  return (
    <div>
      <div className="flex justify-between border-b-2 border-black mb-10 p-5">
        <div>
          <label>Gold: </label>
          <CharacterInputs type="input" name="Gold" value={currentHero["Gold Coins"]} onChange={currentHeroUpdate} className="w-16" />
        </div>
        <h1 className="font-bold text-2xl">{heroClass}</h1>
        <button className="px-4 py-1 bg-sand rounded hover:opacity-60">
          <IoIosSave size={25} />
        </button>
      </div>
      <div>
        <label>Hero Name</label>
        <CharacterInputs type="input" name="Name" value={currentHero.Name} onChange={currentHeroUpdate} />
      </div>
      <div className="fixed inset-x-0 bottom-0 p-6 border-t-2 border-black">
        <div>
          <label>Attack</label>
          <CharacterInputs type="input" name="Strength" value={currentHero.Atk} onChange={currentHeroUpdate} />
        </div>
      </div>
    </div>
  );
}

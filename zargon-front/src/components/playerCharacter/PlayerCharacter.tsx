import { useState, useCallback } from "react";
import { Hero } from "@/types";
import CharacterInputs from "./CharacterInputs";

export default function HeroDisplay({ hero, heroClass }: { hero: Hero; heroClass: string }) {
  const [currentHero, setCurrentHero] = useState<Hero>(hero);

  const currentHeroUpdate = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentHero({ ...currentHero, [name]: value });
  }, []);

  return (
    <div>
      <div className="border-b-2 border-black">
        <h1>{heroClass}</h1>
      </div>
      <div>
        <label>Hero Name</label>
        <CharacterInputs type="input" name="Name" value={currentHero.Name} onChange={currentHeroUpdate} />
      </div>
    </div>
  );
}

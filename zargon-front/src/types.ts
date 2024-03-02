export type Hero = {
  Armor: string;
  Atk: string;
  "Body Points": string;
  Def: string;
  "Gold Coins": string;
  Items: string;
  Movement: string;
  Name: string;
  Potions: string;
  "Starting Body": string;
  "Starting Mind": string;
  Weapons: string;
  Spells?: string[];
};

export type Session = {
  sessionId: string;
  unavailableHeroes: string[];
  gmSocketUrl: string;
  heroes: Record<string, Hero>;
  joinCode: string;
  name: string;
  playersSocketUrl: string[];
  userId: string;
};

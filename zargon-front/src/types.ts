export type Hero = {
  Armor: string;
  Atk: string;
  BodyPoints: string;
  Def: string;
  GoldCoins: string;
  Items: string;
  Movement: string;
  Name: string;
  Potions: string;
  StartingBody: string;
  StartingMind: string;
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

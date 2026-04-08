
export const TITLES = ["Lord", "Lady"] as const;

export const GAMES = ['Dominion', 'Magic: The Gathering', 'Slay The Spire', 'Astrea: Six-Sided Oracles', 'Balatro', 'Cobalt Core'] as const;
export type GAME = (typeof GAMES)[number];

export const GUILDS = ['Azorius', 'Selesnya', 'Boros', 'Orzhov', 'Simic', 'Gruul', 'Golgari', 'Dimir', 'Izzet', 'Rakdos'] as const;
export type GUILD = (typeof GUILDS)[number];

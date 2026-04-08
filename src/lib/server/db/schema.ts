import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const GAMES = ['Dominion', 'Magic: The Gathering', 'Slay The Spire', 'Astrea: Six-Sided Oracles', 'Balatro', 'Cobalt Core'] as const;
type GAME = typeof GAMES[number];

const GUILDS = ['Azorius', 'Selesnya', 'Boros', 'Orzhov', 'Simic', 'Gruul', 'Golgari', 'Dimir', 'Izzet', 'Rakdos'] as const;
type GUILD = typeof GUILDS[number];

export const userData = sqliteTable('users', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	username: text().notNull(),
	title: text({enum: ["Lord", "Lady"],}),
	games: text({mode: 'json'}).$type<GAME[]>(),
	commanders: text({mode: 'json'}).$type<string[]>(),
	favoriteGuild: text({enum: GUILDS }),
	socialSecurity: text(),
});

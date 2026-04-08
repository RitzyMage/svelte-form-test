import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { TITLES, type GAME, GUILDS } from '../../data';

export const userData = sqliteTable('users', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	username: text().notNull(),
	title: text({enum: TITLES}),
	games: text({mode: 'json'}).$type<GAME[]>(),
	commanders: text({mode: 'json'}).$type<string[]>(),
	favoriteGuild: text({enum: GUILDS }),
	socialSecurity: text(),
});

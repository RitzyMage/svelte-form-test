import * as v from 'valibot';
import { form } from '$app/server';
import { GAMES, GUILDS, TITLES } from '$lib/server/db/schema';

export const updateUser = form(
	v.pipe(v.object({
        username: v.pipe(v.string(), v.nonEmpty()),
		title: v.picklist(TITLES),
		games: v.array(v.picklist(GAMES)),
        commanders: v.optional(v.array(v.string())),
        favoriteGuild: v.optional(v.picklist(GUILDS)),
        socialSecurity: v.string(),
	}), v.check(_ => { 
        if (_.games.includes('Magic: The Gathering')) {
            return Boolean(_.commanders?.length && _.favoriteGuild);
        }
        return true
    }, 'Must add MTG info!')),
	async (info) => {
        console.log('SERVER ACTION', info);
    }
);

export type UserFormAction = typeof updateUser;
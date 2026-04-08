import * as v from 'valibot';
import { form, query } from '$app/server';
import { GAMES, GUILDS, TITLES } from '$lib/data';
import type { RemoteForm } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { userData } from '$lib/server/db/schema';

const updateUserSchema = v.pipe(v.object({
        username: v.pipe(v.string(), v.nonEmpty()),
		title: v.picklist(TITLES),
		games: v.array(v.picklist(GAMES)),
        commanders: v.optional(v.array(v.pipe(v.string(), v.nonEmpty()))),
        favoriteGuild: v.optional(v.picklist(GUILDS)),
        socialSecurity: v.string(),
	}), v.check(_ => { 
        if (_.games.includes('Magic: The Gathering')) {
            return Boolean(_.commanders?.length && _.favoriteGuild);
        }
        return true
    }, 'Must add MTG info!'));

type InputType = v.InferInput<typeof updateUserSchema>
export type UserFormAction = RemoteForm<InputType, void>;

export const getUser = query(async() => {
    let existingUser = await db.select().from(userData).limit(1);
    return existingUser[0];
})

export const updateUser: UserFormAction = form(
	updateUserSchema,
	async (info) => {
        let existingUser = await db.select({id: userData.id}).from(userData);
        if (!existingUser.length) {
            await db.insert(userData).values(info);
        }
        else {
            await db.update(userData).set(info);
        }
    }
);



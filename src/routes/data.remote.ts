import * as v from 'valibot';
import { form } from '$app/server';
import { GAMES, GUILDS, TITLES } from '$lib/data';
import type { RemoteForm } from '@sveltejs/kit';

const updateUserSchema = v.pipe(v.object({
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
    }, 'Must add MTG info!'));

type InputType = v.InferInput<typeof updateUserSchema>
export type UserFormAction = RemoteForm<InputType, void>;

export const updateUser: UserFormAction = form(
	updateUserSchema,
	async (info) => {
        console.log('SERVER ACTION', info);
    }
);



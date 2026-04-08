import * as v from 'valibot';
import { form } from '$app/server';

export const updateUser = form(
	v.object({
		title: v.pipe(v.string(), v.nonEmpty()),
		content:v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ title, content }) => {
        console.log('SERVER ACTION', {title, content});
    }
);

export type userForm = typeof updateUser;
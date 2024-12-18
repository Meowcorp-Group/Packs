import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { hashPassword } from '$lib/server/auth/password';
import { checkEmail, checkPassword, checkUsername } from '$lib/server/auth/check';
import { eq } from 'drizzle-orm';
import { or } from 'drizzle-orm';
import { createSession, generateSessionToken } from '$lib/server/auth/session';
import { setSessionTokenCookie } from '$lib/server/auth/cookies';

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const username = data.get('username') as string;
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const confirmPassword = data.get('confirmPassword') as string;
		const name = data.get('name') as string;

		if (!username || !password || !confirmPassword)
			return fail(400, { username, email, error: 'All fields are required.' });

		if (password !== confirmPassword)
			return fail(400, { username, email, error: 'Passwords do not match.' });

		if (!checkPassword(password))
			return fail(400, {
				username,
				email,
				error: 'Password must be between 8 and 255 characters.'
			});

		if (!checkUsername(username))
			return fail(400, {
				username,
				email,
				error: 'Username must be between 3 and 255 characters.'
			});

		if (!checkEmail(email)) return fail(400, { username, email, error: 'Invalid email address.' });

		const existingUser = await db.query.users.findFirst({
			where: or(eq(users.email, email), eq(users.username, username))
		});

		if (existingUser) {
			if (existingUser.email === email)
				return fail(400, { username, email, error: 'Email already exists.' });
			if (existingUser.username === username)
				return fail(400, { username, email, error: 'Username already exists.' });
		}

		const hash = await hashPassword(password);

		const [user] = await db
			.insert(users)
			.values({
				username,
				email,
				password: hash,
				name
			})
			.returning();

		const token = generateSessionToken();
		const session = await createSession(token, user.id);
		setSessionTokenCookie(cookies, token, session.expiresAt);

		redirect(302, '/');
	}
} satisfies Actions;

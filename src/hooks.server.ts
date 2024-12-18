import type { Handle } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';
import { sequence } from '@sveltejs/kit/hooks';
import { validateSessionToken } from '$lib/server/auth/session';
import { deleteSessionTokenCookie, setSessionTokenCookie } from '$lib/server/auth/cookies';

const paraglideHandle: Handle = i18n.handle();

const authHandle: Handle = async ({event, resolve}) => {
	const token = event.cookies.get('session') ?? null;
	if (token === null) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await validateSessionToken(token);
	if (session !== null) {
		setSessionTokenCookie(event.cookies, token, session.expiresAt);
	} else {
		deleteSessionTokenCookie(event.cookies);
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
}

export const handle: Handle = sequence(authHandle, paraglideHandle);

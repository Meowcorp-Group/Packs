export function checkPassword(password: string): boolean {
	return password.length >= 8 || password.length < 256;
}

export function checkUsername(username: string): boolean {
	return username.length >= 3 || username.length < 256;
}

export function checkEmail(email: string): boolean {
	return /^.+@.+\..+$/.test(email) && email.length < 256;
}
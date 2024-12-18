<script lang="ts">
	import { enhance } from "$app/forms";
	import { Button, Label } from "bits-ui";
</script>

<form method="POST" use:enhance>
	<Label.Root for="email">Email</Label.Root>
	<input type="email" id="email" name="email" required />
	<Label.Root for="username">Username</Label.Root>
	<input type="text" id="username" name="username" required />
	<Label.Root for="name">Display name</Label.Root>
	<input type="text" id="name" name="name" required />
	<Label.Root for="password">Password</Label.Root>
	<input type="password" id="password" name="password" required />
	<Label.Root for="confirmPassword">Confirm password</Label.Root>
	<input type="password" id="confirmPassword" name="confirmPassword" required />

	<Button.Root type="submit">Register</Button.Root>
</form>
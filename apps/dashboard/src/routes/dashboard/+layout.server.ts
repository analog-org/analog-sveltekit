import { redirect } from '@sveltejs/kit';
import { signIn } from "@auth/sveltekit/client"
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth();
  if (!session?.user) throw redirect(303, '/auth/signin');
  return {};
};
import { redirect } from '@sveltejs/kit';
import { signIn } from "@auth/sveltekit/client"
import type { LayoutServerLoad } from "./$types";
import { page } from "$app/stores";

export const load: LayoutServerLoad = async ({ locals, parent }) => {
  const session = await locals.auth();
  const parentData = await parent();
  console.log(parentData)
  if (!session?.user) throw redirect(303, '/auth/signin');
  return {
  };
};
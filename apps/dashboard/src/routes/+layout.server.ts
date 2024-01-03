import { REST } from '@discordjs/rest';
import type { LayoutServerLoad } from "./$types";
import { Routes, type APIUser } from 'discord-api-types/v10'
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_BOT_TOKEN} from "$env/static/private";


export const load: LayoutServerLoad = async (event) => {
  const currentSession = await event.locals.getSession();
  const botRest = new REST({authPrefix: 'Bot'}).setToken(DISCORD_BOT_TOKEN);
  const botInfo = await botRest.get(Routes.user('@me'));

  if (currentSession) {
    //@ts-ignore
    const accessToken = currentSession.accessToken;
    //@ts-ignore
    const discordUser: APIUser = currentSession.discordUser;

    const userRest = new REST({authPrefix: 'Bearer'}).setToken(accessToken);

    const userInfo = await userRest.get(Routes.user('@me'));
    
    

    return {
      session: currentSession,
      user: userInfo,
      
    }
  }

  return {
    session: currentSession,bot: botInfo,
  }
}
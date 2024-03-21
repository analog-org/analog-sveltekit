import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

import { Routes, type APIUser, type APIGuild } from "discord-api-types/v10";
import { PermissionFlagsBits } from "discord-api-types/v10";
import { BitField, enumToObject } from "@sapphire/bitfield";
import { REST } from "@discordjs/rest";
import Vibrant from "node-vibrant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const loadUserInfo = async ({ locals }, botToken: string) => {
  const currentSession = await locals.auth();
  const botRest = new REST({ authPrefix: "Bot" }).setToken(botToken);
  const botInfo = await botRest
    .get(Routes.user("@me"))
    .then((res) => res as APIUser);
  const botGuilds = await botRest
    .get(Routes.userGuilds())
    .then((res) => res as APIGuild[]);

  const botAccent = await Vibrant.from(
    `https://cdn.discordapp.com/avatars/${botInfo?.id}/${botInfo?.avatar}.png?size=1024&format=webp&quality=lossless&width=0&height=256`
  )
    .getPalette()
    .then((palette) => palette.Vibrant?.hex);

  if (currentSession) {
    //@ts-ignore
    const accessToken = currentSession.accessToken;
    //@ts-ignore
    const discordUser: APIUser = currentSession.discordUser;

    const userRest = new REST({ authPrefix: "Bearer" }).setToken(accessToken);

    const userInfo = await userRest
      .get(Routes.user("@me"))
      .then((res) => res as APIUser);
    const userGuilds = await userRest
      .get(Routes.userGuilds())
      .then((res) => res as APIGuild[]);

    const adminGuilds = userGuilds.filter((guild) => {
      const p: bigint = BigInt(!guild?.permissions);
      const PermissionsBitField = new BitField(
        enumToObject(PermissionFlagsBits)
      );
      const hasManageGuild =
        PermissionsBitField.has(p, PermissionFlagsBits.Administrator) ||
        PermissionsBitField.has(p, PermissionFlagsBits.ManageGuild);
      if (guild.owner || hasManageGuild) return guild;
    });

    const mutualGuilds = adminGuilds.filter((guild) => {
      return botGuilds.some((botGuild) => botGuild.id === guild?.id);
    });

    const joinAbleGuilds = adminGuilds.filter((guild) => {
      return !botGuilds.some((botGuild) => botGuild.id === guild?.id);
    });

    return {
      session: currentSession,
      user: userInfo,
      bot: botInfo,
      botColor: botAccent,
      userGuilds: adminGuilds,
      mutualGuilds: mutualGuilds,
      joinAbleGuilds: joinAbleGuilds,
    };
  }

  return {
    session: currentSession,
    bot: botInfo,
    botColor: botAccent,
  };
};

type FlyAndScaleParams = {
  y?: number;
  x?: number;
  start?: number;
  duration?: number;
};

export const flyAndScale = (
  node: Element,
  params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;

  const scaleConversion = (
    valueA: number,
    scaleA: [number, number],
    scaleB: [number, number]
  ) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;

    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;

    return valueB;
  };

  const styleToString = (
    style: Record<string, number | string | undefined>
  ): string => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str;
      return str + `${key}:${style[key]};`;
    }, "");
  };

  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t,
      });
    },
    easing: cubicOut,
  };
};

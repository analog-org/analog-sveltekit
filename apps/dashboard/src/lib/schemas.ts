import { z } from "zod";

const EmbedField = z.object({
  name: z.string().max(256),
  value: z.string().max(1024),
  inline: z.boolean().optional(),
});

const EmbedFooter = z.object({
  text: z.string().max(2048),
  icon_url: z.string().url().optional(),
  proxy_icon_url: z.string().url().optional(),
});

const EmbedAuthor = z.object({
  name: z.string().max(256),
  url: z.string().url().optional(),
  icon_url: z.string().url().optional(),
  proxy_icon_url: z.string().url().optional(),
});

const EmbedProvider = z.object({
  name: z.string().optional(),
  url: z.string().url().optional(),
});

const EmbedImage = z.object({
  url: z.string().url(),
  proxy_url: z.string().url().optional(),
  height: z.number().optional(),
  width: z.number().optional(),
});

const EmbedVideo = z.object({
  url: z.string().url().optional(),
  proxy_url: z.string().url().optional(),
  height: z.number().optional(),
  width: z.number().optional(),
});

const EmbedThumbnail = z.object({
  url: z.string().url(),
  proxy_url: z.string().url().optional(),
  height: z.number().optional(),
  width: z.number().optional(),
});

export const Embed = z
  .object({
    title: z.string().max(256).optional(),
    type: z.string().optional(),
    description: z.string().max(4096).optional(),
    url: z.string().url().optional(),
    timestamp: z.string().optional(),
    color: z.number().optional(),
    footer: EmbedFooter.optional(),
    image: EmbedImage.optional(),
    thumbnail: EmbedThumbnail.optional(),
    video: EmbedVideo.optional(),
    provider: EmbedProvider.optional(),
    author: EmbedAuthor.optional(),
    fields: z.array(EmbedField).max(25).optional(),
  });

export const messageSchema = z.object({
  content: z.string().max(2000).optional(),
  channel: z.string(),
  embeds: z.array(Embed).max(10).optional().default([{ }]),
});

export type MessageSchema = typeof messageSchema;
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const statsSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1)
});

export const siteSettingsSchema = z.object({
  key: z.string().optional(),
  heroTitle: z.string().min(1),
  heroSubtitle: z.string().min(1),
  ctaPrimaryText: z.string().min(1),
  ctaPrimaryUrl: z.string().min(1),
  ctaSecondaryText: z.string().min(1),
  ctaSecondaryUrl: z.string().min(1),
  androidUrl: z.string().url().or(z.literal("")),
  iosUrl: z.string().url().or(z.literal("")),
  socials: z.object({
    facebook: z.string().optional().nullable(),
    instagram: z.string().optional().nullable(),
    tiktok: z.string().optional().nullable(),
    youtube: z.string().optional().nullable(),
    whatsapp: z.string().optional().nullable()
  }),
  stats: z.array(statsSchema).optional(),
  activeTheme: z.string().optional()
});

export const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  coverImageUrl: z.string().optional(),
  isActive: z.boolean().optional()
});

export const blogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  contentType: z.enum(["markdown", "html"]).optional(),
  coverImageUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  published: z.boolean().optional()
});

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(3)
});

export const pageSchema = z.object({
  key: z.enum(["privacy", "terms"]),
  title: z.string().min(1),
  content: z.string().min(1),
  contentType: z.enum(["markdown", "html"]).optional()
});

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  disabled: z.boolean().optional()
});

export const themeSchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  tokens: z.object({
    primary: z.string().min(1),
    primaryLight: z.string().min(1),
    primaryDark: z.string().min(1),
    accent: z.string().optional(),
    background: z.string().min(1),
    surface: z.string().min(1),
    text: z.string().min(1),
    muted: z.string().min(1),
    border: z.string().min(1),
    gradientFrom: z.string().min(1),
    gradientTo: z.string().min(1),
    radius: z.string().optional(),
    ring: z.string().optional(),
    fontFamily: z.string().optional()
  })
});

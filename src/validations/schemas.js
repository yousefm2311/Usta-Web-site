import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const statsSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1)
});

const featureSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().optional()
});

const testimonialSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  quote: z.string().min(1)
});

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1)
});

const contactCardSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  meta: z.string().optional()
});

export const siteSettingsSchema = z.object({
  key: z.string().optional(),
  heroTitle: z.string().min(1),
  heroSubtitle: z.string().min(1),
  heroKicker: z.string().optional(),
  heroChips: z.array(z.string()).optional(),
  heroCardBadge: z.string().optional(),
  heroCardStatus: z.string().optional(),
  heroCardTitle: z.string().optional(),
  heroCardDescription: z.string().optional(),
  heroCardTrend: z.string().optional(),
  heroCardArrivalLabel: z.string().optional(),
  heroCardArrivalValue: z.string().optional(),
  trustText: z.string().optional(),
  trustBadges: z.array(z.string()).optional(),
  ctaPrimaryText: z.string().min(1),
  ctaPrimaryUrl: z.string().min(1),
  ctaSecondaryText: z.string().min(1),
  ctaSecondaryUrl: z.string().min(1),
  androidUrl: z.string().url().or(z.literal("")),
  iosUrl: z.string().url().or(z.literal("")),
  homeServicesKicker: z.string().optional(),
  homeServicesTitle: z.string().optional(),
  homeServicesSubtitle: z.string().optional(),
  homeServicesButtonText: z.string().optional(),
  homeWhyKicker: z.string().optional(),
  homeWhyTitle: z.string().optional(),
  homeHowKicker: z.string().optional(),
  homeHowTitle: z.string().optional(),
  homeTestimonialsKicker: z.string().optional(),
  homeTestimonialsTitle: z.string().optional(),
  homeFaqKicker: z.string().optional(),
  homeFaqTitle: z.string().optional(),
  homeFaqSubtitle: z.string().optional(),
  homeBlogKicker: z.string().optional(),
  homeBlogTitle: z.string().optional(),
  homeBlogButtonText: z.string().optional(),
  homeCtaTitle: z.string().optional(),
  homeCtaSubtitle: z.string().optional(),
  homeHighlights: z.array(featureSchema).optional(),
  homeSteps: z.array(featureSchema).optional(),
  homeTestimonials: z.array(testimonialSchema).optional(),
  homeFaqs: z.array(faqSchema).optional(),
  aboutKicker: z.string().optional(),
  aboutTitle: z.string().optional(),
  aboutSubtitle: z.string().optional(),
  aboutChips: z.array(z.string()).optional(),
  aboutPromiseTitle: z.string().optional(),
  aboutPromiseBody: z.string().optional(),
  aboutPromiseStats: z.array(statsSchema).optional(),
  aboutMissionTitle: z.string().optional(),
  aboutMissionBody: z.string().optional(),
  aboutVisionTitle: z.string().optional(),
  aboutVisionBody: z.string().optional(),
  aboutValuesKicker: z.string().optional(),
  aboutValuesTitle: z.string().optional(),
  aboutValues: z.array(z.string()).optional(),
  servicesPageKicker: z.string().optional(),
  servicesPageTitle: z.string().optional(),
  servicesPageSubtitle: z.string().optional(),
  servicesStepsKicker: z.string().optional(),
  servicesStepsTitle: z.string().optional(),
  servicesSteps: z.array(featureSchema).optional(),
  servicesCategoriesKicker: z.string().optional(),
  servicesCategoriesTitle: z.string().optional(),
  servicesChipText: z.string().optional(),
  serviceDetailKicker: z.string().optional(),
  serviceDetailStepsKicker: z.string().optional(),
  serviceDetailStepsTitle: z.string().optional(),
  serviceDetailSteps: z.array(z.string()).optional(),
  serviceDetailGuaranteesTitle: z.string().optional(),
  serviceDetailGuarantees: z.array(z.string()).optional(),
  serviceDetailCtaTitle: z.string().optional(),
  serviceDetailCtaSubtitle: z.string().optional(),
  serviceDetailCtaButton: z.string().optional(),
  contactKicker: z.string().optional(),
  contactTitle: z.string().optional(),
  contactSubtitle: z.string().optional(),
  contactEmail: z.string().optional(),
  contactNote: z.string().optional(),
  contactCards: z.array(contactCardSchema).optional(),
  downloadKicker: z.string().optional(),
  downloadTitle: z.string().optional(),
  downloadSubtitle: z.string().optional(),
  downloadPerks: z.array(z.string()).optional(),
  downloadCardTitle: z.string().optional(),
  downloadCardBody: z.string().optional(),
  downloadBullets: z.array(z.string()).optional(),
  downloadAndroidLabel: z.string().optional(),
  downloadIosLabel: z.string().optional(),
  blogKicker: z.string().optional(),
  blogTitle: z.string().optional(),
  blogSubtitle: z.string().optional(),
  footerDescription: z.string().optional(),
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

# Usta Website

Production-ready company website and admin dashboard built with Next.js App Router, MongoDB, and TailwindCSS.

## Features
- Arabic-first RTL marketing site
- Admin dashboard with NextAuth credentials login
- MongoDB (Mongoose) models and modular services
- Content management for hero, categories, blog, and static pages
- File upload to `/public/uploads`

## Setup
1. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
2. Update `.env.local` with your MongoDB URI and secrets.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Seed initial data (uses `.env.local`):
    ```bash
    npm run seed
    ```
5. Run the dev server:
   ```bash
   npm run dev
   ```

## Default Admin
- Email: `admin@usta.com`
- Password: `Admin@12345`

## Content Editing
- Hero, CTA, stats, socials: `/admin/site-settings`
- Categories: `/admin/categories`
- Blog posts: `/admin/blog`
- Privacy/Terms: `/admin/pages`
- Messages: `/admin/messages`
- Themes: `/admin/themes`

Themes support JSON import/export. The active theme updates CSS variables across the site.

## Uploads
Files uploaded through admin are stored in `public/uploads` for local development.

## Build
```bash
npm run build
npm start
```

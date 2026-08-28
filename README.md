<div align="center">
  <img src="public/Logo.png" alt="Usta Logo" width="120" />

  # Usta Platform

  **A modern platform connecting artisans with clients, featuring a comprehensive Admin Dashboard (CMS).**

  [![عربي](https://img.shields.io/badge/Language-Arabic-green?style=for-the-badge)](README.ar.md)

  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=Next.js&logoColor=white)](https://next-auth.js.org/)
  [![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
</div>

---

## 📖 Overview

**Usta** is a production-ready web application built to connect customers with professional artisans (plumbers, electricians, carpenters, etc.). The frontend is designed as a fully responsive **Arabic-first (RTL)** marketing site. 

Beyond the public-facing pages, Usta includes a powerful and secure **Admin Dashboard / CMS**, allowing system administrators to fully manage site content, blog posts, service categories, layout themes, and static pages without touching a single line of code.

---

## ✨ Key Features & System Details

### 1. User Interface (Frontend)
* **Native RTL Support:** TailwindCSS is configured out-of-the-box to seamlessly handle Right-to-Left layouts for Arabic users.
* **Fully Responsive:** Optimized for Mobile, Tablet, and Desktop viewing.
* **High Performance:** Utilizes Next.js App Router for optimal Server-Side Rendering (SSR) and Static Site Generation (SSG).

### 2. Admin Dashboard & CMS
* **Secure Authentication:** Protected admin routes using NextAuth.js (Credentials Provider) and `bcryptjs` for password hashing.
* **Site Settings Management:** Dynamically edit homepage content (Hero text, Call-to-actions, Testimonials, FAQs, Stats) directly from the dashboard.
* **Blog System:** Built-in markdown editor for writing and publishing blog posts.
* **Static Pages:** Manage dynamic content for standard pages like "Privacy Policy" and "Terms & Conditions".
* **Dynamic Theme Engine:** Switch between 5 pre-built color themes (Default, Sand, Royal Purple, Ocean Teal, Velvet Rose). The system dynamically updates Tailwind CSS variables stored in the database.
* **Secure File Uploads:** Upload images and files directly from the dashboard, safely stored locally in `public/uploads`.

### 3. Architecture & Backend
* **Modular MVC-like Structure:** Clear separation of concerns between Mongoose Models, Business Logic (Services), and Next.js API Routes.
* **Strict Validation:** All incoming data is validated and typed using Zod schemas.
* **XSS Protection:** Markdown inputs are heavily sanitized using the `sanitize-html` library before rendering.

---

## 🏗 Directory Structure

```text
src/
├── app/                  # Next.js 14/15 App Router
│   ├── (marketing)/      # Public facing pages (Home, About, Services, Blog, etc.)
│   ├── admin/            # Admin dashboard and CMS pages
│   └── api/              # API endpoints for frontend and admin operations
├── components/           # Reusable UI components
│   ├── admin/            # Dashboard specific components (Sidebar, Topbar)
│   └── forms/            # Form inputs and handlers
├── lib/                  # Utilities (NextAuth config, DB connection, sanitization)
├── models/               # Mongoose schemas (AdminUser, Category, Theme, etc.)
├── services/             # Business logic layer interacting with the database
└── validations/          # Zod schemas for request validation
scripts/
├── seed.mjs              # Script to populate the DB with default data and themes
└── repair-arabic.mjs     # Utility script to fix Arabic mojibake encoding issues
```

---

## 🚀 Getting Started

### Prerequisites
* Node.js v18+
* MongoDB database (Local `localhost:27017` or MongoDB Atlas)
* `npm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Usta-Web-site
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Copy the provided `.env.example` file and rename it to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *Important: Provide a valid `MONGODB_URI` and generate a `NEXTAUTH_SECRET` (e.g., using `openssl rand -base64 32`).*

4. **Seed the Database:**
   Run the seed script to create the default Admin account, categories, dummy blog post, default themes, and static pages.
   ```bash
   npm run seed
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🔐 Default Admin Credentials
After running the seed script, you can log in to the admin dashboard at `/admin/login` using:
* **Email:** `admin@usta.com`
* **Password:** `Admin@12345`

*(Highly recommended: Change these credentials immediately after your first login).*

---

## 🛠 Production Deployment
To build the application for a production environment (like Vercel, or a VPS):
```bash
npm run build
npm start
```
*Note: Ensure that the `public/uploads` directory is handled properly if deploying to a serverless environment like Vercel, as local file storage is ephemeral.*

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).

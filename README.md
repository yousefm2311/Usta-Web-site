<div align="center">
  <!-- مسار لوجو المشروع لو موجود -->
  <img src="public/Logo.png" alt="Usta Logo" width="120" />

  # منصة أسطى (Usta Website)

  **منصة متكاملة لربط الحرفيين بالعملاء بأسلوب عصري، مع لوحة تحكم إدارية احترافية.**

  <!-- شارات التقنيات -->
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=Next.js&logoColor=white)](https://next-auth.js.org/)
</div>

---

## 📖 نظرة عامة (Overview)

منصة **أُسطى (Usta)** هي منصة ويب جاهزة للإنتاج (Production-ready) مبنية باستخدام أحدث تقنيات الويب. تهدف المنصة إلى تسهيل الربط بين العملاء والحرفيين (السباكة، الكهرباء، النجارة، وغيرها) لتقديم خدمات صيانة موثوقة. تأتي المنصة بواجهة مستخدم موجهة بالكامل باللغة العربية (RTL) بالإضافة إلى لوحة تحكم (Dashboard) متكاملة لإدارة المحتوى، المقالات، الخدمات، وتخصيص هوية الموقع بالكامل (Themes) دون الحاجة للمس الكود.

---

## ✨ المميزات الأساسية (Key Features)

* **واجهة مستخدم احترافية (RTL-First):** تصميم عصري ومتجاوب بالكامل باستخدام Tailwind CSS موجه للغة العربية.
* **لوحة تحكم إدارية متكاملة:** إدارة جميع أجزاء الموقع من خلال لوحة تحكم مؤمنة بنظام NextAuth.
* **إدارة المحتوى الديناميكي (CMS):** التحكم في نصوص الصفحة الرئيسية (Hero, Stats, Testimonials, FAQs).
* **نظام التدوين والصفحات الثابتة:** كتابة مقالات وصفحات ثابتة (مثل سياسة الخصوصية) باستخدام الـ Markdown.
* **إدارة الأقسام والخدمات:** إضافة وتعديل أقسام الخدمات المُقدمة للحرفيين.
* **نظام الثيمات (Theme Management):** تغيير ألوان وتصميم الموقع بالكامل من لوحة التحكم بضغطة زر مع دعم للاستيراد والتصدير.
* **إدارة رسائل التواصل:** استقبال وإدارة طلبات التواصل من الزوار.
* **رفع وإدارة الملفات:** رفع الصور محلياً داخل `public/uploads` بشكل تلقائي وآمن.

---

## 🏗 بنية النظام والتقنيات (Architecture & Tech Stack)

يعتمد المشروع على بنية **App Router** من Next.js ومقسم بشكل يتبع أفضل الممارسات المعمارية الحديثة:

* **إطار عمل الواجهة (UI Framework):** [Next.js 14/15 (App Router)](https://nextjs.org/) + React 19
* **تصميم الواجهة (Styling):** [Tailwind CSS v4](https://tailwindcss.com/)
* **قاعدة البيانات (Database):** [MongoDB](https://www.mongodb.com/) باستخدام [Mongoose](https://mongoosejs.com/) كـ ORM
* **المصادقة (Authentication):** [NextAuth.js](https://next-auth.js.org/) (Credentials Provider)
* **التحقق من البيانات (Validation):** [Zod](https://zod.dev/) للتحقق من المدخلات و API Requests
* **تحليل النصوص (Markdown):** `marked` و `sanitize-html` لحماية الموقع من الـ XSS

### هيكلة المشروع (Directory Structure)
```text
src/
├── app/                  # مسارات صفحات الموقع وتطبيقات الـ API
│   ├── (marketing)/      # واجهة الموقع العامة للزوار (Home, About, Services, ...)
│   ├── admin/            # لوحة تحكم الإدارة (Dashboard) مؤمنة بالكامل
│   └── api/              # نقاط نهاية واجهات برمجة التطبيقات (API Routes)
├── components/           # المكونات البرمجية القابلة لإعادة الاستخدام (Navbar, Footer, Cards)
│   ├── admin/            # مكونات لوحة التحكم (Sidebar, Topbar, ...)
│   └── forms/            # مكونات النماذج
├── lib/                  # مكتبات مساعدة (Auth, DB connection, Markdown)
├── models/               # مخططات قاعدة البيانات (Mongoose Schemas)
├── services/             # طبقة العمليات المنطقية للتعامل مع قاعدة البيانات (Business Logic)
└── validations/          # مخططات التحقق من صحة البيانات باستخدام Zod (Zod Schemas)
```

---

## 🚀 دليل التشغيل (Getting Started)

### المتطلبات الأساسية (Prerequisites)
* Node.js (الإصدار 18 فما فوق)
* قاعدة بيانات MongoDB (محلية `localhost:27017` أو سحابية `MongoDB Atlas`)
* npm أو yarn

### خطوات التثبيت (Installation)

1. **نسخ المشروع:**
   ```bash
   git clone <repository-url>
   cd Usta-Web-site
   ```

2. **تثبيت الحزم البرمجية:**
   ```bash
   npm install
   ```

3. **إعداد المتغيرات البيئية (Environment Variables):**
   قم بنسخ ملف `.env.example` إلى ملف جديد باسم `.env.local`، ثم أضف بيانات الاتصال الخاصة بك.
   ```bash
   cp .env.example .env.local
   ```
   *ملاحظة: تأكد من إضافة `MONGODB_URI` صحيح بالإضافة إلى `NEXTAUTH_SECRET` (يمكنك توليده عبر الأمر `openssl rand -base64 32`).*

4. **تهيئة قاعدة البيانات (Seeding):**
   هذا الأمر سيقوم بإنشاء الحساب الإداري الافتراضي وإضافة المحتوى الأساسي والثيمات في قاعدة البيانات:
   ```bash
   npm run seed
   ```

5. **تشغيل بيئة التطوير (Run Development Server):**
   ```bash
   npm run dev
   ```
   افتح المتصفح على [http://localhost:3000](http://localhost:3000).

---

## 🔐 بيانات الدخول للإدارة (Default Admin)

بعد تشغيل أمر الـ Seed، سيتم إنشاء حساب مدير افتراضي يمكنك الدخول به إلى لوحة التحكم من خلال المسار `/admin/login`:
* **البريد الإلكتروني:** `admin@usta.com`
* **كلمة المرور:** `Admin@12345`

*(يُرجى تغيير كلمة المرور أو إضافة حساب مدير جديد بعد تسجيل الدخول لأول مرة).*

---

## 🛠 البناء لبيئة الإنتاج (Production Build)

لتحضير المشروع ورفعه لبيئة الإنتاج الحقيقية:
```bash
npm run build
npm start
```

---

## 📄 الترخيص (License)
هذا المشروع متاح تحت ترخيص [MIT License](LICENSE) - يمكنك تخصيصه والتعديل عليه بما يتناسب مع احتياجات أعمالك.

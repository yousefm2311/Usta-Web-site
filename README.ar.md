<div align="center">
  <img src="public/Logo.png" alt="Usta Logo" width="120" />

  # منصة أُسطى (Usta Platform)

  **منصة متطورة لربط الحرفيين بالعملاء مع لوحة تحكم إدارية متكاملة (CMS).**

  [![English](https://img.shields.io/badge/Language-English-blue?style=for-the-badge)](README.md)
  
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=Next.js&logoColor=white)](https://next-auth.js.org/)
  [![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
</div>

---

## 📖 نظرة عامة (Overview)

منصة **أُسطى (Usta)** هي تطبيق ويب احترافي وجاهز للإنتاج، صُمم خصيصاً لتوفير تجربة سلسة تربط بين العملاء والحرفيين (سباكة، كهرباء، نجارة، وغيرها). تم بناء الواجهة الأساسية بنظام (RTL-First) لتدعم اللغة العربية بشكل أصيل، كما يتضمن المشروع لوحة تحكم إدارية قوية (Dashboard / CMS) تُمكّن مسؤولي النظام من التحكم الكامل في محتوى الموقع، الأقسام، المقالات، الإحصائيات، وتخصيص المظهر (الثيمات) دون الحاجة للتدخل في الكود المصدري.

---

## ✨ المميزات الرئيسية وتفاصيل النظام (Key Features)

### 1. واجهة المستخدم (User Interface)
* **دعم العربية أصلياً (RTL):** تم تخصيص إعدادات TailwindCSS لتعمل بسلاسة مع الاتجاه من اليمين لليسار.
* **متجاوب بالكامل:** تصميم يضمن تجربة مستخدم ممتازة على الهواتف والأجهزة اللوحية والمكتبية.
* **تحميل سريع للبيانات:** الاستفادة من قوة Next.js App Router في عمليات الـ Server-Side Rendering (SSR) والـ Static Site Generation (SSG).

### 2. لوحة التحكم والإدارة (Admin Dashboard & CMS)
* **المصادقة والحماية:** لوحة تحكم مؤمنة بالكامل باستخدام NextAuth.js (Credentials Provider) وتشفير كلمات المرور بواسطة `bcryptjs`.
* **إدارة محتوى الموقع (Site Settings):** القدرة على تعديل نصوص الصفحة الرئيسية (Hero Section)، الإحصائيات، قسم "كيف نعمل"، وآراء العملاء (Testimonials).
* **نظام التدوين (Blog System):** إنشاء وتحرير المقالات باستخدام محرر Markdown.
* **الصفحات الثابتة (Static Pages):** إنشاء وإدارة صفحات مثل (سياسة الخصوصية، الشروط والأحكام).
* **نظام الثيمات الديناميكي:** يمكن للمدير الاختيار بين 5 ثيمات جاهزة (الافتراضي، رملي، بنفسجي ملكي، فيروزي بحري، وردي مخملي) والتي تقوم تلقائياً بتحديث متغيرات الـ CSS المتصلة بـ Tailwind.
* **إدارة الملفات (Uploads):** نظام رفع ملفات آمن يحفظ الصور في مجلد `public/uploads`.

### 3. البنية التحتية والتقنيات (Architecture & Backend)
* **هيكلة MVC مصغرة:** فصل تام بين الـ Models، والـ Services، والـ Controllers (Next.js API Routes).
* **تحقق صارم للبيانات:** جميع المدخلات تمر عبر Zod Schemas لضمان صحة البيانات قبل إرسالها لقاعدة البيانات.
* **تأمين ضد هجمات XSS:** استخدام مكتبة `sanitize-html` لتنظيف مدخلات الـ Markdown.

---

## 🏗 هيكلة المشروع (Directory Structure)

```text
src/
├── app/                  # Next.js 14/15 App Router
│   ├── (marketing)/      # الصفحات العامة (الرئيسية، من نحن، الخدمات، المدونة)
│   ├── admin/            # صفحات لوحة التحكم (الداشبورد، إدارة المحتوى، الإعدادات)
│   └── api/              # واجهات برمجة التطبيقات (API endpoints) لخدمة الواجهة ولوحة التحكم
├── components/           # المكونات البرمجية القابلة لإعادة الاستخدام
│   ├── admin/            # أجزاء لوحة التحكم (Sidebar, Topbar, Shell)
│   └── forms/            # الحقول والنماذج المخصصة
├── lib/                  # مكتبات المساعدة (إعدادات Auth, التوصيل بـ DB, تنظيف HTML)
├── models/               # مخططات قاعدة البيانات (Mongoose: AdminUser, Category, Theme...)
├── services/             # طبقة الـ Business Logic المسؤولة عن العمليات المباشرة مع قاعدة البيانات
└── validations/          # مخططات Zod لضمان صحة البيانات قبل معالجتها
scripts/
├── seed.mjs              # سكريبت لتهيئة النظام وإنشاء حساب المدير والثيمات الافتراضية
└── repair-arabic.mjs     # أداة مساعدة لإصلاح مشاكل ترميز اللغة العربية (Mojibake)
```

---

## 🚀 دليل التشغيل والتثبيت (Getting Started)

### المتطلبات (Prerequisites)
* Node.js v18+
* قاعدة بيانات MongoDB (مثلاً `mongodb://localhost:27017/usta`)
* `npm` أو `yarn`

### خطوات التشغيل (Installation)

1. **تحميل المستودع:**
   ```bash
   git clone <repository-url>
   cd Usta-Web-site
   ```

2. **تثبيت الحزم البرمجية:**
   ```bash
   npm install
   ```

3. **إعداد المتغيرات البيئية:**
   انسخ ملف `.env.example` وقم بتسميته `.env.local`، ثم أضف الإعدادات الخاصة بك:
   ```bash
   cp .env.example .env.local
   ```
   *ملاحظة هامة: يجب إضافة `NEXTAUTH_SECRET` للحماية. (يمكنك إنشاء واحد عبر أمر `openssl rand -base64 32`).*

4. **تهيئة البيانات الأولية (Seeding):**
   يقوم هذا السكريبت بإنشاء حساب المدير الافتراضي، الأقسام الأساسية، مقال تجريبي، الثيمات، والصفحات الثابتة.
   ```bash
   npm run seed
   ```

5. **تشغيل المشروع:**
   ```bash
   npm run dev
   ```
   افتح [http://localhost:3000](http://localhost:3000) لتصفح الموقع.

---

## 🔐 حساب الإدارة الافتراضي (Default Admin Credentials)
بعد تشغيل السكريبت الخاص بالتهيئة (Seed)، يمكنك الدخول إلى لوحة التحكم من خلال المسار `/admin/login` باستخدام:
* **البريد:** `admin@usta.com`
* **كلمة المرور:** `Admin@12345`

*(ينصح بتغيير هذه البيانات فور تسجيل الدخول لأول مرة للمحافظة على أمان النظام).*

---

## 🛠 البناء لبيئة الإنتاج (Production Deployment)
عند الرفع على خوادم فعلية (مثل Vercel، أو خوادم VPS):
```bash
npm run build
npm start
```
*تأكد من عدم رفع مجلد `public/uploads` أو ملفات `.env.local` لمستودع الـ Git الخاص بك.*

---

## 📄 الترخيص (License)
هذا المشروع متاح تحت ترخيص [MIT License](LICENSE).

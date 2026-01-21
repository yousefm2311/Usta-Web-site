import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import AdminUser from "../src/models/AdminUser.js";
import SiteSettings from "../src/models/SiteSettings.js";
import Category from "../src/models/Category.js";
import BlogPost from "../src/models/BlogPost.js";
import StaticPage from "../src/models/StaticPage.js";
import Theme from "../src/models/Theme.js";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in environment");
  process.exit(1);
}

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  try {
    // 1) Admin seed (safe + idempotent)
    const adminEmail = "admin@usta.com";
    const existingAdmin = await AdminUser.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash("Admin@12345", 10);
      await AdminUser.create({
        name: "Admin",
        email: adminEmail,
        passwordHash,
        role: "admin",
        disabled: false,
      });
      console.log("✅ Admin user created");
    } else {
      console.log("ℹ️ Admin user already exists");
    }

    // 2) SiteSettings (upsert)
    await SiteSettings.updateOne(
      { key: "default" },
      {
        $setOnInsert: {
          key: "default",
          heroTitle: "اطلب أفضل الحرفيين في دقائق",
          heroSubtitle: "Usta منصة تربطك بحرفيين موثوقين لإنجاز أي مهمة بسرعة.",
          ctaPrimaryText: "حمّل التطبيق",
          ctaPrimaryUrl: "/download",
          ctaSecondaryText: "انضم كحرفي",
          ctaSecondaryUrl: "/contact",
          androidUrl: "https://play.google.com",
          iosUrl: "https://apple.com",
          stats: [
            { label: "حرفي معتمد", value: "+1200" },
            { label: "طلبات مكتملة", value: "+48K" },
            { label: "مدينة نخدمها", value: "16" },
          ],
          activeTheme: "default",
        },
      },
      { upsert: true },
    );
    console.log("✅ SiteSettings ensured");

    // 3) Categories (upsert each by slug)
    const categories = [
      {
        name: "كهرباء",
        slug: "electric",
        description: "حلول كهربائية آمنة",
        icon: "⚡",
        isActive: true,
      },
      {
        name: "سباكة",
        slug: "plumbing",
        description: "خدمات سباكة سريعة",
        icon: "🚿",
        isActive: true,
      },
      {
        name: "نجارة",
        slug: "carpentry",
        description: "تفصيل وتركيب احترافي",
        icon: "🪵",
        isActive: true,
      },
    ];

    for (const c of categories) {
      await Category.updateOne(
        { slug: c.slug },
        { $setOnInsert: c },
        { upsert: true },
      );
    }
    console.log("✅ Categories ensured");

    // 4) Blog post (upsert by slug)
    await BlogPost.updateOne(
      { slug: "choose-right-artisan" },
      {
        $setOnInsert: {
          title: "كيف تختار الحرفي المناسب؟",
          slug: "choose-right-artisan",
          excerpt: "نصائح عملية لاختيار الحرفي المناسب لخدمتك.",
          content:
            "# كيف تختار الحرفي المناسب؟\n\nاختر الحرفي بناءً على التقييمات، الخبرة، والالتزام بالمواعيد.\n\n## نصائح مهمة\n- راجع التقييمات السابقة\n- اطلب عرض سعر واضح\n- تواصل بوضوح قبل بدء العمل",
          contentType: "markdown",
          author: "فريق Usta",
          published: true,
          publishedAt: new Date(),
        },
      },
      { upsert: true },
    );
    console.log("✅ Blog post ensured");

    // 5) Themes (insert if empty) + ensure only ONE active theme
    const themeCount = await Theme.countDocuments();
    if (!themeCount) {
      await Theme.insertMany([
        {
          name: "الثيم الافتراضي",
          slug: "default",
          isActive: true,
          tokens: {
            primary: "#3b82f6",
            primaryLight: "#dbeafe",
            primaryDark: "#1d4ed8",
            accent: "#38bdf8",
            background: "#f8fafc",
            surface: "#ffffff",
            text: "#0f172a",
            muted: "#64748b",
            border: "#e2e8f0",
            gradientFrom: "#eff6ff",
            gradientTo: "#f8fafc",
            radius: "24px",
            ring: "rgba(59, 130, 246, 0.25)",
            fontFamily: "",
          },
        },
        {
          name: "ثيم رملي",
          slug: "sand",
          isActive: false,
          tokens: {
            primary: "#c08427",
            primaryLight: "#fef3c7",
            primaryDark: "#92400e",
            accent: "#f59e0b",
            background: "#fffbf5",
            surface: "#ffffff",
            text: "#3f2f1b",
            muted: "#7c6f63",
            border: "#eadfcb",
            gradientFrom: "#fff1db",
            gradientTo: "#fffbf5",
            radius: "22px",
            ring: "rgba(192, 132, 39, 0.25)",
            fontFamily: "",
          },
        },
        {
          name: "بنفسجي ملكي",
          slug: "royal-purple",
          isActive: false,
          tokens: {
            primary: "#7c3aed",
            primaryLight: "#ede9fe",
            primaryDark: "#5b21b6",
            accent: "#c084fc",
            background: "#f8f5ff",
            surface: "#ffffff",
            text: "#1f1b2e",
            muted: "#6b7280",
            border: "#e7ddff",
            gradientFrom: "#f3e8ff",
            gradientTo: "#f8f5ff",
            radius: "22px",
            ring: "rgba(124, 58, 237, 0.25)",
            fontFamily: "",
          },
        },
        {
          name: "فيروزي بحري",
          slug: "ocean-teal",
          isActive: false,
          tokens: {
            primary: "#0ea5e9",
            primaryLight: "#e0f2fe",
            primaryDark: "#0369a1",
            accent: "#06b6d4",
            background: "#f0f9ff",
            surface: "#ffffff",
            text: "#0f172a",
            muted: "#64748b",
            border: "#bae6fd",
            gradientFrom: "#e0f2fe",
            gradientTo: "#f0f9ff",
            radius: "24px",
            ring: "rgba(14, 165, 233, 0.25)",
            fontFamily: "",
          },
        },
        {
          name: "وردي مخملي",
          slug: "velvet-rose",
          isActive: false,
          tokens: {
            primary: "#ec4899",
            primaryLight: "#fce7f3",
            primaryDark: "#be185d",
            accent: "#fb7185",
            background: "#fff5f7",
            surface: "#ffffff",
            text: "#2b1b24",
            muted: "#7c6f77",
            border: "#fbcfe8",
            gradientFrom: "#fce7f3",
            gradientTo: "#fff5f7",
            radius: "22px",
            ring: "rgba(236, 72, 153, 0.22)",
            fontFamily: "",
          },
        },
      ]);
      console.log("✅ Themes created");
    } else {
      console.log("ℹ️ Themes already exist");
    }

    // Ensure only one active theme (default)
    await Theme.updateMany(
      { slug: { $ne: "default" } },
      { $set: { isActive: false } },
    );
    await Theme.updateOne({ slug: "default" }, { $set: { isActive: true } });
    console.log("✅ Active theme enforced: default");

    // 6) Static pages (upsert by key)
    await StaticPage.updateOne(
      { key: "privacy" },
      {
        $setOnInsert: {
          key: "privacy",
          title: "سياسة الخصوصية",
          content: "نحن نحترم خصوصيتك ونلتزم بحماية بياناتك.",
          contentType: "markdown",
        },
      },
      { upsert: true },
    );

    await StaticPage.updateOne(
      { key: "terms" },
      {
        $setOnInsert: {
          key: "terms",
          title: "الشروط والأحكام",
          content: "استخدامك لمنصة Usta يعني موافقتك على هذه الشروط.",
          contentType: "markdown",
        },
      },
      { upsert: true },
    );

    console.log("✅ Static pages ensured");
    console.log("🎉 Seeding completed successfully");
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected");
  }
}

run().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});

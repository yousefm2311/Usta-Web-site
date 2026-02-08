import dotenv from "dotenv";
import mongoose from "mongoose";

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

const MOJIBAKE_REGEX = /[ÃÂØÙâ]/;

const fixText = (value) => {
  if (typeof value !== "string") return value;
  if (!MOJIBAKE_REGEX.test(value)) return value;
  return Buffer.from(value, "latin1").toString("utf8");
};

const fixValue = (value) => {
  if (value instanceof Date) {
    return value;
  }
  if (value && value._bsontype === "ObjectId") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => fixValue(item));
  }
  if (value && typeof value === "object") {
    const result = {};
    Object.entries(value).forEach(([key, val]) => {
      result[key] = fixValue(val);
    });
    return result;
  }
  return fixText(value);
};

const updateDoc = async (Model, doc) => {
  const fixed = fixValue(doc.toObject());
  const { _id, __v, createdAt, updatedAt, ...update } = fixed;
  await Model.updateOne({ _id: doc._id }, { $set: update });
};

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  try {
    const settings = await SiteSettings.find();
    for (const doc of settings) {
      await updateDoc(SiteSettings, doc);
    }
    console.log("SiteSettings repaired");

    const categories = await Category.find();
    for (const doc of categories) {
      await updateDoc(Category, doc);
    }
    console.log("Categories repaired");

    const posts = await BlogPost.find();
    for (const doc of posts) {
      await updateDoc(BlogPost, doc);
    }
    console.log("Blog posts repaired");

    const pages = await StaticPage.find();
    for (const doc of pages) {
      await updateDoc(StaticPage, doc);
    }
    console.log("Static pages repaired");

    const themes = await Theme.find();
    for (const doc of themes) {
      await updateDoc(Theme, doc);
    }
    console.log("Themes repaired");

    console.log("Arabic text repair completed successfully");
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected");
  }
}

run().catch((error) => {
  console.error("Repair failed:", error);
  process.exit(1);
});

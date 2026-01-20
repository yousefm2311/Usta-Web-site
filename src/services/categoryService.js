import { dbConnect } from "@/lib/db";
import Category from "@/models/Category";

export async function getActiveCategories() {
  await dbConnect();
  const categories = await Category.find({ isActive: true }).sort({ createdAt: -1 });
  return categories.map((item) => item.toObject());
}

export async function getCategoryBySlug(slug) {
  await dbConnect();
  const category = await Category.findOne({ slug, isActive: true });
  return category ? category.toObject() : null;
}

import { dbConnect } from "@/lib/db";
import StaticPage from "@/models/StaticPage";

export async function getStaticPage(key) {
  await dbConnect();
  const page = await StaticPage.findOne({ key });
  return page ? page.toObject() : null;
}

export async function getStaticPages() {
  await dbConnect();
  const pages = await StaticPage.find().sort({ key: 1 });
  return pages.map((item) => item.toObject());
}

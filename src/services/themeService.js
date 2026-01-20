import { dbConnect } from "@/lib/db";
import Theme from "@/models/Theme";
import SiteSettings from "@/models/SiteSettings";

export async function getThemes() {
  await dbConnect();
  const items = await Theme.find().sort({ createdAt: -1 }).lean();
  return items;
}

export async function getActiveTheme() {
  await dbConnect();
  const activeTheme = await Theme.findOne({ isActive: true }).lean();
  if (activeTheme) {
    return activeTheme;
  }

  const settings = await SiteSettings.findOne().sort({ createdAt: -1 }).lean();
  const slug = settings?.activeTheme || "default";
  const theme = await Theme.findOne({ slug }).lean();
  return theme || (await Theme.findOne().sort({ createdAt: 1 }).lean());
}

export async function setActiveTheme(slug) {
  await dbConnect();
  await Theme.updateMany({}, { isActive: false });
  await Theme.findOneAndUpdate({ slug }, { isActive: true });
  await SiteSettings.findOneAndUpdate(
    {},
    { activeTheme: slug },
    { upsert: true, sort: { createdAt: -1 } }
  );
}

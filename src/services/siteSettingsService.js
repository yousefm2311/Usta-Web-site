import { dbConnect } from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";

const defaultStats = [
  { label: "حرفي معتمد", value: "+1200" },
  { label: "طلبات مكتملة", value: "+48K" },
  { label: "مدينة نخدمها", value: "16" }
];

export async function getSiteSettings() {
  await dbConnect();
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({ stats: defaultStats });
  }
  if (!settings.activeTheme) {
    settings.activeTheme = "default";
    await settings.save();
  }
  return settings.toObject();
}

export async function updateSiteSettings(payload) {
  await dbConnect();
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create(payload);
    return settings.toObject();
  }
  Object.assign(settings, payload);
  await settings.save();
  return settings.toObject();
}

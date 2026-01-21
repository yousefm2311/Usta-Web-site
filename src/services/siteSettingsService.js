import { dbConnect } from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { getDbStatCounts, STAT_KEYS } from "@/services/statsService";

const SETTINGS_KEY = "default";

const defaultStats = [
  { label: "حرفي معتمد", value: "+1200" },
  { label: "طلبات مكتملة", value: "+48K" },
  { label: "مدينة نخدمها", value: "16" }
];

const formatCount = (value) => {
  if (typeof value !== "number") return null;
  return new Intl.NumberFormat("en-US").format(value);
};

const STAT_LABEL_ALIASES = {
  customers: ["عميل", "عملاء", "العملاء", "customer", "customers", "client", "clients"],
  artisans: ["حرفي", "حرفيين", "فني", "فنيين", "artisan", "artisans", "craftsman", "craftsmen", "technician", "technicians"],
  orders: ["طلب", "طلبات", "order", "orders", "booking", "bookings", "request", "requests"],
  services: ["خدمة", "خدمات", "تصنيف", "تصنيفات", "فئة", "فئات", "service", "services", "category", "categories"]
};

const resolveStatKey = (stat, index) => {
  const label = `${stat?.label || ""}`.toLowerCase();
  for (const [key, aliases] of Object.entries(STAT_LABEL_ALIASES)) {
    if (aliases.some((alias) => label.includes(alias))) {
      return key;
    }
  }
  return STAT_KEYS[index];
};

const mergeStatsWithCounts = (stats, counts) => {
  return stats.map((stat, index) => {
    const key = resolveStatKey(stat, index);
    if (!key) return stat;
    const formatted = formatCount(counts?.[key]);
    if (!formatted) return stat;
    return { ...stat, value: formatted };
  });
};

export async function getSiteSettings() {
  await dbConnect();
  let settings = await SiteSettings.findOne({ key: SETTINGS_KEY }).sort({ createdAt: -1 });
  if (!settings) {
    const latest = await SiteSettings.findOne().sort({ createdAt: -1 });
    if (latest) {
      latest.key = SETTINGS_KEY;
      if (!latest.stats?.length) {
        latest.stats = defaultStats;
      }
      settings = await latest.save();
    } else {
      settings = await SiteSettings.create({ key: SETTINGS_KEY, stats: defaultStats });
    }
  }
  if (!settings.activeTheme) {
    settings.activeTheme = "default";
    await settings.save();
  }
  const settingsData = settings.toObject();
  const statsSource = Array.isArray(settingsData.stats) && settingsData.stats.length ? settingsData.stats : defaultStats;
  const counts = await getDbStatCounts();
  settingsData.stats = mergeStatsWithCounts(statsSource, counts);
  return settingsData;
}

export async function updateSiteSettings(payload) {
  await dbConnect();
  const { key: _key, ...payloadData } = payload || {};
  const settings = await SiteSettings.findOneAndUpdate(
    { key: SETTINGS_KEY },
    { $set: payloadData },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return settings?.toObject();
}

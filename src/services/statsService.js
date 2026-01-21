import { dbConnect } from "@/lib/db";

const STAT_KEYS = ["customers", "artisans", "orders", "services"];

const getCollectionName = (value, fallback) => {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }
  return fallback;
};

const STAT_COLLECTIONS = {
  customers: getCollectionName(process.env.USTA_CUSTOMERS_COLLECTION, "customers"),
  artisans: getCollectionName(process.env.USTA_ARTISANS_COLLECTION, "artisans"),
  orders: getCollectionName(process.env.USTA_ORDERS_COLLECTION, "requests"),
  services: getCollectionName(process.env.USTA_SERVICES_COLLECTION, "categories")
};

const getCollectionCount = async (db, name) => {
  if (!db || !name) return null;
  try {
    return await db.collection(name).estimatedDocumentCount();
  } catch (error) {
    return null;
  }
};

export async function getDbStatCounts() {
  const conn = await dbConnect();
  const db = conn?.connection?.db;
  if (!db) {
    return {};
  }

  const entries = await Promise.all(
    STAT_KEYS.map(async (key) => {
      const count = await getCollectionCount(db, STAT_COLLECTIONS[key]);
      return [key, count];
    })
  );

  return Object.fromEntries(entries);
}

export { STAT_KEYS };

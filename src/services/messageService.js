import { dbConnect } from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";

export async function getMessageCounts() {
  await dbConnect();
  const total = await ContactMessage.countDocuments();
  const unread = await ContactMessage.countDocuments({ status: "new" });
  return { total, unread };
}

export async function getRecentMessages(limit = 5) {
  await dbConnect();
  const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(limit);
  return messages.map((item) => item.toObject());
}

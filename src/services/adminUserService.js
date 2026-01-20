import { dbConnect } from "@/lib/db";
import AdminUser from "@/models/AdminUser";

export async function getAdminByEmail(email) {
  await dbConnect();
  const user = await AdminUser.findOne({ email: email.toLowerCase() });
  return user ? user.toObject() : null;
}

import AdminTopbar from "@/components/admin/AdminTopbar";
import { dbConnect } from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import Category from "@/models/Category";
import ContactMessage from "@/models/ContactMessage";

export const metadata = {
  title: "لوحة التحكم"
};

export default async function AdminDashboard() {
  await dbConnect();
  const [blogCount, categoryCount, messageCount, recentMessages] = await Promise.all([
    BlogPost.countDocuments(),
    Category.countDocuments(),
    ContactMessage.countDocuments(),
    ContactMessage.find().sort({ createdAt: -1 }).limit(5)
  ]);

  return (
    <div className="flex flex-col">
      <AdminTopbar title="لوحة التحكم" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card">
            <p className="text-sm text-slate-600">التدوينات</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{blogCount}</p>
          </div>
          <div className="card">
            <p className="text-sm text-slate-600">الأقسام</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{categoryCount}</p>
          </div>
          <div className="card">
            <p className="text-sm text-slate-600">الرسائل</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{messageCount}</p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold">آخر الرسائل</h2>
          <div className="mt-4 space-y-3">
            {recentMessages.map((message) => (
              <div key={message._id.toString()} className="rounded-2xl border border-blue-100 p-4">
                <p className="text-sm font-semibold text-slate-900">{message.name}</p>
                <p className="text-xs text-slate-500">{message.email}</p>
                <p className="mt-2 text-sm text-slate-600">{message.message}</p>
              </div>
            ))}
            {!recentMessages.length && <p className="text-sm text-slate-500">لا توجد رسائل بعد.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

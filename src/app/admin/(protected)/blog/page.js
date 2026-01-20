import AdminTopbar from "@/components/admin/AdminTopbar";
import BlogManager from "@/components/forms/BlogManager";

export const metadata = {
  title: "إدارة المدونة"
};

export default function BlogAdminPage() {
  return (
    <div className="flex flex-col">
      <AdminTopbar title="إدارة المدونة" />
      <div className="p-6">
        <BlogManager />
      </div>
    </div>
  );
}

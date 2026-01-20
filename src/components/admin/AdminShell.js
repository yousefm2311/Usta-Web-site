import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminShell({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}

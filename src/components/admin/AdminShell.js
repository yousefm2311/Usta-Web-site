import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminShell({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 md:flex-row">
      <AdminSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

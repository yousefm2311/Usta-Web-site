import AdminLoginForm from "@/components/forms/AdminLoginForm";

export const metadata = {
  title: "دخول المسؤول"
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-50 px-4">
      <AdminLoginForm />
    </div>
  );
}

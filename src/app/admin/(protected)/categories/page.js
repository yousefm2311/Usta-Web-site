import AdminTopbar from "@/components/admin/AdminTopbar";
import CategoriesManager from "@/components/forms/CategoriesManager";

export const metadata = {
  title: "الأقسام"
};

export default function CategoriesPage() {
  return (
    <div className="flex flex-col">
      <AdminTopbar title="إدارة الأقسام" />
      <div className="p-6">
        <CategoriesManager />
      </div>
    </div>
  );
}

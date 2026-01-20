import AdminTopbar from "@/components/admin/AdminTopbar";
import ThemesManager from "@/components/forms/ThemesManager";

export const metadata = {
  title: "الثيمات"
};

export default function ThemesPage() {
  return (
    <div className="flex flex-col">
      <AdminTopbar title="إدارة الثيمات" />
      <div className="p-6">
        <ThemesManager />
      </div>
    </div>
  );
}

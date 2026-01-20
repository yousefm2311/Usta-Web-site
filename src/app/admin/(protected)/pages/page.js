import AdminTopbar from "@/components/admin/AdminTopbar";
import PagesManager from "@/components/forms/PagesManager";

export const metadata = {
  title: "الصفحات الثابتة"
};

export default function StaticPagesAdmin() {
  return (
    <div className="flex flex-col">
      <AdminTopbar title="الصفحات الثابتة" />
      <div className="p-6">
        <PagesManager />
      </div>
    </div>
  );
}

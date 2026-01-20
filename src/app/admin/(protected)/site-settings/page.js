import AdminTopbar from "@/components/admin/AdminTopbar";
import SiteSettingsForm from "@/components/forms/SiteSettingsForm";

export const metadata = {
  title: "إعدادات الموقع"
};

export default function SiteSettingsPage() {
  return (
    <div className="flex flex-col">
      <AdminTopbar title="إعدادات الموقع" />
      <div className="p-6">
        <SiteSettingsForm />
      </div>
    </div>
  );
}

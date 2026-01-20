import AdminTopbar from "@/components/admin/AdminTopbar";
import UsersManager from "@/components/forms/UsersManager";

export const metadata = {
  title: "المستخدمون"
};

export default function UsersPage() {
  return (
    <div className="flex flex-col">
      <AdminTopbar title="المستخدمون" />
      <div className="p-6">
        <UsersManager />
      </div>
    </div>
  );
}

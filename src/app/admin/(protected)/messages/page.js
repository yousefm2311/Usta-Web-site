import AdminTopbar from "@/components/admin/AdminTopbar";
import MessagesManager from "@/components/forms/MessagesManager";

export const metadata = {
  title: "الرسائل"
};

export default function MessagesPage() {
  return (
    <div className="flex flex-col">
      <AdminTopbar title="رسائل التواصل" />
      <div className="p-6">
        <MessagesManager />
      </div>
    </div>
  );
}

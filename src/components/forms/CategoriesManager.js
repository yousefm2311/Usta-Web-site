"use client";

import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  icon: "",
  coverImageUrl: "",
  isActive: true
};

export default function CategoriesManager() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState(null);

  const loadCategories = () => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.items || []));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    if (!res.ok) {
      return "";
    }
    const data = await res.json();
    return data.url;
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file);
    if (url) {
      setForm((prev) => ({ ...prev, coverImageUrl: url }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);

    const method = editingId ? "PUT" : "POST";
    const endpoint = editingId ? `/api/admin/categories/${editingId}` : "/api/admin/categories";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setStatus({ type: "success", message: "تم حفظ القسم." });
      setForm(emptyForm);
      setEditingId(null);
      loadCategories();
    } else {
      const data = await res.json();
      setStatus({ type: "error", message: data.error || "تعذر حفظ القسم." });
    }
  };

  const handleEdit = (category) => {
    setForm({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      icon: category.icon || "",
      coverImageUrl: category.coverImageUrl || "",
      isActive: category.isActive
    });
    setEditingId(category._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    loadCategories();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <form onSubmit={handleSubmit} className="card space-y-4">
        <h2 className="text-lg font-semibold">{editingId ? "تعديل القسم" : "قسم جديد"}</h2>
        <div>
          <label className="label">الاسم</label>
          <input className="input mt-2" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} required />
        </div>
        <div>
          <label className="label">Slug (اختياري)</label>
          <input className="input mt-2" value={form.slug} onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))} />
        </div>
        <div>
          <label className="label">الوصف</label>
          <textarea className="input mt-2" rows="3" value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}></textarea>
        </div>
        <div>
          <label className="label">الأيقونة (نص أو ايموجي)</label>
          <input className="input mt-2" value={form.icon} onChange={(e) => setForm((prev) => ({ ...prev, icon: e.target.value }))} />
        </div>
        <div>
          <label className="label">صورة الغلاف</label>
          <input type="file" className="input mt-2" onChange={handleFileChange} />
          {form.coverImageUrl && <p className="mt-2 text-xs text-slate-500">{form.coverImageUrl}</p>}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))} />
          نشط
        </label>
        {status && <p className={`text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>{status.message}</p>}
        <button type="submit" className="btn-primary">حفظ</button>
      </form>

      <div className="card">
        <h2 className="text-lg font-semibold">القائمة الحالية</h2>
        <div className="mt-4 space-y-4">
          {categories.map((category) => (
            <div key={category._id} className="flex flex-col gap-3 rounded-2xl border border-blue-100 p-4">
              <div>
                <p className="font-semibold text-slate-900">{category.name}</p>
                <p className="text-xs text-slate-500">/{category.slug}</p>
                <p className="mt-2 text-sm text-slate-600">{category.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn-outline" onClick={() => handleEdit(category)}>تعديل</button>
                <button type="button" className="btn-outline" onClick={() => handleDelete(category._id)}>حذف</button>
              </div>
            </div>
          ))}
          {!categories.length && <p className="text-sm text-slate-500">لا توجد أقسام بعد.</p>}
        </div>
      </div>
    </div>
  );
}

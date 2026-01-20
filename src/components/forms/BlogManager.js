"use client";

import { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  contentType: "markdown",
  coverImageUrl: "",
  tags: "",
  author: "",
  published: false
};

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState(null);

  const loadPosts = () => {
    fetch("/api/admin/blog")
      .then((res) => res.json())
      .then((data) => setPosts(data.items || []));
  };

  useEffect(() => {
    loadPosts();
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

    const payload = {
      ...form,
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
    };

    const method = editingId ? "PUT" : "POST";
    const endpoint = editingId ? `/api/admin/blog/${editingId}` : "/api/admin/blog";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      setStatus({ type: "success", message: "تم حفظ التدوينة." });
      setForm(emptyForm);
      setEditingId(null);
      loadPosts();
    } else {
      const data = await res.json();
      setStatus({ type: "error", message: data.error || "تعذر حفظ التدوينة." });
    }
  };

  const handleEdit = (post) => {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
      contentType: post.contentType || "markdown",
      coverImageUrl: post.coverImageUrl || "",
      tags: (post.tags || []).join(", "),
      author: post.author || "",
      published: post.published
    });
    setEditingId(post._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    loadPosts();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <form onSubmit={handleSubmit} className="card space-y-4">
        <h2 className="text-lg font-semibold">{editingId ? "تعديل التدوينة" : "تدوينة جديدة"}</h2>
        <div>
          <label className="label">العنوان</label>
          <input className="input mt-2" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} required />
        </div>
        <div>
          <label className="label">Slug (اختياري)</label>
          <input className="input mt-2" value={form.slug} onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))} />
        </div>
        <div>
          <label className="label">الملخص</label>
          <textarea className="input mt-2" rows="2" value={form.excerpt} onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}></textarea>
        </div>
        <div>
          <label className="label">المحتوى</label>
          <textarea className="input mt-2" rows="6" value={form.content} onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))} required></textarea>
        </div>
        <div>
          <label className="label">نوع المحتوى</label>
          <select className="input mt-2" value={form.contentType} onChange={(e) => setForm((prev) => ({ ...prev, contentType: e.target.value }))}>
            <option value="markdown">Markdown</option>
            <option value="html">HTML</option>
          </select>
        </div>
        <div>
          <label className="label">صورة الغلاف</label>
          <input type="file" className="input mt-2" onChange={handleFileChange} />
          {form.coverImageUrl && <p className="mt-2 text-xs text-slate-500">{form.coverImageUrl}</p>}
        </div>
        <div>
          <label className="label">الوسوم (مفصولة بفواصل)</label>
          <input className="input mt-2" value={form.tags} onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))} />
        </div>
        <div>
          <label className="label">الكاتب</label>
          <input className="input mt-2" value={form.author} onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.published} onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))} />
          نشر التدوينة
        </label>
        {status && <p className={`text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>{status.message}</p>}
        <button type="submit" className="btn-primary">حفظ</button>
      </form>

      <div className="card">
        <h2 className="text-lg font-semibold">التدوينات الحالية</h2>
        <div className="mt-4 space-y-4">
          {posts.map((post) => (
            <div key={post._id} className="flex flex-col gap-3 rounded-2xl border border-blue-100 p-4">
              <div>
                <p className="font-semibold text-slate-900">{post.title}</p>
                <p className="text-xs text-slate-500">/{post.slug}</p>
                <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn-outline" onClick={() => handleEdit(post)}>تعديل</button>
                <button type="button" className="btn-outline" onClick={() => handleDelete(post._id)}>حذف</button>
              </div>
            </div>
          ))}
          {!posts.length && <p className="text-sm text-slate-500">لا توجد تدوينات بعد.</p>}
        </div>
      </div>
    </div>
  );
}

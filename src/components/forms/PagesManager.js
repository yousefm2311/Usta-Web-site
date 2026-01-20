"use client";

import { useEffect, useState } from "react";

export default function PagesManager() {
  const [pages, setPages] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch("/api/admin/pages")
      .then((res) => res.json())
      .then((data) => setPages(data.items || []));
  }, []);

  const updateField = (index, field, value) => {
    const updated = [...pages];
    updated[index] = { ...updated[index], [field]: value };
    setPages(updated);
  };

  const handleSave = async (page) => {
    setStatus(null);
    const res = await fetch("/api/admin/pages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(page)
    });

    if (res.ok) {
      setStatus({ type: "success", message: "تم تحديث الصفحة." });
    } else {
      const data = await res.json();
      setStatus({ type: "error", message: data.error || "تعذر تحديث الصفحة." });
    }
  };

  return (
    <div className="space-y-6">
      {pages.map((page, index) => (
        <div key={page.key} className="card space-y-4">
          <h2 className="text-lg font-semibold">{page.key === "privacy" ? "سياسة الخصوصية" : "الشروط والأحكام"}</h2>
          <div>
            <label className="label">العنوان</label>
            <input className="input mt-2" value={page.title} onChange={(e) => updateField(index, "title", e.target.value)} />
          </div>
          <div>
            <label className="label">المحتوى</label>
            <textarea className="input mt-2" rows="6" value={page.content} onChange={(e) => updateField(index, "content", e.target.value)}></textarea>
          </div>
          <div>
            <label className="label">نوع المحتوى</label>
            <select className="input mt-2" value={page.contentType || "markdown"} onChange={(e) => updateField(index, "contentType", e.target.value)}>
              <option value="markdown">Markdown</option>
              <option value="html">HTML</option>
            </select>
          </div>
          <button type="button" className="btn-primary" onClick={() => handleSave(page)}>حفظ</button>
        </div>
      ))}
      {!pages.length && <p className="text-sm text-slate-500">لا توجد صفحات بعد.</p>}
      {status && <p className={`text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>{status.message}</p>}
    </div>
  );
}

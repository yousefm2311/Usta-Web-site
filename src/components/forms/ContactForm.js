"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      form.reset();
      setStatus({ type: "success", message: "تم إرسال رسالتك بنجاح." });
    } else {
      const data = await res.json();
      setStatus({ type: "error", message: data.error || "حدث خطأ غير متوقع." });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="card card-luxe space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">أرسل رسالة</h2>
        <span className="chip">رد خلال 24 ساعة</span>
      </div>

      <div>
        <label className="label" htmlFor="name">الاسم</label>
        <input id="name" name="name" className="input mt-2" required />
      </div>
      <div>
        <label className="label" htmlFor="email">البريد الإلكتروني</label>
        <input id="email" name="email" type="email" className="input mt-2" required />
      </div>
      <div>
        <label className="label" htmlFor="phone">رقم الهاتف (اختياري)</label>
        <input id="phone" name="phone" className="input mt-2" />
      </div>
      <div>
        <label className="label" htmlFor="message">رسالتك</label>
        <textarea id="message" name="message" rows="5" className="input mt-2" required />
      </div>

      {status && (
        <p className={`text-sm ${status.type === "success" ? "text-emerald-600" : "text-rose-600"}`}>
          {status.message}
        </p>
      )}

      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? "جارٍ الإرسال..." : "إرسال"}
      </button>
    </form>
  );
}

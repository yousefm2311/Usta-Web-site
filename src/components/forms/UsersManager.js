"use client";

import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  disabled: false
};

export default function UsersManager() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState(null);

  const loadUsers = () => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.items || []));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);

    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setStatus({ type: "success", message: "تم إضافة المستخدم." });
      setForm(emptyForm);
      loadUsers();
    } else {
      const data = await res.json();
      setStatus({ type: "error", message: data.error || "تعذر إضافة المستخدم." });
    }
  };

  const toggleDisable = async (id, disabled) => {
    await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ disabled })
    });
    loadUsers();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <form onSubmit={handleSubmit} className="card space-y-4">
        <h2 className="text-lg font-semibold">إضافة مسؤول</h2>
        <div>
          <label className="label">الاسم</label>
          <input className="input mt-2" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} required />
        </div>
        <div>
          <label className="label">البريد الإلكتروني</label>
          <input type="email" className="input mt-2" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} required />
        </div>
        <div>
          <label className="label">كلمة المرور</label>
          <input type="password" className="input mt-2" value={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} required />
        </div>
        <button type="submit" className="btn-primary">حفظ</button>
        {status && <p className={`text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>{status.message}</p>}
      </form>

      <div className="card">
        <h2 className="text-lg font-semibold">المسؤولون</h2>
        <div className="mt-4 space-y-3">
          {users.map((user) => (
            <div key={user._id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 p-4">
              <div>
                <p className="font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              <button type="button" className="btn-outline" onClick={() => toggleDisable(user._id, !user.disabled)}>
                {user.disabled ? "تفعيل" : "تعطيل"}
              </button>
            </div>
          ))}
          {!users.length && <p className="text-sm text-slate-500">لا يوجد مسؤولون بعد.</p>}
        </div>
      </div>
    </div>
  );
}

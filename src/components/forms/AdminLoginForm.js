"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false
    });

    if (res?.error) {
      const message = res.error === "CredentialsSignin" ? "بيانات الدخول غير صحيحة" : res.error;
      setError(message);
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md rounded-3xl border border-blue-100 bg-[color:var(--theme-surface)] p-8 shadow-xl">
      <h1 className="text-xl font-semibold text-slate-900">تسجيل دخول المسؤول</h1>
      <p className="mt-2 text-sm text-slate-600">ادخل بيانات المسؤول لإدارة المحتوى.</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="label" htmlFor="email">البريد الإلكتروني</label>
          <input id="email" name="email" type="email" required className="input mt-2" />
        </div>
        <div>
          <label className="label" htmlFor="password">كلمة المرور</label>
          <input id="password" name="password" type="password" required className="input mt-2" />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button type="submit" className="btn-primary mt-6 w-full" disabled={loading}>
        {loading ? "جارٍ التحقق..." : "دخول"}
      </button>
    </form>
  );
}

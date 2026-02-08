"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlogCard from "@/components/BlogCard";

export default function BlogList() {
  const router = useRouter();
  const params = useSearchParams();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const page = Number(params.get("page") || 1);
  const search = params.get("search") || "";

  useEffect(() => {
    setLoading(true);
    fetch(`/api/public/blog?page=${page}&search=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || []);
        setTotal(data.total || 0);
      })
      .finally(() => setLoading(false));
  }, [page, search]);

  const totalPages = Math.ceil(total / 6) || 1;

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextSearch = formData.get("search");
    router.push(`/blog?search=${encodeURIComponent(nextSearch)}&page=1`);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="card mb-6 flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="label" htmlFor="search">ابحث داخل المدونة</label>
          <input
            id="search"
            name="search"
            defaultValue={search}
            className="input mt-2"
            placeholder="ابحث عن تدوينة أو موضوع"
          />
        </div>
        <button type="submit" className="btn-primary">بحث</button>
      </form>

      <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
        <span>عدد النتائج: {total}</span>
        <span>الصفحة {page} من {totalPages}</span>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="card animate-pulse-soft">
              <div className="h-40 rounded-2xl bg-blue-50" />
              <div className="mt-4 h-3 w-24 rounded-full bg-blue-50" />
              <div className="mt-3 h-4 w-3/4 rounded-full bg-blue-50" />
              <div className="mt-2 h-3 w-full rounded-full bg-blue-50" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
          {!items.length && (
            <div className="card">
              <p className="text-sm text-slate-600">لا توجد نتائج مطابقة، جرّب كلمة بحث أخرى.</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="btn-outline"
          disabled={page <= 1}
          onClick={() => router.push(`/blog?search=${encodeURIComponent(search)}&page=${page - 1}`)}
        >
          السابق
        </button>
        <button
          type="button"
          className="btn-outline"
          disabled={page >= totalPages}
          onClick={() => router.push(`/blog?search=${encodeURIComponent(search)}&page=${page + 1}`)}
        >
          التالي
        </button>
      </div>
    </div>
  );
}

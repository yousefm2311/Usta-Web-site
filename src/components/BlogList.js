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
      <form onSubmit={handleSearch} className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <input name="search" defaultValue={search} className="input" placeholder="ابحث عن تدوينة" />
        <button type="submit" className="btn-primary">بحث</button>
      </form>

      {loading ? (
        <p className="text-sm text-slate-500">جارٍ تحميل المقالات...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          className="btn-outline"
          disabled={page <= 1}
          onClick={() => router.push(`/blog?search=${encodeURIComponent(search)}&page=${page - 1}`)}
        >
          السابق
        </button>
        <span className="text-sm text-slate-600">{page} / {totalPages}</span>
        <button
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

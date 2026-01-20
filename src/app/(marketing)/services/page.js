import Link from "next/link";
import { getActiveCategories } from "@/services/categoryService";

export const metadata = {
  title: "الخدمات",
  description: "استكشف جميع خدمات Usta المتاحة." 
};

export default async function ServicesPage() {
  const categories = await getActiveCategories();

  return (
    <div className="section-padding">
      <div className="container-page">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-slate-900">الخدمات المتاحة</h1>
          <p className="mt-3 text-slate-600">اختر القسم المناسب لطلب خدمتك بسهولة.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <Link key={category._id} href={`/services/${category.slug}`} className="card">
              <div className="text-3xl">{category.icon || "🔧"}</div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{category.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{category.description}</p>
            </Link>
          ))}
          {!categories.length && (
            <div className="card">
              <p className="text-sm text-slate-600">لا توجد أقسام حالياً.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

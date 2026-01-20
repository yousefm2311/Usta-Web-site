import BlogList from "@/components/BlogList";

export const metadata = {
  title: "المدونة",
  description: "آخر المقالات والنصائح من فريق Usta." 
};

export default function BlogPage() {
  return (
    <div className="section-padding">
      <div className="container-page">
        <h1 className="text-3xl font-semibold text-slate-900">المدونة</h1>
        <p className="mt-3 text-slate-600">تابع أحدث النصائح والمقالات.</p>
        <div className="mt-8">
          <BlogList />
        </div>
      </div>
    </div>
  );
}

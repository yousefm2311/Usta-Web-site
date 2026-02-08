export default function MarketingLoading() {
  return (
    <div className="section-padding">
      <div className="container-page space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="skeleton shimmer h-6 w-32 rounded-full" />
            <div className="skeleton shimmer h-10 w-4/5 rounded-2xl" />
            <div className="skeleton shimmer h-6 w-3/4 rounded-2xl" />
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="skeleton shimmer h-10 w-32 rounded-full" />
              <div className="skeleton shimmer h-10 w-32 rounded-full" />
            </div>
          </div>
          <div className="skeleton shimmer h-64 rounded-3xl" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="skeleton shimmer h-40 rounded-3xl" />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="skeleton shimmer h-52 rounded-3xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

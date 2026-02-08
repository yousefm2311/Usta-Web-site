export default function FeatureCard({ title, description, icon }) {
  return (
    <div className="card card-muted card-luxe">
      <div className="feature-icon">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}

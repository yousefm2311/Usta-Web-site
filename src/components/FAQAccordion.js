export default function FAQAccordion({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details key={item.question} className="rounded-2xl border border-blue-100 bg-[color:var(--theme-surface)] p-5">
          <summary className="cursor-pointer text-sm font-semibold text-slate-800">
            {item.question}
          </summary>
          <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

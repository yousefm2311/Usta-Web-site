export default function FAQAccordion({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details key={item.question} className="accordion group">
          <summary className="accordion-summary">
            <span>{item.question}</span>
            <span className="accordion-icon">+</span>
          </summary>
          <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

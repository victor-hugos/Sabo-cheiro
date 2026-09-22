"use client";

export default function QuantityInput({
  value,
  onChange,
  max = 99,
  small,
}: {
  value: number;
  onChange: (v: number) => void;
  max?: number;
  small?: boolean;
}) {
  const size = small ? "h-8 w-8 text-sm" : "h-11 w-11";
  return (
    <div className="inline-flex items-center rounded-full border border-brand-200">
      <button type="button" className={`${size} rounded-full hover:bg-brand-50`} onClick={() => onChange(value - 1)} aria-label="Diminuir quantidade">−</button>
      <span className={`${small ? "w-6 text-sm" : "w-8"} text-center font-semibold`} aria-live="polite">{value}</span>
      <button type="button" className={`${size} rounded-full hover:bg-brand-50 disabled:opacity-40`} disabled={value >= max} onClick={() => onChange(value + 1)} aria-label="Aumentar quantidade">+</button>
    </div>
  );
}

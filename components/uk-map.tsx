export function UkMap() {
  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-line shadow-sm">
      <iframe
        title="Areas we cover across the UK"
        src="https://www.google.com/maps?q=United+Kingdom&z=5&output=embed"
        className="h-[420px] w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

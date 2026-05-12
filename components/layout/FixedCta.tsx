export function FixedCta() {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[80] flex shadow-[0_-1px_0_rgba(184,149,106,0.45)]">
      <a
        href="#"
        className="flex-1 flex items-center justify-center gap-1.5 py-[14px] bg-line-green text-white font-serif text-[13px] tracking-[3px] no-underline"
      >
        <span>💬</span>
        <span>LINE で予約</span>
      </a>
      <a
        href="tel:0120000000"
        className="flex-1 flex items-center justify-center gap-1.5 py-[14px] bg-ink text-white font-serif text-[13px] tracking-[3px] no-underline"
      >
        <span>📞</span>
        <span>電話する</span>
      </a>
    </div>
  )
}

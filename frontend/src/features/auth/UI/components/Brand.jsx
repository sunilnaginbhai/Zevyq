import { Link } from 'react-router';

export function Brand({ compact = false }) {
  return (
    <Link to="/" aria-label="Zevyq home" className="inline-flex items-center gap-3 rounded-lg text-ink">
      <svg className="size-10 shrink-0" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="zevyq-mark" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--color-accent)" />
            <stop offset="0.55" stopColor="var(--color-primary)" />
            <stop offset="1" stopColor="var(--color-secondary)" />
          </linearGradient>
        </defs>
        <path d="M9 11h22L9 29h21" stroke="url(#zevyq-mark)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M31 5.5 32.4 9l3.6 1.5-3.6 1.5-1.4 3.5-1.5-3.5-3.5-1.5L29.5 9 31 5.5Z" fill="url(#zevyq-mark)" />
      </svg>
      {!compact && (
        <span className="flex flex-col gap-0.5">
          <span className="font-display text-[22px] leading-6 font-semibold tracking-[-0.5px]">Zevyq</span>
          <span className="text-xs leading-4 text-muted">Intelligence without limits.</span>
        </span>
      )}
    </Link>
  );
}

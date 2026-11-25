import { Check, ChevronDown, Monitor, Moon, Sun } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { Brand } from './Brand.jsx';

const themeOptions = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

function getStoredTheme() {
  const savedTheme = window.localStorage.getItem('zevyq-theme');
  return themeOptions.some(({ value }) => value === savedTheme) ? savedTheme : 'system';
}

function ThemeControl() {
  const [theme, setTheme] = useState(getStoredTheme);
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);
  const menuId = useId();
  const ThemeIcon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    const updateTheme = () => {
      const isDark = theme === 'dark' || (theme === 'system' && media?.matches);
      const color = isDark ? '#0A0A0F' : '#FAFAFC';
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
    };

    updateTheme();
    window.localStorage.setItem('zevyq-theme', theme);
    if (theme !== 'system' || !media) return undefined;
    media.addEventListener('change', updateTheme);
    return () => media.removeEventListener('change', updateTheme);
  }, [theme]);

  useEffect(() => {
    if (!open) return undefined;

    const selectedIndex = themeOptions.findIndex(({ value }) => value === theme);
    optionRefs.current[selectedIndex]?.focus();
    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [open, theme]);

  function focusOption(index) {
    optionRefs.current[index]?.focus();
  }

  function handleTriggerKeyDown(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
    }
  }

  function handleOptionKeyDown(event, index) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusOption((index + 1) % themeOptions.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusOption((index - 1 + themeOptions.length) % themeOptions.length);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusOption(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusOption(themeOptions.length - 1);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  function selectTheme(value) {
    setTheme(value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div
      ref={rootRef}
      className="theme-control relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`Color theme, ${theme}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className="theme-trigger inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-xs text-ink transition-colors hover:bg-surface-hover"
        onClick={() => setOpen((isOpen) => !isOpen)}
        onKeyDown={handleTriggerKeyDown}
      >
        <ThemeIcon size={16} aria-hidden="true" className="text-muted" />
        <span>{themeOptions.find(({ value }) => value === theme)?.label}</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="Color theme"
          className="theme-menu absolute right-0 top-[calc(100%+8px)] z-50 w-36 rounded-lg border border-line bg-surface p-1 shadow-md shadow-black/10"
        >
          {themeOptions.map(({ value, label }, index) => {
            const selected = theme === value;
            return (
              <button
                key={value}
                ref={(element) => { optionRefs.current[index] = element; }}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                tabIndex={-1}
                className={`flex min-h-9 w-full items-center justify-between rounded-md px-2.5 text-left text-sm transition-colors hover:bg-surface-hover focus-visible:bg-surface-hover ${
                  selected ? 'text-primary-ink' : 'text-ink'
                }`}
                onClick={() => selectTheme(value)}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
              >
                {label}
                <span aria-hidden="true" className="flex size-4 items-center justify-center">
                  {selected && (
                    <Check size={16} aria-hidden="true" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function PageShell({ children, headerAction }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main" className="sr-only z-50 rounded bg-primary p-3 text-on-primary focus:not-sr-only focus:absolute">
        Skip to content
      </a>
      <header className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-6 sm:px-8 sm:py-8">
        <Brand />
        <div className="flex items-center gap-2">
          {headerAction}
          <ThemeControl />
        </div>
      </header>
      <main id="main" className="mx-auto flex w-full max-w-[1200px] flex-1 items-center justify-center px-6 py-10 sm:px-8 sm:py-12">
        {children}
      </main>
    </div>
  );
}

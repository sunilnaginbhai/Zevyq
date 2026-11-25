import { PageShell } from './PageShell.jsx';

export function AuthLayout({ children }) {
  return (
    <PageShell>
      <div className="auth-entry w-full max-w-[400px]">
        {children}
      </div>
    </PageShell>
  );
}

import { Check, LogOut, RefreshCw } from 'lucide-react';
import { useAccount } from '../../Hooks/useAuth.js';
import { PageShell } from '../components/PageShell.jsx';
import { ErrorMessage, Spinner } from '../components/Feedback.jsx';

export function AccountPage() {
  const { user, pending, error, notice, logout, reloadProfile } = useAccount();
  return (
    <PageShell headerAction={
      <button onClick={logout} disabled={Boolean(pending)} className="button-secondary px-3 text-xs sm:px-4">
        {pending === 'logout' ? <Spinner /> : <LogOut size={15} />}
        {pending === 'logout' ? 'Signing out' : 'Sign out'}
      </button>
    }>
      <div className="mx-auto w-full max-w-[640px]">
        <div className="mb-8">
          <h1 className="font-display text-2xl leading-8 font-semibold tracking-[-0.4px]">Account</h1>
          <p className="mt-2 text-sm leading-6 text-muted">Profile details associated with your Zevyq account</p>
        </div>
        {error && <div className="mb-4"><ErrorMessage>{error}</ErrorMessage></div>}
        <section className="rounded-xl border border-line bg-surface p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-line pb-6">
            <div className="flex items-center gap-4">
              <span className="flex size-11 items-center justify-center rounded-full bg-surface-hover font-display text-lg font-semibold text-primary-ink">
                {user.name.slice(0, 1).toUpperCase()}
              </span>
              <div>
                <h2 className="text-sm font-medium">{user.name}</h2>
                <p className="mt-1 text-xs text-muted">{user.email}</p>
              </div>
            </div>
            <span className="flex items-center gap-2 text-xs text-muted">
              <Check size={14} className="text-primary-ink" aria-hidden="true" />
              Signed in
            </span>
          </div>
          <dl className="py-6 text-sm">
            <div>
              <dt className="mb-2 text-xs text-muted">Member since</dt>
              <dd>{new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</dd>
            </div>
          </dl>
          <div className="flex flex-col items-start gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <button disabled={Boolean(pending)} onClick={reloadProfile} className="text-link inline-flex min-h-10 items-center gap-2 text-sm">
              {pending === 'profile' ? <Spinner /> : <RefreshCw size={14} />}
              {pending === 'profile' ? 'Refreshing' : 'Refresh details'}
            </button>
          </div>
          {notice && <p role="status" className="mt-3 text-xs leading-5 text-primary-ink">{notice}</p>}
        </section>
      </div>
    </PageShell>
  );
}

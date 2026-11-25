import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useAuthForm } from '../../Hooks/useAuthForm.js';
import { useAuth } from '../../Hooks/useAuth.js';
import { AuthLayout } from '../components/AuthLayout.jsx';
import { FormField } from '../components/FormField.jsx';
import { ErrorMessage, Spinner } from '../components/Feedback.jsx';

export function LoginPage() {
  const form = useAuthForm('login');
  const { sessionError } = useAuth();
  return (
    <AuthLayout>
      <h1 className="font-display text-2xl leading-8 font-semibold tracking-[-0.4px]">
        Sign in to Zevyq
      </h1>
      <p className="mt-2 text-sm leading-6 text-muted">Continue to your account</p>

      <form noValidate onSubmit={form.submit} className="mt-8 space-y-6" aria-busy={form.pending}>
        <ErrorMessage>{form.error || sessionError}</ErrorMessage>
        <fieldset disabled={form.pending} className="space-y-6 disabled:opacity-70">
          <legend className="sr-only">Sign in</legend>
          <FormField
            label="Email address" name="email" type="email" autoComplete="email" autoCapitalize="none"
            spellCheck={false} placeholder="you@example.com" required
            value={form.values.email} onChange={form.updateField} error={form.fieldErrors.email}
          />
          <FormField
            label="Password" name="password" type={form.showPassword ? 'text' : 'password'}
            autoComplete="current-password" placeholder="Enter your password" required
            value={form.values.password} onChange={form.updateField} error={form.fieldErrors.password}
            showPassword={form.showPassword} onToggle={form.togglePassword}
          />
          <button type="submit" className="button-primary mt-2 w-full" disabled={form.pending}>
            {form.pending ? <><Spinner /> Signing in...</> : <>Sign in <ArrowRight size={17} /></>}
          </button>
        </fieldset>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        New to Zevyq?{' '}
        <Link to="/register" className="text-link inline-flex min-h-11 items-center">Create an account</Link>
      </p>
    </AuthLayout>
  );
}

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useAuthForm } from '../../Hooks/useAuthForm.js';
import { useAuth } from '../../Hooks/useAuth.js';
import { AuthLayout } from '../components/AuthLayout.jsx';
import { FormField } from '../components/FormField.jsx';
import { ErrorMessage, Spinner } from '../components/Feedback.jsx';

export function RegisterPage() {
  const form = useAuthForm('register');
  const { sessionError } = useAuth();
  return (
    <AuthLayout>
      <h1 className="font-display text-2xl leading-8 font-semibold tracking-[-0.4px]">
        Create your Zevyq account
      </h1>
      <p className="mt-2 text-sm leading-6 text-muted">Start with your account details</p>

      <form noValidate onSubmit={form.submit} className="mt-8 space-y-6" aria-busy={form.pending}>
        <ErrorMessage>{form.error || sessionError}</ErrorMessage>
        <fieldset disabled={form.pending} className="space-y-6 disabled:opacity-70">
          <legend className="sr-only">Create an account</legend>
          <FormField
            label="Your name" name="name" type="text" autoComplete="name" placeholder="Alex Morgan"
            maxLength={50} required value={form.values.name} onChange={form.updateField} error={form.fieldErrors.name}
          />
          <FormField
            label="Email address" name="email" type="email" autoComplete="email" autoCapitalize="none"
            spellCheck={false} placeholder="you@example.com" required
            value={form.values.email} onChange={form.updateField} error={form.fieldErrors.email}
          />
          <FormField
            label="Password" name="password" type={form.showPassword ? 'text' : 'password'}
            autoComplete="new-password" placeholder="Create a strong password" required
            value={form.values.password} onChange={form.updateField} error={form.fieldErrors.password}
            hint="At least 8 characters, with a letter and a number."
            showPassword={form.showPassword} onToggle={form.togglePassword}
          />
          <button type="submit" className="button-primary mt-2 w-full" disabled={form.pending}>
            {form.pending ? <><Spinner /> Creating your account...</> : <>Create account <ArrowRight size={17} /></>}
          </button>
        </fieldset>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link to="/login" className="text-link inline-flex min-h-11 items-center">Sign in</Link>
      </p>
    </AuthLayout>
  );
}

import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { useAuth, formatApiErrorDetail } from "../context/AuthContext";
import BrandMark from "../components/BrandMark";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function AdminLogin() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (user && user.role === "admin") return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate("/admin");
    } catch (err) {
      setError(formatApiErrorDetail(err?.response?.data?.detail) || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-base px-5">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-3 text-brand-primary mb-8" data-testid="login-home-link">
          <BrandMark size={48} variant="dark" />
          <div className="leading-tight">
            <div className="font-serif text-2xl font-semibold">Gospel Roots</div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-brand-accent font-semibold">Lawn Care</div>
          </div>
        </Link>

        <div className="rounded-3xl bg-white border border-black/5 shadow-xl p-8 sm:p-10">
          <h1 className="font-serif text-3xl text-brand-primary tracking-tight">Admin Login</h1>
          <p className="mt-2 text-sm text-[#4A5568]">Sign in to view incoming quote requests.</p>

          <form onSubmit={onSubmit} data-testid="login-form" className="mt-7 space-y-5">
            <div>
              <Label htmlFor="email" className="text-brand-primary">Email</Label>
              <div className="relative mt-1.5">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5568]" />
                <Input
                  id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  data-testid="login-input-email"
                  className="h-11 rounded-xl pl-9" required autoFocus
                  placeholder="you@gmail.com"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="text-brand-primary">Password</Label>
              <div className="relative mt-1.5">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5568]" />
                <Input
                  id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  data-testid="login-input-password"
                  className="h-11 rounded-xl pl-9" required
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div data-testid="login-error" className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              data-testid="login-submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary text-white px-6 py-3.5 text-sm font-semibold hover:bg-brand-secondary transition disabled:opacity-60"
            >
              {submitting ? "Signing in…" : "Sign In"} <ArrowRight size={16} />
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-[#4A5568] hover:text-brand-primary transition" data-testid="login-back-link">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}

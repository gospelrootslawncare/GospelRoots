import React, { useEffect, useState, useCallback } from "react";
import { Navigate, Link } from "react-router-dom";
import { LogOut, Mail, Phone, MapPin, Trash2, RefreshCw, Inbox, Calendar } from "lucide-react";
import { useAuth, formatApiErrorDetail } from "../context/AuthContext";
import BrandMark from "../components/BrandMark";
import { toast } from "sonner";

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: "short", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function AdminQuotes() {
  const { user, logout, api } = useAuth();
  const [quotes, setQuotes] = useState(null);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setRefreshing(true);
    setError("");
    try {
      const { data } = await api.get("/quotes");
      setQuotes(data);
      if (data.length > 0 && !selected) setSelected(data[0]);
    } catch (err) {
      setError(formatApiErrorDetail(err?.response?.data?.detail) || "Could not load quotes.");
    } finally {
      setRefreshing(false);
    }
  }, [api, selected]);

  useEffect(() => {
    if (user && user.role === "admin") load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-base">
        <div className="text-[#4A5568] text-sm">Loading…</div>
      </div>
    );
  }
  if (user === false || user?.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this quote request? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await api.delete(`/quotes/${id}`);
      const updated = quotes.filter((q) => q.id !== id);
      setQuotes(updated);
      if (selected?.id === id) setSelected(updated[0] || null);
      toast.success("Quote deleted.");
    } catch (err) {
      toast.error(formatApiErrorDetail(err?.response?.data?.detail) || "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  };

  const count = quotes?.length ?? 0;

  return (
    <div className="min-h-screen bg-brand-base flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-brand-primary" data-testid="admin-home-link">
            <BrandMark size={32} variant="dark" />
            <div className="leading-tight">
              <div className="font-serif text-lg font-semibold">Gospel Roots</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-brand-accent font-semibold">Admin</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-[#4A5568]" data-testid="admin-user-email">{user.email}</span>
            <button
              onClick={logout}
              data-testid="admin-logout"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 text-[#1B4332] px-4 py-2 text-sm font-semibold hover:bg-black/5 transition"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold">Inbox</div>
            <h1 className="font-serif text-4xl text-brand-primary mt-2 tracking-tight">Quote Requests</h1>
            <p className="text-sm text-[#4A5568] mt-1" data-testid="admin-count">
              {count === 0 ? "No requests yet." : `${count} ${count === 1 ? "request" : "requests"} total`}
            </p>
          </div>
          <button
            onClick={load}
            disabled={refreshing}
            data-testid="admin-refresh"
            className="inline-flex items-center gap-2 rounded-full bg-brand-primary text-white px-4 py-2 text-sm font-semibold hover:bg-brand-secondary transition disabled:opacity-60"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 border border-red-100 text-red-700 px-4 py-3 text-sm" data-testid="admin-error">
            {error}
          </div>
        )}

        {quotes === null ? (
          <div className="mt-12 text-[#4A5568] text-sm">Loading quotes…</div>
        ) : quotes.length === 0 ? (
          <div className="mt-12 rounded-3xl bg-white border border-black/5 shadow-sm p-12 text-center" data-testid="admin-empty-state">
            <Inbox className="mx-auto text-brand-secondary" size={48} />
            <div className="font-serif text-2xl text-brand-primary mt-4">No requests yet</div>
            <p className="text-sm text-[#4A5568] mt-2">When a customer submits the form on your website, it’ll appear here.</p>
          </div>
        ) : (
          <div className="mt-8 grid lg:grid-cols-12 gap-6">
            {/* List */}
            <ul className="lg:col-span-5 space-y-3" data-testid="admin-quote-list">
              {quotes.map((q) => {
                const active = selected?.id === q.id;
                return (
                  <li key={q.id}>
                    <button
                      onClick={() => setSelected(q)}
                      data-testid={`admin-quote-item-${q.id}`}
                      className={`w-full text-left rounded-2xl border p-4 transition shadow-sm hover:shadow-md
                        ${active ? "bg-white border-brand-primary/30 ring-2 ring-brand-primary/15" : "bg-white border-black/5"}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="font-serif text-lg text-brand-primary leading-tight truncate">{q.name}</div>
                        <div className="text-[11px] uppercase tracking-[0.16em] text-[#4A5568] whitespace-nowrap">
                          {formatDate(q.created_at)}
                        </div>
                      </div>
                      <div className="mt-1 text-sm text-[#4A5568] truncate">{q.service || "No service specified"}</div>
                      <div className="mt-2 text-sm text-[#3a4452] line-clamp-2">{q.message}</div>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Detail */}
            <div className="lg:col-span-7" data-testid="admin-quote-detail">
              {selected ? (
                <div className="rounded-3xl bg-white border border-black/5 shadow-md p-6 sm:p-8 sticky top-24">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold">From</div>
                      <h2 className="font-serif text-3xl text-brand-primary mt-1 tracking-tight">{selected.name}</h2>
                      <div className="flex items-center gap-2 text-xs text-[#4A5568] mt-2">
                        <Calendar size={12} /> {formatDate(selected.created_at)}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(selected.id)}
                      disabled={deletingId === selected.id}
                      data-testid="admin-quote-delete"
                      className="inline-flex items-center gap-2 rounded-full border border-red-200 text-red-700 px-3.5 py-1.5 text-xs font-semibold hover:bg-red-50 transition disabled:opacity-60"
                    >
                      <Trash2 size={14} /> {deletingId === selected.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>

                  <div className="mt-6 grid sm:grid-cols-2 gap-3">
                    <a
                      href={`mailto:${selected.email}`}
                      className="flex items-center gap-3 rounded-2xl border border-black/5 px-4 py-3 hover:bg-black/[0.02] transition"
                    >
                      <Mail size={16} className="text-brand-primary" />
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-[#4A5568]">Email</div>
                        <div className="text-sm text-brand-primary truncate">{selected.email}</div>
                      </div>
                    </a>
                    <a
                      href={`tel:${selected.phone}`}
                      className="flex items-center gap-3 rounded-2xl border border-black/5 px-4 py-3 hover:bg-black/[0.02] transition"
                    >
                      <Phone size={16} className="text-brand-primary" />
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.18em] text-[#4A5568]">Phone</div>
                        <div className="text-sm text-brand-primary">{selected.phone}</div>
                      </div>
                    </a>
                    {selected.address && (
                      <div className="flex items-center gap-3 rounded-2xl border border-black/5 px-4 py-3 sm:col-span-2">
                        <MapPin size={16} className="text-brand-primary" />
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.18em] text-[#4A5568]">Address</div>
                          <div className="text-sm text-brand-primary">{selected.address}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {selected.service && (
                    <div className="mt-5">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#4A5568]">Service interest</div>
                      <div className="inline-block mt-1 rounded-full bg-[#EAF1EC] text-brand-primary text-xs font-semibold px-3 py-1">
                        {selected.service}
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#4A5568]">Message</div>
                    <div className="mt-2 rounded-2xl bg-brand-base border border-black/5 p-4 text-sm text-[#1B4332] whitespace-pre-wrap leading-relaxed">
                      {selected.message}
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${selected.email}?subject=Re: Your Gospel Roots Lawn Care quote request`}
                      data-testid="admin-quote-reply-email"
                      className="inline-flex items-center gap-2 rounded-full bg-brand-primary text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-secondary transition"
                    >
                      <Mail size={14} /> Reply by Email
                    </a>
                    <a
                      href={`tel:${selected.phone}`}
                      data-testid="admin-quote-call"
                      className="inline-flex items-center gap-2 rounded-full border border-brand-primary text-brand-primary px-5 py-2.5 text-sm font-semibold hover:bg-brand-primary hover:text-white transition"
                    >
                      <Phone size={14} /> Call
                    </a>
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl bg-white border border-black/5 shadow-sm p-10 text-center text-[#4A5568] text-sm">
                  Select a request to view details.
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

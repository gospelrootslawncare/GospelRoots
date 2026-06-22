import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  LogOut, Mail, Phone, MapPin, Trash2, RefreshCw, Inbox, Calendar, ChevronDown,
} from "lucide-react";
import { useAuth, formatApiErrorDetail } from "../context/AuthContext";
import BrandMark from "../components/BrandMark";
import { toast } from "sonner";

const STATUSES = [
  { key: "new",       label: "New",       cls: "bg-[#EAF1EC] text-brand-primary border-brand-primary/20" },
  { key: "contacted", label: "Contacted", cls: "bg-[#FFF6E2] text-[#8a6d1a] border-[#e6cd7f]" },
  { key: "quoted",    label: "Quoted",    cls: "bg-[#E6EEF7] text-[#1e3a5f] border-[#a8c0dd]" },
  { key: "won",       label: "Won",       cls: "bg-[#E7F4E7] text-[#1f5e1f] border-[#a8d5a8]" },
  { key: "lost",      label: "Lost",      cls: "bg-[#F5E6E6] text-[#7a2424] border-[#dca7a7]" },
];

const STATUS_BY_KEY = STATUSES.reduce((m, s) => ((m[s.key] = s), m), {});

function StatusBadge({ status }) {
  const s = STATUS_BY_KEY[status] || STATUS_BY_KEY.new;
  return (
    <span
      data-testid={`status-badge-${status}`}
      className={`inline-flex items-center text-[10px] uppercase tracking-[0.16em] font-semibold rounded-full border px-2.5 py-1 ${s.cls}`}
    >
      {s.label}
    </span>
  );
}

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
  const [updatingId, setUpdatingId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState("all");

  const load = useCallback(async (preserveSelectedId) => {
    setRefreshing(true);
    setError("");
    try {
      const { data } = await api.get("/quotes");
      setQuotes(data);
      if (preserveSelectedId) {
        const found = data.find((q) => q.id === preserveSelectedId);
        if (found) setSelected(found);
        else if (data.length > 0) setSelected(data[0]);
        else setSelected(null);
      } else if (data.length > 0 && !selected) {
        setSelected(data[0]);
      }
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

  const counts = useMemo(() => {
    const c = { all: 0, new: 0, contacted: 0, quoted: 0, won: 0, lost: 0 };
    (quotes || []).forEach((q) => {
      c.all += 1;
      const s = q.status || "new";
      if (c[s] !== undefined) c[s] += 1;
    });
    return c;
  }, [quotes]);

  const visible = useMemo(() => {
    if (!quotes) return [];
    if (filter === "all") return quotes;
    return quotes.filter((q) => (q.status || "new") === filter);
  }, [quotes, filter]);

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

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const { data } = await api.patch(`/quotes/${id}`, { status: newStatus });
      const updated = quotes.map((q) => (q.id === id ? data : q));
      setQuotes(updated);
      if (selected?.id === id) setSelected(data);
      toast.success(`Marked as ${STATUS_BY_KEY[newStatus].label}.`);
    } catch (err) {
      toast.error(formatApiErrorDetail(err?.response?.data?.detail) || "Update failed.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleFieldSave = async (id, patch, label = "Saved") => {
    try {
      const { data } = await api.patch(`/quotes/${id}`, patch);
      const updated = quotes.map((q) => (q.id === id ? data : q));
      setQuotes(updated);
      if (selected?.id === id) setSelected(data);
      toast.success(label);
    } catch (err) {
      toast.error(formatApiErrorDetail(err?.response?.data?.detail) || "Update failed.");
    }
  };

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
              {counts.all === 0 ? "No requests yet." : `${counts.all} total · ${counts.new} new · ${counts.won} won`}
            </p>
          </div>
          <button
            onClick={() => load(selected?.id)}
            disabled={refreshing}
            data-testid="admin-refresh"
            className="inline-flex items-center gap-2 rounded-full bg-brand-primary text-white px-4 py-2 text-sm font-semibold hover:bg-brand-secondary transition disabled:opacity-60"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        {/* Filter chips */}
        {quotes && quotes.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2" data-testid="admin-filters">
            {[
              { key: "all", label: "All" },
              ...STATUSES,
            ].map((s) => {
              const active = filter === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => setFilter(s.key)}
                  data-testid={`admin-filter-${s.key}`}
                  className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold rounded-full px-4 py-2 border transition ${
                    active
                      ? "bg-brand-primary text-white border-brand-primary"
                      : "bg-white text-[#1B4332] border-black/10 hover:border-brand-primary/30"
                  }`}
                >
                  {s.label}
                  <span className={`text-[10px] font-bold ${active ? "text-white/80" : "text-[#4A5568]"}`}>
                    {counts[s.key] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        )}

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
              {visible.length === 0 && (
                <li className="rounded-2xl bg-white border border-dashed border-black/10 p-6 text-sm text-[#4A5568] text-center">
                  No quotes in this filter.
                </li>
              )}
              {visible.map((q) => {
                const active = selected?.id === q.id;
                const status = q.status || "new";
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
                      <div className="mt-1 flex items-center gap-2 text-sm text-[#4A5568] truncate">
                        <StatusBadge status={status} />
                        <span className="truncate">{q.service || "No service specified"}</span>
                      </div>
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

                  {/* Status control */}
                  <div className="mt-5 flex flex-wrap items-center gap-3" data-testid="admin-status-control">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#4A5568] font-semibold">Lead status</span>
                    <div className="relative">
                      <select
                        value={selected.status || "new"}
                        onChange={(e) => handleStatusChange(selected.id, e.target.value)}
                        disabled={updatingId === selected.id}
                        data-testid="admin-status-select"
                        className="appearance-none bg-white border border-black/10 rounded-full pl-4 pr-9 py-1.5 text-sm font-semibold text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/25 disabled:opacity-60"
                      >
                        {STATUSES.map((s) => (
                          <option key={s.key} value={s.key}>{s.label}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5568] pointer-events-none" />
                    </div>
                    <StatusBadge status={selected.status || "new"} />
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

                  {/* Internal notes + follow-up date */}
                  <div className="mt-6 grid sm:grid-cols-5 gap-4">
                    <div className="sm:col-span-3">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#4A5568]">Internal notes</div>
                      <textarea
                        key={`notes-${selected.id}`}
                        defaultValue={selected.notes || ""}
                        onBlur={(e) => {
                          const val = e.target.value;
                          if (val !== (selected.notes || "")) {
                            handleFieldSave(selected.id, { notes: val }, "Notes saved");
                          }
                        }}
                        data-testid="admin-notes"
                        rows={4}
                        placeholder="e.g. Called 6/22 left voicemail. Try again Friday afternoon."
                        className="mt-1.5 w-full rounded-xl border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/25"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#4A5568]">Follow up on</div>
                      <input
                        key={`fu-${selected.id}`}
                        type="date"
                        defaultValue={selected.follow_up_at || ""}
                        onChange={(e) => {
                          const val = e.target.value || null;
                          handleFieldSave(selected.id, { follow_up_at: val ?? "" }, val ? "Follow-up date set" : "Follow-up cleared");
                        }}
                        data-testid="admin-follow-up"
                        className="mt-1.5 w-full h-11 rounded-xl border border-input bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/25"
                      />
                      {selected.preferred_date && (
                        <div className="mt-3 text-[10px] uppercase tracking-[0.18em] text-[#4A5568]">Customer preferred</div>
                      )}
                      {selected.preferred_date && (
                        <div className="text-sm text-brand-primary mt-1">
                          {selected.preferred_date}
                          {selected.preferred_window ? ` · ${selected.preferred_window}` : ""}
                        </div>
                      )}
                      {selected.referral_source && (
                        <>
                          <div className="mt-3 text-[10px] uppercase tracking-[0.18em] text-[#4A5568]">Heard about us via</div>
                          <div className="text-sm text-brand-primary mt-1">{selected.referral_source}</div>
                        </>
                      )}
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

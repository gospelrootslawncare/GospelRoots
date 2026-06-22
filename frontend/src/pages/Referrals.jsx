import React, { useState } from "react";
import axios from "axios";
import { Gift, Send, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SeasonalBanner from "../components/SeasonalBanner";
import MobileStickyCTA from "../components/MobileStickyCTA";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import useScrollReveal from "../hooks/useScrollReveal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Referrals() {
  useScrollReveal();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", friend: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.friend) {
      toast.error("Please fill in your name, contact, and your friend's info.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/quotes`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: "Referral",
        referral_source: form.friend,
        message:
          `[Referral submission]\n` +
          `Referring customer: ${form.name} (${form.email} / ${form.phone})\n` +
          `Friend to contact: ${form.friend}\n` +
          (form.message ? `Note: ${form.message}` : ""),
      });
      setSuccess(true);
      toast.success("Thanks for the referral! We'll be in touch.");
      setForm({ name: "", email: "", phone: "", friend: "", message: "" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="referrals-page">
      <SeasonalBanner />
      <Navbar />
      <main className="bg-brand-base">
        <section className="pt-32 sm:pt-40 pb-16 bg-white border-b border-black/[0.04]">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold inline-flex items-center gap-2 reveal">
              <Gift size={14} /> Refer a neighbor
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl text-brand-primary mt-3 tracking-tight reveal" style={{ transitionDelay: "80ms" }}>
              Refer a friend. Get a free mow.
            </h1>
            <p className="mt-5 text-[#4A5568] text-base sm:text-lg leading-relaxed reveal" style={{ transitionDelay: "160ms" }}>
              If someone you refer signs up for service, your next visit is on us. No catch — just a thank you for
              spreading the word.
            </p>

            <ul className="mt-8 grid sm:grid-cols-3 gap-4 reveal" style={{ transitionDelay: "220ms" }}>
              {[
                { n: "1", t: "Send us their info", d: "Name, phone or email — whatever you have." },
                { n: "2", t: "We reach out", d: "Friendly, no pressure. They get a free quote." },
                { n: "3", t: "They book service", d: "Your next visit is free. Simple as that." },
              ].map((s) => (
                <li key={s.n} className="rounded-2xl bg-brand-base border border-black/[0.05] p-5">
                  <div className="font-serif text-3xl text-brand-accent leading-none">{s.n}</div>
                  <div className="font-serif text-lg text-brand-primary mt-2">{s.t}</div>
                  <div className="text-sm text-[#4A5568] mt-1">{s.d}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-2xl mx-auto px-5 sm:px-8">
            <form
              onSubmit={onSubmit}
              data-testid="referral-form"
              className="rounded-3xl bg-white border border-black/5 shadow-xl p-7 sm:p-10"
            >
              {success && (
                <div data-testid="referral-success" className="mb-6 flex items-start gap-3 rounded-xl bg-[#EAF1EC] border border-brand-primary/20 p-4 text-brand-primary">
                  <CheckCircle2 size={20} className="mt-0.5" />
                  <div>
                    <div className="font-semibold">Thanks for the referral!</div>
                    <div className="text-sm text-brand-secondary">We’ll reach out to your friend and let you know.</div>
                  </div>
                </div>
              )}

              <h2 className="font-serif text-2xl text-brand-primary">Tell us about them</h2>

              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-brand-primary">Your name</Label>
                  <Input
                    name="name" value={form.name} onChange={onChange}
                    data-testid="referral-input-name"
                    className="mt-1.5 h-11 rounded-xl" required
                  />
                </div>
                <div>
                  <Label className="text-brand-primary">Your email</Label>
                  <Input
                    type="email" name="email" value={form.email} onChange={onChange}
                    data-testid="referral-input-email"
                    className="mt-1.5 h-11 rounded-xl" required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-brand-primary">Your phone</Label>
                  <Input
                    name="phone" value={form.phone} onChange={onChange}
                    data-testid="referral-input-phone"
                    className="mt-1.5 h-11 rounded-xl" required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-brand-primary">Friend’s name & contact</Label>
                  <Input
                    name="friend" value={form.friend} onChange={onChange}
                    data-testid="referral-input-friend"
                    placeholder="e.g. Jane Smith — (903) 555-0123"
                    className="mt-1.5 h-11 rounded-xl" required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-brand-primary">Anything we should know? <span className="text-[#9aa3ad] font-normal">(optional)</span></Label>
                  <Textarea
                    name="message" value={form.message} onChange={onChange}
                    data-testid="referral-input-message"
                    rows={3} className="mt-1.5 rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                data-testid="referral-submit"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-primary text-white px-6 py-3 text-sm font-semibold hover:bg-brand-secondary transition disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send Referral"} <Send size={14} />
              </button>
              <p className="mt-3 text-xs text-[#4A5568]">
                Free mow credit applied after your referred friend completes their first visit.
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}

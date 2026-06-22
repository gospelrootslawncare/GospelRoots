import React, { useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SERVICES = [
  "Lawn Mowing", "Edging", "Weed Eating", "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", service: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("Please fill in name, email, phone and message.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/quotes`, form);
      setSuccess(true);
      toast.success("Quote request sent! We'll be in touch soon.");
      setForm({ name: "", email: "", phone: "", address: "", service: "", message: "" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative py-24 sm:py-32 bg-brand-base">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: info */}
          <div className="lg:col-span-5 reveal">
            <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold">Get in touch</div>
            <h2 className="font-serif text-4xl sm:text-5xl text-brand-primary mt-3 tracking-tight">
              Request a free quote.
            </h2>
            <p className="mt-4 text-[#4A5568] text-base sm:text-lg leading-relaxed">
              Tell us about your yard and what you’re looking for. We typically reply within one business day —
              often sooner.
            </p>

            <div className="mt-10 space-y-5">
              <a
                href="tel:+19034245931"
                data-testid="contact-phone-link"
                className="group flex items-center gap-4 rounded-2xl bg-white border border-black/5 p-4 hover:shadow-md transition"
              >
                <div className="w-11 h-11 rounded-xl bg-[#EAF1EC] text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-[#4A5568]">Phone</div>
                  <div className="font-serif text-xl text-brand-primary">(903) 424-5931</div>
                </div>
              </a>

              <a
                href="mailto:gospelrootslawncare@gmail.com"
                data-testid="contact-email-link"
                className="group flex items-center gap-4 rounded-2xl bg-white border border-black/5 p-4 hover:shadow-md transition"
              >
                <div className="w-11 h-11 rounded-xl bg-[#EAF1EC] text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-[#4A5568]">Email</div>
                  <div className="font-serif text-xl text-brand-primary break-all">gospelrootslawncare@gmail.com</div>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl bg-white border border-black/5 p-4">
                <div className="w-11 h-11 rounded-xl bg-[#EAF1EC] text-brand-primary flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-[#4A5568]">Service Area</div>
                  <div className="font-serif text-xl text-brand-primary">Gilmer, TX</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7 reveal" style={{ transitionDelay: "120ms" }}>
            <form
              onSubmit={onSubmit}
              data-testid="contact-form"
              className="rounded-3xl bg-white border border-black/5 shadow-xl p-6 sm:p-8 lg:p-10"
            >
              {success && (
                <div
                  data-testid="contact-success"
                  className="mb-6 flex items-start gap-3 rounded-xl bg-[#EAF1EC] border border-brand-primary/20 p-4 text-brand-primary"
                >
                  <CheckCircle2 size={20} className="mt-0.5" />
                  <div>
                    <div className="font-semibold">Quote request received.</div>
                    <div className="text-sm text-brand-secondary">
                      Thanks! Lucas or Matthew will be in touch shortly.
                    </div>
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name" className="text-brand-primary">Full name</Label>
                  <Input
                    id="name" name="name" value={form.name} onChange={onChange}
                    data-testid="contact-input-name"
                    placeholder="Jane Doe"
                    className="mt-1.5 h-11 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-brand-primary">Email</Label>
                  <Input
                    id="email" name="email" type="email" value={form.email} onChange={onChange}
                    data-testid="contact-input-email"
                    placeholder="you@example.com"
                    className="mt-1.5 h-11 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-brand-primary">Phone</Label>
                  <Input
                    id="phone" name="phone" value={form.phone} onChange={onChange}
                    data-testid="contact-input-phone"
                    placeholder="(555) 123-4567"
                    className="mt-1.5 h-11 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-brand-primary">Address <span className="text-[#9aa3ad] font-normal">(optional)</span></Label>
                  <Input
                    id="address" name="address" value={form.address} onChange={onChange}
                    data-testid="contact-input-address"
                    placeholder="123 Maple St."
                    className="mt-1.5 h-11 rounded-xl"
                  />
                </div>
              </div>

              <div className="mt-5">
                <Label htmlFor="service" className="text-brand-primary">Service of interest</Label>
                <select
                  id="service" name="service" value={form.service} onChange={onChange}
                  data-testid="contact-input-service"
                  className="mt-1.5 w-full h-11 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                >
                  <option value="">Select a service…</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <Label htmlFor="message" className="text-brand-primary">Tell us about your yard</Label>
                <Textarea
                  id="message" name="message" value={form.message} onChange={onChange}
                  data-testid="contact-input-message"
                  rows={5}
                  placeholder="Lot size, current condition, frequency, anything we should know…"
                  className="mt-1.5 rounded-xl"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                data-testid="contact-submit"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-primary text-white px-7 py-3.5 text-sm font-semibold hover:bg-brand-secondary transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-brand-primary/10"
              >
                {submitting ? "Sending…" : "Send Quote Request"}
                <Send size={16} />
              </button>
              <p className="mt-3 text-xs text-[#4A5568]">
                We never share your info. By submitting, you agree to be contacted about your request.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

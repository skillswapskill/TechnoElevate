"use client";

import { useState } from "react";
import { API_BASE } from "@/lib/config";

const INITIAL = { name: "", email: "", phone: "", company: "", message: "" };

export default function LeadForm({
  service = "General Inquiry",
  source = "website",
  title = "Send us a message",
  subtitle = "Tell us about your needs and we’ll get back to you.",
  buttonText = "Submit Inquiry",
}) {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", msg: "" });
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus({ type: "success", msg: "Thank you! Your inquiry has been submitted. We’ll contact you soon." });
      setForm(INITIAL);
    } catch (err) {
      setStatus({ type: "error", msg: err.message || "Unable to submit. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-card glass">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      {status.msg && <div className={`form-status ${status.type}`} role="status" aria-live="polite">{status.msg}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="field">
            <label htmlFor={`${source}-name`}>Full Name *</label>
            <input id={`${source}-name`} name="name" value={form.name} onChange={onChange} placeholder="Your name" required />
          </div>
          <div className="field">
            <label htmlFor={`${source}-email`}>Email *</label>
            <input id={`${source}-email`} name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" required />
          </div>
          <div className="field">
            <label htmlFor={`${source}-phone`}>Phone Number *</label>
            <input id={`${source}-phone`} name="phone" value={form.phone} onChange={onChange} placeholder="+91 ..." required />
          </div>
          <div className="field">
            <label htmlFor={`${source}-company`}>Company / Organization</label>
            <input id={`${source}-company`} name="company" value={form.company} onChange={onChange} placeholder="Your company (optional)" />
          </div>
          <div className="field full">
            <label htmlFor={`${source}-message`}>Message / Requirements *</label>
            <textarea id={`${source}-message`} name="message" value={form.message} onChange={onChange} placeholder="Tell us what you’re looking for..." required />
          </div>
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}
